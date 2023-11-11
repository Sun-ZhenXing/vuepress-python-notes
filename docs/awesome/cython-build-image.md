# 在微服务中使用 Cython 安全地构建镜像

[[TOC]]

## 1. Python 部署服务的问题

微服务变得越来越流行。我们常常使用如下的 `Dockerfile` 来构建 Python 服务的镜像：

```dockerfile
FROM python:3.10-slim-bookworm

WORKDIR /app

COPY . ./

ENV PYPI_MIRROR_URL=https://pypi.org/simple

RUN pip -V \
    && python -m pip install -i ${PYPI_MIRROR_URL} --upgrade pip \
    && pip config set global.index-url ${PYPI_MIRROR_URL} \
    && pip install -r requirements.txt

EXPOSE 8081

CMD [ "python", "server.py" ]
```

每次我们都从项目中复制源代码，然后安装依赖。对于任何应用，直接使用源代码发布到生产环境不安全，容易在部署中泄漏重要信息。

而且原始的 Python 代码执行比较低效，需要从头开始解释执行。Python 会在第一次执行项目时，将包内的代码编译为字节码（`.pyc` 文件），这样可以提高 Python 运行的效率。同样我们也可以直接发布字节码文件，但是我们使用字节码发布同样不安全（字节码可以轻易逆向为源代码）。

下面我们将介绍 Cython，它可以帮助我们解决这些问题。

## 2. 使用 Cython 构建镜像

### 2.1 Cython 简介

Cython 通过将 Python 代码翻译为 C/C++ 代码，然后编译为原生的机器码，从而提高了 Python 代码的执行效率，并同时保护了源代码。

Cython 构建产物为动态链接库（共享库）文件，在 Linux/Unix 系统中为 `.so` 文件，在 Windows 系统中为 `.pyd` 文件，其命名为 `package_name.python_version-platform_info.so`。

Python 解释器能够识别出这些文件，并可以像标准的 `.py` 文件或者 `.pyc` 文件一样加载它们，如 `import package_name` 是有效的。当这些共享库和包名同名的 Python 文件同时存在时，Python 解释器会优先加载共享库文件。

> `.py` 文件和环境相关性最小。而 `.pyc` 没有平台依赖，但是有 Python 版本依赖，通过 `.pyc` 能够反射出源代码。共享库文件是原生的机器代码，有平台依赖，同时也有 Python 版本依赖，但是它们不能反射出源代码。

使用 Cython 之前，你需要检查你的项目是否满足要求：

- [x] 项目正确配置了 `setup.py` 文件
- [x] 每个包所在的文件夹存在 `__init__.py` 文件，否则无法被识别为包，生成的目标文件夹内不生成对应文件
- [x] 计算机中安装了正确的编译器，如 GCC、Clang 或 MSVC 等

首先，我们安装 Cython：

```bash
pip install -U cython
```

### 2.2 编译示例

假设我们有一个后端服务项目结构如下：

- `resources/`：项目用到的资源文件
- `demo_server/`
  - `models/`
    - `__init__.py`
    - `xxx.py`
  - `services/`
    - `__init__.py`
    - `xxx.py`
  - `utils/`
    - `__init__.py`
    - `xxx.py`
  - `__init__.py`
  - `core.py`
- `server.py`：主入口文件
- `setup.py`：包配置文件
- `requirements.txt`：依赖文件

首先，我们需要一个 `setup.py` 文件，用于配置编译选项：

```python
from distutils.core import setup

from Cython.Build import cythonize


setup(
    name="demo_server",
    ext_modules=cythonize(
        [
            "server.py",
            "demo_server/**/*.py",
        ],
        compiler_directives={"language_level": 3},
    ),
)
```

此处我们指定了 Python 版本为 3，然后指定了 Cython 需要编译的目录和文件。

```bash
python setup.py build_ext -b lib
```

`-b` 选项将指定生成目标文件的路径，此处指定为 `lib/` 文件夹。

构建完成后，`lib/`，文件夹将生成与项目一致的目录结构，但是其中的 `.py` 文件都被编译为了 `.so` 或 `.pyd` 文件。这一过程将生成大量 `.c` 文件，如果不需要可以删除。

### 2.3 Dockerfile 示例

现在我们提供一个新的 `Dockerfile`，用于完成以上构建步骤。注意 Cython 构建时不需要安装其他 `requirements.txt` 中的依赖。

我们可以使用 Dockerfile 的多阶段构建来完成这一过程，使用包含标准编译器的镜像构建，然后使用更轻的镜像来发布。

```dockerfile
FROM python:3.10.13-bookworm as builder

WORKDIR /app

ARG PYPI_MIRROR_URL=https://pypi.org/simple

COPY . ./

RUN pip -V \
    && python -m pip install -i ${PYPI_MIRROR_URL} --upgrade pip \
    && pip config set global.index-url ${PYPI_MIRROR_URL} \
    && pip install Cython \
    && python setup.py build_ext -b lib \
    && cp -rf requirements.txt lib/ \
    && cp -rf resources/ lib/

FROM python:3.10.13-slim-bookworm

WORKDIR /app

COPY --from=builder /app/lib /app

RUN pip -V \
    && python -m pip install -i ${PYPI_MIRROR_URL} --upgrade pip \
    && pip config set global.index-url ${PYPI_MIRROR_URL} \
    && pip install -r requirements.txt

EXPOSE 8081

CMD [ "python", "server.py" ]
```

