import{_ as r,M as i,p as c,q as s,R as t,N as d,V as a,t as e,a1 as o}from"./framework-8980b429.js";const u={},p=t("h1",{id:"jinja2-强大的模板引擎",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#jinja2-强大的模板引擎","aria-hidden":"true"},"#"),e(" jinja2 - 强大的模板引擎")],-1),h={class:"table-of-contents"},m=t("h2",{id:"_1-项目简介",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-项目简介","aria-hidden":"true"},"#"),e(" 1. 项目简介")],-1),g=t("thead",null,[t("tr",null,[t("th",null,"项目"),t("th",null,"信息")])],-1),j=t("td",null,"项目地址",-1),v={href:"https://pypi.org/project/parso/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/davidhalter/parso",target:"_blank",rel:"noopener noreferrer"},f=t("td",null,"官方文档",-1),_={href:"https://parso.readthedocs.org/en/latest/",target:"_blank",rel:"noopener noreferrer"},x=t("tr",null,[t("td",null,"开源协议"),t("td",null,"MIT")],-1),k=t("tr",null,[t("td",null,"Python 版本"),t("td",null,"Python 3.6 ~ 3.11")],-1),y=t("tr",null,[t("td",null,"标签"),t("td",null,"compiler")],-1),q=o(`<p>Jinja2 是一个现代的，设计者友好的，仿照 Django 模板的 Python 模板语言。它速度快，被广泛使用，并且提供了可选的沙箱模板执行环境保证安全：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>&lt;title&gt;{% block title %}{% endblock %}&lt;/title&gt;
&lt;ul&gt;
{% for user in users %}
  &lt;li&gt;&lt;a href=&quot;{{ user.url }}&quot;&gt;{{ user.username }}&lt;/a&gt;&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;
</code></pre></div><p>特性：</p><ul><li>沙箱中执行</li><li>强大的 HTML 自动转义系统保护系统免受 XSS</li><li>模板继承</li><li>及时编译最优的 Python 代码</li><li>可选提前编译模板的时间</li><li>易于调试，异常的行数直接指向模板中的对应行</li><li>可配置的语法</li></ul><p>选择 Jinja 作为名字是因为 Jinja 是日本寺庙的名称，并且 temple 和 template 的发音类似。它并不是以乌干达的金贾市（Jinja）命名的。</p><p>快速安装：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> <span class="token parameter variable">-U</span> Jinja2
</code></pre></div><p>基本示例：</p><div class="language-python" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> jinja2 <span class="token keyword">import</span> Template
template <span class="token operator">=</span> Template<span class="token punctuation">(</span><span class="token string">&#39;Hello {{ name }}!&#39;</span><span class="token punctuation">)</span>
template<span class="token punctuation">.</span>render<span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&#39;John Doe&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># &#39;Hello John Doe!&#39;</span>
</code></pre></div><p>通过创建一个 <code>Template</code> 的实例，你会得到一个新的模板对象，提供一个名为 <code>render()</code> 的方法，该方法在有字典或关键字参数时调用扩充模板。字典或关键字参数会被传递到模板，即模板 “<strong>上下文</strong>”。</p><h2 id="_2-jinja2-语法" tabindex="-1"><a class="header-anchor" href="#_2-jinja2-语法" aria-hidden="true">#</a> 2. jinja2 语法</h2>`,11),w={class:"hint-container info"},P=t("p",{class:"hint-container-title"},"官方文档",-1),J={href:"https://jinja.palletsprojects.com/",target:"_blank",rel:"noopener noreferrer"},D=o(`<h3 id="_2-1-基础语法" tabindex="-1"><a class="header-anchor" href="#_2-1-基础语法" aria-hidden="true">#</a> 2.1 基础语法</h3><p>Jinja2 既是模板引擎，也是一种模板语言。</p><p>Jinja2 语言可以使用任意扩展名，但也可以设置为 <code>.jinja</code> 来确保 IDE 可以增强编写体验。</p><p>Jinja2 模版语言类似于 Python，比较符合 Python 语法，但有很多语法不同。</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% extends &quot;base.html&quot; %}
{% block title %}Members{% endblock %}
{% block content %}
  &lt;ul&gt;
  {% for user in users %}
    &lt;li&gt;&lt;a href=&quot;{{ user.url }}&quot;&gt;{{ user.username }}&lt;/a&gt;&lt;/li&gt;
  {% endfor %}
  &lt;/ul&gt;
{% endblock %}
</code></pre></div><p>Jinja2 模版语言，是不区分缩进的，和纯 Python 不同。</p><p>注释：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{# 这是注释 #}
</code></pre></div><p>变量：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{{ post.title }}
</code></pre></div><p>字典元素：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{{ your_dict[&#39;key&#39;] }}
</code></pre></div><p>列表元素：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{{ your_list[0] }}
</code></pre></div><p>方法或函数：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{{ obj.somemethod() }}
</code></pre></div><p>语句：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% ... %}
</code></pre></div><p>多行代码块：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% begin %}
  ...
{% end %}
</code></pre></div><p>分隔符：</p><ul><li><code>{% ... %}</code> 语句</li><li><code>{{ ... }}</code> 模板表达式</li><li><code>{# ... #}</code> 注释</li></ul><p>基础示例 1：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% if user %}
  {{ user }}
{% else %}
  hello!
  {% for index in indexs %}
    {{ index }} 
{% endfor %}
</code></pre></div><p>基础示例 2：</p><div class="language-jinja-html line-numbers-mode" data-ext="jinja-html"><pre class="language-jinja-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;title&gt;My Webpage&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;ul id=&quot;navigation&quot;&gt;
  {% for item in navigation %}
    &lt;li&gt;&lt;a href=&quot;{{ item.href }}&quot;&gt;{{ item.caption }}&lt;/a&gt;&lt;/li&gt;
  {% endfor %}
  &lt;/ul&gt;

  &lt;h1&gt;My Webpage&lt;/h1&gt;
  {{ a_variable }}

  {# a comment #}
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>赋值语句：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% set navigation = [(&#39;index.html&#39;, &#39;Index&#39;), (&#39;about.html&#39;, &#39;About&#39;)] %}
{% set key, value = call_something() %}
</code></pre></div><h3 id="_2-2-过滤器" tabindex="-1"><a class="header-anchor" href="#_2-2-过滤器" aria-hidden="true">#</a> 2.2 过滤器</h3><p>过滤器的语法为 <code>var | filter</code>，有点类似于 Unix 的管道，返回将 <code>filter</code> 应用于 <code>var</code> 的结果。</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{# 带参数 #}
{{ var | filter(*args) }}

{# 不带参数 #}
{{ var | filter }}
</code></pre></div><p>过滤器可以一次调用多个：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{{ &quot;hello world&quot; | reverse | upper }}
</code></pre></div><p>文本块调用（将中间的所有文字都作为变量内容传入到过滤器中）：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% filter upper %}
  一大堆文字
{% endfilter %}
</code></pre></div><p>常用过滤器：</p><table><thead><tr><th>字符串操作</th><th>功能</th></tr></thead><tbody><tr><td><code>safe</code></td><td>禁用转义</td></tr><tr><td><code>e</code></td><td>转义字符串</td></tr><tr><td><code>capitalize</code></td><td>首字母大写</td></tr><tr><td><code>upper</code></td><td>转为大写</td></tr><tr><td><code>lower</code></td><td>转为小写</td></tr><tr><td><code>title</code></td><td>每个单词首字母都转为大写</td></tr><tr><td><code>reverse</code></td><td>反转</td></tr><tr><td><code>format</code></td><td>格式化</td></tr><tr><td><code>striptags</code></td><td>去除标签</td></tr><tr><td><code>truncate</code></td><td>截断字符串</td></tr><tr><td><code>trim</code></td><td>去掉首位空字符</td></tr><tr><td><code>replace</code></td><td>替换操作</td></tr></tbody></table><p>示例：</p><div class="language-jinja-html line-numbers-mode" data-ext="jinja-html"><pre class="language-jinja-html"><code>{{ &#39;&lt;em&gt;hello&lt;/em&gt;&#39; | safe }}
{# &#39;&lt;em&gt;hello&lt;/em&gt;&#39; #}

{{ &#39;hello every one&#39; | truncate(9)}}
{# &#39;hello...&#39; #}

{{ &#39;&lt;em&gt;hello&lt;/em&gt;&#39; | striptags }}
{# &#39;hello&#39; #}

{{ &#39;%s is %d&#39; | format(&#39;name&#39;,17) }}
{# &#39;name is 17&#39; #}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>列表操作：</p><table><thead><tr><th>列表操作</th><th>功能</th></tr></thead><tbody><tr><td><code>first</code></td><td>第一个元素</td></tr><tr><td><code>last</code></td><td>最后一个元素</td></tr><tr><td><code>length</code></td><td>列表长度</td></tr><tr><td><code>sum</code></td><td>列表和</td></tr><tr><td><code>sort</code></td><td>排序后的列表</td></tr></tbody></table><p>示例：</p><div class="language-jinja-html line-numbers-mode" data-ext="jinja-html"><pre class="language-jinja-html"><code>first：取第一个元素
&lt;p&gt;{{ [1,2,3,4,5,6] | first }}&lt;/p&gt;

last：取最后一个元素
&lt;p&gt;{{ [1,2,3,4,5,6] | last }}&lt;/p&gt;

length：获取列表长度
&lt;p&gt;{{ [1,2,3,4,5,6] | length }}&lt;/p&gt;

sum：列表求和
&lt;p&gt;{{ [1,2,3,4,5,6] | sum }}&lt;/p&gt;

sort：列表排序
&lt;p&gt;{{ [6,2,3,1,5,4] | sort }}&lt;/p&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他常见操作：</p><table><thead><tr><th>其他操作</th><th>功能</th></tr></thead><tbody><tr><td><code>default</code></td><td>默认值</td></tr><tr><td><code>join</code></td><td>相当于字符串的 <code>.join(...)</code></td></tr><tr><td><code>int</code></td><td>转为整数</td></tr><tr><td><code>round</code></td><td>四舍五入</td></tr><tr><td><code>escape</code></td><td>转义</td></tr><tr><td><code>first</code></td><td>第一个</td></tr></tbody></table><p>示例：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{{ my_variable | default(&#39;my_variable is not defined&#39;) }}
{# 如果没有定义返回 &#39;my_variable is not defined&#39; #}

{{ items | join(&#39;, &#39;) }}
{# &#39;1, 2, 3, 4&#39; 当 items = [1, 2, 3, 4] 时 #}
</code></pre></div>`,47),M={href:"https://jinja.palletsprojects.com/en/3.1.x/templates/#builtin-filters",target:"_blank",rel:"noopener noreferrer"},T=o(`<table><thead><tr><th>过滤器</th></tr></thead><tbody><tr><td><code>abs()</code></td></tr><tr><td><code>forceescape()</code></td></tr><tr><td><code>map()</code></td></tr><tr><td><code>select()</code></td></tr><tr><td><code>unique()</code></td></tr><tr><td><code>attr()</code></td></tr><tr><td><code>format()</code></td></tr><tr><td><code>max()</code></td></tr><tr><td><code>selectattr()</code></td></tr><tr><td><code>upper()</code></td></tr><tr><td><code>batch()</code></td></tr><tr><td><code>groupby()</code></td></tr><tr><td><code>min()</code></td></tr><tr><td><code>slice()</code></td></tr><tr><td><code>urlencode()</code></td></tr><tr><td><code>capitalize()</code></td></tr><tr><td><code>indent()</code></td></tr><tr><td><code>pprint()</code></td></tr><tr><td><code>sort()</code></td></tr><tr><td><code>urlize()</code></td></tr><tr><td><code>center()</code></td></tr><tr><td><code>int()</code></td></tr><tr><td><code>random()</code></td></tr><tr><td><code>string()</code></td></tr><tr><td><code>wordcount()</code></td></tr><tr><td><code>default()</code></td></tr><tr><td><code>items()</code></td></tr><tr><td><code>reject()</code></td></tr><tr><td><code>striptags()</code></td></tr><tr><td><code>wordwrap()</code></td></tr><tr><td><code>dictsort()</code></td></tr><tr><td><code>join()</code></td></tr><tr><td><code>rejectattr()</code></td></tr><tr><td><code>sum()</code></td></tr><tr><td><code>xmlattr()</code></td></tr><tr><td><code>escape()</code></td></tr><tr><td><code>last()</code></td></tr><tr><td><code>replace()</code></td></tr><tr><td><code>title()</code></td></tr><tr><td><code>filesizeformat()</code></td></tr><tr><td><code>length()</code></td></tr><tr><td><code>reverse()</code></td></tr><tr><td><code>tojson()</code></td></tr><tr><td><code>first()</code></td></tr><tr><td><code>list()</code></td></tr><tr><td><code>round()</code></td></tr><tr><td><code>trim()</code></td></tr><tr><td><code>float()</code></td></tr><tr><td><code>lower()</code></td></tr><tr><td><code>safe()</code></td></tr><tr><td><code>truncate()</code></td></tr></tbody></table><h3 id="_2-3-测试" tabindex="-1"><a class="header-anchor" href="#_2-3-测试" aria-hidden="true">#</a> 2.3 测试</h3><p>使用 <code>is equalto</code> 判断是否相等：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% if user.age is equalto 42 %}
{# 这里也可以写成... is equalto(42) #}
  Ha, you are 42!
{% endif %}
</code></pre></div><p>全部测试：</p><table><thead><tr><th>测试</th></tr></thead><tbody><tr><td><code>boolean()</code></td></tr><tr><td><code>even()</code></td></tr><tr><td><code>in()</code></td></tr><tr><td><code>mapping()</code></td></tr><tr><td><code>sequence()</code></td></tr><tr><td><code>callable()</code></td></tr><tr><td><code>false()</code></td></tr><tr><td><code>integer()</code></td></tr><tr><td><code>ne()</code></td></tr><tr><td><code>string()</code></td></tr><tr><td><code>defined()</code></td></tr><tr><td><code>filter()</code></td></tr><tr><td><code>iterable()</code></td></tr><tr><td><code>none()</code></td></tr><tr><td><code>test()</code></td></tr><tr><td><code>divisibleby()</code></td></tr><tr><td><code>float()</code></td></tr><tr><td><code>le()</code></td></tr><tr><td><code>number()</code></td></tr><tr><td><code>true()</code></td></tr><tr><td><code>eq()</code></td></tr><tr><td><code>ge()</code></td></tr><tr><td><code>lower()</code></td></tr><tr><td><code>odd()</code></td></tr><tr><td><code>undefined()</code></td></tr><tr><td><code>escaped()</code></td></tr><tr><td><code>gt()</code></td></tr><tr><td><code>lt()</code></td></tr><tr><td><code>sameas()</code></td></tr><tr><td><code>upper()</code></td></tr></tbody></table><h3 id="_2-4-分支和循环" tabindex="-1"><a class="header-anchor" href="#_2-4-分支和循环" aria-hidden="true">#</a> 2.4 分支和循环</h3><p><code>if</code> 语句：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% if kenny.sick %}
  Kenny is sick.
{% elif kenny.dead %}
  You killed Kenny! You bastard!!!
{% else %}
  Kenny looks okay -- so far
{% endif %}
</code></pre></div><p>使用 <code>for</code> 语句在使用之前可以判断是否为空，因为模板引擎不会检查 <code>users</code> 是否存在：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% if users %}
&lt;ul&gt;
{% for user in users %}
  &lt;li&gt;{{ user.username|e }}&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;
{% endif %}
</code></pre></div><p><code>break</code> 和 <code>continue</code> 也可以使用：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% for user in users %}
  {%- if loop.index &gt;= 10 %}{% break %}{% endif %}
{%- endfor %}
</code></pre></div><ul><li><code>loop.index</code>：循环当前迭代（从 1 开始）</li><li><code>loop.index0</code>：循环当前迭代（从 0 开始）</li><li><code>loop.revindex</code>：循环迭代的数量（从 1 开始）</li><li><code>loop.revindex0</code>：循环迭代的数量（从 0 开始）</li><li><code>loop.first</code>：是否为迭代的第一步</li><li><code>loop.last</code>：是否为迭代的最后一步</li><li><code>loop.length</code>：序列中元素的数量</li></ul><p>一些全局函数：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>&lt;ul&gt;
{% for user in users %}
  &lt;li&gt;{{ user.username }}&lt;/li&gt;
{% endfor %}
{% for number in range(10 - users|count) %}
  &lt;li class=&quot;empty&quot;&gt;&lt;span&gt;...&lt;/span&gt;&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;
</code></pre></div><p>一些全局函数：</p><table><thead><tr><th>全局函数</th><th>功能</th></tr></thead><tbody><tr><td><code>range()</code></td><td>相当于 Python <code>range()</code></td></tr><tr><td><code>lipsum()</code></td><td>生成段落测试</td></tr><tr><td><code>dict()</code></td><td>相当于 Python <code>dict()</code></td></tr><tr><td><code>cycler()</code></td><td>生成序列的循环</td></tr><tr><td><code>joiner()</code></td><td>连接字符串对象</td></tr><tr><td><code>namespace()</code></td><td>创建新的命名空间</td></tr></tbody></table><h3 id="_2-5-宏" tabindex="-1"><a class="header-anchor" href="#_2-5-宏" aria-hidden="true">#</a> 2.5 宏</h3><p>宏类似于 Python 中的函数，我们在宏中定义行为，还可以进行传递参数。定义一个宏的关键字是 <code>macro</code>，后面跟宏的名称和参数等。</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% macro input(name,age=18) %}
  &lt;input type=&#39;text&#39; name=&quot;{{ name }}&quot; value=&quot;{{ age }}&quot; &gt;
{% endmacro %}
</code></pre></div><h3 id="_2-6-继承和骨架" tabindex="-1"><a class="header-anchor" href="#_2-6-继承和骨架" aria-hidden="true">#</a> 2.6 继承和骨架</h3><p><code>extends</code> 可以让我们引用别的文件来自动插入：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% extends &quot;base.html&quot; %}
</code></pre></div><p>配合 <code>block</code> 语法可以构成页面的骨架：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% block footer %}
  footer para.
{% endblock %}
</code></pre></div><p>其中 <code>footer</code> 可以被替换为 <code>title</code>、<code>head</code>、<code>sidebar</code>、<code>content</code> 等。<code>block</code> 同名的对象只能定义一次，但可以被多次引用：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>&lt;title&gt;{% block title %}{% endblock %}&lt;/title&gt;
&lt;h1&gt;{{ self.title() }}&lt;/h1&gt;
{% block body %}{% endblock %}
</code></pre></div><h3 id="_2-7-扩展语法" tabindex="-1"><a class="header-anchor" href="#_2-7-扩展语法" aria-hidden="true">#</a> 2.7 扩展语法</h3><p>执行但不输出：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% do navigation.append(&#39;a string&#39;) %}
</code></pre></div><p>Debug 输出：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>&lt;pre&gt;{% debug %}&lt;/pre&gt;
</code></pre></div><p>With 语句运行声明局域变量：</p><div class="language-jinja-html line-numbers-mode" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% with %}
    {% set foo = 42 %}
    {{ foo }}           foo is 42 here
{% endwith %}
foo is not visible here any longer

{% with a={}, b=a.attribute %}...{% endwith %}

{% with foo = 42 %}
  {{ foo }}
{% endwith %}

{% with %}
  {% set foo = 42 %}
  {{ foo }}
{% endwith %}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>区域内转义：</p><div class="language-jinja-html" data-ext="jinja-html"><pre class="language-jinja-html"><code>{% autoescape true %}
  Autoescaping is active within this block
{% endautoescape %}

{% autoescape false %}
  Autoescaping is inactive within this block
{% endautoescape %}
</code></pre></div><h2 id="附录-基准测试" tabindex="-1"><a class="header-anchor" href="#附录-基准测试" aria-hidden="true">#</a> 附录：基准测试</h2>`,38),I={href:"http://www.makotemplates.org/",target:"_blank",rel:"noopener noreferrer"},E=t("strong",null,"数据库或应用的代码",-1);function H(N,V){const n=i("router-link"),l=i("ExternalLinkIcon");return c(),s("div",null,[p,t("nav",h,[t("ul",null,[t("li",null,[d(n,{to:"#_1-项目简介"},{default:a(()=>[e("1. 项目简介")]),_:1})]),t("li",null,[d(n,{to:"#_2-jinja2-语法"},{default:a(()=>[e("2. jinja2 语法")]),_:1}),t("ul",null,[t("li",null,[d(n,{to:"#_2-1-基础语法"},{default:a(()=>[e("2.1 基础语法")]),_:1})]),t("li",null,[d(n,{to:"#_2-2-过滤器"},{default:a(()=>[e("2.2 过滤器")]),_:1})]),t("li",null,[d(n,{to:"#_2-3-测试"},{default:a(()=>[e("2.3 测试")]),_:1})]),t("li",null,[d(n,{to:"#_2-4-分支和循环"},{default:a(()=>[e("2.4 分支和循环")]),_:1})]),t("li",null,[d(n,{to:"#_2-5-宏"},{default:a(()=>[e("2.5 宏")]),_:1})]),t("li",null,[d(n,{to:"#_2-6-继承和骨架"},{default:a(()=>[e("2.6 继承和骨架")]),_:1})]),t("li",null,[d(n,{to:"#_2-7-扩展语法"},{default:a(()=>[e("2.7 扩展语法")]),_:1})])])]),t("li",null,[d(n,{to:"#附录-基准测试"},{default:a(()=>[e("附录：基准测试")]),_:1})])])]),m,t("table",null,[g,t("tbody",null,[t("tr",null,[j,t("td",null,[t("a",v,[e("PyPI"),d(l)]),e(" | "),t("a",b,[e("GitHub"),d(l)])])]),t("tr",null,[f,t("td",null,[t("a",_,[e("parso.readthedocs.org"),d(l)])])]),x,k,y])]),q,t("div",w,[P,t("p",null,[t("a",J,[e("jinja2 语法"),d(l)]),e(" 官方文档。")])]),D,t("p",null,[t("a",M,[e("全部过滤器"),d(l)]),e("：")]),T,t("p",null,[e("我们相当厌烦基准测试，尤其是因为它们并不能影响什么。一个模板的性能取决于许多因素，而你可能需要在不同环境中对不同的引擎做基准测试。测试套件中的基准测试表明，Jinja2 与 "),t("a",I,[e("Mako"),d(l)]),e(" 的性能相近，比 Django 的模板引擎或 Genshi 快 10 到 20 倍。这些数字应该相当有刺激性，因为基准测试只测试一些性能相关的场景，比如循环，来获取这些数字。大体上，一个模板引擎的性能几乎不会成为一个 Web 应用的瓶颈，而应该是 "),E,e("。")])])}const W=r(u,[["render",H],["__file","jinja2.html.vue"]]);export{W as default};
