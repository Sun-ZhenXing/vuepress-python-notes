---
title: 第 1 章：PySide6 简介
description: 第 1 章：PySide6 简介
---

# 1. PySide6 简介

[[TOC]]

## 1.1 PySide6 是什么

::: info 知识准备

如果你阅读此教程，我们认为你对 GUI 概念和 Python 编程有初步的认识。

:::

Python 最初是作为脚本语言开发的，核心功能中并没有包含 GUI 的支持。但 Python 借助其出色的 C 扩展性能够引入各种 C/C++ 库来增强功能。Python 现在的标准发行版已经引入了基本的 GUI 支持库 Tkinter，稍后我们讨论为什么选择 PySide6。

PySide 是跨平台的 GUI 框架 Qt 的 Python 版本。作为 Qt for Python 项目的一部分。和 Qt 一样，PySide 也是自由软件。PySide 支持 Linux/X11、Mac OS 和 Microsoft Windows。[^1]

[^1]: PySide，维基百科，<https://en.wikipedia.org/wiki/PySide>

PySide6 是 Qt6 的 Python 版本，继承了 Qt6 所有的功能，而且相比以前的版本性能有所提升。PySide6 比 PySide2 更加稳定，且是 Qt 官方快速开发的活跃项目。

【Q】Python 下有哪些流行的 GUI 库？

【A】有 Python 绑定的 Tkinter、wxPython、PyGTK、PyQt 等。Tkinter 功能简单，开发繁琐，难以开发大型的、现代的应用。wxPython 和 PyGTK 等框架社区发展均不如 Qt，且大多跨平台能力不足，难以兼容各种操作系统。稍后我们将讨论 PyQt，这也是为我们熟知的流行 GUI 库。

【Q】PySide 一共有哪些版本？

【A】截至本文发布，主要有三个版本，分别是 PySide、PySide2 和 PySide6，如下表所示。

| PySide 版本 | 对应 Qt 版本 |
| ----------- | ------------ |
| PySide      | Qt 4         |
| PySide2     | Qt 5         |
| PySide6     | Qt 6         |

【Q】PySide 的历史？

【A】2009 年，当时 Qt 的所有者诺基亚希望在 LGPL 许可下提供 Python 版本。诺基亚未能与 PyQt 的开发商 Riverbank Computing 达成协议。8 月，诺基亚发布了 PySide。它提供了类似的功能，但在 LGPL 许可下开源。Side 是芬兰语绑定的意思。

PySide2 由 Christian Tismer 启动，在 2015 年将 PySide 从 Qt 4 移植到 Qt 5。它于 2018 年 12 月发布。

PySide6 是在 2020 年 12 月发布的。它增加了对 Qt 6 的支持，并删除了对所有 3.6 以下的 Python 版本的支持。PySide6 现在使用自己的绑定生成器 Shiboken，减少二进制文件的大小和内存占用。

【Q】既然 PyQt 这么流行，甚至有各种不同版本 Qt 的良好支持（包括 PyQt4、PyQt5 和 PyQt6），为什么使用 PySide6？

【A】正如上面所示，PyQt 不是一个商业友好的软件，PyQt 使用 GPL 许可分发，这使得 PyQt 开发的程序必须全部开源。PySide6 是 Qt 官方开发，其产品有保证且允许使用 LGPL 许可分发。

## 1.2 PySide6 安装

::: info 确保你的 Python 版本满足 PySide6

前面的条件指出，PySide6 要求 Python 版本不能低于 3.6，如果你正在使用更低的版本或 Python 2.7 及以下来构建应用，那么本教程将不适合你。

本系列使用 Python 3.10 来演示，事实上，在主流系统中 PySide6 已经支持 Python 3.10 甚至 3.11，这意味你可以使用更新的特性。所以这里建议使用 Python 3.9 以上的版本。

:::

首先需要计算机内安装有 Python，安装后推荐使用 `venv` 等工具来 [创建虚拟环境](../../../python-core/stdlib/venv.md)，在新环境内开发 PySide6。

安装：

```bash
pip install pyside6
```

如果以前已经安装过，需要完全卸载再重新安装：

```bash
pip uninstall pyside6 pyside6-addons pyside6-essentials shiboken6
pip cache purge
pip install pyside6
```

查看已安装的版本：

```bash
import PySide6.QtCore
print(PySide6.__version__)
print(PySide6.QtCore.__version__)
```

输出：

```log
6.4.2
6.4.2
```

## 1.3 Hello PySide6

使用你喜欢的 IDE 或者直接创建一个文件夹作为工作区。将下面的代码保存为 [`main.py`](https://github.com/Sun-ZhenXing/vuepress-python-notes/tree/main/docs/pypi-package/pyside6/chapter01/src/main.py)：

@[code python](./src/main.py)

然后运行它，需要确保你使用的是 Python3 的正确版本：

```bash
python main.py
```

如果你看到窗口说明安装成功。

`PySide6.QtWidgets` 模块中包含了各种窗口组件，这是我们最常用的模块之一，文本标签、按钮、多选框、布局、窗口等你能想到的布局，基本都能在这个模块中找到。

在进行任何和用户界面有关的操作之前，必须先创建 `QApplication` 应用，程序中的一切都必须发生在此应用中。`QApplication` 接收一个字符串数组作为参数，Python 中程序传入的参数为 `sys.argv`，所以可以直接传入。

`window = QWidget()` 将创建一个简单窗体，下面使用 `window.show()` 方法将其显示出来。

到目前为止，界面还没有显示出来，我们需要执行这个应用，然后将此应用的返回值作为整个程序的返回值（这个步骤其实是惯例）。
