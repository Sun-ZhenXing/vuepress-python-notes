---
title: operator - 标准运算符代替
description: operator - 标准运算符代替
---

# operator - 标准运算符代替

[[TOC]]

## 1. 标准运算符代替

| 项目        | 信息                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| 源代码      | [Lib/operator.py](https://github.com/python/cpython/tree/3.11/Lib/operator.py) |
| Python 版本 | 全版本                                                                         |
| 标签        | 函数式编程                                                                     |

标准库 `operator` 中包含一系列函数，用于在一些场景下代替标准运算符操作。

::: info 魔术方法

许多方法都有对应的魔术方法。因此，许多函数也提供了后向兼容的双下划线版本，在下表中带有星号的方法都有其双下划线版本。如果函数名已经有下划线结尾，那么结尾还是双下划线，此下划线只是为了和关键字区分。

不建议双下划线版本以确保表述清晰。

:::

例如下面是一些对应的双下划线版本：

|      标准方法       |      双下划线版本       |
| :-----------------: | :---------------------: |
| `operator.lt(a, b)` | `operator.__lt__(a, b)` |
| `operator.le(a, b)` | `operator.__le__(a, b)` |
| `operator.eq(a, b)` | `operator.__eq__(a, b)` |
| `operator.ne(a, b)` | `operator.__ne__(a, b)` |
| `operator.ge(a, b)` | `operator.__ge__(a, b)` |
| `operator.gt(a, b)` | `operator.__gt__(a, b)` |

### 1.1 比较运算符

| 运算     | 语法     | 函数         |
| :------- | :------- | :----------- |
| 小于     | `a < b`  | `lt(a, b)` * |
| 小于等于 | `a <= b` | `le(a, b)` * |
| 等于     | `a == b` | `eq(a, b)` * |
| 不等于   | `a != b` | `ne(a, b)` * |
| 大于等于 | `a >= b` | `ge(a, b)` * |
| 大于     | `a > b`  | `gt(a, b)` * |

### 1.2 逻辑运算符

| 运算     | 语法         | 函数           |
| :------- | :----------- | :------------- |
| 逻辑否定 | `not a`      | `not_(a)` *    |
| 真值测试 | `obj`        | `truth(obj)`   |
| 标识     | `a is b`     | `is_(a, b)`    |
| 标识     | `a is not b` | `is_not(a, b)` |

### 1.3 算术运算符

| 运算             | 语法     | 函数                      |
| :--------------- | :------- | :------------------------ |
| 绝对值           |          | `abs(a)` *                |
| 转换为整数       |          | `index(a)` *              |
| 正数             | `+ a`    | `pos(a)` *                |
| 算术取反         | `- a`    | `neg(a)` *                |
| 加法             | `a + b`  | `add(a, b)` *             |
| 减法             | `a - b`  | `sub(a, b)` *             |
| 乘法             | `a * b`  | `mul(a, b)` *             |
| 除法             | `a / b`  | `truediv(a, b)` *         |
| 整除             | `a // b` | `floordiv(a, b)` *        |
| 取幂             | `a ** b` | `pow(a, b)` *             |
| 取模             | `a % b`  | `mod(a, b)` *             |
| 矩阵乘法 *@3.5+* | `a @ b`  | `matmul(a, b)` *          |
| 按位与           | `a & b`  | `and_(a, b)` *            |
| 按位异或         | `a ^ b`  | `xor(a, b)` *             |
| 按位取反         | `~ a`    | `inv(a)` *、`invert(a)` * |
| 按位或           | `a \| b` | `or_(a, b)` *             |
| 右移             | `a >> b` | `rshift(a, b)` *          |
| 左移             | `a << b` | `lshift(a, b)` *          |

### 1.4 序列操作

| 运算                        | 语法                | 函数                                  |
| :-------------------------- | :------------------ | :------------------------------------ |
| `b` 在 `a` 中出现的次数     |                     | `countOf(a, b)`                       |
| `b` 在 `a` 中首次出现的索引 |                     | `indexOf(a, b)`                       |
| 对象的估计长度 *@3.4+*      |                     | `length_hint(obj, default=0)`         |
| 序列拼接                    | `seq1 + seq2`       | `concat(seq1, seq2)` *                |
| 包含测试                    | `obj in seq`        | `contains(seq, obj)` *                |
| 索引赋值                    | `obj[k] = v`        | `setitem(obj, k, v)` *                |
| 索引取值                    | `obj[k]`            | `getitem(obj, k)` *                   |
| 索引删除                    | `del obj[k]`        | `delitem(obj, k)` *                   |
| 切片赋值                    | `seq[i:j] = values` | `setitem(seq, slice(i, j), values)` * |
| 切片取值                    | `seq[i:j]`          | `getitem(seq, slice(i, j))` *         |
| 切片删除                    | `del seq[i:j]`      | `delitem(seq, slice(i, j))` *         |
| 字符串格式化                | `s % obj`           | `mod(s, obj)` *                       |

### 1.5 原地运算符

| 语法             | 函数                                      |
| :--------------- | :---------------------------------------- |
| `a += b`         | `iadd(a, b)` *                            |
| `a &= b`         | `iand(a, b)` *                            |
| `a += b`         | `iconcat(a, b)` *（其中 `a`、`b` 为序列） |
| `a //= b`        | `ifloordiv(a, b)` *                       |
| `a <<= b`        | `ilshift(a, b)` *                         |
| `a %= b`         | `imod(a, b)` *                            |
| `a *= b`         | `imul(a, b)` *                            |
| `a @= b` *@3.5+* | `imatmul(a, b)` *                         |
| `a \|= b`        | `ior(a, b)` *                             |
| `a **= b`        | `ipow(a, b)` *                            |
| `a >>= b`        | `irshift(a, b)` *                         |
| `a -= b`         | `isub(a, b)` *                            |
| `a /= b`         | `itruediv(a, b)` *                        |
| `a ^= b`         | `ixor(a, b)` *                            |

### 1.6 可调用对象

| 运算              | 语法                   | 函数                                       |
| :---------------- | :--------------------- | :----------------------------------------- |
| 调用对象 *@3.11+* | `obj(*args, **kwargs)` | `operator.call(obj, /, *args, **kwargs)` * |

## 2. 函数式编程工具

`operator` 模块还定义了一些用于常规属性和条目查找的工具。 这些工具适合用来编写快速字段提取器作为 `map()`、`sorted()`、`itertools.groupby()` 或其他需要相应函数参数的函数的参数。

### 2.1 属性获取器

|             语法              |
| :---------------------------: |
|  `operator.attrgetter(attr)`  |
| `operator.attrgetter(*attrs)` |

返回一个可从操作数中获取 `attr` 的可调用对象。如果请求了一个以上的属性，则返回一个属性元组。属性名称还可包含点号。例如：

- 在 `f = attrgetter('name')` 之后，调用 `f(b)` 将返回 `b.name`
- 在 `f = attrgetter('name', 'date')` 之后，调用 `f(b)` 将返回 `(b.name, b.date)`
- 在 `f = attrgetter('name.first', 'name.last')` 之后，调用 `f(b)` 将返回 `(b.name.first, b.name.last)`

::: details 等价实现
```python
def attrgetter(*items):
    if any(not isinstance(item, str) for item in items):
        raise TypeError('attribute name must be a string')
    if len(items) == 1:
        attr = items[0]
        def g(obj):
            return resolve_attr(obj, attr)
    else:
        def g(obj):
            return tuple(resolve_attr(obj, attr) for attr in items)
    return g

def resolve_attr(obj, attr):
    for name in attr.split("."):
        obj = getattr(obj, name)
    return obj
```
:::

### 2.2 成员获取器

|             语法              |
| :---------------------------: |
|  `operator.itemgetter(item)`  |
| `operator.itemgetter(*items)` |

返回一个使用操作数的 `__getitem__()` 方法从操作数中获取 `item` 的可调用对象。如果指定了多个条目，则返回一个查找值的元组。例如：

- 在 `f = itemgetter(2)` 之后，调用 `f(r)` 将返回 `r[2]`
- 在 `g = itemgetter(2, 5, 3)` 之后，调用 `g(r)` 将返回 `(r[2], r[5], r[3])`

::: details 等价实现
```python
def itemgetter(*items):
    if len(items) == 1:
        item = items[0]
        def g(obj):
            return obj[item]
    else:
        def g(obj):
            return tuple(obj[item] for item in items)
    return g
```
:::

### 2.3 方法调用器

|                       语法                        |
| :-----------------------------------------------: |
| `operator.methodcaller(name, /, *args, **kwargs)` |

返回一个在操作数上调用 `name` 方法的可调用对象。如果给出额外的参数和/或关键字参数，它们也将被传给该方法。例如：

- 在 `f = methodcaller('name')` 之后，调用 `f(b)` 将返回 `b.name()`
- 在 `f = methodcaller('name', 'foo', bar=1)` 之后，调用 `f(b)` 将返回 `b.name('foo', bar=1)`

::: details 等价实现
```python
def methodcaller(name, /, *args, **kwargs):
    def caller(obj):
        return getattr(obj, name)(*args, **kwargs)
    return caller
```
:::
