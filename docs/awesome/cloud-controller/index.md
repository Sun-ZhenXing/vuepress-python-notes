---
title: Python 课程设计：Django 开发云控制器
description: Python 课程设计：Django 开发云控制器
sidebar: auto
---

# Python 课程设计：Django 开发云控制器

本文介绍 Python 课程设计 *Django 开发云控制器* 的设计过程和具体实现。

::: info GitHub

现在已经开源在 GitHub：[Sun-ZhenXing/python-net-controller](https://github.com/Sun-ZhenXing/python-net-controller)，不过这是实验性的项目，仅仅作文课程设计而不是生产可用的。

:::

[[TOC]]

## 1. 项目背景和课程目标

### 1.1 项目背景

随着 SDN 概念的提出和流行，越来越多的企业开始尝试使用将复杂网络结构定义为可编程的。云控制器将北向开放 RESTful API 给用户使用，南向接口负责接入不同厂商的设备，将不同的设备抽象为一致的接口，大大减少网络运行和维护的成本。

### 1.2 课程目标

本项目在云控制器项目的背景下，创建一个有代表性的、简单的场景，管理和分配不同的网络端口。

通过完成接口设计及接口实现达成以下目标：

- Python 语言在企业级项目中的使用
- Django 框架了解及使用
- RESTful API 了解及设计
- Postman 工具学习及使用

## 2. 课程设计内容

### 2.1 设计目标

使用 Django 实现一套 RESTful 风格的 API，能够支持 Port 的 CURD，并能够分配可用 IP 给 Port。同时尽可能多地实现其他网络相关结构。

### 2.2 模型设计

模型 E-R 图结构：

```mermaid
erDiagram
    Network ||--|{ Subnet: include
    Subnet  ||--|{ Port: include
    Network {
        string id PK
        string name
        string availability_zone_hints
        string status
    }
    Subnet {
        string id PK
        string name
        string cidr
        string network_id FK
    }
    Port {
        string id PK
        string name
        string ip
        string subnet_id FK
    }
```

创建数据库和表：

::: warning 数据模型

如果定义了数据模型则会使用数据模型，为了方便理解这里使用 SQL 定义。

:::

```sql
CREATE DATABASE IF NOT EXISTS `controller`;
USE `controller`;

DROP TABLE IF EXISTS `Network`;
CREATE TABLE `Network`(
    `id` VARCHAR(32),
    `name` VARCHAR(64),
    `availability_zone_hints` VARCHAR(32),
    `status` VARCHAR(32),
    PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS `Subnet`;
CREATE TABLE `Subnet`(
    `id` VARCHAR(32),
    `name` VARCHAR(64),
    `cidr` VARCHAR(32),
    `network_id` VARCHAR(32),
    PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS `Port`;
CREATE TABLE `Port`(
    `id` VARCHAR(32),
    `name` VARCHAR(64),
    `ip` VARCHAR(32),
    `subnet_id` VARCHAR(32),
    PRIMARY KEY(`id`)
);
```

模型关系约束：

- 相同 `availability_zone_hints` 下 `name` 不能重复
- 同一个 Network 下的 `Subnet.cidr` 不能重复
- 同一个子网下的 `ip` 不能重复，一般情况下 IP 由系统分配，不会重复
- 所有的 `id` 一律使用 UUID，并作为主键
- 网络的状态 `status` 只能是 `ACTIVE`（激活）、`INACTIVE`（未激活）或 `DISABLE`（禁用的）

### 2.3 接口设计

接口概览：

| 接口                      | 说明                    |
| ------------------------- | ----------------------- |
| `GET /v1/networks`        | 获取 Network 信息       |
| `GET /v1/networks/:id`    | 获取某个 Network 信息   |
| `POST /v1/networks`       | 新建 Network            |
| `DELETE /v1/networks/:id` | 删除 Network            |
| `PUT /v1/networks/:id`    | 更新某个 Network 的信息 |
| `GET /v1/subnets`         | 获取 Subnet 信息        |
| `GET /v1/subnets/:id`     | 获取某个 Subnet 信息    |
| `POST /v1/subnets`        | 新建 Subnet             |
| `DELETE /v1/subnets/:id`  | 删除 Subnet             |
| `PUT /v1/subnets/:id`     | 更新某个 Subnet 的信息  |
| `GET /v1/ports`           | 获取 Port 信息          |
| `GET /v1/ports/:id`       | 获取某个 Port 信息      |
| `POST /v1/ports`          | 新建 Port               |
| `DELETE /v1/ports/:id`    | 删除 Port               |
| `PUT /v1/ports/:id`       | 更新某个 Port 的信息    |

::: warning 关于鉴权

现阶段不涉及鉴权相关的内容，如果有鉴权需要，可以参考使用 JWT 授权，或者使用 OAuth 2.0 授权协议，需要确保通信是 SSL 连接。

:::

#### 接口：`GET /v1/networks`

- 内容：获取网络信息
- 参数：
    | 参数     | 含义                         |
    | -------- | ---------------------------- |
    | `offset` | 可选，指定返回记录的开始位置 |
    | `limit`  | 可选，限制请求数量           |
- 鉴权：无
- 请求示例：`GET /v1/networks?limit=10&offset=20`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "network001",
          "status": "ACTIVE",
          "availability_zone_hints": "az1"
        },
        {
          "id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "name": "network002",
          "status": "ACTIVE",
          "availability_zone_hints": "az1"
        },
        {
          "id": "000f0e1d-7c8f-4321-ac02-78be25fce6b7",
          "name": "network003",
          "status": "ACTIVE",
          "availability_zone_hints": "az2"
        }
      ]
    }
    ```

#### 接口：`GET /v1/networks/:id`

- 内容：获取某个网络信息
- 参数：无
- 鉴权：无
- 请求示例：`GET /v1/networks/000006ac-ea63-4dd1-83e6-596e10a89366`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "network001",
          "status": "ACTIVE",
          "availability_zone_hints": "az1"
        }
      ]
    }
    ```

