---
title: 第 2 章：PySide6 快速入门
description: 第 2 章：PySide6 快速入门
---

# 2. PySide6 快速入门

[[TOC]]

## 2.1 了解各种模块

下面了解 PySide6 各种模块的功能[^1]，这些功能通常在各种不同的 Qt 发行版（如 PySide6 或 PyQt 中）通用。

[^1]: 李增刚、沈丽，*Qt for Python PySide6 GUI 界面开发详解与实例*，清华大学出版社（2022.10）

- `QtWidgets` 是窗口模块，提供窗口类和窗口上的各种控件（按钮、菜单、输入框、列表框等）类。
- `QtCore` 是核心模块，是其他模块的应用基础，包括五大模块：元对象系统、属性系统、对象模型、对象树、信号与槽。`QtCore` 模块涵盖了 PySide 核心的非 GUI 功能，此模块被用于处理程序中涉及的时间、文件、目录、数据类型、文本流、链接、MIME、线程或进程等对象。
- `QtGui` 模块涵盖多种基本图形功能的类，包括事件处理、2D 图形、基本的图像和字体文本等。
- `QtSql` 模块提供了常用关系型数据库的接口和数据库模型，方便读写数据库中的数据。
- `QtMultimedia` 模块包含处理多媒体事件的类库，通过调用 API 接口访问摄像头、语音设备，播放音频和视频，录制音频和视频及拍照等。
- `QtChart` 和 `QtDataVisualization` 模块用于数据可视化，可以绘制二维和三维数据图表。
- `QtPrintSupport` 模块提供打印支持，能识别系统中安装的打印机并进行打印，可以对打印参数进行设置，提供打印对话框和打印预览对话框。
- `QtBluetooth` 模块包含了处理蓝牙的类库，它的功能包括扫描设备、连接、交互等。
- `QtNetwork` 模块包含用于网络编程的类库，这组类库通过提供便捷的 TCP/IP 及 UDP 的 C/S 代码集合，使得网络编程更容易。
- `QtWebEngine` 和 `QtWebEngineWidgets` 模块借助开源的 Chromium 浏览器，在应用程序中嵌入 Web 浏览功能。
- `QtXml` 模块包含了用于处理 XML 的类库，提供实现 SAX 和 DOM API 的方法。
- `QtOpenGL`、`QtOpenGLFunctions` 和 `QtOpenGLWidgets` 模块使用 OpenGL 库来渲染 3D 和 2D 图形，该模块使得 `QtGUI` 库和 OpenGL 库无缝集成。
- `QtDesigner` 模块可以为 `QtDesigner` 创建自定义控件。
- `QtSvg` 模块为显示矢量图形文件的内容提供了函数。
- `QtTest` 模块包含了可以通过单元测试调试 PySide 应用程序的功能。
- `QtStateMachine` 模块可以创建和执行状态图。
- `QtHelp` 模块可以为应用程序集成在线帮助。
- `QtConcurrent` 模块支持多线程程序。
- `Qt3DCore`、`Qt3DInput`、`Qt3DRender`、`Qt3DAnimation`、`Qt3DLogic`、`Qt3DExtras` 等模块提供三维渲染、三维实时动画。

## 2.2 各种工具

| 命令               | 功能                                   |
| ------------------ | -------------------------------------- |
| `pyside6-genpyi`   | 用于为所有 PySide 模块生成 `.pyi` 文件 |
| `pyside6-rcc`      | Qt 资源编译工具                        |
| `pyside6-uic`      | 用于将 `.ui` 文件转换成 `.py` 文件     |
| `pyside6-designer` | 打开 Qt Designer                       |

## 2.3 深入了解 QApplication

`PySide6.QtWidgets.QApplication` 类用于管理 GUI 应用程序的控制流和主要设置。

`QApplication` 提供了一些基于 `QWidget` 的应用程序所需的功能；用于处理特定小部件的初始化、结束。对于任何使用 Qt 的 GUI 应用程序，无论是否存在窗口，都有一个 `QApplication` 对象。

```python
import sys
from PySide6.QtWidgets import QApplication

if __name__ == "__main__":
    app = QApplication([])

    sys.exit(app.exec())
```

| 方法名         | 描述                                     |
| -------------- | ---------------------------------------- |
| `exec()`       | 需要调用这个函数来启动事件处理           |
| `aboutQt()`    | 显示一个关于 Qt 的消息框                 |
| `beep()`       | 播放系统通知声音                         |
| `allWidgets()` | 返回一个包含所有小部件的列表             |
| `style()`      | 返回程序当前使用的 `Style` 对象          |
| `setStyle()`   | 设置GUI的样式                            |
| `widgetAt()`   | 获取屏幕 `(x, y)` 位置处的 Qt 小部件对象 |
