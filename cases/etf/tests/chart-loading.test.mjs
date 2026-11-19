import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createChartQueue} from '../src/assets/chart-loading.js';
function fixture(render){
 const frames=[],elements=['chart','chartBroad','chartCum'].map(id=>({id,clientWidth:800,clientHeight:400}));let change;
 class Observer{constructor(callback){change=callback;}observe(){}}
 const errors=[],queue=createChartQueue({elements,render,onError:(id)=>errors.push(id),Observer,requestFrame:fn=>{frames.push(fn);return frames.length;}});
 return {queue,elements,errors,visible:(...ids)=>change(elements.map(target=>({target,isIntersecting:ids.includes(target.id)}))),step:()=>frames.shift()?.(),frames};
}
test('offscreen charts wait; visible charts render once per frame with newest data',()=>{
 const drawn=[],f=fixture((id,option)=>drawn.push([id,option.value]));
 f.queue.set('chart',{value:1});f.queue.set('chart',{value:2});f.queue.set('chartBroad',{value:3});assert.equal(f.frames.length,0);
 f.visible('chart','chartBroad');assert.equal(f.frames.length,1);f.step();assert.deepEqual(drawn,[['chart',2]]);f.step();assert.deepEqual(drawn,[['chart',2],['chartBroad',3]]);
});
test('range reset survives a newer pending refresh and a failed chart does not block others',()=>{
 const drawn=[],f=fixture((id,option,reset)=>{drawn.push([id,reset]);if(id==='chart')throw Error('unavailable');});
 f.queue.set('chart',{});f.queue.set('chartBroad',{},true);f.queue.set('chartBroad',{},false);f.visible('chart','chartBroad');f.step();f.step();
 assert.deepEqual(drawn,[['chart',false],['chartBroad',true]]);assert.deepEqual(f.errors,['chart']);
});
test('collapsed charts wait until their section has dimensions',()=>{
 const drawn=[],f=fixture(id=>drawn.push(id));f.elements[0].clientHeight=0;f.queue.set('chart',{});f.visible('chart');assert.equal(f.frames.length,0);
 f.elements[0].clientHeight=400;f.queue.refresh();f.step();assert.deepEqual(drawn,['chart']);
});
test('nine titled chart frames and loading states exist before data or JavaScript',async()=>{
 const html=await readFile(new URL('../src/index.html',import.meta.url),'utf8');
 assert.equal((html.match(/class="chart-placeholder"/g)||[]).length,9);assert.equal((html.match(/class="chart-loading-state"/g)||[]).length,9);
 for(const id of ['chart','chartCum','chartTypCase','chartTypNorm','chartAmt','chartNf','chartDAmt','chartDNf','chartBroad'])assert(new RegExp('id="'+id+'"[^>]*aria-busy="true"').test(html));
 assert(html.includes('href="/api/board" as="fetch"')&&html.includes('href="/api/live" as="fetch"'));
});