#### 接口：`POST /v1/networks`

- 内容：新建一个网络
- 参数：
    | 参数                      | 含义       |
    | ------------------------- | ---------- |
    | `name`                    | 网络的名称 |
    | `availability_zone_hints` | 网络区域   |
- 鉴权：无
- 请求示例：`POST /v1/networks`

    ```json
    {
      "name": "network001",
      "availability_zone_hints": "az1"
    }
    ```

- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "network001",
          "status": "ACTIVE",
          "availability_zone_hints": "az1"
        }
      ]
    }
    ```

#### 接口：`DELETE /v1/networks/:id`

::: warning

删除操作是危险的，因为默认的删除是 **级联** 的，这将删除此网络下的所有子网和端口。

:::

- 内容：删除一个网络
- 参数：无
- 鉴权：无
- 请求示例：`DELETE /v1/networks/000006ac-ea63-4dd1-83e6-596e10a89366`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": null,
      "affected": 1
    }
    ```

#### 接口：`PUT /v1/networks/:id`

- 内容：修改一个网络的信息
- 参数：
    | 参数                      | 含义       |
    | ------------------------- | ---------- |
    | `name`                    | 网络的名称 |
    | `availability_zone_hints` | 网络区域   |
    | `status`                  | 网络的状态 |
- 鉴权：无
- 请求示例：`PUT /v1/networks/000006ac-ea63-4dd1-83e6-596e10a89366"`

    ```json
    {
      "name": "network001",
      "availability_zone_hints": "az1",
      "status": "ACTIVE"
    }
    ```

- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "network001",
          "status": "ACTIVE",
          "availability_zone_hints": "az1"
        }
      ]
    }
    ```

#### 接口：`GET /v1/subnets`

- 内容：获取网络信息
- 参数：
    | 参数         | 含义                         |
    | ------------ | ---------------------------- |
    | `offset`     | 可选，指定返回记录的开始位置 |
    | `limit`      | 可选，限制请求数量           |
    | `network_id` | 可选，从某个网络中查找       |
- 鉴权：无
- 请求示例：`GET /v1/subnets?limit=15&offset=10`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "subnet001",
          "network_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "cidr": "192.168.88.0/24"
        },
        {
          "id": "00da810c-ea63-0064-83e6-59a693de1066",
          "name": "subnet002",
          "network_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "cidr": "192.168.34.0/24"
        }
      ]
    }
    ```

