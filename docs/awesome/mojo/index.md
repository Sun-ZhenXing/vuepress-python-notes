# Mojo

[[TOC]]

## 1. Mojo 使用

使用 Docker 部署环境：

```bash
docker run -it --name mojo ubuntu:22.04 /bin/bash
```

使用镜像更新软件并安装 Mojo：

```bash
mv /etc/apt/sources.list /etc/apt/sources.list-bak
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse' >> /etc/apt/sources.list
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse' >> /etc/apt/sources.list
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse' >> /etc/apt/sources.list
echo 'deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse' >> /etc/apt/sources.list

apt update && apt install curl gnupg -y

apt-get install -y apt-transport-https &&
  keyring_location=/usr/share/keyrings/modular-installer-archive-keyring.gpg &&
  curl -1sLf 'https://dl.modular.com/bBNWiLZX5igwHXeu/installer/gpg.0E4925737A3895AD.key' |  gpg --dearmor >> ${keyring_location} &&
  curl -1sLf 'https://dl.modular.com/bBNWiLZX5igwHXeu/installer/config.deb.txt?distro=debian&codename=wheezy' > /etc/apt/sources.list.d/modular-installer.list &&
  apt-get update &&
  apt-get install -y modular

modular auth mut_45c60de967f5405d8b45bdbd48b98069 &&
  modular install mojo

echo 'export MODULAR_HOME="/root/.modular"' >> ~/.bashrc
echo 'export PATH="/root/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```
