import sys

import cv2
import numpy as np
from PySide6.QtCore import QTimer
from PySide6.QtGui import QImage, QPixmap
from PySide6.QtWidgets import QApplication, QLabel, QMainWindow


class MainWindow(QMainWindow):
    def __init__(self) -> None:
        super().__init__()

        # 使用 OpenCV 初始化摄像头
        self._video = cv2.VideoCapture(0)

        # 初始化定时器
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(30)

        # 初始化 UI
        self._image_label = QLabel()
        self._image_label.setStyleSheet("background-color: #000")
        self.setCentralWidget(self._image_label)

    def __del__(self):
        """释放资源"""
        self._video.release()

    def dispaly_frame(self, frame: np.ndarray):
        """渲染帧"""
        image = QImage(
            frame.data,
            frame.shape[1],
            frame.shape[0],
            frame.strides[0],
            QImage.Format.Format_BGR888,
        )
        self._image_label.setPixmap(QPixmap.fromImage(image))

    def update_frame(self):
        """更新帧"""
        ret, frame = self._video.read()
        if ret:
            self.dispaly_frame(frame)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