#### 接口：`GET /v1/subnets/:id`

- 内容：获取某个子网的信息，返回信息包括可用 IP 数和可用 IP 地址，以 `[start, end]` 的形式给出
- 参数：无
- 鉴权：无
- 请求示例：`GET /v1/subnets/000006ac-ea63-4dd1-83e6-596e10a89366`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "subnet001",
          "network_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "cidr": "192.168.88.0/24"
        }
      ],
      "available_ip": {
        "total": 32,
        "available": 28,
        "ips": [
          {
            "start": "192.168.88.1",
            "end": "192.168.88.25"
          },
          {
            "start": "192.168.88.28",
            "end": "192.168.88.32"
          }
        ],
        "netmask": "255.255.255.0"
      }
    }
    ```

#### 接口：`POST /v1/subnets`

- 内容：新建一个子网
- 参数：
    | 参数         | 含义       |
    | ------------ | ---------- |
    | `name`       | 子网的名称 |
    | `network_id` | 网络 ID  |
    | `cidr`       | CIDR       |
- 鉴权：无
- 请求示例：`POST /v1/subnets`

    ```json
    {
      "name": "subnet001",
      "network_id": "00016ac-ea63-42d1-83e6-8394819effa8",
      "cidr": "192.168.1.0/24"
    }
    ```

- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "00da810c-ea63-0064-83e6-59a693de1066",
          "name": "subnet002",
          "network_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "cidr": "192.168.34.0/24"
        }
      ]
    }
    ```

#### 接口：`DELETE /v1/subnets/:id`

::: warning

删除操作是危险的，因为默认的删除是 **级联** 的，这将删除此子网下的所有端口。

:::

- 内容：删除一个子网
- 参数：无
- 鉴权：无
- 请求示例：`DELETE /v1/subnets/000006ac-ea63-4dd1-83e6-596e10a89366`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": null,
      "affected": 1
    }
    ```

#### 接口：`PUT /v1/subnets/:id`

- 内容：修改一个子网的信息，修改 `cird` 时会重新分配此子网下的所有端口
- 参数：
    | 参数         | 含义       |
    | ------------ | ---------- |
    | `name`       | 子网的名称 |
    | `network_id` | 网络的 ID  |
    | `cidr`       | CIDR       |
- 鉴权：无
- 请求示例：`PUT /v1/subnets/000006ac-ea63-4dd1-83e6-596e10a89366"`

    ```json
    {
      "name": "subnet001",
      "network_id": "00016ac-ea63-42d1-83e6-8394819effa8",
      "cidr": "192.168.1.0/24"
    }
    ```

- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "00da810c-ea63-0064-83e6-59a693de1066",
          "name": "subnet002",
          "network_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "cidr": "192.168.34.0/24"
        }
      ]
    }
    ```

#### 接口：`GET /v1/ports`

- 内容：获取端口信息
- 参数：
    | 参数         | 含义                         |
    | ------------ | ---------------------------- |
    | `offset`     | 可选，指定返回记录的开始位置 |
    | `limit`      | 可选，限制请求数量           |
    | `subnet_id` | 可选，从某个子网中查找       |
- 鉴权：无
- 请求示例：`GET /v1/ports?limit=15&offset=10`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "port001",
          "subnet_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "ip": "192.168.88.3"
        }
      ]
    }
    ```

#### 接口：`GET /v1/ports/:id`

- 内容：获取某个端口的信息
- 参数：无
- 鉴权：无
- 请求示例：`GET /v1/ports/000006ac-ea63-4dd1-83e6-596e10a89366`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "port001",
          "subnet_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "ip": "192.168.88.3"
        }
      ]
    }
    ```

#### 接口：`POST /v1/ports`

- 内容：新建一个端口，系统将自动分配 IP 地址
- 参数：
    | 参数        | 含义       |
    | ----------- | ---------- |
    | `name`      | 端口的名称 |
    | `subnet_id` | 子网 ID    |
- 鉴权：无
- 请求示例：`POST /v1/ports`

    ```json
    {
      "name": "port001",
      "subnet_id": "00016ac-ea63-42d1-83e6-8394819effa8"
    }
    ```

- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "port001",
          "subnet_id": "00016ac-ea63-42d1-83e6-8394819effa8",
          "ip": "192.168.88.3"
        }
      ]
    }
    ```

