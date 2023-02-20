import{_ as n,p as a,q as s,a1 as t}from"./framework-8980b429.js";const p={},o=t(`<h1 id="从绝对路径上导入-python-模块" tabindex="-1"><a class="header-anchor" href="#从绝对路径上导入-python-模块" aria-hidden="true">#</a> 从绝对路径上导入 Python 模块</h1><p>对于 Python 3.5+，使用 <code>importlib.util</code> 库的函数来导入模块：</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> importlib<span class="token punctuation">.</span>util


<span class="token keyword">def</span> <span class="token function">load_file</span><span class="token punctuation">(</span>path<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    spec <span class="token operator">=</span> importlib<span class="token punctuation">.</span>util<span class="token punctuation">.</span>spec_from_file_location<span class="token punctuation">(</span><span class="token string">&#39;module_name&#39;</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
    modulevar <span class="token operator">=</span> importlib<span class="token punctuation">.</span>util<span class="token punctuation">.</span>module_from_spec<span class="token punctuation">(</span>spec<span class="token punctuation">)</span>
    spec<span class="token punctuation">.</span>loader<span class="token punctuation">.</span>exec_module<span class="token punctuation">(</span>modulevar<span class="token punctuation">)</span>
    <span class="token keyword">return</span> modulevar
</code></pre></div>`,3),e=[o];function c(l,u){return a(),s("div",null,e)}const r=n(p,[["render",c],["__file","import-python-file-from-path.html.vue"]]);export{r as default};
