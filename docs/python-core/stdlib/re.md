---
title: re 正则表达式
description: re 正则表达式
---

# re 正则表达式

[[TOC]]

## 1. 正则表达式模块

| 项目        | 信息                                                           |
| ----------- | -------------------------------------------------------------- |
| 源代码      | [Lib/re/](https://github.com/python/cpython/tree/3.11/Lib/re/) |
| Python 版本 | 全版本                                                         |
| 标签        | 文件和目录                                                     |

::: info 第三方支持

第三方模块 [`regex`](https://pypi.org/project/regex/)，提供了与标准库 `re` 模块兼容的 API 接口，同时，还提供了更多功能和更全面的 Unicode 支持

:::

## 2. Flag 标记

### 2.1 语言相关

`re.A` / `re.ASCII`：让 `\w`、`\W`、`\b`、`\B`、`\d`、`\D`、`\s`、`\S` 只匹配 `ASCII`，而不是 `Unicode`，对应内联为 `(?a)`。

`re.L` / `re.LOCALE`：由语言确定大小写敏感和 ASCII 匹配，这个标记 **不推荐使用**，因为语言区域机制很不可靠，它一次只能处理一个 “习惯”，而且只对 8 位字节有效，对应内联为 `(?L)`。

### 2.2 多行匹配

`re.S` / `re.DOTALL`：让 `"."` 特殊字符匹配任何字符，包括换行符，对应内联为 `(?s)`。

`re.M` / `re.MULTILINE`：多行匹配，对应内联为 `(?m)`。

### 2.3 其他标记

`re.I` / `re.IGNORECASE`：进行忽略大小写匹配，对应内联为 `(?i)`。

`re.X` / `re.VERBOSE`：这个标记允许你编写更具可读性更友好的正则表达式。通过分段和添加注释。空白符号会被忽略，除非在一个字符集合当中或者由反斜杠转义，对应内联为 `(?x)`。

`re.DEBUG`：显示编译时的 debug 信息。

## 3. 标记字符

### 3.1 常见字符和转义字符

你可以在大多数教程上学到常见字符，如 `. ^ $ [...] |`。

| 符号 | 含义                                 | 相反含义 |
| ---- | ------------------------------------ | -------- |
| `\A` | 相当于 `^`                           | `\Z`     |
| `\b` | 空字符串，但只在单词开始或结尾的位置 | `\B`     |
| `\d` | 数字                                 | `\D`     |
| `\s` | 空白字符                             | `\S`     |
| `\w` | 单词字符                             | `\W`     |

### 3.2 贪婪和非贪婪

修饰符都是贪婪的，它们在字符串进行尽可能多的匹配，一个简单的方法是，加上 `?` 可以变为非贪婪的。如 `{m,n}?` 或者 `??`。

| 表达式 | 含义           |
| ------ | -------------- |
| `?`    | 相当于 `{0,1}` |
| `*`    | 相当于 `{0,}`  |
| `+`    | 相当于 `{1,}`  |

### 3.3 匹配组和集合

| 表达式                        | 含义                                           |
| ----------------------------- | ---------------------------------------------- |
| `(?P<name>...)`               | 命名组                                         |
| `()`                          | 捕获组                                         |
| `(?:...)`                     | 非捕获合                                       |
| `(?<tags>)`                   | 内联，`<tags>` 可以是 `aiLmsux` 中的一个或多个 |
| `(?aiLmsux-imsx:...)` *@3.6+* | 去除标记                                       |
| `(?P=name)`                   | 引用一个组合                                   |
| `(?#…)`                       | 注释                                           |

## 4. 断言

*@def* 所有的正则表达式都是一种断言，**零宽断言**（Zero-Width Assertions）只进行查找而并不消费，占用字符串宽度为零。

### 4.1 前视后视断言

| 表达式     | 含义     |
| ---------- | -------- |
| `(?=...)`  | 前视断言 |
| `(?!...)`  | 前视取反 |
| `(?<=...)` | 后视断言 |
| `(?<!...)` | 后视取反 |

### 4.2 条件断言

`(?(id/name)yes-pattern|no-pattern)` 存在为第一个表达式，否则选择第二个匹配。

## 5. 模块内容参考

### 5.1 函数

| 函数                                                                  | 功能                                                                                            |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `re.compile(pattern, flags=0) -> Pattern`                             | 编译正则表达式                                                                                  |
| `re.search(pattern, string, flags=0) -> Match/None`                   | 扫描整个 `string` 找到匹配样式的第一个位置，并返回一个相应的匹配对象                            |
| `re.match(pattern, string, flags=0) -> Match/None`                    | 如果 `string` 开始的零个或者多个字符匹配到了正则表达式样式，就返回一个相应的匹配对象            |
| `re.fullmatch(pattern, string, flags=0) -> Match/None` *@3.6+*        | 如果整个 `string` 匹配到正则表达式样式，就返回一个相应的匹配对象                                |
| `re.split(pattern, string, maxsplit=0, flags=0) -> list[str]`         | 用 `pattern` 分开 `string`。如果在 `pattern` 中捕获到括号，那么所有的组里的文字也会包含在列表里 |
| `re.findall(pattern, string, flags=0) -> list[tuple/str]`             | 如果正则表达式中没有组，则返回列表内是字符串，否则是元组                                        |
| `re.finditer(pattern, string, flags=0) -> iterator`                   | `pattern` 在 `string` 里所有的非重复匹配，返回为一个迭代器 `iterator` 保存了匹配对象            |
| `re.sub(pattern, repl, string, count=0, flags=0) -> str`              | 替换非重叠匹配的字符串                                                                          |
| `re.subn(pattern, repl, string, count=0, flags=0) -> tuple[str, int]` | 行为与 `sub()` 相同，但是返回一个元组 `(str, num)` 分别是字符串和替换次数                       |
| `re.escape(pattern) -> str`                                           | 转义 `pattern` 中的特殊字符                                                                     |
| `re.purge()`                                                          | 清除正则表达式的缓存                                                                            |
| `Exception re.error(msg, pattern=None, pos=None)`                     | 正则表达式错误类                                                                                |

注：注意即便是 `MULTILINE` 模式，`re.match()` 也只匹配字符串的开始位置，而不匹配每行开始。

### 5.2 Pattern 对象

下列方法基本与上面的函数用法一致，只不过多了一些 `pos` 等位置参数。

| 方法                                                 |
| ---------------------------------------------------- |
| `Pattern.search(string[, pos[, endpos]])`            |
| `Pattern.match(string[, pos[, endpos]])`             |
| `Pattern.fullmatch(string[, pos[, endpos]])` *@3.6+* |
| `Pattern.split(string, maxsplit=0)`                  |
| `Pattern.findall(string[, pos[, endpos]])`           |
| `Pattern.finditer(string[, pos[, endpos]])`          |
| `Pattern.sub(repl, string, count=0)`                 |
| `Pattern.subn(repl, string, count=0)`                |

| 属性                 | 内容                                                 |
| -------------------- | ---------------------------------------------------- |
| `Pattern.flags`      | 正则匹配标记                                         |
| `Pattern.groups`     | 捕获到的模式串中组的数量                             |
| `Pattern.groupindex` | 映射由 `(?P<id>)` 定义的命名符号组合和数字组合的字典 |
| `Pattern.pattern`    | 编译对象的原始样式字符串                             |

### 5.3 Match 对象

| 方法                            | 内容                                                          |
| ------------------------------- | ------------------------------------------------------------- |
| `Match.expand(template)`        | 进行反斜杠和组的替换                                          |
| `Match.group([group1, ...])`    | 返回匹配组                                                    |
| `Match[g]` *@3.6+*              | 等同于 `Match.group(g)`                                       |
| `Match.groups(default=None)`    | 匹配的所有组                                                  |
| `Match.groupdict(default=None)` | 以字典的方式返回组                                            |
| `Match.start([group])`          | 某个组的开始标号                                              |
| `Match.end([group])`            | 某个组的结束标号                                              |
| `Match.span([group])`           | 返回 `(m.start(group), m.end(group))` 如果没有返回 `(-1, -1)` |

| 属性              | 内容             |
| ----------------- | ---------------- |
| `Match.pos`       | `pos`            |
| `Match.endpos`    | `endpos`         |
| `Match.lastindex` | 最后一个组的索引 |
| `Match.lastgroup` | 最后一个组       |
| `Match.re`        | `Pattern` 对象   |
| `Match.string`    | 原始字符串       |

## 6. 示例：写一个词法分析器

```python
from typing import NamedTuple
import re

class Token(NamedTuple):
    type: str
    value: str
    line: int
    column: int

def tokenize(code):
    keywords = {'IF', 'THEN', 'ENDIF', 'FOR', 'NEXT', 'GOSUB', 'RETURN'}
    token_specification = [
        ('NUMBER',   r'\d+(\.\d*)?'),  # Integer or decimal number
        ('ASSIGN',   r':='),           # Assignment operator
        ('END',      r';'),            # Statement terminator
        ('ID',       r'[A-Za-z]+'),    # Identifiers
        ('OP',       r'[+\-*/]'),      # Arithmetic operators
        ('NEWLINE',  r'\n'),           # Line endings
        ('SKIP',     r'[ \t]+'),       # Skip over spaces and tabs
        ('MISMATCH', r'.'),            # Any other character
    ]
    tok_regex = '|'.join('(?P<%s>%s)' % pair for pair in token_specification)
    line_num = 1
    line_start = 0
    for mo in re.finditer(tok_regex, code):
        kind = mo.lastgroup
        value = mo.group()
        column = mo.start() - line_start
        if kind == 'NUMBER':
            value = float(value) if '.' in value else int(value)
        elif kind == 'ID' and value in keywords:
            kind = value
        elif kind == 'NEWLINE':
            line_start = mo.end()
            line_num += 1
            continue
        elif kind == 'SKIP':
            continue
        elif kind == 'MISMATCH':
            raise RuntimeError(f'{value!r} unexpected on line {line_num}')
        yield Token(kind, value, line_num, column)

statements = '''
    IF quantity THEN
        total := total + price * quantity;
        tax := price * 0.05;
    ENDIF;
'''

for token in tokenize(statements):
    print(token)
```

该词法器产生以下的输出：

```python
Token(type='IF', value='IF', line=2, column=4)
Token(type='ID', value='quantity', line=2, column=7)
Token(type='THEN', value='THEN', line=2, column=16)
Token(type='ID', value='total', line=3, column=8)
Token(type='ASSIGN', value=':=', line=3, column=14)
Token(type='ID', value='total', line=3, column=17)
Token(type='OP', value='+', line=3, column=23)
Token(type='ID', value='price', line=3, column=25)
Token(type='OP', value='*', line=3, column=31)
Token(type='ID', value='quantity', line=3, column=33)
Token(type='END', value=';', line=3, column=41)
Token(type='ID', value='tax', line=4, column=8)
Token(type='ASSIGN', value=':=', line=4, column=12)
Token(type='ID', value='price', line=4, column=15)
Token(type='OP', value='*', line=4, column=21)
Token(type='NUMBER', value=0.05, line=4, column=23)
Token(type='END', value=';', line=4, column=27)
Token(type='ENDIF', value='ENDIF', line=5, column=4)
Token(type='END', value=';', line=5, column=9)
```
