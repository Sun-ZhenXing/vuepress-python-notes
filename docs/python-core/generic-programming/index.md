# Python 泛型编程

Python 是多范式的编程语言，支持泛型编程。本文介绍使用 Python 泛型编程的一些细节和实现。

[[TOC]]

## 1. 类型注解

### 1.1 类型注解的作用

为什么使用类型注解？

1. 提高工作效率，可以帮助 IDE 完成自动类型推断
2. 提高代码的可读性和可重用性
3. 减少不确定性的错误和预期外的结果

Python 的泛型编程和 C++/Java 的泛型编程有什么区别和共同点？
1. 共同点：都可以实现代码复用
2. 不同点：Python 的泛型不是强制的，可以不遵循类型声明，可以使用任意的类型代替

Python 使用 `typing` 模块实现类型注解，相对来讲，Python 的类型注解更加接近于 TypeScript 而不是传统的编译型语言。

类型注解用于标注、解释你的参数、返回值或容器内元素的类型。如果你想使用 Python 的泛型编程，必须了解类型注解。

虽然 Python 是动态类型的语言，但写程序时养成良好的习惯，会大大提高你的编码效率，减少错误出现，正如 *Zen of Python* 所说

> Explicit is better than implicit.（显式胜于隐式）
> 
> <cite>——Tim Peters</cite>

通俗一点来讲就是，如果你的函数返回类型是可知的，就不要把它藏起来，让别人猜测你的返回类型。

一个优雅的方式是，一个标识符只绑定到一种特定的类。

有时候，一个功能需要写很多注释来说明这些参数和返回值是什么含义，但是这些注释对于用户和代码的调用者都是不可见的。所以我们使用文档字符串来描述函数或类的核心功能。

### 1.2 对内置容器使用泛型

Python 的泛型编程不完全为代码复用而生，更像是为代码易用、代码规范而生。

内置的容器都支持泛型，写法如下：

```python
# 形如 (1.23, 4.56, 7.89) 的元组类型，只包含浮点数
t0 = tuple[float]()
# 也可以这样注解
t0: tuple[float] = ()

# 结构为 (str, int) 型的元组
t1 = tuple[str, int]()

# 从字符串映射到列表的字典类型，列表的元素是整型的
d0 = dict[str, list[int]]()

# 包含字符串元组的列表
l0 = list[tuple[str]]()
```

这样，在 IDE 中编写程序，调用这些变量的方法时，会有大量的类型推断或智能提示。IDE 也会在你不使用注解时尽可能多地推理出变量的类型，并在你可能出错的地方给予警告。

::: warning 非强制类型

与 TypeScript 不同的是，Python 的类型注解不是强制的，你不必保证在 `d0` 中的每个元素都是 `float` 类型的。

但是，既然我们是这么写的，我们应该保证程序在运行时，`t0` 中的每个元素都是预期的那样，每个元素都是一个浮点数。否则类型注解将失去意义。

正如 *Zen of Python* 所说的：

> Special cases aren't special enough to break the rules.（特殊情形不足以特殊到打破规则）
> 
> <cite>——Tim Peters</cite>

:::

### 1.3 对函数或方法注解

对于函数或方法的参数，使用 `param: Type[ = default]` 的方式声明，注意默认值写在类型的后面。

对于函数的返回值，使用 `func(param...) -> Type: ...` 语法，注意类型写在冒号的前面，`->` 换行需要加上 `\`，否则解释器会抛出语法错误。

```python
class MetaData:
    def __init__(self, data: dict[str, str],
                 key: str = None) -> None:
        self._meta = data
        self._key = key

    def get_metadata(self) -> dict[str, str]:
        '''return meta data which is dict type
        '''
        return self._meta

    def get_key(self) -> str:
        return self._key if self._key else ''
```

如果类的一个方法参数是类的实例，直接使用类型注解可能会报错，可以将类型名称作为字符串写入，例如：

```python
class Action:
    def __init__(self, name: str) -> None:
        self._step = []
        self._name = name

    def add_new_action(self, action: 'Action') -> None:
        action._step.append(action._name)
```

字符串类型的注解也会被多数 IDE 正确识别，但在反射时获取的签名和 `Action` 不同。

## 2. 泛型类

### 2.1 泛型工厂

泛型工厂的原理是类实现类方法 `__class_getitem__()`，这样对类的任何下标操作都会被这个方法产生新的类型别名。

例如，内置类可以生成任意的类型别名：

```python
str_int_dict = dict[str, int]
d = str_int_dict()
```

`str_int_dict` 的类型是类型别名，可以使用类型别名创建类的实例，这和原来的类型行为上没有区别，只是有了类型注解。

如何定义自己的类型别名？使用 `typing.TypeVar` 定义：

```python
from typing import TypeVar

