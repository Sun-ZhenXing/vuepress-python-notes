---
title: 第 8 章：PySide6 构建和发布
description: 第 8 章：PySide6 构建和发布
---

# 8. PySide6 构建和发布

[[TOC]]

## 8.1 使用 Pyinstaller 打包

## 8.2 使用 Nuitka 打包

### 8.2.1 Nuitka 简介

### 8.2.2 安装并配置 Nuitka

安装 Nuitka：

```bash
pip3 install nuitka
```

Nuitka 还有一些依赖包，在许多情况下都可能需要用到，这里一并安装：

```bash
pip3 install ordered-set zstandard
```

这里我们以官方的标准示例为例，演示如何使用 Nuitka 进行打包：[^1]

[^1]: Qt for Python & Nuitka，Qt，<https://doc.qt.io/qtforpython/deployment-nuitka.html>

@[code python](./src/hello.py)

我们先运行测试命令：

```bash

```

### 8.2.3 使用 MinGW 作为编译器打包

首先，我们先看看 `nuitka` 命令都包含一些什么功能：

```bash
nuitka --help
```

打印了非常多的内容，但我们能得到很多有用信息，这是第一手的资料，当需要查询命令的时候我们应该在这里查看，这有时候比搜索引擎更有用。

为了使用 MinGW 作为编译器，我们通常指定 `--mingw64` 来确保使用的是 MinGW 而不是其他。

这里还有一些关键参数，Nuitka 适配了许多 GUI 库，这也包括 PySide6，这被包含在插件中，使用 `--plugin-enable=pyside6` 来启用它。

还有一些常用的参数：

- `--standalone`：表示打包一个不依赖于系统 Python 环境的应用
- `--onefile`：表示打包为一个文件，这与 `--standalone` 同时使用
- `--disable-console`：不生成控制台
- `--output-dir=...`：生成可执行文件到指定文件夹
- `--show-progress`：显示编译的进度
- `--show-memory`：显示内存的占用

不需要安装 MinGW，Nuitka 已经集成了管理 MinGW 的功能。

下面我们就开始测试：

```bash
nuitka --onefile --standalone --disable-console --mingw64 --plugin-enable=pyside6 hello.py
```

第一次使用时，会询问你是否下载 MinGW 依赖，输入 `Yes` 确认。下载过程可能会出错，只需要手动下载然后将压缩包放置到 Nuitka 指定的文件夹即可。

::: info 下载失败

如果下载失败，请将链接复制到浏览器中（最好使用代理），然后下载。常规情况下是放到 `C:\Users\<用户名>\AppData\Local\Nuitka\Nuitka\Cache\downloads\gcc\x86_64\` 下的文件夹内，请参考错误提示。

:::

接下来等待打包完成进行测试。

### 8.2.4 使用 MSVC 作为编译器打包

```console
(pyside-venv) D:\workspace\repo\pyside-book>nuitka --standalone --disable-console --msvc=14.3 --plugin-enable=pyside6 hello.py
Nuitka-Options:INFO: Used command line options: --standalone --disable-console --msvc=14.3 --plugin-enable=pyside6 hello.py
Nuitka:INFO: Starting Python compilation with Nuitka '1.4.3' on Python '3.10' commercial grade 'not installed'.
Nuitka-Plugins:INFO: pyside6: Injecting pre-module load code for module 'PySide6':
Nuitka-Plugins:INFO: pyside6:     Adding binary folder to runtime 'PATH' environment variable for proper Qt loading.
Nuitka-Plugins:INFO: pyside6: Injecting post-module load code for module 'PySide6.QtCore':
Nuitka-Plugins:INFO: pyside6:     Setting Qt library path to distribution folder. We need to avoid loading target
Nuitka-Plugins:INFO: pyside6:     system Qt plugins, which may be from another Qt version.
Nuitka:INFO: Completed Python level compilation and optimization.
Nuitka:INFO: Generating source code for C backend compiler.
Nuitka:INFO: Running data composer tool for optimal constant value handling.
Nuitka:INFO: Running C compilation via Scons.
Nuitka-Scons:INFO: Backend C compiler: cl (cl 14.3).
Nuitka-Scons:INFO: Backend linking program with 10 files (no progress information available).
Nuitka-Scons:INFO: Compiled 10 C files using clcache with 0 cache hits and 10 cache misses.
Nuitka-Plugins:INFO: pyside6: Including Qt plugins 'iconengines,imageformats,platforms,styles,tls' below 'PySide6\qt-plugins'.
Detecting used DLLs: 0.0%|                         | 0/37, hello.exeNuitka will make use of Dependency Walker (https://dependencywalker.com) tool
to analyze the dependencies of Python extension modules.

Is it OK to download and put it in 'C:\Users\yalis\AppData\Local\Nuitka\Nuitka\Cache\downloads\depends\x86_64'.

No installer needed, cached, one time question.

Proceed and download? [Yes]/No
Yes
Nuitka:INFO: Downloading 'https://dependencywalker.com/depends22_x64.zip'.
Nuitka:INFO: Extracting to 'C:\Users\yalis\AppData\Local\Nuitka\Nuitka\Cache\downloads\depends\x86_64\depends.exe'
Nuitka:INFO: Keeping build directory 'hello.build'.
Nuitka:INFO: Successfully created 'hello.dist\hello.exe'.

(pyside-venv) D:\workspace\repo\pyside-book>.\hello.dist\hello.exe
```
