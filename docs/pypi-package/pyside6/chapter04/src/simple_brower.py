import sys

from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWidgets import QApplication, QMainWindow


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Web View")
        self._browser = QWebEngineView()
        self._browser.load("https://www.bing.com/")
        self.setCentralWidget(self._browser)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.showMaximized()
    app.exit(app.exec())