#### 接口：`DELETE /v1/ports/:id`

- 内容：删除一个端口
- 参数：无
- 鉴权：无
- 请求示例：`DELETE /v1/ports/000006ac-ea63-4dd1-83e6-596e10a89366`
- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": null,
      "affected": 1
    }
    ```

#### 接口：`PUT /v1/ports/:id`

- 内容：修改一个端口的信息，如果修改 `network_id` 那么系统将收回 IP 并重新分配
- 参数：
    | 参数        | 含义       |
    | ----------- | ---------- |
    | `name`      | 端口的名称 |
    | `subnet_id` | 子网 ID    |
- 鉴权：无
- 请求示例：`PUT /v1/ports/000006ac-ea63-4dd1-83e6-596e10a89366"`

    ```json
    {
      "name": "port001",
      "network_id": "00016ac-ea63-42d1-83e6-8394819effa8"
    }
    ```

- 返回示例

    ```json
    {
      "code": 0,
      "msg": "ok",
      "data": [
        {
          "id": "000006ac-ea63-4dd1-83e6-596e10a89366",
          "name": "port001",
          "subnet_id": "0008f705-d071-4cb9-ba69-eaf97560bd1a",
          "ip": "192.168.88.34"
        }
      ]
    }
    ```

## 3. 项目设计步骤

### 3.1 项目结构

下面我们将介绍如何使用 Django 创建一个 RESTful 风格的 Web 应用。[^2]

```mermaid
flowchart TB
    Request --> URL("URL Patterns")
    subgraph " "
        direction LR
        URL --> Views("Views")
        Views --> Serializer("Serializer")
        Views --> Models("Models") <--> DB[("DataBase")]
        Serializer --> Models
    end
    Views --> Response
```

各个组件说明：

- Url Patterns，将请求路由到具体处理的视图
- View，处理 HTTP 请求并返回 `HTTPResponse` 对象
- Serializer，序列化 / 反序列化模型数据
- Models，模型，负责与数据库相关操作

与常用的的 Django 应用相比，RESTful 风格接口仅仅是多使用了 Serializer 组件。

### 3.2 创建项目

由于 Django 没有内置支持 RESTful 风格的接口，所以需要安装第三方库：

```bash
pip install djangorestframework
```

我们创建示例项目：

```bash
django-admin startproject controller
```

打开 `mysite/settings.py`，然后加入框架配置：

```python
INSTALLED_APPS = [
    'rest_framework',
    ...
]
```

新建示例应用：

```bash
cd mysite
python manage.py startapp netcontroller
```

和上面步骤一样，将 `'netcontroller.apps.NetcontrollerConfig'` 加入到 `INSTALLED_APPS` 配置中。

可以将时区和语言改为中文、北京时间，修改 `controller/settings.py` 下的配置：

```python
LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'
```

### 3.3 定义模型

在 `netcontroller/models.py` 中添加 `Network` 类：[^3]

```python
import uuid

from django.db import models

class Network(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    availability_zone_hints = models.CharField(max_length=32)
    status = models.CharField(max_length=32, default='INACTIVE')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['availability_zone_hints', 'name'],
                name='zone_name_unique'
            )
        ]

    def __str__(self):
        return self.name

class Subnet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    cidr = models.CharField(max_length=64)
    network_id = models.ForeignKey(Network, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['cidr', 'network_id'],
                name='cidr_network_id_unique'
            )
        ]

    def __str__(self) -> str:
        return 'Port<{}: {}>'.format(
            self.name,
            self.cidr
        )

class Port(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    mac = models.CharField(max_length=50, default=None, null=True)
    ip = models.CharField(max_length=50)
    subnet_id = models.ForeignKey(Subnet, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['ip', 'subnet_id'],
                name='ip_subnet_id_unique'
            )
        ]

    def __str__(self) -> str:
        return 'Port<{}: {}>'.format(
            self.name,
            self.ip
        )
```

