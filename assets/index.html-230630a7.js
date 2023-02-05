import{_ as l,M as i,p,q as c,R as n,N as a,V as t,t as s,a1 as u}from"./framework-bafc524a.js";const d={},r=n("h1",{id:"_8-pyside6-构建和发布",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_8-pyside6-构建和发布","aria-hidden":"true"},"#"),s(" 8. PySide6 构建和发布")],-1),k={class:"table-of-contents"},v=u(`<h2 id="_8-1-使用-pyinstaller-打包" tabindex="-1"><a class="header-anchor" href="#_8-1-使用-pyinstaller-打包" aria-hidden="true">#</a> 8.1 使用 Pyinstaller 打包</h2><h2 id="_8-2-使用-nuitka-打包" tabindex="-1"><a class="header-anchor" href="#_8-2-使用-nuitka-打包" aria-hidden="true">#</a> 8.2 使用 Nuitka 打包</h2><h3 id="_8-2-1-nuitka-简介" tabindex="-1"><a class="header-anchor" href="#_8-2-1-nuitka-简介" aria-hidden="true">#</a> 8.2.1 Nuitka 简介</h3><h3 id="_8-2-2-安装并配置-nuitka" tabindex="-1"><a class="header-anchor" href="#_8-2-2-安装并配置-nuitka" aria-hidden="true">#</a> 8.2.2 安装并配置 Nuitka</h3><p>安装 Nuitka：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pip3 <span class="token function">install</span> nuitka
</code></pre></div><p>Nuitka 还有一些依赖包，在许多情况下都可能需要用到，这里一并安装：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pip3 <span class="token function">install</span> ordered-set zstandard
</code></pre></div><p>这里我们以官方的标准示例为例，演示如何使用 Nuitka 进行打包：<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random
<span class="token keyword">import</span> sys

<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtCore <span class="token keyword">import</span> Qt<span class="token punctuation">,</span> Slot
<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtWidgets <span class="token keyword">import</span> <span class="token punctuation">(</span>QApplication<span class="token punctuation">,</span> QLabel<span class="token punctuation">,</span> QPushButton<span class="token punctuation">,</span> QVBoxLayout<span class="token punctuation">,</span>
                               QWidget<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">MyWidget</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        QWidget<span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>self<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>hello <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Hallo Welt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;你好，世界&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hei maailma&#39;</span><span class="token punctuation">,</span>
                      <span class="token string">&#39;Hola Mundo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Привет мир&#39;</span><span class="token punctuation">]</span>

        self<span class="token punctuation">.</span>button <span class="token operator">=</span> QPushButton<span class="token punctuation">(</span><span class="token string">&#39;Click me!&#39;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>text <span class="token operator">=</span> QLabel<span class="token punctuation">(</span><span class="token string">&#39;Hello World&#39;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>text<span class="token punctuation">.</span>setAlignment<span class="token punctuation">(</span>Qt<span class="token punctuation">.</span>AlignCenter<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layout <span class="token operator">=</span> QVBoxLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>button<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layout<span class="token punctuation">)</span>

        <span class="token comment"># Connecting the signal</span>
        self<span class="token punctuation">.</span>button<span class="token punctuation">.</span>clicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>magic<span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">magic</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>text<span class="token punctuation">.</span>setText<span class="token punctuation">(</span>random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span>self<span class="token punctuation">.</span>hello<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    app <span class="token operator">=</span> QApplication<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>

    widget <span class="token operator">=</span> MyWidget<span class="token punctuation">(</span><span class="token punctuation">)</span>
    widget<span class="token punctuation">.</span>resize<span class="token punctuation">(</span><span class="token number">800</span><span class="token punctuation">,</span> <span class="token number">600</span><span class="token punctuation">)</span>
    widget<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

    sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span>app<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们先运行测试命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>
</code></pre></div><h3 id="_8-2-3-使用-mingw-作为编译器打包" tabindex="-1"><a class="header-anchor" href="#_8-2-3-使用-mingw-作为编译器打包" aria-hidden="true">#</a> 8.2.3 使用 MinGW 作为编译器打包</h3><p>首先，我们先看看 <code>nuitka</code> 命令都包含一些什么功能：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>nuitka <span class="token parameter variable">--help</span>
</code></pre></div><p>打印了非常多的内容，但我们能得到很多有用信息，这是第一手的资料，当需要查询命令的时候我们应该在这里查看，这有时候比搜索引擎更有用。</p><p>为了使用 MinGW 作为编译器，我们通常指定 <code>--mingw64</code> 来确保使用的是 MinGW 而不是其他。</p><p>这里还有一些关键参数，Nuitka 适配了许多 GUI 库，这也包括 PySide6，这被包含在插件中，使用 <code>--plugin-enable=pyside6</code> 来启用它。</p><p>还有一些常用的参数：</p><ul><li><code>--standalone</code>：表示打包一个不依赖于系统 Python 环境的应用</li><li><code>--onefile</code>：表示打包为一个文件，这与 <code>--standalone</code> 同时使用</li><li><code>--disable-console</code>：不生成控制台</li><li><code>--output-dir=...</code>：生成可执行文件到指定文件夹</li><li><code>--show-progress</code>：显示编译的进度</li><li><code>--show-memory</code>：显示内存的占用</li></ul><p>不需要安装 MinGW，Nuitka 已经集成了管理 MinGW 的功能。</p><p>下面我们就开始测试：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>nuitka <span class="token parameter variable">--onefile</span> <span class="token parameter variable">--standalone</span> --disable-console <span class="token parameter variable">--mingw64</span> --plugin-enable<span class="token operator">=</span>pyside6 hello.py
</code></pre></div><p>第一次使用时，会询问你是否下载 MinGW 依赖，输入 <code>Yes</code> 确认。下载过程可能会出错，只需要手动下载然后将压缩包放置到 Nuitka 指定的文件夹即可。</p><div class="hint-container info"><p class="hint-container-title">下载失败</p><p>如果下载失败，请将链接复制到浏览器中（最好使用代理），然后下载。常规情况下是放到 <code>C:\\Users\\&lt;用户名&gt;\\AppData\\Local\\Nuitka\\Nuitka\\Cache\\downloads\\gcc\\x86_64\\</code> 下的文件夹内，请参考错误提示。</p></div><p>接下来等待打包完成进行测试。</p><h3 id="_8-2-4-使用-msvc-作为编译器打包" tabindex="-1"><a class="header-anchor" href="#_8-2-4-使用-msvc-作为编译器打包" aria-hidden="true">#</a> 8.2.4 使用 MSVC 作为编译器打包</h3><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>(pyside-venv) D:\\workspace\\repo\\pyside-book&gt;nuitka --standalone --disable-console --msvc=14.3 --plugin-enable=pyside6 hello.py
Nuitka-Options:INFO: Used command line options: --standalone --disable-console --msvc=14.3 --plugin-enable=pyside6 hello.py
Nuitka:INFO: Starting Python compilation with Nuitka &#39;1.4.3&#39; on Python &#39;3.10&#39; commercial grade &#39;not installed&#39;.
Nuitka-Plugins:INFO: pyside6: Injecting pre-module load code for module &#39;PySide6&#39;:
Nuitka-Plugins:INFO: pyside6:     Adding binary folder to runtime &#39;PATH&#39; environment variable for proper Qt loading.
Nuitka-Plugins:INFO: pyside6: Injecting post-module load code for module &#39;PySide6.QtCore&#39;:
Nuitka-Plugins:INFO: pyside6:     Setting Qt library path to distribution folder. We need to avoid loading target
Nuitka-Plugins:INFO: pyside6:     system Qt plugins, which may be from another Qt version.
Nuitka:INFO: Completed Python level compilation and optimization.
Nuitka:INFO: Generating source code for C backend compiler.
Nuitka:INFO: Running data composer tool for optimal constant value handling.
Nuitka:INFO: Running C compilation via Scons.
Nuitka-Scons:INFO: Backend C compiler: cl (cl 14.3).
Nuitka-Scons:INFO: Backend linking program with 10 files (no progress information available).
Nuitka-Scons:INFO: Compiled 10 C files using clcache with 0 cache hits and 10 cache misses.
Nuitka-Plugins:INFO: pyside6: Including Qt plugins &#39;iconengines,imageformats,platforms,styles,tls&#39; below &#39;PySide6\\qt-plugins&#39;.
Detecting used DLLs: 0.0%|                         | 0/37, hello.exeNuitka will make use of Dependency Walker (https://dependencywalker.com) tool
to analyze the dependencies of Python extension modules.

Is it OK to download and put it in &#39;C:\\Users\\yalis\\AppData\\Local\\Nuitka\\Nuitka\\Cache\\downloads\\depends\\x86_64&#39;.

No installer needed, cached, one time question.

Proceed and download? [Yes]/No
Yes
Nuitka:INFO: Downloading &#39;https://dependencywalker.com/depends22_x64.zip&#39;.
Nuitka:INFO: Extracting to &#39;C:\\Users\\yalis\\AppData\\Local\\Nuitka\\Nuitka\\Cache\\downloads\\depends\\x86_64\\depends.exe&#39;
Nuitka:INFO: Keeping build directory &#39;hello.build&#39;.
Nuitka:INFO: Successfully created &#39;hello.dist\\hello.exe&#39;.

(pyside-venv) D:\\workspace\\repo\\pyside-book&gt;.\\hello.dist\\hello.exe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr class="footnotes-sep">`,29),m={class:"footnotes"},h={class:"footnotes-list"},b={id:"footnote1",class:"footnote-item"},g={href:"https://doc.qt.io/qtforpython/deployment-nuitka.html",target:"_blank",rel:"noopener noreferrer"},f=n("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1);function y(_,N){const e=i("router-link"),o=i("ExternalLinkIcon");return p(),c("div",null,[r,n("nav",k,[n("ul",null,[n("li",null,[a(e,{to:"#_8-1-使用-pyinstaller-打包"},{default:t(()=>[s("8.1 使用 Pyinstaller 打包")]),_:1})]),n("li",null,[a(e,{to:"#_8-2-使用-nuitka-打包"},{default:t(()=>[s("8.2 使用 Nuitka 打包")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#_8-2-1-nuitka-简介"},{default:t(()=>[s("8.2.1 Nuitka 简介")]),_:1})]),n("li",null,[a(e,{to:"#_8-2-2-安装并配置-nuitka"},{default:t(()=>[s("8.2.2 安装并配置 Nuitka")]),_:1})]),n("li",null,[a(e,{to:"#_8-2-3-使用-mingw-作为编译器打包"},{default:t(()=>[s("8.2.3 使用 MinGW 作为编译器打包")]),_:1})]),n("li",null,[a(e,{to:"#_8-2-4-使用-msvc-作为编译器打包"},{default:t(()=>[s("8.2.4 使用 MSVC 作为编译器打包")]),_:1})])])])])]),v,n("section",m,[n("ol",h,[n("li",b,[n("p",null,[s("Qt for Python & Nuitka，Qt，"),n("a",g,[s("https://doc.qt.io/qtforpython/deployment-nuitka.html"),a(o)]),s(),f])])])])])}const w=l(d,[["render",y],["__file","index.html.vue"]]);export{w as default};
