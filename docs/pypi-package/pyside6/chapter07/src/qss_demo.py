import sys

from PySide6.QtCore import QFile, Qt
from PySide6.QtWidgets import QApplication, QLabel, QMainWindow


class QSSLoader:
    def __init__(self, path: str) -> None:
        self._path = path

    def load(self) -> str:
        f = QFile(self._path)
        f.open(QFile.ReadOnly | QFile.Text)
        stylesheet = f.readAll()
        return stylesheet.data().decode("utf-8")


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("QSS Demo")
        self.resize(400, 300)

        label = QLabel("Hello World")
        label.setAlignment(Qt.AlignCenter)
        self.setCentralWidget(label)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.setStyleSheet(QSSLoader("style.qss").load())
    window.show()
    sys.exit(app.exec())
