# jinja2 - 强大的模板引擎

[[TOC]]

## 1. 项目简介

| 项目        | 信息                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------- |
| 项目地址    | [PyPI](https://pypi.org/project/parso/) \| [GitHub](https://github.com/davidhalter/parso) |
| 官方文档    | [parso.readthedocs.org](https://parso.readthedocs.org/en/latest/)                         |
| 开源协议    | MIT                                                                                       |
| Python 版本 | Python 3.6 ~ 3.11                                                                         |
| 标签        | compiler                                                                                  |

Jinja2 是一个现代的，设计者友好的，仿照 Django 模板的 Python 模板语言。它速度快，被广泛使用，并且提供了可选的沙箱模板执行环境保证安全：

```jinja-html
<title>{% block title %}{% endblock %}</title>
<ul>
{% for user in users %}
  <li><a href="{{ user.url }}">{{ user.username }}</a></li>
{% endfor %}
</ul>
```

特性：
- 沙箱中执行
- 强大的 HTML 自动转义系统保护系统免受 XSS
- 模板继承
- 及时编译最优的 Python 代码
- 可选提前编译模板的时间
- 易于调试，异常的行数直接指向模板中的对应行
- 可配置的语法

选择 Jinja 作为名字是因为 Jinja 是日本寺庙的名称，并且 temple 和 template 的发音类似。它并不是以乌干达的金贾市（Jinja）命名的。

快速安装：

```bash
pip install -U Jinja2
```

基本示例：

```python
from jinja2 import Template
template = Template('Hello {{ name }}!')
template.render(name='John Doe')
# 'Hello John Doe!'
```

通过创建一个 `Template` 的实例，你会得到一个新的模板对象，提供一个名为 `render()` 的方法，该方法在有字典或关键字参数时调用扩充模板。字典或关键字参数会被传递到模板，即模板 “**上下文**”。

## 2. jinja2 语法

::: info 官方文档

[jinja2 语法](https://jinja.palletsprojects.com/) 官方文档。

:::

### 2.1 基础语法

Jinja2 既是模板引擎，也是一种模板语言。

Jinja2 语言可以使用任意扩展名，但也可以设置为 `.jinja` 来确保 IDE 可以增强编写体验。

Jinja2 模版语言类似于 Python，比较符合 Python 语法，但有很多语法不同。

```jinja-html
{% extends "base.html" %}
{% block title %}Members{% endblock %}
{% block content %}
  <ul>
  {% for user in users %}
    <li><a href="{{ user.url }}">{{ user.username }}</a></li>
  {% endfor %}
  </ul>
{% endblock %}
```

Jinja2 模版语言，是不区分缩进的，和纯 Python 不同。

注释：

```jinja-html
{# 这是注释 #}
```

变量：

```jinja-html
{{ post.title }}
```

字典元素：

```jinja-html
{{ your_dict['key'] }}
```

列表元素：

```jinja-html
{{ your_list[0] }}
```

方法或函数：

```jinja-html
{{ obj.somemethod() }}
```

语句：

```jinja-html
{% ... %}
```

多行代码块：

```jinja-html
{% begin %}
  ...
{% end %}
```

分隔符：
- `{% ... %}` 语句
- `{{ ... }}` 模板表达式
- `{# ... #}` 注释

基础示例 1：

```jinja-html
{% if user %}
  {{ user }}
{% else %}
  hello!
  {% for index in indexs %}
    {{ index }} 
{% endfor %}
```

基础示例 2：

```jinja-html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Webpage</title>
</head>
<body>
  <ul id="navigation">
  {% for item in navigation %}
    <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
  {% endfor %}
  </ul>

  <h1>My Webpage</h1>
  {{ a_variable }}

  {# a comment #}
</body>
</html>
```

赋值语句：

```jinja-html
{% set navigation = [('index.html', 'Index'), ('about.html', 'About')] %}
{% set key, value = call_something() %}
```

### 2.2 过滤器

过滤器的语法为 `var | filter`，有点类似于 Unix 的管道，返回将 `filter` 应用于 `var` 的结果。

```jinja-html
{# 带参数 #}
{{ var | filter(*args) }}

{# 不带参数 #}
{{ var | filter }}
```

过滤器可以一次调用多个：

```jinja-html
{{ "hello world" | reverse | upper }}
```

文本块调用（将中间的所有文字都作为变量内容传入到过滤器中）：

```jinja-html
{% filter upper %}
  一大堆文字
{% endfilter %}
```

常用过滤器：

| 字符串操作   | 功能                     |
| ------------ | ------------------------ |
| `safe`       | 禁用转义                 |
| `e`          | 转义字符串               |
| `capitalize` | 首字母大写               |
| `upper`      | 转为大写                 |
| `lower`      | 转为小写                 |
| `title`      | 每个单词首字母都转为大写 |
| `reverse`    | 反转                     |
| `format`     | 格式化                   |
| `striptags`  | 去除标签                 |
| `truncate`   | 截断字符串               |
| `trim`       | 去掉首位空字符           |
| `replace`    | 替换操作                 |

示例：

```jinja-html
{{ '<em>hello</em>' | safe }}
{# '<em>hello</em>' #}

{{ 'hello every one' | truncate(9)}}
{# 'hello...' #}

{{ '<em>hello</em>' | striptags }}
{# 'hello' #}

{{ '%s is %d' | format('name',17) }}
{# 'name is 17' #}
```

列表操作：

| 列表操作 | 功能         |
| -------- | ------------ |
| `first`  | 第一个元素   |
| `last`   | 最后一个元素 |
| `length` | 列表长度     |
| `sum`    | 列表和       |
| `sort`   | 排序后的列表 |

示例：

```jinja-html
first：取第一个元素
<p>{{ [1,2,3,4,5,6] | first }}</p>

last：取最后一个元素
<p>{{ [1,2,3,4,5,6] | last }}</p>

length：获取列表长度
<p>{{ [1,2,3,4,5,6] | length }}</p>

sum：列表求和
<p>{{ [1,2,3,4,5,6] | sum }}</p>

sort：列表排序
<p>{{ [6,2,3,1,5,4] | sort }}</p>
```

其他常见操作：

| 其他操作  | 功能                        |
| --------- | --------------------------- |
| `default` | 默认值                      |
| `join`    | 相当于字符串的 `.join(...)` |
| `int`     | 转为整数                    |
| `round`   | 四舍五入                    |
| `escape`  | 转义                        |
| `first`   | 第一个                      |

示例：

```jinja-html
{{ my_variable | default('my_variable is not defined') }}
{# 如果没有定义返回 'my_variable is not defined' #}

{{ items | join(', ') }}
{# '1, 2, 3, 4' 当 items = [1, 2, 3, 4] 时 #}
```

[全部过滤器](https://jinja.palletsprojects.com/en/3.1.x/templates/#builtin-filters)：

| 过滤器             |
| ------------------ |
| `abs()`            |
| `forceescape()`    |
| `map()`            |
| `select()`         |
| `unique()`         |
| `attr()`           |
| `format()`         |
| `max()`            |
| `selectattr()`     |
| `upper()`          |
| `batch()`          |
| `groupby()`        |
| `min()`            |
| `slice()`          |
| `urlencode()`      |
| `capitalize()`     |
| `indent()`         |
| `pprint()`         |
| `sort()`           |
| `urlize()`         |
| `center()`         |
| `int()`            |
| `random()`         |
| `string()`         |
| `wordcount()`      |
| `default()`        |
| `items()`          |
| `reject()`         |
| `striptags()`      |
| `wordwrap()`       |
| `dictsort()`       |
| `join()`           |
| `rejectattr()`     |
| `sum()`            |
| `xmlattr()`        |
| `escape()`         |
| `last()`           |
| `replace()`        |
| `title()`          |
| `filesizeformat()` |
| `length()`         |
| `reverse()`        |
| `tojson()`         |
| `first()`          |
| `list()`           |
| `round()`          |
| `trim()`           |
| `float()`          |
| `lower()`          |
| `safe()`           |
| `truncate()`       |

### 2.3 测试

使用 `is equalto` 判断是否相等：

```jinja-html
{% if user.age is equalto 42 %}
{# 这里也可以写成... is equalto(42) #}
  Ha, you are 42!
{% endif %}
```

全部测试：

| 测试            |
| --------------- |
| `boolean()`     |
| `even()`        |
| `in()`          |
| `mapping()`     |
| `sequence()`    |
| `callable()`    |
| `false()`       |
| `integer()`     |
| `ne()`          |
| `string()`      |
| `defined()`     |
| `filter()`      |
| `iterable()`    |
| `none()`        |
| `test()`        |
| `divisibleby()` |
| `float()`       |
| `le()`          |
| `number()`      |
| `true()`        |
| `eq()`          |
| `ge()`          |
| `lower()`       |
| `odd()`         |
| `undefined()`   |
| `escaped()`     |
| `gt()`          |
| `lt()`          |
| `sameas()`      |
| `upper()`       |

### 2.4 分支和循环

`if` 语句：

```jinja-html
{% if kenny.sick %}
  Kenny is sick.
{% elif kenny.dead %}
  You killed Kenny! You bastard!!!
{% else %}
  Kenny looks okay -- so far
{% endif %}
```

使用 `for` 语句在使用之前可以判断是否为空，因为模板引擎不会检查 `users` 是否存在：

```jinja-html
{% if users %}
<ul>
{% for user in users %}
  <li>{{ user.username|e }}</li>
{% endfor %}
</ul>
{% endif %}
```

`break` 和 `continue` 也可以使用：

```jinja-html
{% for user in users %}
  {%- if loop.index >= 10 %}{% break %}{% endif %}
{%- endfor %}
```

- `loop.index`：循环当前迭代（从 1 开始）
- `loop.index0`：循环当前迭代（从 0 开始）
- `loop.revindex`：循环迭代的数量（从 1 开始）
- `loop.revindex0`：循环迭代的数量（从 0 开始）
- `loop.first`：是否为迭代的第一步
- `loop.last`：是否为迭代的最后一步
- `loop.length`：序列中元素的数量

一些全局函数：

```jinja-html
<ul>
{% for user in users %}
  <li>{{ user.username }}</li>
{% endfor %}
{% for number in range(10 - users|count) %}
  <li class="empty"><span>...</span></li>
{% endfor %}
</ul>
```

一些全局函数：

| 全局函数      | 功能                    |
| ------------- | ----------------------- |
| `range()`     | 相当于 Python `range()` |
| `lipsum()`    | 生成段落测试            |
| `dict()`      | 相当于 Python `dict()`  |
| `cycler()`    | 生成序列的循环          |
| `joiner()`    | 连接字符串对象          |
| `namespace()` | 创建新的命名空间        |

### 2.5 宏

宏类似于 Python 中的函数，我们在宏中定义行为，还可以进行传递参数。定义一个宏的关键字是 `macro`，后面跟宏的名称和参数等。

```jinja-html
{% macro input(name,age=18) %}
  <input type='text' name="{{ name }}" value="{{ age }}" >
{% endmacro %}
```

### 2.6 继承和骨架

`extends` 可以让我们引用别的文件来自动插入：

```jinja-html
{% extends "base.html" %}
```

配合 `block` 语法可以构成页面的骨架：

```jinja-html
{% block footer %}
  footer para.
{% endblock %}
```

其中 `footer` 可以被替换为 `title`、`head`、`sidebar`、`content` 等。`block` 同名的对象只能定义一次，但可以被多次引用：

```jinja-html
<title>{% block title %}{% endblock %}</title>
<h1>{{ self.title() }}</h1>
{% block body %}{% endblock %}
```

### 2.7 扩展语法

执行但不输出：

```jinja-html
{% do navigation.append('a string') %}
```

Debug 输出：

```jinja-html
<pre>{% debug %}</pre>
```

With 语句运行声明局域变量：

```jinja-html
{% with %}
    {% set foo = 42 %}
    {{ foo }}           foo is 42 here
{% endwith %}
foo is not visible here any longer

{% with a={}, b=a.attribute %}...{% endwith %}

{% with foo = 42 %}
  {{ foo }}
{% endwith %}

{% with %}
  {% set foo = 42 %}
  {{ foo }}
{% endwith %}
```

区域内转义：

```jinja-html
{% autoescape true %}
  Autoescaping is active within this block
{% endautoescape %}

{% autoescape false %}
  Autoescaping is inactive within this block
{% endautoescape %}
```

## 附录：基准测试

我们相当厌烦基准测试，尤其是因为它们并不能影响什么。一个模板的性能取决于许多因素，而你可能需要在不同环境中对不同的引擎做基准测试。测试套件中的基准测试表明，Jinja2 与 [Mako](http://www.makotemplates.org/) 的性能相近，比 Django 的模板引擎或 Genshi 快 10 到 20 倍。这些数字应该相当有刺激性，因为基准测试只测试一些性能相关的场景，比如循环，来获取这些数字。大体上，一个模板引擎的性能几乎不会成为一个 Web 应用的瓶颈，而应该是 **数据库或应用的代码**。
