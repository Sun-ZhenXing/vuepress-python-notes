import{_ as i,r as p,o as D,c as y,b as s,a as e,w as a,d as l,e as d}from"./app-VcvQJWSe.js";const u={},h=s("h1",{id:"pip-使用镜像",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#pip-使用镜像","aria-hidden":"true"},"#"),l(" pip 使用镜像")],-1),C={class:"table-of-contents"},_=s("h2",{id:"1-临时使用镜像",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#1-临时使用镜像","aria-hidden":"true"},"#"),l(" 1. 临时使用镜像")],-1),E=s("p",null,[l("使用 "),s("code",null,"pip"),l(" 时使用 "),s("code",null,"-i"),l(" 指定一个镜像地址，例如使用清华大学镜像安装 "),s("code",null,"opencv-python"),l("：")],-1),b=s("div",{class:"language-bash","data-ext":"sh"},[s("pre",{class:"shiki dark-plus",style:{"background-color":"#1E1E1E"},tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"pip3"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"install"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#569CD6"}},"-i"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"https://pypi.tuna.tsinghua.edu.cn/simple"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"opencv-python")]),l(`
`),s("span",{class:"line"})])])],-1),g=s("div",{class:"language-bash","data-ext":"sh"},[s("pre",{class:"shiki dark-plus",style:{"background-color":"#1E1E1E"},tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"pip"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"install"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#569CD6"}},"-i"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"https://pypi.tuna.tsinghua.edu.cn/simple"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"opencv-python")]),l(`
`),s("span",{class:"line"})])])],-1),x=s("h2",{id:"2-全局设置镜像",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#2-全局设置镜像","aria-hidden":"true"},"#"),l(" 2. 全局设置镜像")],-1),v=s("p",null,"以清华大学 PyPI 镜像为例，如果需要设置到别的镜像请替换 URL 地址：",-1),A=s("div",{class:"language-bash","data-ext":"sh"},[s("pre",{class:"shiki dark-plus",style:{"background-color":"#1E1E1E"},tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#6A9955"}},"# 在此指定你的镜像地址")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#569CD6"}},"export"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#9CDCFE"}},"mirror_url"),s("span",{style:{color:"#D4D4D4"}},"="),s("span",{style:{color:"#CE9178"}},"'https://pypi.tuna.tsinghua.edu.cn/simple'")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A9955"}},"# 首先更新 pip 确保 pip config 可用")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"python3"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#569CD6"}},"-m"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"pip"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"install"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#569CD6"}},"-i"),s("span",{style:{color:"#D4D4D4"}}," ${"),s("span",{style:{color:"#9CDCFE"}},"mirror_url"),s("span",{style:{color:"#D4D4D4"}},"} "),s("span",{style:{color:"#569CD6"}},"--upgrade"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"pip")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A9955"}},"# 设置镜像")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"pip3"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"config"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"set"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"global.index-url"),s("span",{style:{color:"#D4D4D4"}}," ${"),s("span",{style:{color:"#9CDCFE"}},"mirror_url"),s("span",{style:{color:"#D4D4D4"}},"}")]),l(`
`),s("span",{class:"line"})])])],-1),m=s("div",{class:"language-bash","data-ext":"sh"},[s("pre",{class:"shiki dark-plus",style:{"background-color":"#1E1E1E"},tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#6A9955"}},"# 在此指定你的镜像地址")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"set"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"mirror_url=https://pypi.tuna.tsinghua.edu.cn/simple")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A9955"}},"# 首先更新 pip 确保 pip config 可用")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"python"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#569CD6"}},"-m"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"pip"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"install"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#569CD6"}},"-i"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"%mirror_url%"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#569CD6"}},"--upgrade"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"pip")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6A9955"}},"# 设置镜像")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"pip"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"config"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"set"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"global.index-url"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"%mirror_url%")]),l(`
`),s("span",{class:"line"})])])],-1),k=s("h2",{id:"3-在镜像间进行负载均衡",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#3-在镜像间进行负载均衡","aria-hidden":"true"},"#"),l(" 3. 在镜像间进行负载均衡")],-1),f={href:"https://mirrors.cernet.edu.cn/list/pypi",target:"_blank",rel:"noopener noreferrer"},L=d(`<p>中国大陆常见镜像网站：</p><div class="language-bash" data-ext="sh"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#DCDCAA;">pip3</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">config</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">set</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">global.extra-index-url</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&quot;https://pypi.tuna.tsinghua.edu.cn/simple/ https://mirrors.aliyun.com/pypi/simple/&quot;</span></span>
<span class="line"></span></code></pre></div><p>请先依据上面的命令升级 pip，然后将各个 URL 用空格分开：</p>`,3),w=s("div",{class:"language-bash","data-ext":"sh"},[s("pre",{class:"shiki dark-plus",style:{"background-color":"#1E1E1E"},tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"pip3"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"config"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"set"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"global.extra-index-url"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},'"<url1> <url2>..."')]),l(`
`),s("span",{class:"line"})])])],-1),M=s("div",{class:"language-bash","data-ext":"sh"},[s("pre",{class:"shiki dark-plus",style:{"background-color":"#1E1E1E"},tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#DCDCAA"}},"pip"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"config"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"set"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},"global.extra-index-url"),s("span",{style:{color:"#D4D4D4"}}," "),s("span",{style:{color:"#CE9178"}},'"<url1> <url2>..."')]),l(`
`),s("span",{class:"line"})])])],-1);function W(N,V){const t=p("router-link"),c=p("CodeTabs"),r=p("ExternalLinkIcon");return D(),y("div",null,[h,s("nav",C,[s("ul",null,[s("li",null,[e(t,{to:"#1-临时使用镜像"},{default:a(()=>[l("1. 临时使用镜像")]),_:1})]),s("li",null,[e(t,{to:"#2-全局设置镜像"},{default:a(()=>[l("2. 全局设置镜像")]),_:1})]),s("li",null,[e(t,{to:"#3-在镜像间进行负载均衡"},{default:a(()=>[l("3. 在镜像间进行负载均衡")]),_:1})])])]),_,E,e(c,{id:"12",data:[{id:"Linux/Mac"},{id:"Windows"}],"tab-id":"sys"},{title0:a(({value:o,isActive:n})=>[l("Linux/Mac")]),title1:a(({value:o,isActive:n})=>[l("Windows")]),tab0:a(({value:o,isActive:n})=>[b]),tab1:a(({value:o,isActive:n})=>[g]),_:1}),x,v,e(c,{id:"26",data:[{id:"Linux/Mac"},{id:"Windows"}],"tab-id":"sys"},{title0:a(({value:o,isActive:n})=>[l("Linux/Mac")]),title1:a(({value:o,isActive:n})=>[l("Windows")]),tab0:a(({value:o,isActive:n})=>[A]),tab1:a(({value:o,isActive:n})=>[m]),_:1}),k,s("p",null,[l("对于中国大陆的镜像站，可从 "),s("a",f,[l("中国教育和科研计算机网"),e(r)]),l(" 进行获取。")]),L,e(c,{id:"47",data:[{id:"Linux/Mac"},{id:"Windows"}],"tab-id":"sys"},{title0:a(({value:o,isActive:n})=>[l("Linux/Mac")]),title1:a(({value:o,isActive:n})=>[l("Windows")]),tab0:a(({value:o,isActive:n})=>[w]),tab1:a(({value:o,isActive:n})=>[M]),_:1})])}const F=i(u,[["render",W],["__file","mirrors.html.vue"]]);export{F as default};