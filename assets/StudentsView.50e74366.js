import{a as A,r as U,h as $,o as u,c as h,b as o,d as a,b7 as S,w as d,V as m,ae as F,b8 as f,a8 as g,U as w,J as q,aa as B,ac as V,ab as b,e as D,f as _}from"./index.7eaaee07.js";import{V as T}from"./VTable.3a2f6997.js";import{V as E}from"./VDialog.9e77fa06.js";import{V as N,a as c}from"./VTextField.7488e5b0.js";import{V as M,b as P,a as z,c as J}from"./VCard.cb658a22.js";import{V as L}from"./VSpacer.53fa72c5.js";import{v as Z}from"./index.71ec7485.js";const j={class:"container mt-5"},G={id:"students"},H={class:"row"},K=o("div",{class:"col-12"},[o("h1",{class:"text-center"},"\u5B78\u751F\u7BA1\u7406")],-1),O={class:"col-12"},Q=_("\u65B0\u589E\u5B78\u751F"),R={class:"col-12"},W=o("thead",null,[o("tr",null,[o("th",null,"\u5B78\u865F"),o("th",null,"\u73ED\u7D1A"),o("th",null,"\u59D3\u540D"),o("th",null,"\u96FB\u8A71"),o("th",{colspan:"2"},"\u7BA1\u7406")])],-1),X=_("\u7DE8\u8F2F"),Y=_("\u7DE8\u8F2F"),ee=_("\u522A\u9664"),le=_("\u522A\u9664"),te={key:1},se=o("td",{class:"text-center",colspan:"5"},"\u6C92\u6709\u5B78\u751F ",-1),oe=[se],ae={class:"text-h5"},ne={class:"container"},de={class:"row"},ie={class:"col-12"},re={class:"col-12"},ue={class:"col-12"},ce={class:"col-12 col-md-6"},me={class:"col-12 col-md-6"},_e={class:"col-12 col-md-6"},pe={class:"col-12 col-md-6"},Ve={class:"col-12"},ve=_("\u53D6\u6D88"),he=_("\u78BA\u5B9A"),xe={__name:"StudentsView",setup(fe){const n=A([]),p=10,i=U(1),I=$(()=>n.slice(i.value*p-p,i.value*p)),e=A({_id:"",studentId:"",name:"",class:"",phone:"",residenceAddress:"",currentAddress:"",personalId:"",email:"",idx:-1,dialog:!1,valid:!1,submitting:!1}),r=A({studentId:[t=>!!t||"\u5B78\u865F\u5FC5\u586B",t=>/^[0-9]+$/.test(t)||"\u5B78\u865F\u53EA\u6709\u6578\u5B57",t=>t.length>=8&&t.length<=8||"\u5B78\u865F\u70BA8\u4F4D\u6578"],phone:[t=>/^[0][9][0-9]*$/.test(t)||"\u624B\u6A5F\u683C\u5F0F\u932F\u8AA4",t=>t.length>=10&&t.length<=10||"\u624B\u6A5F\u9577\u5EA6\u70BA 10 \u4F4D\u6578"],email:[t=>!!t||"\u4FE1\u7BB1\u5FC5\u586B",t=>Z.exports.isEmail(t)||"\u4FE1\u7BB1\u683C\u5F0F\u932F\u8AA4"],required:[t=>!!t||"\u5FC5\u586B"],personalId:[t=>!!t||"\u5FC5\u586B",t=>/^[A-Z]+[1-2]+[0-9]*$/.test(t)||"\u8EAB\u4EFD\u8B49\u5B57\u865F\u683C\u5F0F\u932F\u8AA4"]}),k=(t,l)=>{e._id=t,l>-1?(e.studentId=n[l].studentId,e.name=n[l].name,e.class=n[l].class,e.phone=n[l].phone,e.residenceAddress=n[l].residenceAddress,e.currentAddress=n[l].currentAddress,e.personalId=n[l].personalId,e.email=n[l].email):(e.studentId="",e.name="",e.class="",e.phone="",e.residenceAddress="",e.currentAddress="",e.personalId="",e.email=""),e.idx=l,e.dialog=!0,e.valid=!1,e.submitting=!1},C=async(t,l)=>{await f.delete("/students/"+t),n.splice(l,1)},x=async()=>{if(!e.valid)return;e.submitting=!0;const t=new FormData;for(const l in e)["_id","idx","dialog","valid","submitting"].includes(l)||t.append(l,e[l]);try{if(e._id.length===0){const{data:l}=await f.post("/students",t);n.push(l.student),g.fire({icon:"success",title:"\u6210\u529F",text:"\u65B0\u589E\u6210\u529F"})}else{const{data:l}=await f.patch("/students/"+e._id,t);n[e.idx]=l.student,g.fire({icon:"success",title:"\u6210\u529F",text:"\u7DE8\u8F2F\u6210\u529F"})}e.dialog=!1}catch(l){g.fire({icon:"error",title:"\u5931\u6557",text:l.isAxiosError?l.response.data.message:l.message})}e.submitting=!1};return(async()=>{try{const{data:t}=await f.get("/students/all");n.push(...t.student)}catch(t){g.fire({icon:"error",title:"\u5931\u6557",text:t.isAxiosError?t.response.data.message:t.message})}})(),(t,l)=>(u(),h("div",j,[o("div",G,[o("div",H,[K,a(S),o("div",O,[a(m,{class:"text-white",color:"blue darken-4",onClick:l[0]||(l[0]=s=>k("",-1))},{default:d(()=>[Q]),_:1})]),o("div",R,[a(T,null,{default:d(()=>[W,o("tbody",null,[w(I).length>0?(u(!0),h(q,{key:0},B(w(I),(s,v)=>(u(),h("tr",{key:s._id},[o("td",null,V(s.studentId),1),o("td",null,V(s.class),1),o("td",null,V(s.name),1),o("td",null,V(s.phone),1),o("td",null,[i.value===1?(u(),b(m,{key:0,color:"blue darken-4",onClick:y=>k(s._id,v),variant:"outlined"},{default:d(()=>[X]),_:2},1032,["onClick"])):(u(),b(m,{key:1,color:"blue darken-4",onClick:y=>k(s._id,v+(i.value-1)*p),variant:"outlined"},{default:d(()=>[Y]),_:2},1032,["onClick"]))]),o("td",null,[i.value===1?(u(),b(m,{key:0,color:"error",onClick:y=>C(s._id,v),variant:"outlined"},{default:d(()=>[ee]),_:2},1032,["onClick"])):(u(),b(m,{key:1,color:"error",onClick:y=>C(s._id,v+(i.value-1)*p),variant:"outlined"},{default:d(()=>[le]),_:2},1032,["onClick"]))])]))),128)):(u(),h("tr",te,oe))])]),_:1})])]),a(E,{modelValue:e.dialog,"onUpdate:modelValue":l[11]||(l[11]=s=>e.dialog=s),scrollable:""},{default:d(()=>[a(N,{modelValue:e.valid,"onUpdate:modelValue":l[10]||(l[10]=s=>e.valid=s),onSubmit:D(x,["prevent"]),style:{height:"900px",width:"100%"}},{default:d(()=>[a(M,{class:"adminForm"},{default:d(()=>[a(P,null,{default:d(()=>[o("div",ae,V(e._id.length>0?"\u7DE8\u8F2F\u5B78\u751F":"\u65B0\u589E\u5B78\u751F"),1)]),_:1}),a(z,null,{default:d(()=>[o("div",ne,[o("div",de,[o("div",ie,[a(c,{modelValue:e.studentId,"onUpdate:modelValue":l[1]||(l[1]=s=>e.studentId=s),label:"\u5B78\u865F",rules:r.studentId,variant:"outlined",counter:"8",maxlength:"8"},null,8,["modelValue","rules"])]),o("div",re,[a(c,{modelValue:e.personalId,"onUpdate:modelValue":l[2]||(l[2]=s=>e.personalId=s),label:"\u8EAB\u4EFD\u8B49\u5B57\u865F",rules:r.personalId,variant:"outlined",counter:"10",maxlength:"10"},null,8,["modelValue","rules"])]),o("div",ue,[a(c,{modelValue:e.name,"onUpdate:modelValue":l[3]||(l[3]=s=>e.name=s),label:"\u59D3\u540D",rules:r.required,variant:"outlined"},null,8,["modelValue","rules"])]),o("div",ce,[a(c,{modelValue:e.class,"onUpdate:modelValue":l[4]||(l[4]=s=>e.class=s),label:"\u73ED\u7D1A",rules:r.required,variant:"outlined"},null,8,["modelValue","rules"])]),o("div",me,[a(c,{modelValue:e.phone,"onUpdate:modelValue":l[5]||(l[5]=s=>e.phone=s),label:"\u624B\u6A5F",rules:r.phone,variant:"outlined",counter:"10",maxlength:"10"},null,8,["modelValue","rules"])]),o("div",_e,[a(c,{modelValue:e.residenceAddress,"onUpdate:modelValue":l[6]||(l[6]=s=>e.residenceAddress=s),rules:r.required,label:"\u6236\u7C4D\u5730\u5740",variant:"outlined"},null,8,["modelValue","rules"])]),o("div",pe,[a(c,{modelValue:e.currentAddress,"onUpdate:modelValue":l[7]||(l[7]=s=>e.currentAddress=s),rules:r.required,label:"\u806F\u7D61\u5730\u5740",variant:"outlined"},null,8,["modelValue","rules"])]),o("div",Ve,[a(c,{modelValue:e.email,"onUpdate:modelValue":l[8]||(l[8]=s=>e.email=s),label:"\u4FE1\u7BB1",rules:r.email,variant:"outlined"},null,8,["modelValue","rules"])])])])]),_:1}),a(J,null,{default:d(()=>[a(L),a(m,{color:"error",onClick:l[9]||(l[9]=s=>e.dialog=!1),disabled:e.submitting},{default:d(()=>[ve]),_:1},8,["disabled"]),a(m,{type:"submit",color:"blue darken-4",loading:e.submitting},{default:d(()=>[he]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["modelValue","onSubmit"])]),_:1},8,["modelValue"]),a(F,{modelValue:i.value,"onUpdate:modelValue":l[12]||(l[12]=s=>i.value=s),length:Math.ceil(n.length/p),rounded:"circle","next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"},null,8,["modelValue","length"])])]))}};export{xe as default};
