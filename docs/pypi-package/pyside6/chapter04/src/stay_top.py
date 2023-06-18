import sys

from PySide6.QtCore import Qt
from PySide6.QtWidgets import QApplication, QWidget

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = QWidget()
    window.setWindowFlags(Qt.WindowStaysOnTopHint)
    window.show()
    sys.exit(app.exec())
