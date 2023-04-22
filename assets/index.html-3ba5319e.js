import{_ as r,M as l,p as a,q as s,R as t,N as d,V as n,t as e,a1 as i}from"./framework-5f7e94ef.js";const x={},h=t("h1",{id:"_4-pyside6-控件",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_4-pyside6-控件","aria-hidden":"true"},"#"),e(" 4. PySide6 控件")],-1),f={class:"table-of-contents"},y=i('<h2 id="qbuttongroup" tabindex="-1"><a class="header-anchor" href="#qbuttongroup" aria-hidden="true">#</a> QButtonGroup</h2><p>在 Qt Designer 中，选择多个 <code>RadioButton</code> 对象右键，选择分配给按钮组，新建按钮组即可创建一个 <code>QButtonGroup</code>。</p><h2 id="使用-inputmask-设置字符掩码" tabindex="-1"><a class="header-anchor" href="#使用-inputmask-设置字符掩码" aria-hidden="true">#</a> 使用 InputMask 设置字符掩码</h2><p><code>QLineEdit</code> 有一个属性是 <code>InputMask</code>，可以使用 <code>setInputMask</code> 进行设置，目的是设置字符掩码，限制用户输入的内容必须符合掩码。<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></p><p>下面是 Qt6 规范：</p><table><thead><tr><th style="text-align:center;">掩码字符</th><th style="text-align:left;">含义</th></tr></thead><tbody><tr><td style="text-align:center;"><code>A</code></td><td style="text-align:left;">只能是字母且必须，取值为 <code>[a-zA-Z]</code></td></tr><tr><td style="text-align:center;"><code>a</code></td><td style="text-align:left;">同上但不是必须的</td></tr><tr><td style="text-align:center;"><code>N</code></td><td style="text-align:left;">字母或数字 <code>[0-9a-zA-Z]</code></td></tr><tr><td style="text-align:center;"><code>n</code></td><td style="text-align:left;">同上但不是必须的</td></tr><tr><td style="text-align:center;"><code>X</code></td><td style="text-align:left;">任何字符</td></tr><tr><td style="text-align:center;"><code>x</code></td><td style="text-align:left;">同上但不是必须的</td></tr><tr><td style="text-align:center;"><code>9</code></td><td style="text-align:left;">数字 <code>[0-9]</code></td></tr><tr><td style="text-align:center;"><code>0</code></td><td style="text-align:left;">同上但不是必须的</td></tr><tr><td style="text-align:center;"><code>D</code></td><td style="text-align:left;">数字 <code>[1-9]</code></td></tr><tr><td style="text-align:center;"><code>d</code></td><td style="text-align:left;">同上但不是必须的</td></tr><tr><td style="text-align:center;"><code>#</code></td><td style="text-align:left;">数字或加减号 <code>[0-9+-]</code>，不是必须的</td></tr><tr><td style="text-align:center;"><code>H</code></td><td style="text-align:left;">十六进制字符 <code>[0-9a-fA-F]</code></td></tr><tr><td style="text-align:center;"><code>h</code></td><td style="text-align:left;">同上但不是必须的</td></tr><tr><td style="text-align:center;"><code>B</code></td><td style="text-align:left;">二进制字符 <code>[01]</code></td></tr><tr><td style="text-align:center;"><code>b</code></td><td style="text-align:left;">同上但不是必须的</td></tr></tbody></table><p>还可以使用元字符用于增强规则：</p><table><thead><tr><th style="text-align:center;">元字符</th><th style="text-align:left;">含义</th></tr></thead><tbody><tr><td style="text-align:center;"><code>&gt;</code></td><td style="text-align:left;">所有字符都被转换为大写</td></tr><tr><td style="text-align:center;"><code>&lt;</code></td><td style="text-align:left;">所有字符都被转换为小写</td></tr><tr><td style="text-align:center;"><code>!</code></td><td style="text-align:left;">关闭大小写转换</td></tr><tr><td style="text-align:center;"><code>;c</code></td><td style="text-align:left;">终止掩码规则并将空字符设置为 <em><code>c</code></em></td></tr><tr><td style="text-align:center;"><code>[ ] { }</code></td><td style="text-align:left;">保留内容</td></tr><tr><td style="text-align:center;"><code>\\</code></td><td style="text-align:left;">转义上述掩码字符或元字符</td></tr></tbody></table><p>总结：</p><ul><li>掩码字符中，大写为必须输入，小写为可选</li><li>元字符可以混合使用以便控制输入方式</li></ul><table><thead><tr><th>实例</th><th>含义</th></tr></thead><tbody><tr><td><code>000.000.000.000;_</code></td><td>IP 地址，<code>_</code> 表示空白</td></tr><tr><td><code>HH:HH:HH:HH:HH:HH;_</code></td><td>MAC 地址</td></tr><tr><td><code>0000-00-00</code></td><td>ISO 日期，空白为空格 <code>&#39; &#39;</code></td></tr><tr><td><code>&gt;AAAAA-AAAAA-AAAAA-AAAAA-AAAAA;#</code></td><td>许可证号码，大写，空白为 <code>#</code></td></tr></tbody></table><p>如果我需要设计一个输入 4 字节十六进制数字的输入框，可以使用 <code>&gt;HH-HH-HH-HH;_</code> 来表示。</p><hr class="footnotes-sep">',13),g={class:"footnotes"},p={class:"footnotes-list"},u={id:"footnote1",class:"footnote-item"},_={href:"https://doc.qt.io/qt-6/qlineedit.html#inputMask-prop",target:"_blank",rel:"noopener noreferrer"},A=t("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1);function b(H,k){const o=l("router-link"),c=l("ExternalLinkIcon");return a(),s("div",null,[h,t("nav",f,[t("ul",null,[t("li",null,[d(o,{to:"#qbuttongroup"},{default:n(()=>[e("QButtonGroup")]),_:1})]),t("li",null,[d(o,{to:"#使用-inputmask-设置字符掩码"},{default:n(()=>[e("使用 InputMask 设置字符掩码")]),_:1})])])]),y,t("section",g,[t("ol",p,[t("li",u,[t("p",null,[e("QLineEdit，Qt6，"),t("a",_,[e("https://doc.qt.io/qt-6/qlineedit.html#inputMask-prop"),d(c)]),e(),A])])])])])}const q=r(x,[["render",b],["__file","index.html.vue"]]);export{q as default};