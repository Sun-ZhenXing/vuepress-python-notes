---
title: 第 8 章：PySide6 构建和发布
description: 第 8 章：PySide6 构建和发布
---

# 8. PySide6 构建和发布

[[TOC]]

## 8.1 使用 PyInstaller 打包

### 8.1.1 PyInstaller 的基本使用

PyInstaller 是最成熟稳定的打包工具了，且有良好的跨平台性能。PyInstaller 打包尽可能保留解释器的相关功能，因此相当于将解释器包装起来，这样的结果是 PyInstaller 不能增加程序（Python 解释器）的性能，反而会降低性能。

安装 PyInstaller：

```bash
pip install pyinstaller
```

PyInstaller 的使用非常简单，只需要指定被打包脚本即可，例如下面的 `hello.py`（此代码来源为[^1]）：

[^1]: Qt for Python & Nuitka，Qt，<https://doc.qt.io/qtforpython/deployment-nuitka.html>

@[code python](./src/hello.py)

准备一个图标 `hello.ico` 文件：

```bash
pyinstaller -i hello.ico -w hello.py
```

常见参数：

- `-i ...`：指定一个图标
- `-w`：不包含控制台
- `-F`：打包为单个可执行文件
- `--clean`：每次打包时清除上一次缓存

### 8.1.2 使用 UPX 压缩程序

