import{a as y,r as F,h as S,o as r,c as _,b as a,d as o,b7 as $,w as n,V as c,ae as z,b8 as f,a8 as h,U as T,J as B,aa as D,ac as g,ax as A,ab as v,e as q,f as m}from"./index.32f3a1c0.js";import{V as E}from"./VTable.f4f2b9c0.js";import{V as N}from"./VDialog.b8a02727.js";import{V as M,a as V}from"./VTextField.1c81cea9.js";import{V as P,b as J,a as L,c as j}from"./VCard.7ecc493d.js";import{V as G}from"./VFileInput.7d4e8e21.js";import{V as w}from"./VTextarea.9429251e.js";import{V as H}from"./VSpacer.b8c0c6ab.js";import"./VChip.3b08f8d8.js";const K={class:"container mt-5"},O={id:"adminTeachers"},Q={class:"row"},R=a("div",{class:"col-12"},[a("h1",{class:"text-center"},"\u8001\u5E2B\u7BA1\u7406")],-1),W={class:"col-12"},X=m("\u65B0\u589E\u8001\u5E2B"),Y={class:"col-12"},Z=a("thead",null,[a("tr",null,[a("th",null,"\u59D3\u540D"),a("th",null,"\u5716\u7247"),a("th",null,"\u7814\u7A76\u5BA4"),a("th",null,"\u96FB\u8A71"),a("th",{colspan:"2"},"\u7BA1\u7406")])],-1),ee=m("\u7DE8\u8F2F"),le=m("\u7DE8\u8F2F"),te=m("\u522A\u9664"),ae=m("\u522A\u9664"),oe={key:1},se=a("td",{class:"text-center",colspan:"5"},"\u6C92\u6709\u8001\u5E2B ",-1),ie=[se],ne={class:"text-h5"},de={class:"container"},re={class:"row"},ue={class:"col-12 col-md-4"},ce={class:"col-12 col-md-4"},me={class:"col-12 col-md-4"},pe={class:"col-12 col-md-4"},Ve={class:"col-12 col-md-4"},_e={class:"col-12 col-md-4"},fe={class:"col-12"},he={class:"col-12"},ge={class:"col-12"},ve=m("\u53D6\u6D88"),be=m("\u78BA\u5B9A"),ze={__name:"TeachersView",setup(ke){const i=y([]),p=10,d=F(1),C=S(()=>i.slice(d.value*p-p,d.value*p)),l=y({_id:"",name:"",proInterest:"",experience:"",course:"",lab:"",telephone:"",fax:"",email:"",image:[],idx:-1,dialog:!1,valid:!1,submitting:!1}),b=y({required(s){return!!s||"\u5FC5\u586B"},size(s){var e,t,u;return!s||!s.length||((t=(e=s[0])==null?void 0:e.type)==null?void 0:t.includes("image"))&&((u=s[0])==null?void 0:u.size)<1024*1024||"\u6A94\u6848\u683C\u5F0F\u4E0D\u7B26"}}),k=(s,e)=>{l._id=s,e>-1?(l.name=i[e].name,l.proInterest=i[e].proInterest,l.experience=i[e].experience,l.course=i[e].course,l.lab=i[e].lab,l.email=i[e].email,l.telephone=i[e].telephone,l.fax=i[e].fax):(l.name="",l.proInterest="",l.experience="",l.course="",l.email="",l.lab="",l.telephone="",l.fax=""),l.image=[],l.idx=e,l.dialog=!0,l.valid=!1,l.submitting=!1},U=async(s,e)=>{await f.delete("/teachers/"+s),i.splice(e,1)},I=async()=>{if(!l.valid)return;l.submitting=!0;const s=new FormData;for(const e in l)["_id","idx","dialog","valid","submitting"].includes(e)||(e==="image"?s.append(e,l[e][0]):s.append(e,l[e]));try{if(l._id.length===0){const{data:e}=await f.post("/teachers",s),t=(e.teacher.image="https://taishanim.herokuapp.com/files/"+e.teacher.image,e);i.push(t.teacher),h.fire({icon:"success",title:"\u6210\u529F",text:"\u65B0\u589E\u6210\u529F"})}else{const{data:e}=await f.patch("/teachers/"+l._id,s),t=(e.teacher.image="https://taishanim.herokuapp.com/files/"+e.teacher.image,e);i[l.idx]=t.teacher,h.fire({icon:"success",title:"\u6210\u529F",text:"\u7DE8\u8F2F\u6210\u529F"})}l.dialog=!1}catch(e){h.fire({icon:"error",title:"\u5931\u6557",text:e.isAxiosError?e.response.data.message:e.message})}l.submitting=!1};return(async()=>{try{const{data:s}=await f.get("/teachers/all");s.teacher.map(e=>{const t=(e.image="https://taishanim.herokuapp.com/files/"+e.image,e);i.push(t)})}catch(s){h.fire({icon:"error",title:"\u5931\u6557",text:s.isAxiosError?s.response.data.message:s.message})}})(),(s,e)=>(r(),_("div",K,[a("div",O,[a("div",Q,[R,o($),a("div",W,[o(c,{class:"text-white",color:"blue darken-4",onClick:e[0]||(e[0]=t=>k("",-1))},{default:n(()=>[X]),_:1})]),a("div",Y,[o(E,null,{default:n(()=>[Z,a("tbody",null,[T(C).length>0?(r(!0),_(B,{key:0},D(T(C),(t,u)=>(r(),_("tr",{key:t._id},[a("td",null,g(t.name),1),a("td",null,[o(A,{src:t.image},null,8,["src"])]),a("td",null,g(t.lab),1),a("td",null,g(t.telephone),1),a("td",null,[d.value===1?(r(),v(c,{key:0,color:"blue darken-4",onClick:x=>k(t._id,u),variant:"outlined"},{default:n(()=>[ee]),_:2},1032,["onClick"])):(r(),v(c,{key:1,color:"blue darken-4",onClick:x=>k(t._id,u+(d.value-1)*p),variant:"outlined"},{default:n(()=>[le]),_:2},1032,["onClick"]))]),a("td",null,[d.value===1?(r(),v(c,{key:0,color:"error",onClick:x=>U(t._id,u),variant:"outlined"},{default:n(()=>[te]),_:2},1032,["onClick"])):(r(),v(c,{key:1,color:"error",onClick:x=>U(t._id,u+(d.value-1)*p),variant:"outlined"},{default:n(()=>[ae]),_:2},1032,["onClick"]))])]))),128)):(r(),_("tr",oe,ie))])]),_:1})])]),o(N,{modelValue:l.dialog,"onUpdate:modelValue":e[12]||(e[12]=t=>l.dialog=t),scrollable:""},{default:n(()=>[o(M,{modelValue:l.valid,"onUpdate:modelValue":e[11]||(e[11]=t=>l.valid=t),onSubmit:q(I,["prevent"]),style:{height:"900px",width:"100%"}},{default:n(()=>[o(P,null,{default:n(()=>[o(J,null,{default:n(()=>[a("div",ne,g(l._id.length>0?"\u7DE8\u8F2F\u8001\u5E2B":"\u65B0\u589E\u8001\u5E2B"),1)]),_:1}),o(L,null,{default:n(()=>[a("div",de,[a("div",re,[a("div",ue,[o(V,{modelValue:l.name,"onUpdate:modelValue":e[1]||(e[1]=t=>l.name=t),label:"\u8001\u5E2B\u59D3\u540D",rules:[b.required],variant:"outlined"},null,8,["modelValue","rules"])]),a("div",ce,[o(G,{modelValue:l.image,"onUpdate:modelValue":e[2]||(e[2]=t=>l.image=t),"show-size":"",accept:"image/*",label:"\u5716\u7247","prepend-icon":"",rules:[b.size],variant:"outlined"},null,8,["modelValue","rules"])]),a("div",me,[o(V,{modelValue:l.lab,"onUpdate:modelValue":e[3]||(e[3]=t=>l.lab=t),label:"\u7814\u7A76\u5BA4",variant:"outlined"},null,8,["modelValue"])]),a("div",pe,[o(V,{modelValue:l.telephone,"onUpdate:modelValue":e[4]||(e[4]=t=>l.telephone=t),label:"\u96FB\u8A71",variant:"outlined"},null,8,["modelValue"])]),a("div",Ve,[o(V,{modelValue:l.fax,"onUpdate:modelValue":e[5]||(e[5]=t=>l.fax=t),label:"\u50B3\u771F",variant:"outlined"},null,8,["modelValue"])]),a("div",_e,[o(V,{modelValue:l.email,"onUpdate:modelValue":e[6]||(e[6]=t=>l.email=t),label:"\u4FE1\u7BB1",rules:[b.required],variant:"outlined"},null,8,["modelValue","rules"])]),a("div",fe,[o(w,{modelValue:l.experience,"onUpdate:modelValue":e[7]||(e[7]=t=>l.experience=t),label:"\u7D93\u6B77",variant:"outlined"},null,8,["modelValue"])]),a("div",he,[o(w,{modelValue:l.proInterest,"onUpdate:modelValue":e[8]||(e[8]=t=>l.proInterest=t),label:"\u5C08\u696D\u8208\u8DA3",variant:"outlined"},null,8,["modelValue"])]),a("div",ge,[o(w,{modelValue:l.course,"onUpdate:modelValue":e[9]||(e[9]=t=>l.course=t),label:"\u8AB2\u7A0B",variant:"outlined"},null,8,["modelValue"])])])])]),_:1}),o(j,null,{default:n(()=>[o(H),o(c,{color:"error",onClick:e[10]||(e[10]=t=>l.dialog=!1),disabled:l.submitting},{default:n(()=>[ve]),_:1},8,["disabled"]),o(c,{type:"submit",color:"blue darken-4",loading:l.submitting},{default:n(()=>[be]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["modelValue","onSubmit"])]),_:1},8,["modelValue"]),o(z,{modelValue:d.value,"onUpdate:modelValue":e[13]||(e[13]=t=>d.value=t),length:Math.ceil(i.length/p),rounded:"circle","next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"},null,8,["modelValue","length"])])]))}};export{ze as default};
