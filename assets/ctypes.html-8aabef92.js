import{_ as r,M as p,p as k,q as y,R as n,N as a,V as t,t as s,a1 as o}from"./framework-5f7e94ef.js";const v={},m=n("h1",{id:"使用-ctypes-访问-c-代码",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用-ctypes-访问-c-代码","aria-hidden":"true"},"#"),s(" 使用 ctypes 访问 C 代码")],-1),b={class:"table-of-contents"},g=n("em",null,"Python Cookbook",-1),_={href:"https://python3-cookbook.readthedocs.io/zh_CN/latest/chapters/p15_c_extensions.html",target:"_blank",rel:"noopener noreferrer"},x=o('<h2 id="_1-ctypes-基本使用" tabindex="-1"><a class="header-anchor" href="#_1-ctypes-基本使用" aria-hidden="true">#</a> 1. ctypes 基本使用</h2><p>对于需要调用 C 代码的一些小的问题，通常使用 Python 标准库中的 <code>ctypes</code> 模块就足够了。</p><div class="hint-container info"><p class="hint-container-title">共享库</p><p>名词 <strong>共享库</strong> 和 <strong>动态链接库</strong> 是一致的，在 Windows 下为 <code>.dll</code> 文件，在 Linux 下是 <code>.so</code> 文件。</p></div><p>要使用 <code>ctypes</code>，你首先要确保你要访问的 C 代码已经被编译到和 Python 解释器兼容（同样的架构、字大小、编译器等）的某个共享库中了。</p>',4),h={href:"https://github.com/Sun-ZhenXing/vuepress-python-notes/tree/main/docs/mixed-programming/c-cpp-mixed/src/sample.c",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"sample.c",-1),w=o(`<div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* sample.c */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;math.h&gt;</span></span>

<span class="token comment">/* Compute the greatest common divisor */</span>
<span class="token keyword">int</span> <span class="token function">gcd</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> g <span class="token operator">=</span> y<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>x <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        g <span class="token operator">=</span> x<span class="token punctuation">;</span>
        x <span class="token operator">=</span> y <span class="token operator">%</span> x<span class="token punctuation">;</span>
        y <span class="token operator">=</span> g<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> g<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Test if (x0,y0) is in the Mandelbrot set or not */</span>
<span class="token keyword">int</span> <span class="token function">in_mandel</span><span class="token punctuation">(</span><span class="token keyword">double</span> x0<span class="token punctuation">,</span> <span class="token keyword">double</span> y0<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> xtemp<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>n <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        xtemp <span class="token operator">=</span> x <span class="token operator">*</span> x <span class="token operator">-</span> y <span class="token operator">*</span> y <span class="token operator">+</span> x0<span class="token punctuation">;</span>
        y <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> x <span class="token operator">*</span> y <span class="token operator">+</span> y0<span class="token punctuation">;</span>
        x <span class="token operator">=</span> xtemp<span class="token punctuation">;</span>
        n <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y <span class="token operator">&gt;</span> <span class="token number">4</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Divide two numbers */</span>
<span class="token keyword">int</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> remainder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> quot <span class="token operator">=</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>
    <span class="token operator">*</span>remainder <span class="token operator">=</span> a <span class="token operator">%</span> b<span class="token punctuation">;</span>
    <span class="token keyword">return</span> quot<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* Average values in an array */</span>
<span class="token keyword">double</span> <span class="token function">avg</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token operator">*</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token keyword">double</span> total <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        total <span class="token operator">+=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> total <span class="token operator">/</span> n<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* A C data structure */</span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span> Point<span class="token punctuation">;</span>

<span class="token comment">/* Function involving a C data structure */</span>
<span class="token keyword">double</span> <span class="token function">distance</span><span class="token punctuation">(</span>Point<span class="token operator">*</span> p1<span class="token punctuation">,</span> Point<span class="token operator">*</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">hypot</span><span class="token punctuation">(</span>p1<span class="token operator">-&gt;</span>x <span class="token operator">-</span> p2<span class="token operator">-&gt;</span>x<span class="token punctuation">,</span> p1<span class="token operator">-&gt;</span>y <span class="token operator">-</span> p2<span class="token operator">-&gt;</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译方法：</p>`,2),C=n("div",{class:"language-bash","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s("gcc "),n("span",{class:"token parameter variable"},"--share"),s(" sample.c "),n("span",{class:"token parameter variable"},"-o"),s(` sample.dll
`)])])],-1),P=n("div",{class:"language-bash","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s("gcc "),n("span",{class:"token parameter variable"},"--share"),s(" sample.c "),n("span",{class:"token parameter variable"},"-o"),s(` sample.so
`)])])],-1),N=o(`<p>可以使用 <code>ctypes.util.find_library()</code> 函数来查找，在 Linux 系统下面表现如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> ctypes<span class="token punctuation">.</span>util <span class="token keyword">import</span> find_library

find_library<span class="token punctuation">(</span><span class="token string">&#39;m&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># &#39;/usr/lib/libm.dylib&#39;</span>

find_library<span class="token punctuation">(</span><span class="token string">&#39;pthread&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># &#39;/usr/lib/libpthread.dylib&#39;</span>

find_library<span class="token punctuation">(</span><span class="token string">&#39;sample&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># &#39;/usr/local/lib/libsample.so&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>ctypes.cdll.LoadLibrary()</code> 来加载共享库：</p><div class="language-python" data-ext="py"><pre class="language-python"><code>_mod <span class="token operator">=</span> ctypes<span class="token punctuation">.</span>cdll<span class="token punctuation">.</span>LoadLibrary<span class="token punctuation">(</span>_path<span class="token punctuation">)</span>
</code></pre></div><p>像下面的 C 程序：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">in_mandel</span><span class="token punctuation">(</span><span class="token keyword">double</span> x0<span class="token punctuation">,</span> <span class="token keyword">double</span> y0<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> xtemp<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>n <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        xtemp <span class="token operator">=</span> x <span class="token operator">*</span> x <span class="token operator">-</span> y <span class="token operator">*</span> y <span class="token operator">+</span> x0<span class="token punctuation">;</span>
        y <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> x <span class="token operator">*</span> y <span class="token operator">+</span> y0<span class="token punctuation">;</span>
        x <span class="token operator">=</span> xtemp<span class="token punctuation">;</span>
        n <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y <span class="token operator">&gt;</span> <span class="token number">4</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要编写一个签名来确保它可用：</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># int in_mandel(double, double, int)</span>
in_mandel <span class="token operator">=</span> _mod<span class="token punctuation">.</span>in_mandel
in_mandel<span class="token punctuation">.</span>argtypes <span class="token operator">=</span> <span class="token punctuation">(</span>ctypes<span class="token punctuation">.</span>c_double<span class="token punctuation">,</span> ctypes<span class="token punctuation">.</span>c_double<span class="token punctuation">,</span> ctypes<span class="token punctuation">.</span>c_int<span class="token punctuation">)</span>
in_mandel<span class="token punctuation">.</span>restype <span class="token operator">=</span> ctypes<span class="token punctuation">.</span>c_int
</code></pre></div><p>函数参数 <code>.argtypes</code> 属性是一个元组，是参数类型签名，<code>.restype</code> 就是相应的返回类型。</p><p>如果不能正确签名，会导致解释器崩溃。</p><h2 id="_2-c-类型、ctypes-类型和-python-类型对应关系" tabindex="-1"><a class="header-anchor" href="#_2-c-类型、ctypes-类型和-python-类型对应关系" aria-hidden="true">#</a> 2. C 类型、ctypes 类型和 Python 类型对应关系</h2><p>下表展示了 C 类型、ctypes 类型和 Python 类型对应关系。</p><table><thead><tr><th style="text-align:left;"><code>ctypes</code> 类型</th><th style="text-align:left;">C 类型</th><th style="text-align:center;">Python 类型</th></tr></thead><tbody><tr><td style="text-align:left;"><code>c_bool</code></td><td style="text-align:left;"><code>_Bool</code></td><td style="text-align:center;"><code>bool</code></td></tr><tr><td style="text-align:left;"><code>c_char</code></td><td style="text-align:left;"><code>char</code></td><td style="text-align:center;"><code>bytes</code></td></tr><tr><td style="text-align:left;"><code>c_wchar</code></td><td style="text-align:left;"><code>wchar_t</code></td><td style="text-align:center;"><code>str</code></td></tr><tr><td style="text-align:left;"><code>c_byte</code></td><td style="text-align:left;"><code>char</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_ubyte</code></td><td style="text-align:left;"><code>unsigned char</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_short</code></td><td style="text-align:left;"><code>short</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_ushort</code></td><td style="text-align:left;"><code>unsigned short</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_int</code></td><td style="text-align:left;"><code>int</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_uint</code></td><td style="text-align:left;"><code>unsigned int</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_long</code></td><td style="text-align:left;"><code>long</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_ulong</code></td><td style="text-align:left;"><code>unsigned long</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_longlong</code></td><td style="text-align:left;"><code>__int64</code> 或 <code>long long</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_ulonglong</code></td><td style="text-align:left;"><code>unsigned __int64</code> 或 <code>unsigned long long</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_size_t</code></td><td style="text-align:left;"><code>size_t</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_ssize_t</code></td><td style="text-align:left;"><code>ssize_t</code> 或 <code>Py_ssize_t</code></td><td style="text-align:center;"><code>int</code></td></tr><tr><td style="text-align:left;"><code>c_float</code></td><td style="text-align:left;"><code>float</code></td><td style="text-align:center;"><code>float</code></td></tr><tr><td style="text-align:left;"><code>c_double</code></td><td style="text-align:left;"><code>double</code></td><td style="text-align:center;"><code>float</code></td></tr><tr><td style="text-align:left;"><code>c_longdouble</code></td><td style="text-align:left;"><code>long double</code></td><td style="text-align:center;"><code>float</code></td></tr><tr><td style="text-align:left;"><code>c_char_p</code></td><td style="text-align:left;"><code>char*</code></td><td style="text-align:center;"><code>bytes</code> 或 <code>None</code></td></tr><tr><td style="text-align:left;"><code>c_wchar_p</code></td><td style="text-align:left;"><code>wchar_t*</code></td><td style="text-align:center;"><code>str</code> 或 <code>None</code></td></tr><tr><td style="text-align:left;"><code>c_void_p</code></td><td style="text-align:left;"><code>void*</code></td><td style="text-align:center;"><code>int</code> 或 <code>None</code></td></tr></tbody></table><h2 id="_3-指针" tabindex="-1"><a class="header-anchor" href="#_3-指针" aria-hidden="true">#</a> 3. 指针</h2><p>指针用法：<code>ctypes.POINTER(ctypes.c_int)</code> 表示 <code>int*</code>。</p><p><code>ctypes.cast()</code> 用于支持 <strong>强制类型转换</strong>，例如 <code>ctypes.cast(ptr, ctypes.POINTER(ctypes.c_double))</code>，将 <code>int</code> 型的 <code>ptr</code> 转换为 <code>ctypes.c_double</code> 型指针。</p><p>如果指针不能正确使用，会导致严重的错误：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">divide</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> remainder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> quot <span class="token operator">=</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>
    <span class="token operator">*</span>remainder <span class="token operator">=</span> a <span class="token operator">%</span> b<span class="token punctuation">;</span>
    <span class="token keyword">return</span> quot<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果这样使用：</p><div class="language-python" data-ext="py"><pre class="language-python"><code>x <span class="token operator">=</span> <span class="token number">0</span>
divide<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
<span class="token comment"># ctypes.ArgumentError</span>
</code></pre></div><p>正确的用法：</p><div class="language-python" data-ext="py"><pre class="language-python"><code>x <span class="token operator">=</span> ctypes<span class="token punctuation">.</span>c_int<span class="token punctuation">(</span><span class="token punctuation">)</span>
divide<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
<span class="token comment"># 3</span>
x<span class="token punctuation">.</span>value
<span class="token comment"># 1</span>
</code></pre></div><p>对于那些不像 Python 的 C 调用，通常可以写一个小的包装函数。这里，我们让 <code>divide()</code> 函数通过元组来返回两个结果：</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token comment"># int divide(int, int, int *)</span>
_divide <span class="token operator">=</span> _mod<span class="token punctuation">.</span>divide
_divide<span class="token punctuation">.</span>argtypes <span class="token operator">=</span> <span class="token punctuation">(</span>ctypes<span class="token punctuation">.</span>c_int<span class="token punctuation">,</span> ctypes<span class="token punctuation">.</span>c_int<span class="token punctuation">,</span> ctypes<span class="token punctuation">.</span>POINTER<span class="token punctuation">(</span>ctypes<span class="token punctuation">.</span>c_int<span class="token punctuation">)</span><span class="token punctuation">)</span>
_divide<span class="token punctuation">.</span>restype <span class="token operator">=</span> ctypes<span class="token punctuation">.</span>c_int

<span class="token keyword">def</span> <span class="token function">divide</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    rem <span class="token operator">=</span> ctypes<span class="token punctuation">.</span>c_int<span class="token punctuation">(</span><span class="token punctuation">)</span>
    quot <span class="token operator">=</span> _divide<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">,</span>rem<span class="token punctuation">)</span>
    <span class="token keyword">return</span> quot<span class="token punctuation">,</span> rem<span class="token punctuation">.</span>value
</code></pre></div><p>对于 C 语言的数组呢？数组就是指针，所以必须传入正确的指针。具体如何向 C 库传入一个指针类型呢？</p><p><code>DoubleArrayType</code> 演示了怎样处理这种情况。 在这个类中定义了一个单个方法 <code>from_param()</code>。</p><p>这个方法的角色是接受一个单个参数然后将其向下转换为一个合适的 <code>ctypes</code> 对象（本例中是一个 <code>ctypes.c_double</code> 的指针）。</p><p>可以直接构造一个 C 数组：</p><div class="language-python" data-ext="py"><pre class="language-python"><code>nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
a <span class="token operator">=</span> <span class="token punctuation">(</span>ctypes<span class="token punctuation">.</span>c_double <span class="token operator">*</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token operator">*</span>nums<span class="token punctuation">)</span>

a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token comment"># 1.0</span>
</code></pre></div><p>对于数组对象，<code>from_array()</code> 提取底层的内存指针并将其转换为一个 <code>ctypes</code> 指针对象。例如：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> array

a <span class="token operator">=</span> array<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># array(&#39;d&#39;, [1.0, 2.0, 3.0])</span>

ptr<span class="token punctuation">,</span> _ <span class="token operator">=</span> a<span class="token punctuation">.</span>buffer_info<span class="token punctuation">(</span><span class="token punctuation">)</span>
ptr
<span class="token comment"># 4298687200（运行时可能不一样）</span>

ctypes<span class="token punctuation">.</span>cast<span class="token punctuation">(</span>ptr<span class="token punctuation">,</span> ctypes<span class="token punctuation">.</span>POINTER<span class="token punctuation">(</span>ctypes<span class="token punctuation">.</span>c_double<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># &lt;__main__.LP_c_double object at 0x10069cd40&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>from_ndarray()</code> 演示了对于 numpy 数组的转换操作。通过定义 <code>DoubleArrayType</code> 类并在 <code>avg()</code> 类型签名中使用它，那么这个函数就能接受多个不同的类数组输入了。</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span> Point<span class="token punctuation">;</span>
</code></pre></div><p>对应 Python 代码：</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Point</span><span class="token punctuation">(</span>ctypes<span class="token punctuation">.</span>Structure<span class="token punctuation">)</span><span class="token punctuation">:</span>
    _fields_ <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">&#39;x&#39;</span><span class="token punctuation">,</span> ctypes<span class="token punctuation">.</span>c_double<span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token string">&#39;y&#39;</span><span class="token punctuation">,</span> ctypes<span class="token punctuation">.</span>c_double<span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre></div><p>由于 <code>ctypes</code> 并不是完全自动化， 那么你就必须花费大量时间来编写所有的类型签名，就像例子中那样，对于大规模的、包含很多复杂函数签名的 C 程序并不适用。</p>`,36);function L(T,E){const e=p("router-link"),c=p("ExternalLinkIcon"),l=p("CodeTabs");return k(),y("div",null,[m,n("nav",b,[n("ul",null,[n("li",null,[a(e,{to:"#_1-ctypes-基本使用"},{default:t(()=>[s("1. ctypes 基本使用")]),_:1})]),n("li",null,[a(e,{to:"#_2-c-类型、ctypes-类型和-python-类型对应关系"},{default:t(()=>[s("2. C 类型、ctypes 类型和 Python 类型对应关系")]),_:1})]),n("li",null,[a(e,{to:"#_3-指针"},{default:t(()=>[s("3. 指针")]),_:1})])])]),n("p",null,[s("本文参考 "),g,s(),n("a",_,[s("中文翻译"),a(c)]),s(" 的第十五章：C 语言扩展来编写的。")]),x,n("p",null,[s("下面我们使用 "),n("a",h,[f,a(c)]),s(" 这段 C 代码来演示。")]),w,a(l,{id:"30",data:[{title:"Windows"},{title:"Linux"}],"tab-id":"sys"},{tab0:t(({title:i,value:d,isActive:u})=>[C]),tab1:t(({title:i,value:d,isActive:u})=>[P]),_:1}),N])}const A=r(v,[["render",L],["__file","ctypes.html.vue"]]);export{A as default};