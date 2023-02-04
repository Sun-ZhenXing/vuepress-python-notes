---
title: Python C/C++ 混合编程概述
description: Python C/C++ 混合编程概述
---

# Python C/C++ 混合编程概述

[[TOC]]

## 1. Python 与 C/C++ 混合编程

Python 与 C/C++ 代码进行互操作，在 C/C++ 程序可以通过引入 `<Python.h>` 来引用 Python 的一些功能，从而可以提供 Python 接口。Python 也可以直接或间接调用 C/C++ 库中的一些功能，但实现比较复杂。因此有一些第三方库用于实现这种互操作性。

## 2. 原生接口

Python 的标准库 `ctypes` 实现了与 C 的互操作性，但缺点是需要写很多接口描述代码。

## 3. 常见第三方生态

### 3.1 Boost.Python

Boost 模块支持导出为 Python 接口。

### 3.2 PyBind11

C++11 与 Python 绑定，减去了旧 C++ 支持，更轻量化，C++ 工程也只需要引入头文件即可，不需要修改内容。

### 3.3 CFFI

[CFFI](https://cffi-zh-cn.readthedocs.io/zh/latest/overview.html) 是 Python 调用 C 语言代码框架。目标是在不学习第三种编程语言的情况下从 Python 调用 C 语言代码。

### 3.4 SWIG

[SWIG](http://swig.org/) 是帮助将 C/C++ 编写的程序与其他高级语言嵌入联接的开发工具。例如 PHP、Python、Lua、C#、Java 等。

### 3.5 Weave

[Weave](http://www.scipy.org/Weave) 是完整的 SciPy 包的一部分，它允许 Python 嵌入 C/C++ 代码，Weave 这也有独立的包支持。

### 3.6 Pyrex

Pyrex 允许编写以任何想要的方式混合 Python 和 C 数据类型的代码，并将其编译为 Python 的 C 扩展。