如果直接复制上述 `Dockerfile`，别忘了加上 `.dockerignore` 文件，忽略掉各种我们不需要的文件：

::: details dockerignore

```properties
# git
.git
.gitignore

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
#  Usually these files are written by a python script from a template
#  before PyInstaller builds the exe, so as to inject date/other infos into it.
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt
```

:::

## 3. 动态导入和路由发现

以下内容需要对 Python 的 `importlib` 模块有一定的了解，如果你不了解如何动态导入模块，可以参考 [此文章](../basic/collections/import-python-file-from-path.md)。

我们在构建网络服务时常常使用一些元编程技巧，这常常需要借助运行时反射来实现。如 SpringBoot 中的 `@ComponentScan` 能够自动扫描并加载所有的 `@Component` 注解的类，然后将它们注册到 IoC 容器中。

通常静态构建后会损失一些元信息，如果有特定模块或库依赖这些元信息运行则会导致一些问题。

在 Python 中，我们常常使用自定义装饰器来完成相应的功能。例如，在 [Sanic](https://sanic.dev/) 中我们可以使用 [自动路由发现](https://sanic.dev/en/guide/how-to/autodiscovery.html) 来自动注册路由，从而无需编写引入代码。

```python
import os
from glob import glob
from importlib import util
from inspect import getmembers
from types import ModuleType

from sanic import Sanic
from sanic.blueprints import Blueprint
from sanic.log import logger


def autodiscover(app: Sanic, path: str) -> set[Blueprint]:
    """自动路由发现，在 App 上自动注册 `Blueprint`

    Referece: <https://sanic.dev/en/guide/how-to/autodiscovery.html>
    """
    blueprint_set: set[Blueprint] = set()
    imported_set: set[str] = set()

    def _find_bps(module: ModuleType):
        nonlocal blueprint_set

        for _, member in getmembers(module):
            if isinstance(member, Blueprint):
                blueprint_set.add(member)

    path = path.removesuffix("/").removesuffix("\\")
    for path in glob(f"{path}/**/*.py", recursive=True):
        if "__pycache__" in path:
            continue
        if path not in imported_set:
            path = os.path.normpath(path).replace("\\", "/")
            name = ""
            if "__init__" in path:
                name = path.split("/")[-2]
            else:
                name = path.split("/")[-1]
                name = name.split(".")[0]
            spec = util.spec_from_file_location(name, path)
            if spec is None or spec.loader is None:
                continue
            specmod = util.module_from_spec(spec)
            imported_set.add(path)
            spec.loader.exec_module(specmod)
            _find_bps(specmod)

    for bp in blueprint_set:
        app.blueprint(bp)
        logger.info("Auto discover Blueprint: {!r}".format(bp))
    return blueprint_set
```

上述代码在源代码模式下运行良好，但是编译为链接库后无法运行，因为 `importlib.util.spec_from_file_location()` 无法识别链接库中的文件。

`spec_from_file_location()` 有一个参数 `loader`，如果没有传入，默认情况下将使用 `importlib.machinery.SourceFileLoader`，它只能加载源代码文件。我们可以自定义一个 `loader`，用于加载链接库中的文件。

```python
import os
from glob import iglob
from importlib import machinery, util
from inspect import getmembers
from itertools import chain
from types import ModuleType

from sanic import Sanic
from sanic.blueprints import Blueprint
from sanic.log import logger


def autodiscover(app: Sanic, path: str) -> set[Blueprint]:
    """自动路由发现，在 App 上自动注册 `Blueprint`

    Referece: <https://sanic.dev/en/guide/how-to/autodiscovery.html>
    """
    blueprint_set: set[Blueprint] = set()
    imported_set: set[str] = set()

    def _find_bps(module: ModuleType):
        nonlocal blueprint_set

        for _, member in getmembers(module):
            if isinstance(member, Blueprint):
                blueprint_set.add(member)

    path = path.removesuffix("/").removesuffix("\\")
    for path in chain(
        *(
            iglob(f"{path}/**/*.{ext}", recursive=True)
            for ext in ("py", "pyc", "pyo", "pyd", "so", "dylib")
        )
    ):
        if "__pycache__" in path:
            continue
        if path not in imported_set:
            path = os.path.normpath(path).replace("\\", "/")
            name = ""
            if "__init__" in path:
                name = path.split("/")[-2]
            else:
                name = path.split("/")[-1]
                name = name.split(".")[0]
            loader = None
            if path.endswith(".so") or path.endswith(".dylib") or path.endswith(".pyd"):
                loader = machinery.ExtensionFileLoader(name, path)
            elif path.endswith(".pyc") or path.endswith(".pyo"):
                loader = machinery.SourcelessFileLoader(name, path)
            elif path.endswith(".py"):
                loader = machinery.SourceFileLoader(name, path)
            if loader is None:
                continue
            spec = util.spec_from_file_location(name, path, loader=loader)
            if spec is None or spec.loader is None:
                continue
            specmod = util.module_from_spec(spec)
            imported_set.add(path)
            spec.loader.exec_module(specmod)
            _find_bps(specmod)

    for bp in blueprint_set:
        app.blueprint(bp)
        logger.info("Auto discover Blueprint: {!r}".format(bp))
    return blueprint_set
```

现在它可以在各种环境下正确地注册路由了，如果你对此感兴趣，可以查看 *@TODO* 示例项目 了解更多。