UPX 可以压缩可执行文件的大小。UPX 在主流系统都可以使用，请 [下载 UPX](https://github.com/upx/upx/releases/latest)，然后解压到路径上。

可以通过指定 `--upx-dir ...` 来指定 UPX 路径，默认在路径上查找。

## 8.2 使用 Nuitka 打包

### 8.2.1 Nuitka 简介

Nuitka 是一个 Python 编写的 Python 解释器，支持 CPython 代码，可编译 Python 代码到 C++ 程序，并使用 `libpython` 来执行这些代码，就像 CPython 一样。[^2]

[^2]: Nuitka，GitHub，<https://github.com/Nuitka/Nuitka>

Nuitka 尽可能对代码翻译为 C 代码进行优化，同时不损失代码的兼容性。因此 Nuitka 打包保密性更好，难以被破解。虽然 PyInstaller 支持使用 `--key` 选项进行加密，但是我们很容易逆向得到密码从而解密出数据。

Nuitka 是双协议发布的，开源部分受到社区和官方支持。而更好的服务则是 Nuitka 开发商的付费项目，包括敏感字符串加密、更多编译器支持等。对于本文而言，开源部分已经足够。

Nuitka 对于 32 位程序和更老的系统（例如 Windows 7 以下）支持不好，Nuitka 使用最新的套件，例如 Nuitka 的开源版本对于 MSVC 的支持仅限于最新版本，如果您的项目需要打包 32 位程序或有更严格的兼容性需求，请使用 PyInstaller，或者考虑使用 Nuitka 的付费服务获得支持。

### 8.2.2 安装并配置 Nuitka

安装 Nuitka：

```bash
pip3 install nuitka
```

Nuitka 还有一些依赖包，在许多情况下都可能需要用到，这里一并安装：

```bash
pip3 install ordered-set zstandard
```

这里我们引用官方示例，演示如何使用 Nuitka 进行打包：[^1]

我们先运行测试命令：

```bash
nuitka hello.py
```

### 8.2.3 使用 MinGW 作为编译器打包

Nuitka 要求安装 C/C++ 编译器，这一节我们使用 MinGW 作为编译器，不需要安装 MinGW，Nuitka 会自动管理。

首先，我们先看看 `nuitka` 命令都包含一些什么功能：

```bash
nuitka --help
```

打印了非常多的内容，但我们能得到很多有用信息，这是第一手的资料，当需要查询命令的时候我们应该在这里查看，这有时候比搜索引擎更有用。

为了使用 MinGW 作为编译器，我们通常指定 `--mingw64` 来确保使用的是 MinGW 而不是其他。

这里还有一些关键参数，Nuitka 适配了许多第三方库，这也包括 PySide6，这被包含在插件中，使用 `--plugin-enable=pyside6` 来启用它。

::: details 第三方适配库

如果需要查询有哪些已经适配的第三方库，可以通过下面的命令查询：

```bash
nuitka --plugin-list
```

当前版本（1.4.3）的结果为：

| 插件               | 说明                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `anti-bloat`       | Patch stupid imports out of widely used library modules source codes.                        |
| `data-files`       |                                                                                              |
| `delvewheel`       | Required for support of delvewheel using packages in standalone mode                         |
| `dill-compat`      |                                                                                              |
| `dll-files`        |                                                                                              |
| `enum-compat`      |                                                                                              |
| `eventlet`         | Support for including 'eventlet' dependencies and its need for 'dns' package monkey patching |
| `gevent`           | Required by the gevent package                                                               |
| `gi`               | Support for GI typelib dependency                                                            |
| `glfw`             | Required for OpenGL and glfw in standalone mode                                              |
| `implicit-imports` |                                                                                              |
| `kivy`             | Required by kivy package                                                                     |
| `matplotlib`       | Required for matplotlib module                                                               |
| `multiprocessing`  | Required by Python's multiprocessing module                                                  |
| `no-qt`            | Disable all Qt bindings for standalone mode.                                                 |
| `numpy`            | Deprecated, was once required by the numpy package                                           |
| `options-nanny`    |                                                                                              |
| `pbr-compat`       |                                                                                              |
| `pkg-resources`    | Workarounds for 'pkg_resources'.                                                             |
| `pmw-freezer`      | Required by the Pmw package                                                                  |
| `pylint-warnings`  | Support PyLint / PyDev linting source markers                                                |
| `pyqt5`            | Required by the PyQt5 package.                                                               |
| `pyqt6`            | Required by the PyQt6 package for standalone mode.                                           |
| `pyside2`          | Required by the PySide2 package.                                                             |
| `pyside6`          | Required by the PySide6 package for standalone mode.                                         |
| `pywebview`        | Required by the webview package (pywebview on PyPI)                                          |
| `tensorflow`       | Deprecated, was once required by the tensorflow package                                      |
| `tk-inter`         | Required by Python's Tk modules                                                              |
| `torch`            | Deprecated, was once required by the torch package                                           |
| `trio`             | Required for Trio package                                                                    |
| `upx`              | Compress created binaries with UPX automatically                                             |

如果你有打包这些库的需求，那么使用 Nuitka 最合适不过了。关于支持插件的详细信息，请访问 [官方插件文档](https://github.com/Nuitka/Nuitka/blob/develop/Standard-Plugins-Documentation.rst)。

:::

还有一些常用的参数：

- `--standalone`：表示打包一个不依赖于系统 Python 环境的应用
- `--onefile`：表示打包为一个文件，这与 `--standalone` 同时使用
- `--disable-console`：不生成控制台
- `--output-dir=...`：生成可执行文件到指定文件夹
- `--follow-imports`：递归地编译整个程序
- `--include-plugin-directory`：包含一个完整的目录以适应动态导入
- `--module`：将目标编译为模块（链接库）
- `--show-progress`：显示编译的进度
- `--show-memory`：显示内存的占用

下面我们就开始测试：

```bash
nuitka --onefile --standalone --disable-console --mingw64 --plugin-enable=pyside6 hello.py
```

第一次使用时，会询问你是否下载 MinGW 依赖，输入 `Yes` 确认。下载过程可能会出错，只需要手动下载然后将压缩包放置到 Nuitka 指定的文件夹即可。

::: info 下载失败

如果下载失败，请将链接复制到浏览器中（最好使用代理），然后下载。常规情况下是放到 `C:\Users\<用户名>\AppData\Local\Nuitka\Nuitka\Cache\downloads\gcc\x86_64\` 下的文件夹内，请参考错误提示。

:::

接下来等待打包完成进行测试。

::: tip 指定图标

不同的操作系统打包图标的方式不同：

- `--windows-icon-from-ico=...`：指定一个 Windows 应用图标
- `--macos-app-icon=...`：指定一个 Mac OS 应用图标
- `--linux-icon=...`：指定一个 Linux 应用图标

:::

### 8.2.4 使用 MSVC 作为编译器打包

::: info 选择 MSVC 还是 MinGW

从官方的单元测试结果来看，对于 64 位的 Python，MinGW 编译出的程序速度要比 MSVC 快大约 20%。而且 Nuitka 能自动管理独立的 MinGW 环境，建议使用 MinGW。

:::

请安装最新版本的 Visual Studio，并选择 C/C++ 支持进行安装，还需要至少安装一个和编译器适配的 Windows SDK。

使用 MSVC 的步骤和 MinGW 一致，只不过需要将 `--mingw64` 参数替换为 `--msvc=...`，根据你所安装的 MSVC 版本作为参数，当前最新为 14.3 版本，示例命令如下：

```bash
nuitka --standalone --disable-console --msvc=14.3 --plugin-enable=pyside6 hello.py
```

输出如下：

```log
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

### 8.2.5 使用 UPX 压缩

使用选项 `plugin-enable=pyside6,upx` 开启 UPX，记得还需要参数 `--upx-binary={upx_path}` 来访问 UPX 的目录。

## 8.3 嵌入式包打包

### 8.3.1 Python 嵌入包

有时候，我们只需要源码发布，而不需要将它们压缩为一个目录或文件。这种方式适合将 Python 程序和其解释器嵌入到其他程序，有许多程序都嵌入了 Python 作为脚本解释器。

我们在 Python 官网下载软件包时，有一个选项 **Windows embeddable package** 很容易被我们忽略，这便是 Python 的一个最小发行版，其大小只有几 MB，很容易被嵌入到其他软件中。

一般我们通过编写脚本，可以自动将我们的环境组装起来，无需进行环境调试，将目录复制过去即可运行，这就像虚拟环境一样。如果您需要，可以包装为安装程序。

### 8.3.2 嵌入包的用法

解压嵌入包至任意文件夹。

如 `python310.zip` 包含了 Python 各种标准库，而除了可执行程序、安全目录和法律文件外，其他文件都是内置可直接导入的标准库。

在此执行 `python` 和普通的 `python` 不同，很多内置函数无法使用，内置函数被放在了 `site` 库中，普通版本会自动导入此模块，如果需要自动导入，取消 `python310._pth` 文件内最后一行的注释。

现在，这和常规的 Python 一样了！如果有一些依赖是明确不需要的可以删除，你甚至可以在此用 [get-pip](https://bootstrap.pypa.io/get-pip.py) 安装 Pip 来安装别的库。

`python310._pth` 文件指定了 Python 可读取包的路径，如果需要打包，你可以将第三方模块直接复制过来。
