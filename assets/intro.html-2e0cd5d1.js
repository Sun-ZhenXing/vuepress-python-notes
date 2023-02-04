import{_ as i,M as r,p as d,q as l,R as e,N as a,V as o,t,a1 as c}from"./framework-39cc0843.js";const s={},_=e("h1",{id:"python-c-c-混合编程概述",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#python-c-c-混合编程概述","aria-hidden":"true"},"#"),t(" Python C/C++ 混合编程概述")],-1),u={class:"table-of-contents"},p=c('<h2 id="_1-python-与-c-c-混合编程" tabindex="-1"><a class="header-anchor" href="#_1-python-与-c-c-混合编程" aria-hidden="true">#</a> 1. Python 与 C/C++ 混合编程</h2><p>Python 与 C/C++ 代码进行互操作，在 C/C++ 程序可以通过引入 <code>&lt;Python.h&gt;</code> 来引用 Python 的一些功能，从而可以提供 Python 接口。Python 也可以直接或间接调用 C/C++ 库中的一些功能，但实现比较复杂。因此有一些第三方库用于实现这种互操作性。</p><h2 id="_2-原生接口" tabindex="-1"><a class="header-anchor" href="#_2-原生接口" aria-hidden="true">#</a> 2. 原生接口</h2><p>Python 的标准库 <code>ctypes</code> 实现了与 C 的互操作性，但缺点是需要写很多接口描述代码。</p><h2 id="_3-常见第三方生态" tabindex="-1"><a class="header-anchor" href="#_3-常见第三方生态" aria-hidden="true">#</a> 3. 常见第三方生态</h2><h3 id="_3-1-boost-python" tabindex="-1"><a class="header-anchor" href="#_3-1-boost-python" aria-hidden="true">#</a> 3.1 Boost.Python</h3><p>Boost 模块支持导出为 Python 接口。</p><h3 id="_3-2-pybind11" tabindex="-1"><a class="header-anchor" href="#_3-2-pybind11" aria-hidden="true">#</a> 3.2 PyBind11</h3><p>C++11 与 Python 绑定，减去了旧 C++ 支持，更轻量化，C++ 工程也只需要引入头文件即可，不需要修改内容。</p><h3 id="_3-3-cffi" tabindex="-1"><a class="header-anchor" href="#_3-3-cffi" aria-hidden="true">#</a> 3.3 CFFI</h3>',10),f={href:"https://cffi-zh-cn.readthedocs.io/zh/latest/overview.html",target:"_blank",rel:"noopener noreferrer"},y=e("h3",{id:"_3-4-swig",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-4-swig","aria-hidden":"true"},"#"),t(" 3.4 SWIG")],-1),C={href:"http://swig.org/",target:"_blank",rel:"noopener noreferrer"},P=e("h3",{id:"_3-5-weave",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-5-weave","aria-hidden":"true"},"#"),t(" 3.5 Weave")],-1),x={href:"http://www.scipy.org/Weave",target:"_blank",rel:"noopener noreferrer"},b=e("h3",{id:"_3-6-pyrex",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-6-pyrex","aria-hidden":"true"},"#"),t(" 3.6 Pyrex")],-1),v=e("p",null,"Pyrex 允许编写以任何想要的方式混合 Python 和 C 数据类型的代码，并将其编译为 Python 的 C 扩展。",-1);function w(g,m){const n=r("router-link"),h=r("ExternalLinkIcon");return d(),l("div",null,[_,e("nav",u,[e("ul",null,[e("li",null,[a(n,{to:"#_1-python-与-c-c-混合编程"},{default:o(()=>[t("1. Python 与 C/C++ 混合编程")]),_:1})]),e("li",null,[a(n,{to:"#_2-原生接口"},{default:o(()=>[t("2. 原生接口")]),_:1})]),e("li",null,[a(n,{to:"#_3-常见第三方生态"},{default:o(()=>[t("3. 常见第三方生态")]),_:1}),e("ul",null,[e("li",null,[a(n,{to:"#_3-1-boost-python"},{default:o(()=>[t("3.1 Boost.Python")]),_:1})]),e("li",null,[a(n,{to:"#_3-2-pybind11"},{default:o(()=>[t("3.2 PyBind11")]),_:1})]),e("li",null,[a(n,{to:"#_3-3-cffi"},{default:o(()=>[t("3.3 CFFI")]),_:1})]),e("li",null,[a(n,{to:"#_3-4-swig"},{default:o(()=>[t("3.4 SWIG")]),_:1})]),e("li",null,[a(n,{to:"#_3-5-weave"},{default:o(()=>[t("3.5 Weave")]),_:1})]),e("li",null,[a(n,{to:"#_3-6-pyrex"},{default:o(()=>[t("3.6 Pyrex")]),_:1})])])])])]),p,e("p",null,[e("a",f,[t("CFFI"),a(h)]),t(" 是 Python 调用 C 语言代码框架。目标是在不学习第三种编程语言的情况下从 Python 调用 C 语言代码。")]),y,e("p",null,[e("a",C,[t("SWIG"),a(h)]),t(" 是帮助将 C/C++ 编写的程序与其他高级语言嵌入联接的开发工具。例如 PHP、Python、Lua、C#、Java 等。")]),P,e("p",null,[e("a",x,[t("Weave"),a(h)]),t(" 是完整的 SciPy 包的一部分，它允许 Python 嵌入 C/C++ 代码，Weave 这也有独立的包支持。")]),b,v])}const B=i(s,[["render",w],["__file","intro.html.vue"]]);export{B as default};