---
title: 使用 ctypes 访问 C 代码
description: 使用 ctypes 访问 C 代码
---

# 使用 ctypes 访问 C 代码

[[TOC]]

本文参考 *Python Cookbook* [中文翻译](https://python3-cookbook.readthedocs.io/zh_CN/latest/chapters/p15_c_extensions.html) 的第十五章：C 语言扩展来编写的。

## 1. ctypes 基本使用

对于需要调用 C 代码的一些小的问题，通常使用 Python 标准库中的 `ctypes` 模块就足够了。

::: info 共享库

名词 **共享库** 和 **动态链接库** 是一致的，在 Windows 下为 `.dll` 文件，在 Linux 下是 `.so` 文件。

:::

要使用 `ctypes`，你首先要确保你要访问的 C 代码已经被编译到和 Python 解释器兼容（同样的架构、字大小、编译器等）的某个共享库中了。

下面我们使用 [`sample.c`](./src/sample.c) 这段 C 代码来演示。

@[code c](./src/sample.c)

编译方法：

::: code-tabs#sys

@tab Windows

```bash
gcc --share sample.c -o sample.dll
```

@tab Linux

```bash
gcc --share sample.c -o sample.so
```

:::

可以使用 `ctypes.util.find_library()` 函数来查找，在 Linux 系统下面表现如下：

```python
from ctypes.util import find_library

find_library('m')
# '/usr/lib/libm.dylib'

find_library('pthread')
# '/usr/lib/libpthread.dylib'

find_library('sample')
# '/usr/local/lib/libsample.so'
```

使用 `ctypes.cdll.LoadLibrary()` 来加载共享库：

```python
_mod = ctypes.cdll.LoadLibrary(_path)
```

像下面的 C 程序：

```c
int in_mandel(double x0, double y0, int n) {
    double x = 0, y = 0, xtemp;
    while (n > 0) {
        xtemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xtemp;
        n -= 1;
        if (x * x + y * y > 4)
            return 0;
    }
    return 1;
}
```

我们需要编写一个签名来确保它可用：

```python
# int in_mandel(double, double, int)
in_mandel = _mod.in_mandel
in_mandel.argtypes = (ctypes.c_double, ctypes.c_double, ctypes.c_int)
in_mandel.restype = ctypes.c_int
```

函数参数 `.argtypes` 属性是一个元组，是参数类型签名，`.restype` 就是相应的返回类型。

如果不能正确签名，会导致解释器崩溃。

## 2. C 类型、ctypes 类型和 Python 类型对应关系

下表展示了 C 类型、ctypes 类型和 Python 类型对应关系。

| `ctypes` 类型  | C 类型                                     |    Python 类型    |
| :------------- | :----------------------------------------- | :---------------: |
| `c_bool`       | `_Bool`                                    |      `bool`       |
| `c_char`       | `char`                                     |      `bytes`      |
| `c_wchar`      | `wchar_t`                                  |       `str`       |
| `c_byte`       | `char`                                     |       `int`       |
| `c_ubyte`      | `unsigned char`                            |       `int`       |
| `c_short`      | `short`                                    |       `int`       |
| `c_ushort`     | `unsigned short`                           |       `int`       |
| `c_int`        | `int`                                      |       `int`       |
| `c_uint`       | `unsigned int`                             |       `int`       |
| `c_long`       | `long`                                     |       `int`       |
| `c_ulong`      | `unsigned long`                            |       `int`       |
| `c_longlong`   | `__int64` 或 `long long`                   |       `int`       |
| `c_ulonglong`  | `unsigned __int64` 或 `unsigned long long` |       `int`       |
| `c_size_t`     | `size_t`                                   |       `int`       |
| `c_ssize_t`    | `ssize_t` 或 `Py_ssize_t`                  |       `int`       |
| `c_float`      | `float`                                    |      `float`      |
| `c_double`     | `double`                                   |      `float`      |
| `c_longdouble` | `long double`                              |      `float`      |
| `c_char_p`     | `char*`                                    | `bytes` 或 `None` |
| `c_wchar_p`    | `wchar_t*`                                 |  `str` 或 `None`  |
| `c_void_p`     | `void*`                                    |  `int` 或 `None`  |

## 3. 指针

指针用法：`ctypes.POINTER(ctypes.c_int)` 表示 `int*`。

`ctypes.cast()` 用于支持 **强制类型转换**，例如 `ctypes.cast(ptr, ctypes.POINTER(ctypes.c_double))`，将 `int` 型的 `ptr` 转换为 `ctypes.c_double` 型指针。

如果指针不能正确使用，会导致严重的错误：

```c
int divide(int a, int b, int* remainder) {
    int quot = a / b;
    *remainder = a % b;
    return quot;
}
```

如果这样使用：

```python
x = 0
divide(10, 3, x)
# ctypes.ArgumentError
```

正确的用法：

```python
x = ctypes.c_int()
divide(10, 3, x)
# 3
x.value
# 1
```

对于那些不像 Python 的 C 调用，通常可以写一个小的包装函数。这里，我们让 `divide()` 函数通过元组来返回两个结果：

```python
# int divide(int, int, int *)
_divide = _mod.divide
_divide.argtypes = (ctypes.c_int, ctypes.c_int, ctypes.POINTER(ctypes.c_int))
_divide.restype = ctypes.c_int

def divide(x, y):
    rem = ctypes.c_int()
    quot = _divide(x,y,rem)
    return quot, rem.value
```

对于 C 语言的数组呢？数组就是指针，所以必须传入正确的指针。具体如何向 C 库传入一个指针类型呢？

`DoubleArrayType` 演示了怎样处理这种情况。 在这个类中定义了一个单个方法 `from_param()`。

这个方法的角色是接受一个单个参数然后将其向下转换为一个合适的 `ctypes` 对象（本例中是一个 `ctypes.c_double` 的指针）。

可以直接构造一个 C 数组：

```python
nums = [1, 2, 3]
a = (ctypes.c_double * len(nums))(*nums)

a[0]
# 1.0
```

对于数组对象，`from_array()` 提取底层的内存指针并将其转换为一个 `ctypes` 指针对象。例如：

```python
import array

a = array.array('d',[1,2,3])
# array('d', [1.0, 2.0, 3.0])

ptr, _ = a.buffer_info()
ptr
# 4298687200（运行时可能不一样）

ctypes.cast(ptr, ctypes.POINTER(ctypes.c_double))
# <__main__.LP_c_double object at 0x10069cd40>
```

`from_ndarray()` 演示了对于 numpy 数组的转换操作。通过定义 `DoubleArrayType` 类并在 `avg()` 类型签名中使用它，那么这个函数就能接受多个不同的类数组输入了。

```c
typedef struct Point {
    double x, y;
} Point;
```

对应 Python 代码：

```python
class Point(ctypes.Structure):
    _fields_ = [('x', ctypes.c_double),
                ('y', ctypes.c_double)]
```

由于 `ctypes` 并不是完全自动化， 那么你就必须花费大量时间来编写所有的类型签名，就像例子中那样，对于大规模的、包含很多复杂函数签名的 C 程序并不适用。