T = TypeVar('T')
```

现在你可以定义 `list[T]` 表示一个你定义的类型名，但这个类型名不表示任何类型，就像你在 C++ 使用 `template <class T>` 一样。

你可以定义类型范围

```python
# 可以是任意类型
T = TypeVar('T')

# 只能是 str 或者 bytes
A = TypeVar('A', str, bytes)
```

### 2.2 泛型类

可以通过继承 `typing.Generic[T]` 的方式继承，在类方法上可以使用 `T` 作为类型注解。

```python
from typing import TypeVar, Generic
from logging import Logger

T = TypeVar('T')

class LoggedVar(Generic[T]):
    def __init__(self, value: T, name: str,
                 logger: Logger) -> None:
        self.name = name
        self.logger = logger
        self.value = value

    def set(self, new: T) -> None:
        self.log('Set ' + repr(self.value))
        self.value = new

    def get(self) -> T:
        self.log('Get ' + repr(self.value))
        return self.value

    def log(self, message: str) -> None:
        self.logger.info('%s: %s', self.name, message)
```

`Generic[T]` 是 `LoggedVar` 类的基类，采用了单类型参数 `T`。因此，在该类体内，T 是有效的类型。

`Generic` 基类定义了 `__class_getitem__()` ，因此，`LoggedVar[T]` 类型也有效

```python
from collections.abc import Iterable

def zero_all_vars(vars: Iterable[LoggedVar[int]]) -> None:
    for var in vars:
        var.set(0)
```

### 2.3 Generic 特征

注意，下标列表中的类型不能冗余，`Generic[T, T]` 这样是错误的，下标列表类似于 C++ `template<>` 列表，表示泛型的类型数量。`Generic[KT, VT]` 表示类似于 C++ `template<class KT, class VT>` 模板语法。

```python
KT = TypeVar('KT')
VT = TypeVar('VT')

class Mapping(Generic[KT, VT]):
    def __getitem__(self, key: KT) -> VT:
        ...

    def lookup_name(mapping: Mapping[KT, VT], key: KT,
                    default: VT) -> VT:
        try:
            return mapping[key]
        except KeyError:
            return default
```

`Generic` 可使用多继承

```python
from collections.abc import Sized
from typing import TypeVar, Generic

T = TypeVar('T')

class LinkedList(Sized, Generic[T]):
    ...
```

从泛型类继承时，有些类型变量可能是固定的

```python
from collections.abc import Mapping
from typing import TypeVar

T = TypeVar('T')

class MyDict(Mapping[str, T]):
    ...
```

### 2.4 示例：泛型的队列

```python
from typing import Generic, TypeVar
from collections import deque

T = TypeVar('T')

class Queue(Generic[T]):
    def __init__(self) -> None:
        self._queue = deque[T]()

    def push(self, item: T) -> None:
        self._queue.append(item)

    def pop(self) -> T:
        return self._queue.popleft()

    def is_empty(self) -> bool:
        return len(self._queue) == 0
```

这就相当于 C++ 的下面的写法

```cpp
#include <queue>

template <class T>
class Queue {
private:
    deque<T> queue;
public:
    void push(T item) {
        queue.push_back(item);
    }
    T pop() {
        T item = queue.front();
        queue.pop_front();
        return item;
    }
    bool isEmpty() {
        return queue.empty();
    }
};
```

创建一个 `int` 型的的 `Queue` 试试

```python
queue = Queue[int]()
```

这样，你的 IDE 会在你输入 `queue.front()` 时提示它返回一个 `int` 型的值。

例如，你的 IDE 提示 `(method) front: () -> int`，但如果你写的是

```python
queue = Queue()
```

你的 IDE 告诉你 `(method) front: () -> Any`，`typing.Any` 表示任意类型。使用泛型类，但未指定类型参数时，每个位置的类型都会被预设为 `Any`。此处隐式继承了 `Queue[Any]` 类。

### 2.5 容器实现

`collections.abc` 定义了抽象基类，代表容器的特征。

常用容器接口：

- `Hashable` 可哈希的，实现了 `__hash__()`
- `Iterator` 可迭代的，实现了 `__next__()`
- `Sequence` 序列的，实现了 `__getitem__()` 和 `__getitem__()`

::: info 魔术方法

这些双下划线的方法也被翻译为特殊方法，请参考标准库 [魔术方法](https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names)。

:::

*@TODO* 容器的类型注解常常是这样的：

```python
from collections.abc import Mapping, Sequence

def notify(employees: Sequence[Employee],
           overrides: Mapping[str, str]) -> None: ...
```