然后执行数据迁移：

```bash
python manage.py makemigrations netcontroller
```

这时数据库就会将表创建完成。

::: tip 如何使用 UUID 作为主键？

如果你在定义模型时没有显式的指定主键，那么 Django 会为你定义一个自增的 `id` 主键，相当于：

```python
from django.db import models

class SomeModel(models.Model):
    id = models.AutoField(primary_key=True)
```

这个 `id` 主键从 `1` 开始计数，每有一条新的数据则加一，保证了主键不重复。

下面是使用 UUID 定义主键 ID：

```python
import uuid

from django.db import models

class SomeModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)
```

关于库 `uuid` 的用法可以参考 [Python 标准库：`uuid`](https://docs.python.org/zh-cn/3/library/uuid.html)。

:::

### 3.4 创建序列化类

需要创建不同的 `Serializer` 类来管理序列化 / 反序列化 JSON 数据。目标类需要继承至 `rest_framework.serializers.ModelSerializer`。父类将自动获取字段集合和验证器。新建 `netcontroller/serializers.py` 文件：

```python
from django.http.response import JsonResponse
from rest_framework import serializers

from .models import Network, Port, Subnet

def json_success(data, error_msg='ok', status=200, **kwargs):
    """
    将数据序列化为 JSON 格式，并返回
    @param `data`: 可序列化的对象
    @param `error_msg`: `str` 错误信息
    @return: `HttpResponse`
    """
    res_data = {
        'code': 0,
        'msg': error_msg,
        'data': data,
        **kwargs
    }
    return JsonResponse(res_data, status=status, safe=False)

def json_error(data=None, code=1, error_msg='error', status=400, **kwargs):
    """
    将错误信息序列化为 JSON 格式，并返回
    @param `code`: `int` 错误代码
    @param `error_msg`: `str` 错误信息
    @param `status`: `int` 状态码
    @return: `HttpResponse`
    """
    res_data = {
        'code': code,
        'msg': error_msg,
        'data': data,
        **kwargs
    }
    return JsonResponse(res_data, status=status, safe=False)

class NetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Network
        fields = '__all__'

class SubnetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subnet
        fields = '__all__'

class PortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Port
        fields = '__all__'
```

在 `netcontroller` 文件夹下新建 `urls.py` 文件：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('v1/networks/', views.networks, name='networks'),
    path('v1/networks/<uuid:uuid>/', views.network_id, name='network_id'),
    path('v1/subnets/', views.subnets, name='subnets'),
    path('v1/subnets/<uuid:uuid>/', views.subnet_id, name='subnet_id'),
    path('v1/ports/', views.ports, name='ports'),
    path('v1/ports/<uuid:uuid>/', views.port_id, name='port_id'),
]
```

::: tip 如何匹配含有 UUID 路径？

`path()` 默认能接受下面几种参数：[^4]

1. `str`：匹配除路径分隔符 `'/'` 之外的非空字符串
2. `int`：匹配零或正整数
3. `slug`：匹配由 ASCII 字母、数字、连字符、下划线字符组成的字符串，例如，`'building-your-1st-django-site'`
4. `uuid`：匹配格式化的 UUID，如 `'075194d3-6885-417e-a8a8-6c931e272f00'`

这里只需使用 `<uuid:id>` 即可。

`path()` 也可以自定义参数匹配类型。此外，还有一种方法，可以在需要正则表达式的情况下使用：

```python
from django.urls import include, re_path

urlpatterns = [
    re_path(r'^index/$', views.index, name='index'),
    re_path(r'^bio/(?P<username>\w+)/$', views.bio, name='bio'),
    re_path(r'^blog/', include('blog.urls')),
    ...
]
```

`re_path()` 支持使用正则表达式来匹配。详情参考 [Django：`urls`](https://docs.djangoproject.com/en/4.0/ref/urls/)。

:::

把 APP 的路由添加到项目的 `urlpatterns` 中：

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('netcontroller.urls')),
]

page404 = 'netcontroller.views.global_404'
page500 = 'netcontroller.views.global_500'
handler404 = page404
handler500 = page500
```

### 3.5 编写 API 视图

