# 参与贡献

ETF 看板的开发、测试和提交说明见 [案例贡献指南](cases/etf/CONTRIBUTING.md)。新增案例放入 `cases/`，并更新仓库首页与检查流程。

提交前运行 `node scripts/check-release.mjs`，然后在 `cases/etf` 运行 `npm test`、`npm run build:pages` 和 `npm run validate`。
