import{b9 as U,r as _,b8 as B,c as f,bi as d,aI as y,p as C,s as k,D as j,H as N,aa as V}from"./index-D1UXgAv0.js";import{_ as i}from"./forwardRefs-CIt-ZFAF.js";const G="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let D=(e=21)=>{let n="",t=crypto.getRandomValues(new Uint8Array(e));for(;e--;)n+=G[t[e]&63];return n};const h=()=>D();function T(e=[],n){const t=n!=null&&n.key?U(n.key,e):_(e);return{data:t,create:l=>{t.value.push({...l,id:h()})},read:()=>i.cloneDeep(t.value),update:l=>{const c=i.findIndex(t.value,{id:l.id});c!==-1&&(t.value[c]=i.merge({},t.value[c],l))},remove:l=>{i.remove(t.value,{id:l})},getById:l=>i.find(t.value,{id:l})}}const b=e=>({...e,dictionary:e.dictionary.map(n=>({...n,id:h()}))}),Z=B("dictionary",()=>{const e=T([],{key:"dictionarys",returnAsObject:!0}),n=f(()=>e.data);return{...e,update:t=>e.update(b(t)),create:t=>e.create(b(t)),items:n.value}}),L=d.reduce((e,n)=>(e[n]={type:[Boolean,String,Number],default:!1},e),{}),w=d.reduce((e,n)=>{const t="offset"+y(n);return e[t]={type:[String,Number],default:null},e},{}),A=d.reduce((e,n)=>{const t="order"+y(n);return e[t]={type:[String,Number],default:null},e},{}),S={col:Object.keys(L),offset:Object.keys(w),order:Object.keys(A)};function x(e,n,t){let s=e;if(!(t==null||t===!1)){if(n){const a=n.replace(e,"");s+=`-${a}`}return e==="col"&&(s="v-"+s),e==="col"&&(t===""||t===!0)||(s+=`-${t}`),s.toLowerCase()}}const M=["auto","start","end","center","baseline","stretch"],F=C({cols:{type:[Boolean,String,Number],default:!1},...L,offset:{type:[String,Number],default:null},...w,order:{type:[String,Number],default:null},...A,alignSelf:{type:String,default:null,validator:e=>M.includes(e)},...k(),...j()},"VCol"),z=N()({name:"VCol",props:F(),setup(e,n){let{slots:t}=n;const s=f(()=>{const a=[];let o;for(o in S)S[o].forEach(r=>{const l=e[r],c=x(o,r,l);c&&a.push(c)});const u=a.some(r=>r.startsWith("v-col-"));return a.push({"v-col":!u||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),a});return()=>{var a;return V(e.tag,{class:[s.value,e.class],style:e.style},(a=t.default)==null?void 0:a.call(t))}}}),g=["start","end","center"],$=["space-between","space-around","space-evenly"];function m(e,n){return d.reduce((t,s)=>{const a=e+y(s);return t[a]=n(),t},{})}const K=[...g,"baseline","stretch"],P=e=>K.includes(e),E=m("align",()=>({type:String,default:null,validator:P})),H=[...g,...$],I=e=>H.includes(e),p=m("justify",()=>({type:String,default:null,validator:I})),J=[...g,...$,"stretch"],O=e=>J.includes(e),R=m("alignContent",()=>({type:String,default:null,validator:O})),v={align:Object.keys(E),justify:Object.keys(p),alignContent:Object.keys(R)},W={align:"align",justify:"justify",alignContent:"align-content"};function Y(e,n,t){let s=W[e];if(t!=null){if(n){const a=n.replace(e,"");s+=`-${a}`}return s+=`-${t}`,s.toLowerCase()}}const q=C({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:P},...E,justify:{type:String,default:null,validator:I},...p,alignContent:{type:String,default:null,validator:O},...R,...k(),...j()},"VRow"),ee=N()({name:"VRow",props:q(),setup(e,n){let{slots:t}=n;const s=f(()=>{const a=[];let o;for(o in v)v[o].forEach(u=>{const r=e[u],l=Y(o,u,r);l&&a.push(l)});return a.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),a});return()=>{var a;return V(e.tag,{class:["v-row",s.value,e.class],style:e.style},(a=t.default)==null?void 0:a.call(t))}}});export{z as V,ee as a,Z as u};