编写 `netcontroller/views.py`：

```python
from django.db import models
from django.http import HttpRequest, HttpResponse
from django.views import View
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from .models import Network, Port, Subnet
from .serializers import (NetworkSerializer, PortSerializer, SubnetSerializer,
                          json_error, json_success)
from .utils import allocate_ip, allocate_ip_many, compute_ips, valid_cidr

@api_view(['GET'])
def index(request: HttpRequest) -> HttpResponse:
    """ 测试接口 """
    return json_success(request.GET, 'Hello, World!')

def basic_view_factory(model: type[models.Model], serializer: type[serializers.Serializer]):
    """
    基础视图工厂，支持 `GET`、`POST`
    @param `model`: 模型类
    @param `serializer`: 序列化类

    视图工厂使用闭包机制复用代码
    """

    class _C(View):
        """
        基础视图
        """

        def http_method_not_allowed(self, request: HttpRequest, *args, **kwargs) -> HttpResponse:
            return json_error(
                error_msg='405 METHOD_NOT_ALLOWED',
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )

        def get(self, request: HttpRequest):
            limit = request.GET.get('limit', None)
            offset = request.GET.get('offset', None)
            network_id = request.GET.get('network_id', None)
            subnet_id = request.GET.get('subnet_id', None)
            query = model.objects
            if model == Subnet:
                if network_id is not None:
                    query = query.filter(network_id=network_id)
            elif model == Port:
                if subnet_id is not None:
                    query = query.filter(subnet_id=subnet_id)
            if offset is None:
                offset = 0
            if limit is None:
                curr_model = query.all()[int(offset):]
            else:
                curr_model = query.values()[int(offset):int(limit)]
            ser = serializer(curr_model, many=True)
            return json_success(ser.data)

        def post(self, request: HttpRequest):
            data = JSONParser().parse(request)
            ser = serializer(data=data)
            # CIDR 验证器
            if model == Subnet:
                if not valid_cidr(data['cidr']):
                    return json_error(error_msg='Invalid CIDR')
            # Port 下分配 IP
            if model == Port:
                cidr = Subnet.objects.get(id=data['subnet_id']).cidr
                allocated_ips = (
                    x.ip for x in Port.objects.filter(subnet_id=data['subnet_id'])
                )
                ip = allocate_ip(cidr, allocated_ips)
                if not ip:
                    return json_error(error_msg='IP 地址已被分配完')
                else:
                    data['ip'] = ip
            if ser.is_valid():
                try:
                    ser.save()
                except:
                    return json_error(error_msg='数据重复或异常，不满足约束，无法创建')
                return json_success(ser.data, status=status.HTTP_201_CREATED)
            return json_error(ser.errors)

    return _C

def include_id_factory(model: type[models.Model], serializer: type[serializers.Serializer]):
    """
    视图工厂，支持使用 ID 获取对象
    @param `model`: 模型类
    @param `serializer`: 序列化类

    视图工厂使用闭包机制复用代码
    """

    class _C(View):
        """
        包含 ID 的请求视图
        """

        def _get_query_model(self, model_id: str):
            """
            获取查询模型
            """
            query_model = model.objects.filter(id=model_id)
            if not query_model:
                return json_error(
                    error_msg='404 NOT_FOUND',
                    status=status.HTTP_404_NOT_FOUND
                ), None
            return query_model, query_model.first()

        def get(self, request: HttpRequest, **kwargs):
            model_id = kwargs.get('uuid', None)
            query_model, curr_model = self._get_query_model(model_id)
            if curr_model is None:
                return query_model
            ser = serializer(query_model, many=True)
            # 如果是子网，还需要计算有多少可用地址
            if model == Subnet:
                occupied = (
                    port.ip for port in Port.objects.filter(subnet_id=curr_model.id)
                )
                return json_success(
                    ser.data,
                    available_ip=compute_ips(curr_model.cidr, occupied)
                )
            return json_success(ser.data)

        def put(self, request: HttpRequest, **kwargs):
            model_id = kwargs.get('uuid', None)
            query_model, curr_model = self._get_query_model(model_id)
            if curr_model is None:
                return query_model
            data = JSONParser().parse(request)
            # 子网
            if model == Subnet:
                if not valid_cidr(data['cidr']):
                    return json_error(error_msg='Invalid CIDR')
                # 如果更改了 CIDR，需要重新分配 IP
                # ========================================================
                # 注意此处需要事务一致性，修改时不可以并发写入
                # ========================================================
                if curr_model.cidr != data['cidr']:
                    occupied_number = Port.objects.filter(subnet_id=curr_model.id).count()
                    new_cird_number = compute_ips(data['cidr'], [])['available']
                    if new_cird_number < occupied_number:
                        return json_error(error_msg='无法满足 Port 的 IP 分配')
                    else:
                        ip_pool = allocate_ip_many(data['cidr'], new_cird_number)
                        # 重新分配 IP
                        for ip, port in zip(ip_pool, Port.objects.filter(subnet_id=curr_model.id)):
                            port.ip = ip
                            port.save()
            # Port
            if model == Port:
                # 当 subnet_id 改变时重新分配 IP
                if curr_model.subnet_id != data['subnet_id']:
                    cidr = Subnet.objects.get(id=data['subnet_id']).cidr
                    allocated_ips = (
                        x.ip for x in Port.objects.filter(subnet_id=data['subnet_id'])
                    )
                    ip = allocate_ip(cidr, allocated_ips)
                    if not ip:
                        return json_error(error_msg='IP 地址已被分配完')
                    else:
                        data['ip'] = ip
            ser = serializer(curr_model, data=data)
            if ser.is_valid():
                ser.save()
                return json_success(ser.data)
            return json_error(ser.errors)

        def delete(self, request: HttpRequest, **kwargs):
            model_id = kwargs.get('uuid', None)
            query_model, curr_model = self._get_query_model(model_id)
            if curr_model is None:
                return query_model
            affected_lines = curr_model.delete()[0]
            return json_success(None, affected=affected_lines)

    return _C

def global_404(request: HttpRequest, exception) -> HttpResponse:
    """
    全局 404 页面
    """
    return json_error(
        error_msg='404 NOT_FOUND',
        status=status.HTTP_404_NOT_FOUND
    )

def global_500(request: HttpRequest) -> HttpResponse:
    """
    全局 500 页面
    """
    return json_error(
        error_msg='500 INTERNAL_SERVER_ERROR',
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

networks = basic_view_factory(Network, NetworkSerializer).as_view()
subnets = basic_view_factory(Subnet, SubnetSerializer).as_view()
ports = basic_view_factory(Port, PortSerializer).as_view()
network_id = include_id_factory(Network, NetworkSerializer).as_view()
subnet_id = include_id_factory(Subnet, SubnetSerializer).as_view()
port_id = include_id_factory(Port, PortSerializer).as_view()
```

