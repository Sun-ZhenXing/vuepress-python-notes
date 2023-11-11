# Python 工程下使用 Git 钩子

[[TOC]]

## 1. 安装 pre-commit 钩子

[pre-commit](https://pre-commit.com/) 是一个 Python 编写的工具，可以在各种项目中管理和维护多个 Git 钩子（除了 Python 项目，各种项目都可以使用）。

下面安装 `pre-commit`：

```bash
pip install pre-commit
```

或者使用 `pipx` 安装，这也是推荐的安装方式：

```bash
pipx install pre-commit
```

可以使用 Homebrew 安装：

```bash
brew install pre-commit
```

## 2. 快速开始

`pre-commit` 的使用非常简单，只需要在项目根目录下创建一个 `.pre-commit-config.yaml` 文件，然后在其中指定需要运行的钩子即可。

你可以使用 `pre-commit sample-config` 生成一个基本配置。

下面示例使用 `black` 格式化项目代码：

```yaml
repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v2.3.0
    hooks:
    -   id: check-yaml
    -   id: end-of-file-fixer
    -   id: trailing-whitespace
-   repo: https://github.com/psf/black
    rev: 22.10.0
    hooks:
    -   id: black
```

通过 [官方文档：hooks](https://pre-commit.com/hooks.html) 查看所有可用的钩子。

下面安装钩子：

```bash
pre-commit install
```

在进行任何更改时，都可以运行钩子：

```bash
pre-commit run --all-files
```

> 还有一些代码格式化工具，如 [`ruff`](https://github.com/astral-sh/ruff) 也提供了 `pre-commit` 钩子 [`ruff-pre-commit`](https://github.com/astral-sh/ruff-pre-commit)。
