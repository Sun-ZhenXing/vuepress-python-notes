import os
import sys

from PySide6.QtCore import QDir, QModelIndex
from PySide6.QtGui import QStandardItem, QStandardItemModel
from PySide6.QtWidgets import (
    QApplication,
    QFileSystemModel,
    QHBoxLayout,
    QTreeView,
    QWidget,
)


class MainWidget(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowTitle("文件浏览器")

        # 文件系统模型，只显示文件夹
        self._file_model = QFileSystemModel()
        self._file_model.setFilter(QDir.Dirs | QDir.NoDotAndDotDot)  # type: ignore
        self._file_model.setRootPath("")

        # 创建目录树视图
        self._tree_view = QTreeView(self)
        self._tree_view.setModel(self._file_model)
        self._tree_view.setHeaderHidden(True)

        # 隐藏：文件大小、类型、修改时间
        for col in range(1, 4):
            self._tree_view.setColumnHidden(col, True)

        # 设置双击为展开文件到列表
        self._tree_view.doubleClicked.connect(self.flush_filelist)

        # 文件列表模型
        self._filelist_model = QStandardItemModel()

        # 创建文件列表视图
        self._filelist_view = QTreeView(self)
        self._filelist_view.setModel(self._filelist_model)
        self._filelist_view.setEditTriggers(QTreeView.NoEditTriggers)

        # 添加布局
        layout = QHBoxLayout()
        layout.addWidget(self._tree_view)
        layout.addWidget(self._filelist_view)
        self.setLayout(layout)

    def flush_filelist(self, index: QModelIndex):
        """刷新文件列表"""
        self._filelist_model.clear()
        path = self._file_model.filePath(index)
        # 设置列表头
        self._filelist_model.setHorizontalHeaderLabels([path])

        # 遍历文件夹下的文件
        for file in os.listdir(path):
            if os.path.isfile(os.path.join(path, file)):
                item = QStandardItem(file)
                self._filelist_model.appendRow(item)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWidget()
    window.resize(600, 400)
    window.show()
    sys.exit(app.exec())
