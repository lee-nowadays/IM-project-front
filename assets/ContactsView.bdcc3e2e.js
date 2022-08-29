import{a as u,r as p,o as a,c,b as t,d as n,b7 as f,w as d,b8 as m,a8 as v,J as b,aa as V,ac as i,V as g,f as w}from"./index.8a5f8183.js";import{V as y}from"./VTable.c7a86940.js";import{V as k}from"./VDialog.263f2f72.js";import{V as x}from"./VCard.15edece4.js";const D={class:"container mt-5"},C={id:"contacts"},A=t("div",{class:"col-12"},[t("h1",{class:"text-center"},"\u806F\u7D61\u7BA1\u7406")],-1),j={class:"row mt-5"},q={class:"col-12"},B=t("thead",null,[t("tr",null,[t("th",null,"\u4E3B\u65E8"),t("th",null,"\u554F\u984C\u985E\u578B"),t("th",null,"\u554F\u984C\u63CF\u8FF0"),t("th",{colspan:"2"},"\u7BA1\u7406")])],-1),z=w("\u67E5\u770B"),N={key:1},E=t("td",{class:"text-center",colspan:"4"},[t("h3",{class:"mt-3"},"\u6C92\u6709\u806F\u7D61 ")],-1),S=[E],T={class:"row"},F={class:"col-12"},J=t("h3",{style:{color:"#0D47A1","font-weight":"bold"}},"\u4E3B\u65E8",-1),L={style:{color:"#000","font-weight":"bold","font-size":"1.1rem"}},U={class:"col-12"},$=t("h3",{style:{color:"#0D47A1","font-weight":"bold"}},"\u554F\u984C\u985E\u578B",-1),G={style:{color:"#000","font-weight":"bold","font-size":"1.1rem"}},H={class:"col-12",style:{width:"300px","text-overflow":"ellipsis"}},I=t("h3",{style:{color:"#0D47A1","font-weight":"bold"}},"\u554F\u984C\u63CF\u8FF0",-1),K={style:{color:"#000","font-weight":"bold","font-size":"1.1rem"}},Y={__name:"ContactsView",setup(M){const s=u([]),r=p(!1),_=(o,l)=>{s.subject=s[l].subject,s.question=s[l].question,s.description=s[l].description,r.value=!0};return(async()=>{try{const{data:o}=await m.get("/contacts");s.push(...o.contact)}catch(o){v.fire({icon:"error",title:"\u5931\u6557",text:o.isAxiosError?o.response.data.message:o.message})}})(),(o,l)=>(a(),c("div",D,[t("div",C,[A,n(f)]),t("div",j,[t("div",q,[n(y,null,{default:d(()=>[B,t("tbody",null,[s.length>0?(a(!0),c(b,{key:0},V(s,(e,h)=>(a(),c("tr",{key:e._id},[t("td",null,i(e.subject),1),t("td",null,i(e.question),1),t("td",null,i(e.description),1),t("td",null,[n(g,{color:"blue darken-4",onClick:P=>_(e._id,h),variant:"outlined"},{default:d(()=>[z]),_:2},1032,["onClick"])])]))),128)):(a(),c("tr",N,S))])]),_:1}),n(k,{modelValue:r.value,"onUpdate:modelValue":l[0]||(l[0]=e=>r.value=e)},{default:d(()=>[n(x,{class:"contactCard"},{default:d(()=>[t("div",T,[t("div",F,[J,t("p",L,i(s.subject),1)]),t("div",U,[$,t("p",G,i(s.question),1)]),t("div",H,[I,t("p",K,i(s.description),1)])])]),_:1})]),_:1},8,["modelValue"])])])]))}};export{Y as default};
