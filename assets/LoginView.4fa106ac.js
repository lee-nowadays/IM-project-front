import{u as V,r as u,a as i,o as x,c as h,b as e,d as a,w as r,e as v,V as g,f}from"./index.15b463b5.js";import{V as w,a as c}from"./VTextField.6052e2ec.js";const b={class:"mt-5 pt-5",id:"login"},I={class:"container"},y={class:"row"},B=e("div",{class:"col-12"},[e("h1",{class:"text-center pb-3"},"\u767B\u5165")],-1),S={class:"col-12"},N={class:"col-12 mx-auto"},U={class:"col-12 mx-auto"},k={class:"col-12 mx-auto"},z=f("\u767B\u5165"),A={__name:"LoginView",setup(F){const m=V(),d=u(!1),p=u(!1),o=i({studentId:"",password:""}),n=i({studentId:[t=>!!t||"\u5B78\u865F\u5FC5\u586B",t=>/^[0-9]+$/.test(t)||"\u5B78\u865F\u53EA\u6709\u6578\u5B57",t=>t.length>=8&&t.length<=8||"\u5B78\u865F\u70BA8\u4F4D\u6578"],password:[t=>!!t||"\u5BC6\u78BC\u5FC5\u586B",t=>/^[a-zA-z0-9]+$/.test(t)||"\u5BC6\u78BC\u7531\u82F1\u6578\u5B57\u7D44\u6210",t=>t.length>=8&&t.length<=20||"\u5BC6\u78BC\u9577\u5EA6 8 \u5230 20 \u500B\u5B57"]}),_=()=>{m.login(o)};return(t,s)=>(x(),h("div",b,[e("div",I,[e("div",y,[B,e("div",S,[a(w,{class:"mx-auto",modelValue:d.value,"onUpdate:modelValue":s[2]||(s[2]=l=>d.value=l),onSubmit:v(_,["prevent"]),style:{width:"500px"}},{default:r(()=>[e("div",N,[a(c,{type:"text",label:"\u5B78\u865F",modelValue:o.studentId,"onUpdate:modelValue":s[0]||(s[0]=l=>o.studentId=l),rules:n.studentId,counter:"8",maxlength:"8",variant:"outlined"},null,8,["modelValue","rules"])]),e("div",U,[a(c,{type:"password",label:"\u5BC6\u78BC",modelValue:o.password,"onUpdate:modelValue":s[1]||(s[1]=l=>o.password=l),rules:n.password,counter:"20",maxlength:"20",variant:"outlined",autocomplete:"on"},null,8,["modelValue","rules"])]),e("div",k,[a(g,{class:"mx-auto",color:"success",type:"submit",loading:p.value},{default:r(()=>[z]),_:1},8,["loading"])])]),_:1},8,["modelValue","onSubmit"])])])])]))}};export{A as default};
