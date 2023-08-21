# Python 如何查找 Segment Fault（段错误）

[[TOC]]

## 1. Python 调试选项

问题背景：在开发 PySide6 程序时出现了闪退错误，Windows 上不显示任何内容崩溃，Mac 上出现段错误（内容已转储）。常规调试器无法得出错误出现的位置，因为出错的位置不是在 Python 解释器执行时出现的。

通过下面的方法成功定位到问题，发现是线程中调用了 UI 功能导致的。PySide6 要求线程想修改或读取 UI 控件的内容必须借助信号通信。

在执行 Python 时加上 `-X faulthandler` 选项，可以在程序出现 Segment Fault 时打印出调用栈。

```bash
python -X faulthandler test.py
```
