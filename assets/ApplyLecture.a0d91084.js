import{u as p,r as f,a as m,o as l,c,b as t,d as n,b7 as y,w as d,b8 as v,a8 as k,J as w,aa as V,b9 as b,ac as i,V as g,a6 as x,f as D}from"./index.32f3a1c0.js";import{V as L}from"./VTable.f4f2b9c0.js";const C={class:"mt-5 pt-5",id:"applyLecture"},S={class:"container"},B={class:"row"},N=t("div",{class:"col-12"},[t("h1",{class:"text-center"},"\u5831\u540D\u72C0\u614B")],-1),A={class:"col-12"},T=t("thead",null,[t("tr",null,[t("th",null," \u6D3B\u52D5\u65E5\u671F "),t("th",null," \u8B1B\u5EA7\u540D\u7A31"),t("th",null," \u5831\u540D\u72C0\u614B"),t("th")])],-1),z=t("td",null," \u5831\u540D\u6210\u529F",-1),E=D("\u53D6\u6D88\u5831\u540D"),F={key:1},J={key:0,class:"text-center",colspan:"4"},I={__name:"ApplyLecture",setup($){const u=p(),r=f(!1),s=m([]),_=async e=>{await u.deleteLecture({lectures:s[e].lecture._id})&&s.splice(e,1)};return(async()=>{try{const{data:e}=await v.get("/students/lectures");e.result.map(o=>{Date.parse(o.lecture.date)>Date.now()&&s.push(o)})}catch(e){console.log(e),k.fire({icon:"error",title:"\u5931\u6557",text:"\u4F3A\u670D\u5668\u932F\u8AA4"})}r.value=!0})(),(e,o)=>(l(),c("div",C,[t("div",S,[t("div",B,[N,n(y),t("div",A,[n(L,null,{default:d(()=>[T,t("tbody",null,[s.length>0?(l(!0),c(w,{key:0},V(s,(a,h)=>(l(),c("tr",{key:a._id,class:b({"bg-red":!a.lecture.post})},[t("td",null,i(new Date(a.lecture.date).toLocaleDateString()),1),t("td",null,i(a.lecture.title),1),z,t("td",null,[n(g,{class:"text-white",color:"blue darken-4",onClick:q=>_(h)},{default:d(()=>[E]),_:2},1032,["onClick"])])],2))),128)):(l(),c("tr",F,[r.value?(l(),c("td",J,"\u6C92\u6709\u5831\u540D\u8A18\u9304")):x("",!0)]))])]),_:1})])])])]))}};export{I as default};
