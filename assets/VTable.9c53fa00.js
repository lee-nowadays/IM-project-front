import{m as n,Y as r,af as b,s as h,y as m,Z as v,n as f,d as a,F as u}from"./index.a6b0ec59.js";const g=n({name:"VTable",props:{fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],...r(),...b(),...h()},setup(t,s){let{slots:e}=s;const{themeClasses:i}=m(t),{densityClasses:d}=v(t);return f(()=>{var l,o;return a(t.tag,{class:["v-table",{"v-table--fixed-height":!!t.height,"v-table--fixed-header":t.fixedHeader,"v-table--fixed-footer":t.fixedFooter,"v-table--has-top":!!e.top,"v-table--has-bottom":!!e.bottom},i.value,d.value]},{default:()=>[(l=e.top)==null?void 0:l.call(e),e.default&&a("div",{class:"v-table__wrapper",style:{height:u(t.height)}},[a("table",null,[e.default()])]),(o=e.bottom)==null?void 0:o.call(e)]})}),{}}});export{g as V};