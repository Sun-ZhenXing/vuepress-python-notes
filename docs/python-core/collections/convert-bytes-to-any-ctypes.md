---
title: 将 bytes 转换为任意 C 类型
description: 将 bytes 转换为任意 C 类型
---

# 将 bytes 转换为任意 C 类型

下面的方法实现了 `bytes` 转换到任意 C 类型。

```python
from ctypes import POINTER, c_char_p, c_double, cast, sizeof
from typing import TypeVar

_T = TypeVar('_T')

def cast_bytes(data_bytes: bytes, ctype: type[_T]) -> _T:
    """Cast bytes to a ctype"""
    assert len(data_bytes) >= sizeof(ctype)
    return cast(
        c_char_p(data_bytes),
        POINTER(ctype)
    ).contents

v = cast_bytes(b'\x7f' * 8, c_double)
print(v.value)
```

这样我们就获得了一个 `c_double` 类型的 `v` 变量，使用 `v.value` 很容易获得其值。

以上的代码相当于下面的 C++ 代码：

```cpp
#include <iostream>
using namespace std;

int main() {
    char a[] = "\x7f\x7f\x7f\x7f\x7f\x7f\x7f\x7f";
    double value = *(double*)a;
    cout << value << endl;
    return 0;
}
```

如果需要使用 Python 将 C 类型转换为二进制表示，使用 `memoryview` 即可。
