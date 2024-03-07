# Python 文件扩展名

| 扩展名  | 含义                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| `.pxd`  | 由 Cython 编写的 Python 扩展模块头文件，类似于 C/C++ 的 `.h` 头文件                                                |
| `.pyx`  | 由 Cython 编写的 Python 扩展模块源代码文件，`.pyx` 文件必须先被编译成 `.c` 文件，再编译成 `.pyd` 或 `.so` 文件     |
| `.pyd`  | Windows 平台下的 Python 扩展模块，即动态链接库                                                                     |  |
| `.pyc`  | Python 源代码编译后的字节码文件，`.pyc` 文件是 `.py` 文件经过编译后的文件，`.pyc` 文件可以直接被 Python 解释器执行 |
| `.pyo`  | 与 `.pyc` 文件类似，`.pyo` 文件是 `.py` 文件经过优化编译后的文件，`.pyo` 文件可以直接被 Python 解释器执行          |
| `.pyw`  | Windows 平台下的 Python 脚本文件，即无控制台的 Python 脚本文件，会使用 `pythonw.exe` 解释器执行                    |
| `.pyz`  | Python 3.5 以上版本支持的压缩包格式，类似于 Java 的 `.jar` 包，可以直接使用 `python.exe` 解释器执行                |
| `.pyzw` | Windows 平台下的 Python 压缩包文件，即无控制台的 Python 压缩包文件，会使用 `pythonw.exe` 解释器执行                |
| `.pyi`  | Python 3.5 以上版本支持的存根文件，用于类型检查                                                                    |
| `.cyx`  | Cython 编写的 Python 扩展模块源代码文件                                                                            |
| `.pxi`  | Cython 声明文件[^1]                                                                                                    |
| `.pxd`  | Cython 导入代码文件                                                                                                |

[^1]: Cython，<https://cython.readthedocs.io/en/latest/src/userguide/faq.html#what-is-the-difference-between-a-pxd-and-pxi-file-when-should-either-be-used>
