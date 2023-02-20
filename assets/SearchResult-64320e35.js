import{u as le,y as oe,a as U,A as ae,b as ne,V as G,c as se,d as re,x as V,o as ie}from"./app-3ab2d1e2.js";import{r as C,h as k,c as ue,u as ce,ab as ve,o as de,I as he,j as o,a5 as J,z as fe,K as pe,i as ye}from"./framework-8980b429.js";function me(t){if(Array.isArray(t)){for(var e=0,l=Array(t.length);e<t.length;e++)l[e]=t[e];return l}else return Array.from(t)}var F=!1;if(typeof window<"u"){var Q={get passive(){F=!0}};window.addEventListener("testPassive",null,Q),window.removeEventListener("testPassive",null,Q)}var W=typeof window<"u"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1),w=[],A=!1,S=-1,b=void 0,H=void 0,X=function(e){return w.some(function(l){return!!(l.options.allowTouchMove&&l.options.allowTouchMove(e))})},j=function(e){var l=e||window.event;return X(l.target)||l.touches.length>1?!0:(l.preventDefault&&l.preventDefault(),!1)},ge=function(e){if(H===void 0){var l=!!e&&e.reserveScrollBarGap===!0,a=window.innerWidth-document.documentElement.clientWidth;l&&a>0&&(H=document.body.style.paddingRight,document.body.style.paddingRight=a+"px")}b===void 0&&(b=document.body.style.overflow,document.body.style.overflow="hidden")},we=function(){H!==void 0&&(document.body.style.paddingRight=H,H=void 0),b!==void 0&&(document.body.style.overflow=b,b=void 0)},Ce=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},be=function(e,l){var a=e.targetTouches[0].clientY-S;return X(e.target)?!1:l&&l.scrollTop===0&&a>0||Ce(l)&&a<0?j(e):(e.stopPropagation(),!0)},He=function(e,l){if(!e){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(!w.some(function(n){return n.targetElement===e})){var a={targetElement:e,options:l||{}};w=[].concat(me(w),[a]),W?(e.ontouchstart=function(n){n.targetTouches.length===1&&(S=n.targetTouches[0].clientY)},e.ontouchmove=function(n){n.targetTouches.length===1&&be(n,e)},A||(document.addEventListener("touchmove",j,F?{passive:!1}:void 0),A=!0)):ge(l)}},Ge=function(){W?(w.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),A&&(document.removeEventListener("touchmove",j,F?{passive:!1}:void 0),A=!1),S=-1):we(),w=[]};const Ie="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",E=()=>o(G,{name:"close"},()=>o("path",{d:"M507.168 473.232 716.48 263.936a16 16 0 0 1 22.624 0l11.312 11.312a16 16 0 0 1 0 22.624L541.12 507.168 750.4 716.48a16 16 0 0 1 0 22.624l-11.312 11.312a16 16 0 0 1-22.624 0L507.168 541.12 297.872 750.4a16 16 0 0 1-22.624 0l-11.312-11.312a16 16 0 0 1 0-22.624l209.296-209.312-209.296-209.296a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l209.296 209.296z"}));E.displayName="CloseIcon";const q=()=>o(G,{name:"heading"},()=>o("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));q.displayName="HeadingIcon";const P=()=>o(G,{name:"heart"},()=>o("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));P.displayName="HeartIcon";const Z=()=>o(G,{name:"history"},()=>o("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));Z.displayName="HistoryIcon";const Y=()=>o(G,{name:"title"},()=>o("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));Y.displayName="TitleIcon";const De={},ke=300,B=5,Ae={"/":{cancel:"取消",placeholder:"搜索",search:"搜索",select:"选择",navigate:"切换",exit:"关闭",history:"搜索历史",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}},je="search-pro-history-results",m=le(je,[]),Oe=()=>({history:m,addHistory:t=>{m.value.length<B?m.value=[t,...m.value]:m.value=[t,...m.value.slice(0,B-1)]},removeHistory:t=>{m.value=[...m.value.slice(0,t),...m.value.slice(t+1)]}}),Re=C(Ie),Te=k(()=>JSON.parse(oe(Re.value))),D=(t,e)=>{const l=t.toLowerCase(),a=e.toLowerCase(),n=[];let r=0,d=0;const h=(s,f=!1)=>{let i="";d===0?i=s.length>20?`… ${s.slice(-20)}`:s:f?i=s.length+d>100?`${s.slice(0,100-d)}… `:s:i=s.length>20?`${s.slice(0,20)} … ${s.slice(-20)}`:s,i&&n.push(i),d+=i.length,f||(n.push(["strong",e]),d+=e.length,d>=100&&n.push(" …"))};let p=l.indexOf(a,r);if(p===-1)return null;for(;p>=0;){const s=p+a.length;if(h(t.slice(r,p)),r=s,d>100)break;p=l.indexOf(a,r)}return d<100&&h(t.slice(r),!0),n},x=t=>t.reduce((e,{type:l})=>e+(l==="title"?50:l==="heading"?20:l==="custom"?10:1),0),Fe=(t,e)=>{var l;const a={};for(const[n,r]of V(e)){const d=((l=e[n.replace(/\/[^\\]*$/,"")])==null?void 0:l.title)||"",h=`${d?`${d} > `:""}${r.title}`,p=D(r.title,t);p&&(a[h]=[...a[h]||[],{type:"title",path:n,display:p}]),r.customFields&&V(r.customFields).forEach(([s,f])=>{f.forEach(i=>{const u=D(i,t);u&&(a[h]=[...a[h]||[],{type:"custom",path:n,index:s,display:u}])})});for(const s of r.contents){const f=D(s.header,t);f&&(a[h]=[...a[h]||[],{type:"heading",path:n+(s.slug?`#${s.slug}`:""),display:f}]);for(const i of s.contents){const u=D(i,t);u&&(a[h]=[...a[h]||[],{type:"content",header:s.header,path:n+(s.slug?`#${s.slug}`:""),display:u}])}}}return ie(a).sort((n,r)=>x(a[n])-x(a[r])).map(n=>({title:n,contents:a[n]}))},Se=t=>{const e=U(),l=C([]),a=k(()=>Te.value[e.value]),n=re(r=>{l.value=r?Fe(r,a.value):[]},ke);return fe([t,e],()=>{n(t.value)}),l};var Me=ue({name:"SearchResult",props:{query:{type:String,required:!0}},emits:{close:()=>!0,updateQuery:t=>!0},setup(t,{emit:e}){const l=se(),a=ce(),n=U(),r=ae(Ae),{history:d,addHistory:h,removeHistory:p}=Oe(),s=ve(t,"query"),f=Se(s),i=C(0),u=C(0),z=C(),O=k(()=>f.value.length>0),R=k(()=>f.value[i.value]||null),K=()=>{i.value=i.value>0?i.value-1:f.value.length-1,u.value=R.value.contents.length-1},$=()=>{i.value=i.value<f.value.length-1?i.value+1:0,u.value=0},_=()=>{u.value<R.value.contents.length-1?u.value=u.value+1:$()},ee=()=>{u.value>0?u.value=u.value-1:K()},N=c=>c.map(v=>ye(v)?v:o(v[0],v[1])),M=c=>{if(c.type==="custom"){const v=De[c.index]||"$content",[g,I=""]=pe(v)?v[n.value].split("$content"):v.split("$content");return N([g,...c.display,I])}return N(c.display)},T=()=>{i.value=0,u.value=0,e("updateQuery",""),e("close")};return de(()=>{ne("keydown",c=>{if(O.value){if(c.key==="ArrowUp")ee();else if(c.key==="ArrowDown")_();else if(c.key==="Enter"){const v=R.value.contents[u.value];l.value.path!==v.path&&(h(v),a.push(v.path),T())}}}),He(z.value,{reserveScrollBarGap:!0})}),he(()=>{Ge()}),()=>o("div",{class:["search-pro-result",{empty:s.value===""?d.value.length===0:!O.value}],ref:z},s.value===""?d.value.length?o("ul",{class:"search-pro-result-list"},o("li",{class:"search-pro-result-list-item"},[o("div",{class:"search-pro-result-title"},r.value.history),d.value.map((c,v)=>o(J,{to:c.path,class:["search-pro-result-item",{active:u.value===v}],onClick:()=>{T()}},()=>[o(Z,{class:"search-pro-result-type"}),o("div",{class:"search-pro-result-content"},[c.type==="content"&&c.header?o("div",{class:"content-header"},c.header):null,o("div",M(c))]),o("button",{class:"search-pro-close-icon",onClick:g=>{g.preventDefault(),g.stopPropagation(),p(v)}},o(E))]))])):r.value.emptyHistory:O.value?o("ul",{class:"search-pro-result-list"},f.value.map(({title:c,contents:v},g)=>{const I=i.value===g;return o("li",{class:["search-pro-result-list-item",{active:I}]},[o("div",{class:"search-pro-result-title"},c||"Documentation"),v.map((y,te)=>{const L=I&&u.value===te;return o(J,{to:y.path,class:["search-pro-result-item",{active:L,"aria-selected":L}],onClick:()=>{h(y),T()}},()=>[y.type==="content"?null:o(y.type==="title"?Y:y.type==="heading"?q:P,{class:"search-pro-result-type"}),o("div",{class:"search-pro-result-content"},[y.type==="content"&&y.header?o("div",{class:"content-header"},y.header):null,o("div",M(y))])])})])})):r.value.emptyResult)}});export{Me as default};
