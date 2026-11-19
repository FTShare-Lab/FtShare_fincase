// Keep only the newest update per chart and paint visible charts one frame at a time.
export function createChartQueue({elements,render,onError=()=>{},onVisible=()=>{},requestFrame=globalThis.requestAnimationFrame,Observer=globalThis.IntersectionObserver}){
 const pending=new Map(),visible=new Set();let frame=null;
 function schedule(){
  if(frame!==null||![...pending].some(([id,v])=>visible.has(id)&&v.element.clientWidth>0&&v.element.clientHeight>0))return;
  frame=requestFrame(()=>{
   frame=null;
   const next=[...pending].find(([id,v])=>visible.has(id)&&v.element.clientWidth>0&&v.element.clientHeight>0);
   if(!next)return;
   const [id,value]=next;pending.delete(id);
   try{render(id,value.option,value.resetZoom);}catch(error){onError(id,error);}
   schedule();
  });
 }
 const observer=Observer?new Observer(entries=>{
  for(const e of entries){if(e.isIntersecting){visible.add(e.target.id);onVisible(e.target.id);}else visible.delete(e.target.id);}
  schedule();
 },{rootMargin:'200px 0px'}):null;
 const nodes=new Map(elements.map(e=>[e.id,e]));
 for(const e of elements){if(observer)observer.observe(e);else visible.add(e.id);}
 return {
  set(id,option,resetZoom=false){const element=nodes.get(id);if(!element)return;pending.set(id,{element,option,resetZoom:resetZoom||pending.get(id)?.resetZoom||false});schedule();},
  refresh:schedule,
  has:id=>pending.has(id)
 };
}
export function showChartError(element,label='行情暂不可用'){
 if(!element)return;
 element.setAttribute('aria-busy','false');element.replaceChildren();
 const box=element.ownerDocument.createElement('div');box.className='chart-loading-state';
 const text=element.ownerDocument.createElement('span');text.textContent=label;
 const retry=element.ownerDocument.createElement('button');retry.type='button';retry.textContent='重新加载';retry.onclick=()=>globalThis.location.reload();
 box.append(text,retry);element.append(box);
}
