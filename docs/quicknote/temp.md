# 临时计划

*@TODO* 计划列表：

- [ ] Python 构建插件系统
- [ ] 各种不同的 Python 虚拟环境方案
- [ ] Python + WebAssembly
- [ ] 构建周期性任务调度框架
- [ ] 构建视频处理框架
- [ ] 构建原子化图片处理框架
- [ ] 使用 `TypedDict` 构造类型字典
- [ ] 如何构建像 SymPy 一样的代数系统
- [x] 从零构建 JS 逆向工具，通过网站验签 ***此项目加入爬虫计划***
- [ ] PySide6: 添加笔记：Tree/Table 扩展最后一行/列
- [ ] Celery：Python 异步任务调度
- [ ] Rocketry：Python 下的轻量调度框架

## OpenCV 增加图像对比度

当使用Python和OpenCV增加图像的对比度时，可以使用`cv2.convertScaleAbs()`函数。该函数可以根据给定的对比度参数对图像进行线性变换。下面是一个详细的代码示例：

```python
import cv2
import numpy as np

def increase_contrast(image, alpha, beta):
    # 创建一个具有相同形状和数据类型的零矩阵
    adjusted_image = np.zeros_like(image)
    
    # 对图像进行线性变换
    adjusted_image = cv2.convertScaleAbs(image, adjusted_image, alpha, beta)
    
    return adjusted_image

# 读取图像
image = cv2.imread('input.jpg')

# 设置对比度增益参数
alpha = 1.5  # 对比度增益
beta = 0    # 亮度增益

# 增加对比度
adjusted_image = increase_contrast(image, alpha, beta)

# 显示原始图像和增加对比度后的图像
cv2.imshow('Original Image', image)
cv2.imshow('Adjusted Image', adjusted_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

在上述代码中，`increase_contrast()`函数接受输入图像、对比度增益参数`alpha`和亮度增益参数`beta`。它创建一个与输入图像具有相同形状和数据类型的零矩阵`adjusted_image`，然后使用`cv2.convertScaleAbs()`函数对图像进行线性变换。最后，通过使用`cv2.imshow()`函数显示原始图像和增加对比度后的图像。

请注意，`alpha`参数用于控制对比度的增益，取值范围为大于0的浮点数。`beta`参数用于控制亮度的增益，取值范围为整数。根据具体需求，你可以调整这些参数的值以获得所需的效果。

## ENV 会在多阶段中共享吗

在Docker多阶段构建中，使用`ENV`指令设置的环境变量在多个构建阶段之间是不共享的。每个构建阶段都有自己的环境，并且`ENV`指令在每个阶段都会创建一个新的环境变量。

这意味着，在一个构建阶段中设置的环境变量在另一个构建阶段中是不可见的。当一个构建阶段结束时，该阶段设置的环境变量将不会传递到下一个构建阶段。

以下是一个示例的Dockerfile，演示了多阶段构建中的环境变量的作用范围：

```dockerfile
# 第一个构建阶段
FROM python:3.9 AS builder

# 设置环境变量
ENV MY_VAR="Hello from Builder"

# 执行构建阶段的操作
RUN echo $MY_VAR

# 第二个构建阶段
FROM python:3.9 AS final

# 从第一个阶段复制文件和环境变量
COPY --from=builder /app /app

# 这里的环境变量是空的，因为它们不共享
RUN echo $MY_VAR
```

在上述示例中，第一个构建阶段中设置的`MY_VAR`环境变量可以在该阶段内使用，并通过`echo`命令打印出来。然而，在第二个构建阶段中，当我们尝试打印`MY_VAR`环境变量时，它将为空，因为它不会从第一个阶段传递到第二个阶段。

要在多个构建阶段之间共享环境变量，可以使用`ARG`指令将构建参数传递给多个阶段，然后在每个阶段中使用`ENV`指令设置环境变量。这样可以确保在多个构建阶段中都可以访问和使用相同的环境变量。
