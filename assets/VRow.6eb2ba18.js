import{b9 as i,m,af as v,h as C,aB as k}from"./index.c47fcb49.js";const c=["sm","md","lg","xl","xxl"],j=(()=>c.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),S=(()=>c.reduce((t,e)=>(t["offset"+i(e)]={type:[String,Number],default:null},t),{}))(),$=(()=>c.reduce((t,e)=>(t["order"+i(e)]={type:[String,Number],default:null},t),{}))(),y={col:Object.keys(j),offset:Object.keys(S),order:Object.keys($)};function L(t,e,n){let l=t;if(!(n==null||n===!1))return e&&(l+=`-${e.replace(t,"")}`),t==="col"&&(l="v-"+l),t==="col"&&(n===""||n===!0)||(l+=`-${n}`),l.toLowerCase()}const E=m({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...j,offset:{type:[String,Number],default:null},...S,order:{type:[String,Number],default:null},...$,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},...v()},setup(t,e){let{slots:n}=e;const l=C(()=>{const a=[];let s;for(s in y)y[s].forEach(o=>{const u=t[o],g=L(s,o,u);g&&a.push(g)});const r=a.some(o=>o.startsWith("v-col-"));return a.push({"v-col":!r||!t.cols,[`v-col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),a});return()=>{var a;return k(t.tag,{class:l.value},(a=n.default)==null?void 0:a.call(n))}}}),O=["sm","md","lg","xl","xxl"],f=["start","end","center"];function d(t,e){return O.reduce((n,l)=>(n[t+i(l)]=e(),n),{})}const h=t=>[...f,"baseline","stretch"].includes(t),N=d("align",()=>({type:String,default:null,validator:h})),w=t=>[...f,"space-between","space-around"].includes(t),V=d("justify",()=>({type:String,default:null,validator:w})),P=t=>[...f,"space-between","space-around","stretch"].includes(t),x=d("alignContent",()=>({type:String,default:null,validator:P})),b={align:Object.keys(N),justify:Object.keys(V),alignContent:Object.keys(x)},B={align:"align",justify:"justify",alignContent:"align-content"};function G(t,e,n){let l=B[t];if(n!=null)return e&&(l+=`-${e.replace(t,"")}`),l+=`-${n}`,l.toLowerCase()}const R=m({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h},...N,justify:{type:String,default:null,validator:w},...V,alignContent:{type:String,default:null,validator:P},...x,...v()},setup(t,e){let{slots:n}=e;const l=C(()=>{const a=[];let s;for(s in b)b[s].forEach(r=>{const o=t[r],u=G(s,r,o);u&&a.push(u)});return a.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),a});return()=>{var a;return k(t.tag,{class:["v-row",l.value]},(a=n.default)==null?void 0:a.call(n))}}});export{R as V,E as a};