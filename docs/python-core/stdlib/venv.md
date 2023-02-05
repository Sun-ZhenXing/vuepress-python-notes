---
title: venv 创建虚拟环境
description: venv 创建虚拟环境
---

# venv 创建虚拟环境

[[TOC]]

## 1. 虚拟环境介绍

::: info 更新概览

- Python 3.3 新版功能。
- 在 3.5 版更改：现在推荐使用 `venv` 来创建虚拟环境。

:::

许多应用可能需要独立的 Python 运行环境，以保证环境中的依赖没有互相冲突。`venv` 就是用来为一个应用创建一套独立的 Python 运行环境。

虚拟环境不能创建其他版本的 Python 环境，如果需要创建并管理多个版本，请选择 [virtualenv](https://pypi.org/project/virtualenv/) 或者 [Anaconda](https://www.anaconda.com/) 等功能更全面的 Python 环境管理器。

`venv` 是简单、强大包虚拟环境，虚拟环境的全部即是一个目录，其中包含 Python 二进制文件（或其符号链接），所安装的第三方包也会安装到此目录下。如果需要删除此环境只需要删除此文件夹即可。

## 2. 命令行工具

在 Windows 上，使用下面的命令创建一个虚拟环境：

```bash
python -m venv .
```

然后激活它：

```bash
.\Scripts\activate.bat
```

这样我们就进入了虚拟环境。

这里的 `pip` 等工具都是和主机隔离的，新模块也不会安装到主机其他位置。

退出环境：

```bash
.\Scripts\deactivate.bat
```

事实上，各种系统基本都支持虚拟环境（除了 Emscripten 和 WASI 平台目前不支持），使用方法如下。

创建虚拟环境：

::: code-tabs#sys

@tab Linux/Mac

```bash
python3 -m venv /path/to/myenv
```

@tab Windows

```bash
python -m venv C:\path\to\myenv
```

:::

激活环境：

::: code-tabs#shell

@tab sh/bash/zsh(POSIX)

```bash
source ./bin/activate
```

@tab cmd(Windows)

```bash
.\Scripts\activate.bat
```

@tab PowerShell(Windows)

```bash
.\Scripts\Activate.ps1
```

@tab PowerShell(POSIX)

```bash
/bin/Activate.ps1
```

@tab fish

```bash
source ./bin/activate.fish
```

@tab csh/tcsh

```bash
source ./bin/activate.csh
```

:::
