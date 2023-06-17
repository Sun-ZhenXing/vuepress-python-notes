# prettytable - 打印、转换表格

<div class="no-link">

[![Jazzband](https://jazzband.co/static/img/badge.svg)](https://jazzband.co/)
[![PyPI version](https://img.shields.io/pypi/v/prettytable.svg?logo=pypi&logoColor=FFE873)](https://pypi.org/project/prettytable/)
[![Supported Python versions](https://img.shields.io/pypi/pyversions/prettytable.svg?logo=python&logoColor=FFE873)](https://pypi.org/project/prettytable/)
[![PyPI downloads](https://img.shields.io/pypi/dm/prettytable.svg)](https://pypistats.org/packages/prettytable)
[![GitHub Actions status](https://github.com/jazzband/prettytable/workflows/Test/badge.svg)](https://github.com/jazzband/prettytable/actions)
[![codecov](https://codecov.io/gh/jazzband/prettytable/branch/main/graph/badge.svg)](https://codecov.io/gh/jazzband/prettytable)
[![Code style: Black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

</div>

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.org/project/prettytable/) \| [GitHub](https://github.com/jazzband/prettytable) |
| 官方文档    | -                                                                                                  |
| 开源协议    | BSD 3 + 自定义协议                                                                                 |
| Python 版本 | Python 3.7 ~ 3.11                                                                                  |
| 标签        | 工具                                                                                               |

第三方库 [`prettytable`](https://pypi.org/project/prettytable/) 支持在终端打印、转换表格。其开源仓库为 [GitHub](https://github.com/jazzband/prettytable)。

安装：

```bash
pip install -U prettytable
```

## 2. 基本操作

```python
import prettytable

table = prettytable.PrettyTable()
table.field_names = ['City name', 'Area', 'Population', 'Annual Rainfall']
table.add_row(['Adelaide',1295, 1158259, 600.5])
table.add_row(['Brisbane',5905, 1857594, 1146.4])
table.add_row(['Darwin', 112, 120900, 1714.7])
table.add_row(['Hobart', 1357, 205556,619.5])

print(table)
```

打印结果：

```bash
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
|  Adelaide | 1295 |  1158259   |      600.5      |
|  Brisbane | 5905 |  1857594   |      1146.4     |
|   Darwin  | 112  |   120900   |      1714.7     |
|   Hobart  | 1357 |   205556   |      619.5      |
+-----------+------+------------+-----------------+
```

如果没有添加表头，会显示下面的表头：

```bash
+----------+---------+---------+---------+
| Field 1  | Field 2 | Field 3 | Field 4 |
+----------+---------+---------+---------+
| Adelaide |   1295  | 1158259 |  600.5  |
| Brisbane |   5905  | 1857594 |  1146.4 |
|  Darwin  |   112   |  120900 |  1714.7 |
|  Hobart  |   1357  |  205556 |  619.5  |
+----------+---------+---------+---------+
```

::: info 得到字符串

注意，表格对象如果调用 `repr()` 将返回类似 `'<prettytable.PrettyTable object at 0x...>'` 这样的字符串，如果需要字符串请直接调用 `str()`。

:::

## 3. 基本属性或方法

| 属性方法                      | 含义                                               |
| :---------------------------- | :------------------------------------------------- |
| `table.add_column()`          | 添加列                                             |
| `table.add_row()`             | 添加行                                             |
| `table.add_rows()`            | 添加多行                                           |
| `table.field_names`           | 表头                                               |
| `table.copy()`                | 复制表格                                           |
| `prettytable.from_csv()`      | 通过 `.csv` 文件生成表格                           |
| `prettytable.from_html()`     | 从 HTML 字符串中生成表格，返回 `list[PrettyTable]` |
| `prettytable.from_html_one()` | 从只含有一个表格的 HTML 字符串中生成表格           |
| `prettytable.from_json()`     | 从 JSON 字符串中生成表格                           |
| `from_db_cursor()`            | 从 `db.cursor` 游标中生成表格                      |

## 4. 示例

### 4.1 打印 csv 文件

```python
from prettytable import from_csv

with open('demo.csv', encoding='utf-8') as f:
    print(from_csv(f))
```

### 4.2 打印 HTML 中的表格

```python
from prettytable import from_html

html_string = '''<table>
<tr>
    <th>code</th>
    <th>uuid</th>
    <th>name</th>
    <th>IP</th>
</tr>
<tr>
    <td>1</td>
    <td>server01</td>
    <td>server-01</td>
    <td>192.168.100.1</td>
</tr>
<tr>
    <td>2</td>
    <td>server02</td>
    <td>server-02</td>
    <td>192.168.100.2</td>
</tr>
</table>'''

table = from_html(html_string)

print(table[0])
```

```bash
+------+----------+-----------+---------------+
| code |   uuid   |    name   |       IP      |
+------+----------+-----------+---------------+
|  1   | server01 | server-01 | 192.168.100.1 |
|  2   | server02 | server-02 | 192.168.100.2 |
+------+----------+-----------+---------------+
```

`from_html()` 方法将返回 `list` 对象，其元素为 HTML 中每一个表格。

### 4.3 打印 SQL 中的表格

```python
import sqlite3
from prettytable import from_db_cursor

conn = sqlite3.connect('/tmp/sqlite.db')
cur = conn.cursor()
cur.execute('SELECT * FROM res')
table = from_db_cursor(cur)

print(table)
```

### 4.4 选择性输出

```python
## 输出指定的列
print(table.get_string(fields=['Area', 'Population']))

## 输出指定的行，start 和 end 参数可以自由控制显示区间
print(table.get_string(start=0, end=2))

## 将表格切片
print(table[0:2])

## 输出排序
print(table.get_string(sortby='City name', reversesort=True))
```

### 4.5 输出为 HTML、JSON、CSV

```python
table.get_html_string()
table.get_csv_string()
table.get_json_string()
table.get_string()
```

## 5. 样式

### 5.1 指定对齐方式

`'l'`、`'c'`、`'r'` 分别表示左对齐、居中和右对齐。

```python
table.align['City name'] = 'l'
table.align['Area'] = 'c'
table.align['Population'] = 'r'
table.align['Annual Rainfall'] = 'c'
```

### 5.2 控制边框样式

- `table.border`：控制是否显示边框，默认是 `True`
- `table.junction_char`：控制边框连接符
- `table.horizontal_char`：控制横边框符号
- `table.vertical_char`：控制竖边框符号

```python
from prettytable import PrettyTable

tb = PrettyTable()
tb.field_names = ['City name', 'Area', 'Population', 'Annual Rainfall']
tb.add_row(['Adelaide', 1295, 1158259, 600.5])
tb.add_row(['Brisbane', 5905, 1857594, 1146.4])
tb.add_row(['Darwin', 112, 120900, 1714.7])
tb.add_row(['Hobart', 1357, 205556, 619.5])

tb.border = True
tb.junction_char = '$'
tb.horizontal_char = '+'
tb.vertical_char = '%'

print(tb)
```

```bash
$+++++++++++$++++++$++++++++++++$+++++++++++++++++$
% City name % Area % Population % Annual Rainfall %
$+++++++++++$++++++$++++++++++++$+++++++++++++++++$
%  Adelaide % 1295 %  1158259   %      600.5      %
%  Brisbane % 5905 %  1857594   %      1146.4     %
%   Darwin  % 112  %   120900   %      1714.7     %
%   Hobart  % 1357 %   205556   %      619.5      %
$+++++++++++$++++++$++++++++++++$+++++++++++++++++$
```