最后是分配 IP 和检查 IP 地址的算法，在 `netcontroller/utils.py` 下面：

```python
import ipaddress
from typing import Iterable


def allocate_ip(cidr: str, allocated_ips: Iterable[str]):
    """
    通过 CIDR 分配 IP 地址
    """
    allocated_ips_set = set(allocated_ips)
    ip_network = ipaddress.ip_network(cidr)
    for ip in ip_network.hosts():
        if ip.compressed not in allocated_ips_set:
            return ip.compressed
    return ''


def allocate_ip_many(cidr: str, n: int) -> Iterable[str]:
    """
    通过 CIDR 分配多个 IP 地址
    """
    ip_network = ipaddress.ip_network(cidr)
    return (
        (ip_network.network_address + x).compressed
        for x in range(1, n + 1)
    )


def compute_ips(cidr: str, occupied: Iterable[str]):
    """
    计算子网可用信息
    """
    ip_network = ipaddress.ip_network(cidr)
    total = ip_network.num_addresses
    occupied_set = set(occupied)
    # 不包括广播地址和网络地址
    available = total - len(occupied_set) - 2
    ips = list[dict[str, str]]()
    flag = False
    start = ''
    for x in range(1, total + 1):
        curr = ip_network.network_address + x
        if curr.compressed not in occupied_set:
            if not flag:
                start = curr.compressed
                flag = True
        else:
            if flag:
                ips.append({
                    'start': start,
                    'end': (curr - 1).compressed
                })
                flag = False
    if flag:
        ips.append({
            'start': start,
            'end': (ip_network.broadcast_address - 1).compressed
        })
    return {
        'total': total,
        'available': available,
        'ips': ips,
        'netmask': ip_network.netmask.compressed
    }


def valid_cidr(cidr: str) -> bool:
    """
    检查 CIDR 是否合法
    """
    try:
        network = ipaddress.ip_network(cidr, strict=False)
        return bool(network)
    except ValueError:
        return False


def valid_ip(ip: str) -> bool:
    """
    检查 IP 是否合法
    """
    try:
        ip_address = ipaddress.ip_address(ip)
        return bool(ip_address)
    except ValueError:
        return False
```

