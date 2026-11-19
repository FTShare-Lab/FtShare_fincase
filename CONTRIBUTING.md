# 参与贡献

欢迎通过 Issue 和 Pull Request（PR，合并请求）改进 FtShare 金融应用案例。文档修正、问题复现、图表与交互优化、计算测试和新案例都可以参与。

**外部用户无需加入 FTShare-Lab 组织，也无需原仓库写权限。** 将仓库 Fork 到自己的账号，在自己的分支提交修改，再向原仓库的 `main` 发起 PR 即可。维护者审核后决定是否合并；提交 PR 不会直接改动主分支或正式网站。[GitHub 官方贡献流程](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)

## 可以修改哪些内容

| 内容 | 位置与要求 |
|---|---|
| 仓库介绍与贡献流程 | 根目录 `README.md`、`CONTRIBUTING.md` |
| ETF 看板代码、文档与测试 | `cases/etf/`；同时阅读 [ETF 案例贡献指南](cases/etf/CONTRIBUTING.md) |
| VIX 产品介绍 | 当前仅公开 `cases/vix/README.md` 产品入口，未包含 VIX 实现源码 |
| 新增金融应用案例 | 新建 `cases/<case-name>/`，附独立 README、运行方法和数据要求，并更新仓库首页及检查流程 |

一次 PR 尽量围绕一个问题。涉及较大功能或计算口径调整时，建议先开 Issue 说明方案，便于讨论范围。

## 方式一 在网页修改文档

适合修正文字、链接和简短说明，无需配置本地开发环境：

1. 打开 [原仓库](https://github.com/FTShare-Lab/FtShare_fincase)，点击右上角 **Fork**，在自己的账号下创建副本；保留默认仓库名即可。
2. 在自己的 Fork 切换到 `main`，通过分支菜单创建一个分支，例如 `docs/improve-readme`。
3. 打开要修改的文档，点击编辑按钮，完成修改并预览格式。
4. 点击 **Commit changes**，将改动保存到刚创建的分支。
5. 回到自己的 Fork，选择该分支，点击 **Contribute → Open pull request**。也可在原仓库的 **Pull requests → New pull request → compare across forks** 中选择自己的分支。
6. 核对目标为 `FTShare-Lab/FtShare_fincase` 的 `main`，来源为自己的 Fork 和修改分支，填写说明并点击 **Create pull request**。

已经有 Fork 的用户，可先在 GitHub 使用 **Sync fork** 同步上游更新，再开始新的修改。界面入口如果不同，也可按下方本地流程提交。

## 方式二 在本地修改代码或文档

### 1 Fork 并克隆自己的副本

先在 GitHub 点击 **Fork**。下列命令中的 `YOUR_GITHUB_USERNAME` 替换为自己的 GitHub 用户名；如果 Fork 时修改了仓库名，也要相应调整地址与目录。

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/FtShare_fincase.git
cd FtShare_fincase
git remote add upstream https://github.com/FTShare-Lab/FtShare_fincase.git
git fetch upstream
git switch -c docs/improve-readme upstream/main
```

这里 `origin` 指向自己的 Fork，用于推送；`upstream` 指向原仓库，用于同步。已有本地副本时，用 `git remote -v` 检查设置，不必重复添加 `upstream`。新任务使用新的分支名，例如 `fix/etf-tooltip`。

### 2 修改并运行对应检查

从仓库根目录检查改动及公开源码范围：

```sh
git diff --check
node scripts/check-release.mjs
```

仅修改文档时，另外预览 Markdown，检查相对链接与命令路径。ETF 代码、配置或计算有改动时，需要 Node.js 24+，在案例目录运行：

```sh
cd cases/etf
npm ci
npm test
npm run build:pages
npm run validate
npm run check:release
cd ../..
```

ETF 涉及部署配置时，再在 `cases/etf/` 执行 `npm run deploy:check`，只做 dry-run，不发布。CI 会执行完整检查；纯文档改动也会进入 CI。

默认演示、测试和公开 CI 不需要真实 FtShare Key 或云平台凭据。只有自愿接入真实数据时才配置自己的授权账号，要求见 [ETF 部署文档](cases/etf/docs/deployment.md)。不要为通过 PR 检查提交真实 Key。

### 3 提交并推送到自己的 Fork

以下以修改两个根目录文档为例；提交代码时，把 `git add` 的路径替换为本次实际修改的文件：

```sh
git status --short
git diff
git add README.md CONTRIBUTING.md
git commit -m "docs: clarify external contribution steps"
git push -u origin docs/improve-readme
```

不要向 `upstream` 推送，也不要把 `.env`、缓存或构建产物一起提交。如果推送提示权限不足，先检查 `origin` 是否指向自己的 Fork，并确认 GitHub 登录状态。

### 4 向原仓库创建 PR

打开自己的 Fork，选择修改分支，点击 **Contribute → Open pull request**；或使用推送后 GitHub 提供的创建 PR 链接。

核对方向：

| 选项 | 选择 |
|---|---|
| Base repository，目标仓库 | `FTShare-Lab/FtShare_fincase` |
| Base branch，目标分支 | `main` |
| Head repository，来源仓库 | 自己的 Fork |
| Compare branch，来源分支 | 本次修改的分支，例如 `docs/improve-readme` |

还没完成、但希望先讨论时，可以创建 **Draft pull request**；准备好后再标记为可审核。

## PR 里写清楚什么

标题直接说明结果，例如“修复 ETF 图例在窄屏下重叠”或“补充外部用户贡献步骤”。正文可以复制下面的结构：

```markdown
## 解决的问题
说明问题、复现方法或改进目的；有相关 Issue 时附链接。

## 本次修改
说明改了哪些位置，以及用户会看到什么变化。

## 验证结果
列出实际运行的检查与结果。没有执行的项目写明原因，不要直接标记通过。
纯文档改动说明预览、链接与命令路径检查情况。

## 截图或数据示例
界面改动提供前后截图；计算改动提供可复现的合成样例与预期结果。
不含 Key、账号信息或私有真实数据。
```

图表改动检查深浅主题、窄屏、单位、坐标轴和缺失状态。计算改动补充能区分正确与错误口径的测试，具体要求见 [ETF 案例贡献指南](cases/etf/CONTRIBUTING.md)。品牌文案统一使用 **FtShare**，实际仓库名和接口标识保留原写法。

## 提交后怎样继续

- 查看 PR 的检查结果和审核意见；外部贡献的 CI 如果等待维护者批准，由维护者处理，无需提供生产凭据。
- 按意见修改后，继续提交并推送到**同一个来源分支**，原 PR 会自动更新，不必重复新建。
- 上游有新修改时，先保存并提交自己的工作，再在当前贡献分支执行 `git fetch upstream` 和 `git merge upstream/main`；处理冲突、重新检查后推送到自己的 Fork。
- 合并后可删除已合并分支，下一次从最新上游 `main` 创建新分支。

## 数据与安全边界

提交通用代码、模拟样例和配置模板，不提交真实 API Key、Token、私钥、个人账号信息、私有行情快照或运行归档。案例的代码许可不自动包含数据服务和真实市场数据的再分发授权。

普通问题可通过 [Issues](https://github.com/FTShare-Lab/FtShare_fincase/issues) 反馈；涉及凭据或安全问题，按 [安全说明](SECURITY.md) 处理，不在公开 Issue 或 PR 中粘贴敏感内容。
