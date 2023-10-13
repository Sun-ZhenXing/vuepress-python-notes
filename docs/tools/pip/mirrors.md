# pip 使用镜像

[[TOC]]

## 1. 临时使用镜像

使用 `pip` 时使用 `-i` 指定一个镜像地址，例如使用清华大学镜像安装 `opencv-python`：

::: code-tabs#sys

@tab Linux/Mac

```bash
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple opencv-python
```

@tab Windows

```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple opencv-python
```

:::

## 2. 全局设置镜像

以清华大学 PyPI 镜像为例，如果需要设置到别的镜像请替换 URL 地址：

::: code-tabs#sys

@tab Linux/Mac

```bash
# 在此指定你的镜像地址
export mirror_url='https://pypi.tuna.tsinghua.edu.cn/simple'

# 首先更新 pip 确保 pip config 可用
python3 -m pip install -i ${mirror_url} --upgrade pip

# 设置镜像
pip3 config set global.index-url ${mirror_url}
```

@tab Windows

```bash
# 在此指定你的镜像地址
set mirror_url=https://pypi.tuna.tsinghua.edu.cn/simple

# 首先更新 pip 确保 pip config 可用
python -m pip install -i %mirror_url% --upgrade pip

# 设置镜像
pip config set global.index-url %mirror_url%
```

:::

## 3. 在镜像间进行负载均衡

对于中国大陆的镜像站，可从 [中国教育和科研计算机网](https://mirrors.cernet.edu.cn/list/pypi) 进行获取。

中国大陆常见镜像网站：

```bash
pip3 config set global.extra-index-url "https://pypi.tuna.tsinghua.edu.cn/simple/ https://mirrors.aliyun.com/pypi/simple/"
```

请先依据上面的命令升级 pip，然后将各个 URL 用空格分开：

::: code-tabs#sys

@tab Linux/Mac

```bash
pip3 config set global.extra-index-url "<url1> <url2>..."
```

@tab Windows

```bash
pip config set global.extra-index-url "<url1> <url2>..."
```

:::
