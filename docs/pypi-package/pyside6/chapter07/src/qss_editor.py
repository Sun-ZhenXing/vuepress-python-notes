import sys

from PySide6.QtWidgets import (
    QApplication,
    QCheckBox,
    QFormLayout,
    QLabel,
    QLineEdit,
    QMainWindow,
    QPlainTextEdit,
    QPushButton,
    QRadioButton,
    QSpinBox,
    QVBoxLayout,
    QWidget,
)

STYLE = """QMainWindow {
    background-color: #212121;
}
QLabel {
    color: #e9e9e9;
}
QPushButton {
    background-color: orange;
    font-family: 'Arial';
    font-size: 14px;
    font-weight: bold;
}
"""


class QSSEditor(QWidget):
    def __init__(self, parent: QWidget | None = None):
        super().__init__()

        self._parent = parent
        self.resize(480, 320)
        self.setWindowTitle("QSS Editor")

        self._editor = QPlainTextEdit()
        self._editor.setStyleSheet(
            "background-color: #212121;color: #e9e9e9;"
            "font-family: Consolas; font-size: 16px; "
        )
        self._editor.setFont("Consolas")
        self._editor.setPlainText(STYLE)
        self._editor.textChanged.connect(self.update_style)

        layout = QVBoxLayout()
        layout.addWidget(self._editor)
        self.setLayout(layout)

        self.show()

    def update_style(self):
        qss = self._editor.toPlainText()
        try:
            self._parent.setStyleSheet(qss)
        except:
            pass


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        layout = QFormLayout()
        layout.addRow("QCheckBox", QCheckBox())
        layout.addRow("QRadioButton", QRadioButton())
        layout.addRow("QLabel", QLabel("QLabel"))
        layout.addRow("QPushButton", QPushButton("QPushButton"))
        layout.addRow("QLineEdit", QLineEdit("QLineEdit"))
        layout.addRow("QSpinBox", QSpinBox())

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)

        label = QLabel("QLabel")
        label.setObjectName("label")
        layout.addRow(label)

        self._qss_editor = QSSEditor(self)
        self.setStyleSheet(STYLE)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
