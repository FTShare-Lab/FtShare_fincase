# FtShare 金融应用案例

基于 **FtShare 数据服务** 构建的市场观察工具，从成交异动、资金流向到波动变化。

| 产品 | 用它观察 | 入口 |
|---|---|---|
| **A股 ETF 资金观测台** | 成交异动雷达、20／60日双基准、分钟成交与宽基净申赎 | [在线体验](https://etf.jtxaionline.com/?utm_source=github&utm_medium=readme&utm_campaign=evergreen&utm_content=case_index#radar) · [源码与部署](cases/etf/) |
| **A股 VIX 波动与资金观察台** | 六类指数的恐慌指数、ETF价格与净申赎 | [在线体验](https://etf.jtxaionline.com/vix/?utm_source=github&utm_medium=readme&utm_campaign=evergreen&utm_content=case_index) · [产品介绍](cases/vix/) |

## 运行 ETF 看板

需要 Node.js 24+。

```sh
git clone https://github.com/FTShare-Lab/FtShare_fincase.git
cd FtShare_fincase/cases/etf
npm ci
npm run dev
```

打开 [http://127.0.0.1:8080](http://127.0.0.1:8080)。[获取 FtShare API Key](https://ftai.chat/me/profile)，按 [部署指南](cases/etf/docs/deployment.md) 接入行情和自动更新。

ETF 看板打开即显示完整图框，数据在图内加载；支持历史对照、日期筛选、手机浏览和深浅主题。[查看功能与数据图](cases/etf/README.md)

## 项目目录

- `cases/etf/`：ETF 看板源码、示例、截图和部署说明。
- `cases/vix/`：VIX 看板产品入口。

ETF 项目由仓库根目录迁至 `cases/etf/`。已有部署请将项目根目录改为 `cases/etf`，构建命令与输出目录不变。

## FtShare 数据服务

FtShare 为 AI Agent、量化研究和金融应用提供数据服务，支持 [Python SDK](https://github.com/FTShare-Lab/FTShare-python-sdk)、[MCP](https://github.com/FTShare-Lab/FTShare-MCP) 和 [Skill](https://github.com/FTShare-Lab/FTShare-skill)。

[了解 FtShare](https://ftai.chat/ftshare) · [贡献指南](CONTRIBUTING.md) · [安全反馈](SECURITY.md) · [MIT](LICENSE) · [第三方许可](cases/etf/THIRD_PARTY_NOTICES.md)
