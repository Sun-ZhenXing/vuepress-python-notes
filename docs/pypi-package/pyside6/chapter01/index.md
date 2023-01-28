---
title: 第 1 章：PySide6 简介
description: 第 1 章：PySide6 简介
---

# 1. PySide6 简介

[[TOC]]

## 1.1 PySide6 是什么

## 1.2 PySide6 安装

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

## 1.3 Hello PySide6

将下面的代码保存为 `main.py`：

```python
import sys

from PySide6.QtWidgets import QApplication, QWidget

app = QApplication(sys.argv)
window = QWidget()
window.show()
sys.exit(app.exec())
```

然后运行它，需要确保你使用的是 Python3 的正确版本：

```bash
python main.py
```

如果你看到窗口说明安装成功。
