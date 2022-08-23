import{a as u,o as c,c as m,b as n,d as a,w as i,a7 as b,U as k,b7 as r,a9 as _,N as S,ab as F,ad as f,V as p,e as T,f as V}from"./index.15b463b5.js";import{m as A,a as B,_ as N,F as U}from"./zh-tw.f014cabe.js";import{a as g,V as v}from"./VRow.ce01654f.js";import{V as $}from"./VDialog.c65d3a82.js";import{V as E}from"./VTable.e6009c30.js";import{V as L,a as q}from"./VTextField.6052e2ec.js";import{V as M,b as O,a as G,c as R}from"./VCard.f96ff0d5.js";import{V as j}from"./VContainer.092d2fc1.js";import{V as z}from"./VSpacer.53eeeb19.js";const H={class:"container mt-5"},J={id:"calendars"},K=n("h1",{class:"text-center"},"\u884C\u4E8B\u66C6\u7BA1\u7406",-1),P=n("thead",null,[n("tr",null,[n("th",null,"\u6A19\u984C"),n("th",null,"\u958B\u59CB\u65E5\u671F"),n("th",null,"\u7D50\u675F\u65E5\u671F"),n("th",{colspan:"2"},"\u7BA1\u7406")])],-1),Q=V("\u7DE8\u8F2F"),W=V("\u522A\u9664"),X={key:1},Y=n("td",{class:"text-center",colspan:"5"},[n("h3",{class:"mt-3"},"\u6C92\u6709\u884C\u4E8B\u66C6 ")],-1),Z=[Y],I={class:"text-h5"},tt=V("\u53D6\u6D88"),et=V("\u78BA\u5B9A"),ft={__name:"CalendarsView",setup(at){const o=u([]),d=u({plugins:[A,B],select:async l=>{let t=prompt("\u8ACB\u8F38\u5165\u6A19\u984C");if(t!==""){if(t===null)return;{const{data:s}=await r.post("/calendars",{startDate:l.startStr,endDate:l.endStr,title:t});d.events.push({id:s.calendar._id,title:s.calendar.title,start:new Date(s.calendar.startDate),end:new Date(s.calendar.endDate),allDay:!0})}}},initialView:"dayGridMonth",locale:N,selectable:!0,selectOverlap:!0,events:[]}),e=u({_id:"",title:"",date:"",idx:-1,dialog:!1,valid:!1,submitting:!1}),D=u({required(l){return!!l||"\u5FC5\u586B"}}),w=async(l,t)=>{await r.delete("/calendars/"+l),o.splice(t,1),d.events.splice(t,1)},y=(l,t)=>{e._id=l,t>-1?(e.title=o[t].title,e.date=o[t].date):(e.title="",e.date=""),e.idx=t,e.dialog=!0,e.valid=!1,e.submitting=!1},x=async()=>{if(!e.valid)return;e.submitting=!0;const l=new FormData;for(const t in e)["_id","idx","dialog","valid","submitting"].includes(t)||l.append(t,e[t]);try{if(e._id.length===0){const{data:t}=await r.post("/calendars",l);o.push(t.calendar),_.fire({icon:"success",title:"\u6210\u529F",text:"\u65B0\u589E\u6210\u529F"})}else{const{data:t}=await r.patch("/calendars/"+e._id,l);o[e.idx]=t.calendar,_.fire({icon:"success",title:"\u6210\u529F",text:"\u7DE8\u8F2F\u6210\u529F"})}e.dialog=!1}catch(t){_.fire({icon:"error",title:"\u5931\u6557",text:t.isAxiosError?t.response.data.message:t.message})}e.submitting=!1};return(async()=>{try{const{data:l}=await r.get("/calendars/all");o.push(...l.calendar),d.events.push(...l.calendar.map(t=>({id:t._id,title:t.title,start:new Date(t.startDate),end:new Date(t.endDate),allDay:!0})))}catch(l){_.fire({icon:"error",title:"\u5931\u6557",text:l.isAxiosError?l.response.data.message:l.message})}})(),(l,t)=>(c(),m("div",H,[n("div",J,[a(g,{cols:"12"},{default:i(()=>[K]),_:1}),a(b),a(k(U),{options:d},null,8,["options"])]),a(v,{class:"mt-5"},{default:i(()=>[a(b),a(g,{cols:"12"},{default:i(()=>[a(E,null,{default:i(()=>[P,n("tbody",null,[o.length>0?(c(!0),m(S,{key:0},F(o,(s,h)=>(c(),m("tr",{key:s._id},[n("td",null,f(s.title),1),n("td",null,f(new Date(s.startDate).toLocaleDateString()),1),n("td",null,f(new Date(s.endDate).toLocaleDateString()),1),n("td",null,[a(p,{color:"blue darken-4",onClick:C=>y(s._id,h),variant:"outlined"},{default:i(()=>[Q]),_:2},1032,["onClick"])]),n("td",null,[a(p,{color:"error",onClick:C=>w(s._id,h),variant:"outlined"},{default:i(()=>[W]),_:2},1032,["onClick"])])]))),128)):(c(),m("tr",X,Z))])]),_:1})]),_:1})]),_:1}),a($,{modelValue:e.dialog,"onUpdate:modelValue":t[3]||(t[3]=s=>e.dialog=s),scrollable:""},{default:i(()=>[a(L,{modelValue:e.valid,"onUpdate:modelValue":t[2]||(t[2]=s=>e.valid=s),onSubmit:T(x,["prevent"]),style:{height:"900px",width:"500px"}},{default:i(()=>[a(M,null,{default:i(()=>[a(O,null,{default:i(()=>[n("div",I,f(e._id.length>0?"\u7DE8\u8F2F\u884C\u4E8B\u66C6":"\u65B0\u589E\u884C\u4E8B\u66C6"),1)]),_:1}),a(G,null,{default:i(()=>[a(j,null,{default:i(()=>[a(v,null,{default:i(()=>[a(g,{cols:"12"},{default:i(()=>[a(q,{modelValue:e.title,"onUpdate:modelValue":t[0]||(t[0]=s=>e.title=s),label:"\u6A19\u984C",rules:[D.required],variant:"outlined"},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1})]),_:1}),a(R,null,{default:i(()=>[a(z),a(p,{color:"error",onClick:t[1]||(t[1]=s=>e.dialog=!1),disabled:e.submitting},{default:i(()=>[tt]),_:1},8,["disabled"]),a(p,{type:"submit",color:"primary",loading:e.submitting},{default:i(()=>[et]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["modelValue","onSubmit"])]),_:1},8,["modelValue"])]))}};export{ft as default};
