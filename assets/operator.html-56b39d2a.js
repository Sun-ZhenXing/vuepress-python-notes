import{_ as t,o as d,c as e,e as o}from"./app-d1290edd.js";const c={},r=o('<h1 id="python-运算符" tabindex="-1"><a class="header-anchor" href="#python-运算符" aria-hidden="true">#</a> Python 运算符</h1><h2 id="_1-1-运算符优先级" tabindex="-1"><a class="header-anchor" href="#_1-1-运算符优先级" aria-hidden="true">#</a> 1.1 运算符优先级</h2><table><thead><tr><th>运算符</th><th>描述</th><th>优先级</th><th>结合性</th></tr></thead><tbody><tr><td><code>(expr...)</code>、<code>[expr...]</code>、<code>{key: value...}</code>、<code>{expr...}</code></td><td>绑定或加圆括号的表达式，列表、字典、集合</td><td>18</td><td>左</td></tr><tr><td><code>x[i]</code>、<code>x[i:j]</code>、<code>x(args...)</code>、<code>x.attribute</code></td><td>索引、切片、调用、属性引用</td><td>17</td><td>左</td></tr><tr><td><code>await x</code></td><td><code>await</code> 表达式</td><td>16</td><td>左</td></tr><tr><td><code>**</code></td><td>幂<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></td><td>15</td><td>右</td></tr><tr><td><code>+x</code>、<code>-x</code>、<code>~x</code></td><td>正，负，按位非 NOT</td><td>14</td><td>右</td></tr><tr><td><code>*</code>、<code>@</code>、<code>/</code>、<code>//</code>、<code>%</code></td><td>乘，矩阵乘，除，整除，取余</td><td>13</td><td>左</td></tr><tr><td><code>+</code>、<code>-</code></td><td>加和减</td><td>12</td><td>左</td></tr><tr><td><code>&lt;&lt;</code>、<code>&gt;&gt;</code></td><td>移位</td><td>11</td><td>左</td></tr><tr><td><code>&amp;</code></td><td>按位与 AND</td><td>10</td><td>左</td></tr><tr><td><code>^</code></td><td>按位异或 XOR</td><td>9</td><td>左</td></tr><tr><td><code>| </code></td><td>按位或 OR</td><td>8</td><td>左</td></tr><tr><td><code>in</code>、<code>not in</code>、<code>is</code>、<code>is not</code>、<code>&lt;</code>、<code>&lt;=</code>、<code>&gt;</code>、<code>&gt;=</code>、<code>!=</code>、<code>==</code></td><td>比较运算，包括成员检测和标识号检测</td><td>7</td><td>左</td></tr><tr><td><code>not x</code></td><td>布尔逻辑非 NOT</td><td>6</td><td>右</td></tr><tr><td><code>and</code></td><td>布尔逻辑与 AND</td><td>5</td><td>左</td></tr><tr><td><code>or</code></td><td>布尔逻辑或 OR</td><td>4</td><td>左</td></tr><tr><td><code>if ... else ...</code></td><td>条件表达式</td><td>3</td><td>左</td></tr><tr><td><code>lambda</code></td><td><code>lambda</code> 表达式</td><td>2</td><td>左</td></tr><tr><td><code>:=</code></td><td>赋值表达式</td><td>1</td><td>左</td></tr></tbody></table><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>幂运算符 <code>**</code> 绑定的紧密程度低于在其右侧的算术或按位一元运算符，也就是说 <code>2**-1</code> 为 <code>0.5</code>。 <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li></ol></section>',5),a=[r];function s(n,h){return d(),e("div",null,a)}const l=t(c,[["render",s],["__file","operator.html.vue"]]);export{l as default};