import{u as ae,a as K,L as oe,b as le,G as A,d as se,c as ne,e as re,M as T,S as ie}from"./app-2bbd4e84.js";import{r as H,h as C,c as ce,u as ue,ab as de,o as ve,n as he,j as o,a5 as U,z as pe,K as fe,i as ye}from"./framework-bafc524a.js";function ge(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}else return Array.from(t)}var G=!1;if(typeof window<"u"){var R={get passive(){G=!0}};window.addEventListener("testPassive",null,R),window.removeEventListener("testPassive",null,R)}var I=typeof window<"u"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1),w=[],S=!1,E=-1,L=void 0,M=void 0,W=function(e){return w.some(function(a){return!!(a.options.allowTouchMove&&a.options.allowTouchMove(e))})},D=function(e){var a=e||window.event;return W(a.target)||a.touches.length>1?!0:(a.preventDefault&&a.preventDefault(),!1)},me=function(e){if(M===void 0){var a=!!e&&e.reserveScrollBarGap===!0,l=window.innerWidth-document.documentElement.clientWidth;a&&l>0&&(M=document.body.style.paddingRight,document.body.style.paddingRight=l+"px")}L===void 0&&(L=document.body.style.overflow,document.body.style.overflow="hidden")},we=function(){M!==void 0&&(document.body.style.paddingRight=M,M=void 0),L!==void 0&&(document.body.style.overflow=L,L=void 0)},He=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},Le=function(e,a){var l=e.targetTouches[0].clientY-E;return W(e.target)?!1:a&&a.scrollTop===0&&l>0||He(a)&&l<0?D(e):(e.stopPropagation(),!0)},Me=function(e,a){if(!e){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(!w.some(function(s){return s.targetElement===e})){var l={targetElement:e,options:a||{}};w=[].concat(ge(w),[l]),I?(e.ontouchstart=function(s){s.targetTouches.length===1&&(E=s.targetTouches[0].clientY)},e.ontouchmove=function(s){s.targetTouches.length===1&&Le(s,e)},S||(document.addEventListener("touchmove",D,G?{passive:!1}:void 0),S=!0)):me(a)}},Ae=function(){I?(w.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),S&&(document.removeEventListener("touchmove",D,G?{passive:!1}:void 0),S=!1),E=-1):we(),w=[]};const xe="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";const Z=()=>o(A,{name:"close"},()=>o("path",{d:"m925.468 822.294-303.27-310.288L925.51 201.674c34.683-27.842 38.3-75.802 8.122-107.217-30.135-31.37-82.733-34.259-117.408-6.463L512.001 399.257 207.777 87.993C173.1 60.197 120.504 63.087 90.369 94.456c-30.179 31.415-26.561 79.376 8.122 107.217L401.8 512.005l-303.27 310.29c-34.724 27.82-38.34 75.846-8.117 107.194 30.135 31.437 82.729 34.327 117.408 6.486L512 624.756l304.177 311.22c34.68 27.84 87.272 24.95 117.408-6.487 30.223-31.348 26.56-79.375-8.118-107.195z"}));Z.displayName="CloseIcon";const O=()=>o(A,{name:"heading"},()=>o("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));O.displayName="HeadingIcon";const X=()=>o(A,{name:"heart"},()=>o("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));X.displayName="HeartIcon";const Y=()=>o(A,{name:"history"},()=>o("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));Y.displayName="HistoryIcon";const V=()=>o(A,{name:"title"},()=>o("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));V.displayName="TitleIcon";const ze={},Ce=300,J=5,Se={"/":{cancel:"取消",placeholder:"搜索",search:"搜索",select:"选择",navigate:"切换",exit:"关闭",history:"搜索历史",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}},De="search-pro-history-results",g=ae(De,[]),ke=()=>({history:g,addHistory:t=>{g.value.length<J?g.value=[t,...g.value]:g.value=[t,...g.value.slice(0,J-1)]},removeHistory:t=>{g.value=[...g.value.slice(0,t),...g.value.slice(t+1)]}}),be=H(xe),Be=C(()=>JSON.parse(se(be.value))),z=(t,e)=>{const a=t.toLowerCase(),l=e.toLowerCase(),s=[];let r=0,v=0;const h=(n,p=!1)=>{let i="";v===0?i=n.length>20?`… ${n.slice(-20)}`:n:p?i=n.length+v>100?`${n.slice(0,100-v)}… `:n:i=n.length>20?`${n.slice(0,20)} … ${n.slice(-20)}`:n,i&&s.push(i),v+=i.length,p||(s.push(["strong",e]),v+=e.length,v>=100&&s.push(" …"))};let f=a.indexOf(l,r);if(f===-1)return null;for(;f>=0;){const n=f+l.length;if(h(t.slice(r,f)),r=n,v>100)break;f=a.indexOf(l,r)}return v<100&&h(t.slice(r),!0),s},q=t=>t.reduce((e,{type:a})=>e+(a==="title"?50:a==="heading"?20:a==="custom"?10:1),0),Ge=(t,e)=>{var a;const l={};for(const[s,r]of T(e)){const v=((a=e[s.replace(/\/[^\\]*$/,"")])==null?void 0:a.title)||"",h=`${v?`${v} > `:""}${r.title}`,f=z(r.title,t);f&&(l[h]=[...l[h]||[],{type:"title",path:s,display:f}]),r.customFields&&T(r.customFields).forEach(([n,p])=>{p.forEach(i=>{const c=z(i,t);c&&(l[h]=[...l[h]||[],{type:"custom",path:s,index:n,display:c}])})});for(const n of r.contents){const p=z(n.header,t);p&&(l[h]=[...l[h]||[],{type:"heading",path:s+(n.slug?`#${n.slug}`:""),display:p}]);for(const i of n.contents){const c=z(i,t);c&&(l[h]=[...l[h]||[],{type:"content",header:n.header,path:s+(n.slug?`#${n.slug}`:""),display:c}])}}}return ie(l).sort((s,r)=>q(l[s])-q(l[r])).map(s=>({title:s,contents:l[s]}))},Ee=t=>{const e=K(),a=H([]),l=C(()=>Be.value[e.value]),s=re(r=>{a.value=r?Ge(r,l.value):[]},Ce);return pe([t,e],()=>{s(t.value)}),a};var Pe=ce({name:"SearchResult",props:{query:{type:String,required:!0}},emits:{close:()=>!0,updateQuery:t=>!0},setup(t,{emit:e}){const a=ne(),l=ue(),s=K(),r=oe(Se),{history:v,addHistory:h,removeHistory:f}=ke(),n=de(t,"query"),p=Ee(n),i=H(0),c=H(0),F=H(),k=C(()=>p.value.length>0),b=C(()=>p.value[i.value]||null),j=()=>{i.value=i.value>0?i.value-1:p.value.length-1,c.value=b.value.contents.length-1},$=()=>{i.value=i.value<p.value.length-1?i.value+1:0,c.value=0},_=()=>{c.value<b.value.contents.length-1?c.value=c.value+1:$()},ee=()=>{c.value>0?c.value=c.value-1:j()},N=u=>u.map(d=>ye(d)?d:o(d[0],d[1])),P=u=>{if(u.type==="custom"){const d=ze[u.index]||"$content",[m,x=""]=fe(d)?d[s.value].split("$content"):d.split("$content");return N([m,...u.display,x])}return N(u.display)},B=()=>{i.value=0,c.value=0,e("updateQuery",""),e("close")};return ve(()=>{le("keydown",u=>{if(k.value){if(u.key==="ArrowUp")ee();else if(u.key==="ArrowDown")_();else if(u.key==="Enter"){const d=b.value.contents[c.value];a.value.path!==d.path&&(h(d),l.push(d.path),B())}}}),Me(F.value,{reserveScrollBarGap:!0})}),he(()=>{Ae()}),()=>o("div",{class:["search-pro-result",{empty:n.value===""?v.value.length===0:!k.value}],ref:F},n.value===""?v.value.length?o("ul",{class:"search-pro-result-list"},o("li",{class:"search-pro-result-list-item"},[o("div",{class:"search-pro-result-title"},r.value.history),v.value.map((u,d)=>o(U,{to:u.path,class:["search-pro-result-item",{active:c.value===d}],onClick:()=>{B()}},()=>[o(Y,{class:"search-pro-result-type"}),o("div",{class:"search-pro-result-content"},[u.type==="content"&&u.header?o("div",{class:"content-header"},u.header):null,o("div",P(u))]),o("button",{class:"search-pro-close-icon",onClick:m=>{m.preventDefault(),m.stopPropagation(),f(d)}},o(Z))]))])):r.value.emptyHistory:k.value?o("ul",{class:"search-pro-result-list"},p.value.map(({title:u,contents:d},m)=>{const x=i.value===m;return o("li",{class:["search-pro-result-list-item",{active:x}]},[o("div",{class:"search-pro-result-title"},u||"Documentation"),d.map((y,te)=>{const Q=x&&c.value===te;return o(U,{to:y.path,class:["search-pro-result-item",{active:Q,"aria-selected":Q}],onClick:()=>{h(y),B()}},()=>[y.type==="content"?null:o(y.type==="title"?V:y.type==="heading"?O:X,{class:"search-pro-result-type"}),o("div",{class:"search-pro-result-content"},[y.type==="content"&&y.header?o("div",{class:"content-header"},y.header):null,o("div",P(y))])])})])})):r.value.emptyResult)}});export{Pe as default};