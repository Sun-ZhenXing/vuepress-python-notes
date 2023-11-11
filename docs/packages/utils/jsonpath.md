# jsonpath - 通过表达式解析 JSON

JSONPath 之于 JSON，就如 XPath 之于 XML。JSONPath 可以方便对 JSON 数据结构进行内容提取。[^1]

[^1]: <https://apifox.com/help/reference/json-path/>

根对象使用 `$` 来表示，而无需区分是对象还是数组。

表达式可以使用 `.`，也可以使用 `[]`。如：

`$.store.book[0].title` 或 `$['store']['book'][0]['title']`。

表达式 `(<expr>)` 可用作显式名称或索引的替代，如：

`$.store.book[(@.length-1)].title` 表示获取最后一个 `book` 的 `title`。

使用符号 `@` 表示当前对象。过滤器表达式通过语法支持，`?(<boolean expr>)` 如：

`$.store.book[?(@.price < 10)].title` 表示获取价格小于 `10` 的所有 `book` 的 `title`。

## 要点

- `$` 表示文档的根元素
- `@` 表示文档的当前元素
- `.node_name` 或 `['node_name']` 匹配下级节点
- `[index]` 检索数组中的元素
- `[start:end:step]` 支持数组切片语法
- `*` 作为通配符，匹配所有成员
- `..` 子递归通配符，匹配成员的所有子元素
- `(<expr>)` 使用表达式
- `?(<boolean expr>)` 进行数据筛选

JsonPath 是一种用于从 JSON 数据中提取信息的语言。它类似于 XPath，但是专门用于 JSON 数据。以下是 JsonPath 的语法：

- `$`：表示根节点。
- `@`：表示当前节点。
- `.`：表示子节点。
- `..`：表示子孙节点。
- `*`：表示通配符，匹配任意节点。
- `[]`：表示索引，可以匹配数组中的元素或对象中的属性。
- `[,]`：表示多索引，可以同时匹配多个索引。
- `[:n]`：表示从第一个元素开始到第 n 个元素。
- `[-n:]`：表示从倒数第 n 个元素开始到最后一个元素。
- `[start:end:step]`：表示从第 start 个元素开始到第 end 个元素，步长为 step。

下面是几个示例：

假设我们有以下 JSON 数据：

```json
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
```

- `$`：表示整个 JSON 数据。

```json
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
```

- `$.store`：表示 store 对象。

```json
{
  "book": [
    {
      "category": "reference",
      "author": "Nigel Rees",
      "title": "Sayings of the Century",
      "price": 8.95
    },
    {
      "category": "fiction",
      "author": "Evelyn Waugh",
      "title": "Sword of Honour",
      "price": 12.99
    },
    {
      "category": "fiction",
      "author": "Herman Melville",
      "title": "Moby Dick",
      "isbn": "0-553-21311-3",
      "price": 8.99
    },
    {
      "category": "fiction",
      "author": "J. R. R. Tolkien",
      "title": "The Lord of the Rings",
      "isbn": "0-395-19395-8",
      "price": 22.99
    }
  ],
  "bicycle": {
    "color": "red",
    "price": 19.95
  }
}
```

- `$.store.book[*]`：表示所有书籍。

```json
[
  {
    "category": "reference",
    "author": "Nigel Rees",
    "title": "Sayings of the Century",
    "price": 8.95
  },
  {
    "category": "fiction",
    "author": "Evelyn Waugh",
    "title": "Sword of Honour",
    "price": 12.99
  },
  {
    "category": "fiction",
    "author": "Herman Melville",
    "title": "Moby Dick",
    "isbn": "0-553-21311-3",
    "price": 8.99
  },
  {
    "category": "fiction",
    "author": "J. R. R. Tolkien",
    "title": "The Lord of the Rings",
    "isbn": "0-395-19395-8",
    "price": 22.99
  }
]
```

- `$.store.book[2]`：表示第三本书（索引从 0 开始）。

```json
{
  "category": "fiction",
  "author": "Herman Melville",
  "title": "Moby Dick",
  "isbn": "0-553-21311-3",
  "price": 8.99
}
```

- `$.store.book[-2:]`：表示最后两本书。

```json
[
  {
    "category": "fiction",
    "author": "Herman Melville",
    "title": "Moby Dick",
    "isbn": "0-553-21311-3",
    "price": 8.99
  },
  {
    "category": "fiction",
    "author": "J. R. R. Tolkien",
    "title": "The Lord of the Rings",
    "isbn": "0-395-19395-8",
    "price": 22.99
  }
]
```

- `$.store.book[0,2]`：表示第一本和第三本书。

```json
[
  {
    "category": "reference",
    "author": "Nigel Rees",
    "title": "Sayings of the Century",
    "price": 8.95
  },
  {
    "category": "fiction",
    "author": "Herman Melville",
    "title": "Moby Dick",
    "isbn": "0-553-21311-3",
    "price": 8.99
  }
]
```

- `$.store.book[0:2]`：表示前两本书。

```json
[
  {
    "category": "reference",
    "author": "Nigel Rees",
    "title": "Sayings of the Century",
    "price": 8.95
  },
  {
    "category": "fiction",
    "author": "Evelyn Waugh",
    "title": "Sword of Honour",
    "price": 12.99
  }
]
```

- `$.store.book[-2:].title`：表示最后两本书的标题。

```json
[
  "Moby Dick",
  "The Lord of the Rings"
]
```

- `$.store..price`：表示所有价格。

```json
[
  8.95,
  12.99,
  8.99,
  22.99,
  19.95
]
```

- `$..book[?(@.price<10)]`：表示价格小于 10 的所有书籍。

```json
[
  {
    "category": "reference",
    "author": "Nigel Rees",
    "title": "Sayings of the Century",
    "price": 8.95
  },
  {
    "category": "fiction",
    "author": "Herman Melville",
    "title": "Moby Dick",
    "isbn": "0-553-21311-3",
    "price": 8.99
  }
]
```

以上就是 JsonPath 的语法和示例说明。
