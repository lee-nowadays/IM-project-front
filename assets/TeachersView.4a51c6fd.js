import{a as y,r as F,h as S,o as r,c as _,b as o,d as a,b7 as $,w as i,V as m,ae as z,b8 as f,a8 as v,U as I,J as B,aa as D,ac as g,ax as A,ab as h,e as q,f as c}from"./index.68ee0a17.js";import{V as E}from"./VTable.9e757c52.js";import{V as N}from"./VDialog.e83a685e.js";import{V as M,a as V}from"./VTextField.075376a0.js";import{V as P,b as J,a as L,c as j}from"./VCard.b21e34bd.js";import{V as G}from"./VContainer.ee7e2431.js";import{V as H}from"./VFileInput.914b4b0e.js";import{V as C}from"./VTextarea.62449e34.js";import{V as K}from"./VSpacer.2470f81f.js";/* empty css              */import"./VChip.18525a12.js";const O={class:"container mt-5"},Q={id:"teachers"},R={class:"row"},W=o("div",{class:"col-12"},[o("h1",{class:"text-center"},"\u8001\u5E2B\u7BA1\u7406")],-1),X={class:"col-12"},Y=c("\u65B0\u589E\u8001\u5E2B"),Z={class:"col-12"},ee=o("thead",null,[o("tr",null,[o("th",null,"\u59D3\u540D"),o("th",null,"\u5716\u7247"),o("th",null,"\u7814\u7A76\u5BA4"),o("th",null,"\u96FB\u8A71"),o("th",{colspan:"2"},"\u7BA1\u7406")])],-1),le=c("\u7DE8\u8F2F"),te=c("\u7DE8\u8F2F"),oe=c("\u522A\u9664"),ae=c("\u522A\u9664"),se={key:1},ie=o("td",{class:"text-center",colspan:"5"},"\u6C92\u6709\u8001\u5E2B ",-1),ne=[ie],de={class:"text-h5"},re={class:"row"},ue={class:"col-12 col-md-4"},me={class:"col-12 col-md-4"},ce={class:"col-12 col-md-4"},pe={class:"col-12 col-md-4"},Ve={class:"col-12 col-md-4"},_e={class:"col-12 col-md-4"},fe={class:"col-12"},ve={class:"col-12"},ge={class:"col-12"},he=c("\u53D6\u6D88"),be=c("\u78BA\u5B9A"),De={__name:"TeachersView",setup(ke){const n=y([]),p=10,d=F(1),w=S(()=>n.slice(d.value*p-p,d.value*p)),l=y({_id:"",name:"",proInterest:"",experience:"",course:"",lab:"",telephone:"",fax:"",email:"",image:[],idx:-1,dialog:!1,valid:!1,submitting:!1}),b=y({required(s){return!!s||"\u5FC5\u586B"},size(s){var e,t,u;return!s||!s.length||((t=(e=s[0])==null?void 0:e.type)==null?void 0:t.includes("image"))&&((u=s[0])==null?void 0:u.size)<1024*1024||"\u6A94\u6848\u683C\u5F0F\u4E0D\u7B26"}}),k=(s,e)=>{l._id=s,e>-1?(l.name=n[e].name,l.proInterest=n[e].proInterest,l.experience=n[e].experience,l.course=n[e].course,l.lab=n[e].lab,l.email=n[e].email,l.telephone=n[e].telephone,l.fax=n[e].fax):(l.name="",l.proInterest="",l.experience="",l.course="",l.email="",l.lab="",l.telephone="",l.fax=""),l.image=[],l.idx=e,l.dialog=!0,l.valid=!1,l.submitting=!1},U=async(s,e)=>{await f.delete("/teachers/"+s),n.splice(e,1)},T=async()=>{if(!l.valid)return;l.submitting=!0;const s=new FormData;for(const e in l)["_id","idx","dialog","valid","submitting"].includes(e)||(e==="image"?s.append(e,l[e][0]):s.append(e,l[e]));try{if(l._id.length===0){const{data:e}=await f.post("/teachers",s);n.push(e.teacher),v.fire({icon:"success",title:"\u6210\u529F",text:"\u65B0\u589E\u6210\u529F"})}else{const{data:e}=await f.patch("/teachers/"+l._id,s);n[l.idx]=e.teacher,v.fire({icon:"success",title:"\u6210\u529F",text:"\u7DE8\u8F2F\u6210\u529F"})}l.dialog=!1}catch(e){v.fire({icon:"error",title:"\u5931\u6557",text:e.isAxiosError?e.response.data.message:e.message})}l.submitting=!1};return(async()=>{try{const{data:s}=await f.get("/teachers/all");s.teacher.map(e=>{const t=(e.image="https://taishanim.herokuapp.com/files/"+e.image,e);n.push(t)})}catch(s){v.fire({icon:"error",title:"\u5931\u6557",text:s.isAxiosError?s.response.data.message:s.message})}})(),(s,e)=>(r(),_("div",O,[o("div",Q,[o("div",R,[W,a($),o("div",X,[a(m,{class:"text-white",color:"blue darken-4",onClick:e[0]||(e[0]=t=>k("",-1))},{default:i(()=>[Y]),_:1})]),o("div",Z,[a(E,null,{default:i(()=>[ee,o("tbody",null,[I(w).length>0?(r(!0),_(B,{key:0},D(I(w),(t,u)=>(r(),_("tr",{key:t._id},[o("td",null,g(t.name),1),o("td",null,[a(A,{src:t.image},null,8,["src"])]),o("td",null,g(t.lab),1),o("td",null,g(t.telephone),1),o("td",null,[d.value===1?(r(),h(m,{key:0,color:"blue darken-4",onClick:x=>k(t._id,u),variant:"outlined"},{default:i(()=>[le]),_:2},1032,["onClick"])):(r(),h(m,{key:1,color:"blue darken-4",onClick:x=>k(t._id,u+(d.value-1)*p),variant:"outlined"},{default:i(()=>[te]),_:2},1032,["onClick"]))]),o("td",null,[d.value===1?(r(),h(m,{key:0,color:"error",onClick:x=>U(t._id,u),variant:"outlined"},{default:i(()=>[oe]),_:2},1032,["onClick"])):(r(),h(m,{key:1,color:"error",onClick:x=>U(t._id,u+(d.value-1)*p),variant:"outlined"},{default:i(()=>[ae]),_:2},1032,["onClick"]))])]))),128)):(r(),_("tr",se,ne))])]),_:1})])]),a(N,{modelValue:l.dialog,"onUpdate:modelValue":e[12]||(e[12]=t=>l.dialog=t),scrollable:""},{default:i(()=>[a(M,{modelValue:l.valid,"onUpdate:modelValue":e[11]||(e[11]=t=>l.valid=t),onSubmit:q(T,["prevent"]),style:{height:"900px",width:"100%"}},{default:i(()=>[a(P,null,{default:i(()=>[a(J,null,{default:i(()=>[o("div",de,g(l._id.length>0?"\u7DE8\u8F2F\u8001\u5E2B":"\u65B0\u589E\u8001\u5E2B"),1)]),_:1}),a(L,null,{default:i(()=>[a(G,null,{default:i(()=>[o("div",re,[o("div",ue,[a(V,{modelValue:l.name,"onUpdate:modelValue":e[1]||(e[1]=t=>l.name=t),label:"\u8001\u5E2B\u59D3\u540D",rules:[b.required],variant:"outlined"},null,8,["modelValue","rules"])]),o("div",me,[a(H,{modelValue:l.image,"onUpdate:modelValue":e[2]||(e[2]=t=>l.image=t),"show-size":"",accept:"image/*",label:"\u5716\u7247","prepend-icon":"",rules:[b.size],variant:"outlined"},null,8,["modelValue","rules"])]),o("div",ce,[a(V,{modelValue:l.lab,"onUpdate:modelValue":e[3]||(e[3]=t=>l.lab=t),label:"\u7814\u7A76\u5BA4",variant:"outlined"},null,8,["modelValue"])]),o("div",pe,[a(V,{modelValue:l.telephone,"onUpdate:modelValue":e[4]||(e[4]=t=>l.telephone=t),label:"\u96FB\u8A71",variant:"outlined"},null,8,["modelValue"])]),o("div",Ve,[a(V,{modelValue:l.fax,"onUpdate:modelValue":e[5]||(e[5]=t=>l.fax=t),label:"\u50B3\u771F",variant:"outlined"},null,8,["modelValue"])]),o("div",_e,[a(V,{modelValue:l.email,"onUpdate:modelValue":e[6]||(e[6]=t=>l.email=t),label:"\u4FE1\u7BB1",rules:[b.required],variant:"outlined"},null,8,["modelValue","rules"])]),o("div",fe,[a(C,{modelValue:l.experience,"onUpdate:modelValue":e[7]||(e[7]=t=>l.experience=t),label:"\u7D93\u6B77",variant:"outlined"},null,8,["modelValue"])]),o("div",ve,[a(C,{modelValue:l.proInterest,"onUpdate:modelValue":e[8]||(e[8]=t=>l.proInterest=t),label:"\u5C08\u696D\u8208\u8DA3",variant:"outlined"},null,8,["modelValue"])]),o("div",ge,[a(C,{modelValue:l.course,"onUpdate:modelValue":e[9]||(e[9]=t=>l.course=t),label:"\u8AB2\u7A0B",variant:"outlined"},null,8,["modelValue"])])])]),_:1})]),_:1}),a(j,null,{default:i(()=>[a(K),a(m,{color:"error",onClick:e[10]||(e[10]=t=>l.dialog=!1),disabled:l.submitting},{default:i(()=>[he]),_:1},8,["disabled"]),a(m,{type:"submit",color:"primary",loading:l.submitting},{default:i(()=>[be]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["modelValue","onSubmit"])]),_:1},8,["modelValue"]),a(z,{modelValue:d.value,"onUpdate:modelValue":e[13]||(e[13]=t=>d.value=t),length:Math.ceil(n.length/p),rounded:"circle","next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"},null,8,["modelValue","length"])])]))}};export{De as default};