---
title: sqlite3 - SQLite 数据库
description: sqlite3 - SQLite 数据库
---

# sqlite3 - SQLite 数据库

::: warning

*@TODO* 本文未列出参考源，也未给出示例。教程部分没有写完整。

需要补充的内容：
- 如何编写自动类型适配
- 更多示例代码，特别是 How-to

:::

[[TOC]]

## 1. SQLite 介绍

| 项目        | 信息                                                                     |
| ----------- | ------------------------------------------------------------------------ |
| 源代码      | [Lib/sqlite3/](https://github.com/python/cpython/tree/3.11/Lib/sqlite3/) |
| Python 版本 | 全版本                                                                   |
| 标签        | 文件和目录                                                               |

SQLite 是一个 C 语言库，它可以提供一种轻量级的基于磁盘的数据库，这种数据库不需要独立的服务器进程，也允许需要使用一种非标准的 SQL 查询语言来访问它。一些应用程序可以使用 SQLite 作为内部数据存储。可以用它来创建一个应用程序原型，然后再迁移到更大的数据库，比如 PostgreSQL 或 Oracle。

使用 `sqlite3.connect()` 函数连接数据库，返回一个 `Connection` 对象，我们就是通过这个对象与数据库进行交互。

数据库文件的格式是 `filename.db`，如果该数据库文件不存在，那么它会被自动创建。该数据库文件是放在电脑硬盘里的，你可以自定义路径，后续操作产生的所有数据都会保存在该文件中。SQLite 还支持内存数据库，不创建任何文件进行处理数据，速度更快。

## 2. 创建和使用数据库

导入并创建连接：

```python
import sqlite3

conn = sqlite3.connect('test.db')
```

如果不需要保存在本地，在内存中创建数据，使用 `:memory:` 即可：

```python
conn = sqlite3.connect(':memory:')
```

建立与数据库的连接后，需要创建一个游标对象，该对象的 `execute()` 方法可以执行 SQL 命令，让我们能够进行数据操作。

```python
# 创建一个游标 cursor
cur = conn.cursor()

# 创建表
cur.execute('''CREATE TABLE stocks
               (date text, trans text, symbol text, qty real, price real)''')

# 插入一行数据
cur.execute("INSERT INTO stocks VALUES ('2006-01-05','BUY','RHAT',100,35.14)")

# 提交数据
con.commit()

# 关闭连接
con.close()
```

使用迭代器获取数据：

```python
for row in cur.execute('SELECT * FROM stocks ORDER BY price')
    print(row)
```

## 3. SQLite3 语法

所有的 SQLite 语句可以以任何关键字开始，如 `SELECT`、`INSERT`、`UPDATE`、`DELETE`、`ALTER、DROP` 等，所有的语句以分号 `;` 结束。

SQLite `ANALYZE` 语法：

```sql
ANALYZE;
-- 或者
ANALYZE database_name;
-- 或者
ANALYZE database_name.table_name;
```

SQLite `AND / OR` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION-1 {AND|OR} CONDITION-2;
```

SQLite `ALTER TABLE` 语法：

```sql
ALTER TABLE table_name ADD COLUMN column_def...;
```

SQLite `ALTER TABLE` 语句（Rename）：

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```

SQLite `ATTACH DATABASE` 语法：

```sql
ATTACH DATABASE 'DatabaseName' As 'Alias-Name';
```

SQLite `BEGIN TRANSACTION` 语法：

```sql
BEGIN;
-- 或者
BEGIN EXCLUSIVE TRANSACTION;
```

SQLite `BETWEEN` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name BETWEEN val-1 AND val-2;
```

SQLite `COMMIT` 语法：

```sql
COMMIT;
```

SQLite `CREATE INDEX` 语法：

```sql
CREATE INDEX index_name
ON table_name ( column_name COLLATE NOCASE );
```

SQLite `CREATE UNIQUE INDEX` 语法：

```sql
CREATE UNIQUE INDEX index_name
ON table_name ( column1, column2,...columnN);
```

SQLite `CREATE TABLE` 语法：

```sql
CREATE TABLE table_name(
   column1 datatype,
   column2 datatype,
   column3 datatype,
   .....
   columnN datatype,
   PRIMARY KEY( one or more columns )
);
```

SQLite `CREATE TRIGGER` 语法：

```sql
CREATE TRIGGER database_name.trigger_name 
BEFORE INSERT ON table_name FOR EACH ROW
BEGIN 
   stmt1; 
   stmt2;
   ....
END;
```

SQLite `CREATE VIEW` 语法：

```sql
CREATE VIEW database_name.view_name  AS
SELECT statement....;
```

SQLite `CREATE VIRTUAL TABLE` 语法：

```sql
CREATE VIRTUAL TABLE database_name.table_name USING weblog( access.log );
-- 或者
CREATE VIRTUAL TABLE database_name.table_name USING fts3( );
```

SQLite `COMMIT TRANSACTION` 语法：

```sql
COMMIT;
```

SQLite `COUNT` 子句：

```sql
SELECT COUNT(column_name)
FROM   table_name
WHERE  CONDITION;
```

SQLite `DELETE` 语法：

```sql
DELETE FROM table_name
WHERE  {CONDITION};
```

SQLite `DETACH DATABASE` 语法：

```sql
DETACH DATABASE 'Alias-Name';
```

SQLite `DISTINCT` 子句：

```sql
SELECT DISTINCT column1, column2....columnN
FROM   table_name;
```

SQLite `DROP INDEX` 语法：

```sql
DROP INDEX database_name.index_name;
```

SQLite `DROP TABLE` 语法：

```sql
DROP TABLE database_name.table_name;
```

SQLite `DROP VIEW` 语法：

```sql
DROP VIEW view_name;
```

SQLite `DROP TRIGGER` 语法：

```sql
DROP TRIGGER trigger_name
```

SQLite `EXISTS` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name EXISTS (SELECT * FROM   table_name );
```

SQLite `EXPLAIN` 语法：

```sql
EXPLAIN INSERT statement...;
-- 或者
EXPLAIN QUERY PLAN SELECT statement...;
```

SQLite `GLOB` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name GLOB { PATTERN };
```

SQLite `GROUP BY` 子句：

```sql
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name;
```

SQLite `HAVING` 子句：

```sql
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name
HAVING (arithematic function condition);
```

SQLite `INSERT INTO` 语法：

```sql
INSERT INTO table_name( column1, column2....columnN)
VALUES ( value1, value2....valueN);
```

SQLite `IN` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name IN (val-1, val-2,...val-N);
```

SQLite `Like` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name LIKE { PATTERN };
```

SQLite `NOT IN` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name NOT IN (val-1, val-2,...val-N);
```

SQLite `ORDER BY` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION
ORDER BY column_name {ASC|DESC};
```

SQLite `PRAGMA` 语法：

```sql
PRAGMA pragma_name;

-- For example:

PRAGMA page_size;
PRAGMA cache_size = 1024;
PRAGMA table_info(table_name);
```

SQLite `RELEASE SAVEPOINT` 语法：

```sql
RELEASE savepoint_name;
```

SQLite `REINDEX` 语法：

```sql
REINDEX collation_name;
REINDEX database_name.index_name;
REINDEX database_name.table_name;
```

SQLite `ROLLBACK` 语法：

```sql
ROLLBACK;
-- 或者
ROLLBACK TO SAVEPOINT savepoint_name;
```

SQLite `SAVEPOINT` 语法：

```sql
SAVEPOINT savepoint_name;
```

SQLite `SELECT` 语法：

```sql
SELECT column1, column2....columnN
FROM   table_name;
```

SQLite `UPDATE` 语法：

```sql
UPDATE table_name
SET column1 = value1, column2 = value2....columnN=valueN
[ WHERE  CONDITION ];
```

SQLite `VACUUM` 语法：

```sql
VACUUM;
```

SQLite `WHERE` 子句：

```sql
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION;
```
