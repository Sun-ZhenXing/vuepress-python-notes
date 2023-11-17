# Poetry

[[TOC]]

## 1. Poetry 简介

Poetry 是一款用于 Python 依赖性管理和打包的工具。它允许你声明项目依赖的库，并为你管理（安装/更新）它们。Poetry 提供一个锁文件，以确保可重复安装，并可构建项目以供发布。

Poetry 需要 Python 3.8 以上版本。它是多平台的，目标是让它在 Linux、MacOS 和 Windows 上同样运行良好。

推荐使用 `pipx` 安装：

```bash
pipx install poetry
```

如果你没有安装 `pipx`，可以使用 `pip` 安装 `pipx`：

```bash
pip install pipx
```

对于 Linux 或 MacOS 系统，可以使用官方命令安装：

```bash
curl -sSL https://install.python-poetry.org | python -
```

对于 Windows 则可以使用 PowerShell 安装：

```powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

这种方法需要手动添加路径：

- MacOS：`~/Library/Application Support/pypoetry`
- Linux/Unix：`~/.local/share/pypoetry`
- Windows：`%APPDATA%\pypoetry`

## 2. Poetry 基本使用

查看命令的使用方式：

```bash
poetry list
```

创建项目：

```bash
poetry new poetry-demo
```

这将生成如下目录：

```console
poetry-demo
├── pyproject.toml
├── README.md
├── poetry_demo
│   └── __init__.py
└── tests
    └── __init__.py
```

初始化项目：

```bash
cd pre-existing-project
poetry init
```

这总是可以配合虚拟环境使用。

Poetry 还可以配合 [`pre-commit`](https://pre-commit.com/) 使用，可以在项目中添加 `.pre-commit-config.yaml` 文件，然后运行 `pre-commit install` 安装钩子。

```yml
repos:
-   repo: https://github.com/python-poetry/poetry
    rev: ''  # add version here
    hooks:
    -   id: poetry-check
        args: ["-C", "./subdirectory"]
    -   id: poetry-lock
        args: ["-C", "./subdirectory"]
    -   id: poetry-export
        args: ["-C", "./subdirectory", "-f", "requirements.txt", "-o", "./subdirectory/requirements.txt"]
    -   id: poetry-install
        args: ["-C", "./subdirectory"]
```
