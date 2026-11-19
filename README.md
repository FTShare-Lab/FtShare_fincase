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

## 参与贡献

欢迎外部用户改进文档、修复问题、完善图表或贡献新的金融应用案例。**不需要加入组织，也不需要原仓库写权限**：

1. 登录 GitHub，在本仓库右上角点击 **Fork**，创建自己的副本。
2. 在自己的 Fork 中创建分支，修改后运行对应检查。
3. 点击 **Contribute → Open pull request**，向 `FTShare-Lab/FtShare_fincase` 的 `main` 提交 PR。
4. 说明改动目的、测试结果；界面改动附截图，等待维护者审核。

PR 是合并建议，提交后不会直接修改主分支或正式网站。修正文档也可以直接在自己的 Fork 网页中编辑，不必先配置数据服务。

[完整贡献流程与命令示例](CONTRIBUTING.md) · [ETF 开发要求](cases/etf/CONTRIBUTING.md) · [报告问题或提出建议](https://github.com/FTShare-Lab/FtShare_fincase/issues)

## FtShare 数据服务

FtShare 为 AI Agent、量化研究和金融应用提供数据服务，支持 [Python SDK](https://github.com/FTShare-Lab/FTShare-python-sdk)、[MCP](https://github.com/FTShare-Lab/FTShare-MCP) 和 [Skill](https://github.com/FTShare-Lab/FTShare-skill)。

[了解 FtShare](https://ftai.chat/ftshare) · [贡献指南](CONTRIBUTING.md) · [安全反馈](SECURITY.md) · [MIT](LICENSE) · [第三方许可](cases/etf/THIRD_PARTY_NOTICES.md)