::: warning 注意事项

- 在编写视图中使用装饰器 `@api_view` 限定请求方法
- 使用 `JsonResponse` 将字典序列化为字符串并返回结果
- 使用 `JSONParser().parse(request)` 方法从表单中反序列化，该方法的返回值为字典

:::

下面启动应用进行测试即可：

```bash
python manage.py runserver
```

## 附录 A：什么是 CIDR

将 IP 地址分为 A 类、B 类、C 类后，会造成 IP 地址的部分浪费。例如，一些连续的 IP 地址，一部分属于 A 类地址，另一部分属于 B 类地址。为了使这些地址聚合以方便管理，出现了 CIDR（无类域间路由）。[^1]

无类域间路由（Classless Inter-Domain Routing，CIDR）可以将路由集中起来，在路由表中更灵活地定义地址。它不区分 A 类、B 类、C 类地址，而是使用 CIDR 前缀的值指定地址中作为网络 ID 的位数。

这个前缀可以位于地址空间的任何位置，让管理者能够以更灵活的方式定义子网，以简便的形式指定地址中网络 ID 部分和主机 ID 部分。

CIDR 标记使用一个斜线 `/` 分隔符，后面跟一个十进制数值表示地址中网络部分所占的位数。例如，`205.123.196.183/25` 中的 `25` 表示地址中 `25` 位用于网络 ID，相应的掩码为 `255.255.255.128`。

使用 `netwox` 工具列出有多少可用 IP：

```bash
netwox 213 -i 192.168.1.32/27
```

输出：

```bash
192.168.1.32
192.168.1.33
192.168.1.34
...
...
192.168.1.61
192.168.1.62
192.168.1.63
```

获得掩码和地址段：

```bash
netwox 24 -i 192.168.1.32/27
```

输出：

```bash
192.168.1.32-192.168.1.63
192.168.1.32/27
192.168.1.32/255.255.255.224
...
```

你可以使用 [在线 CIDR 计算器](https://purecalculators.com/ip-subnet-calculator) 来计算。

## 附录 B：Python 计算可用 IP 信息

那么 Python 如何计算 CIDR 的可用 IP 数和相关信息呢？这里仅讨论 IPv4。

对于标准库，Python 提供了 `ipaddress` 来计算 IP 信息：

```python
import ipaddress

cidr = '192.168.1.32/27'
network = ipaddress.IPv4Network(cidr)
available_ips = list(ip.compressed for ip in network.hosts())

print('可用 IP 数量:', network.num_addresses)
print('网络地址 IP:', network.network_address)
print('子网掩码:', network.netmask)
print('所有可用 IP:', available_ips)
print('广播地址:', network.broadcast_address)
```

注意：可用地址数组（即 `network.hosts()`）内 **不包含网络地址和广播地址**，这里的广播地址是指掩码运算后的部分全为 `1` 的 IP 地址。

[^1]: CIDR（无类域间路由）是什么，C 语言中文网，<http://c.biancheng.net/view/6409.html>

[^2]: 手把手教你用 Django 实现 RESTful 接口，知乎，<https://zhuanlan.zhihu.com/p/356405945>

[^3]: Django 知识库：UUID 作为模型主键，知乎，<https://zhuanlan.zhihu.com/p/139525123>

[^4]: Django 知识库：`path()` 路径映射，知乎，<https://zhuanlan.zhihu.com/p/139523421>
