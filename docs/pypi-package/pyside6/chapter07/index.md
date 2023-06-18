# 7. PySide6 样式和动画

[[TOC]]

## QSS 基本语法

::: tip 参考文档

- [QSS 可用属性：官方文档](https://doc.qt.io/qt-6/stylesheet-reference.html#list-of-properties)
- [QSS 官方示例](https://doc.qt.io/qt-6/stylesheet-examples.html)

:::

类似 CSS，QSS 每一条都是由一个选择器和一组声明构成：

- 选择器选出要对哪种控件进行样式修改
- 每个声明都是键值对，键为属性，值为属性值

```css
QWidget {
    color: #000;
    background-color: #fff;
}
```

## 使用方式

为降低耦合，往往把 QSS 写在一个单独的 `style.qss` 文件中，然后在 `main.py` 的 `QMainWindow` 中加载样式。

新建一个扩展名为 `.qss` 的文件，如 `style.qss`，编辑内容。

@[code css](./src/style.qss)

在 `main.py` 中加载样式：

@[code python](./src/qss_demo.py)

## 动态修改

部分参考了 [hektorprofe/curso-qt-pyside-udemy](https://github.com/hektorprofe/curso-qt-pyside-udemy) 的代码。

@[code python](./src/qss_editor.py)
