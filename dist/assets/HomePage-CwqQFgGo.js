import{I as r,d as $,r as N,c as x,C as d,V as w,o as _,a as D,w as e,b as t,e as H,u as o,f as g,g as p,m as h,h as C,i as L,j as T,t as P,P as B,k as q,T as G,l as W,n as X,F as J,S as K,_ as Q}from"./index-D1UXgAv0.js";import{u as Y,V as I,a as M}from"./VRow-Pp-exuNb.js";import{u as Z,V as oo,a as O,M as R}from"./modals-qeSk08hH.js";import{V as to,a as U,b as A,c as E}from"./forwardRefs-CIt-ZFAF.js";import"./dialog-transition-C4emrXIy.js";const eo=v=>({primary:r.CloseOutline,secondary:r.CircleCheck,success:r.CircleCheck,warning:r.WarningOutline,error:r.CloseOutline,info:r.InformationOutline,light:r.Sun,dark:r.Moon,accent:r.StarOutline})[v]||r.Help,no={class:"ml-4"},io={class:"py-4"},ao={class:"d-flex justify-end ga-4"},ro=$({__name:"ConfirmModal",props:{id:{},title:{},description:{},type:{},onConfirm:{},icon:{}},emits:["show","hide","confirm"],setup(v,{emit:m}){const u=v,f=m,a=N({title:"",description:""}),n=x(()=>({icon:eo(u.type||a.value.type||d.Primary),title:u.title||a.value.title||"",description:u.description||a.value.description||"",confirmBtn:a.value.confirmBtn||{variant:w.Flat,color:d.Primary},cancelBtn:a.value.cancelBtn||{variant:w.Tonal,color:d.Primary},type:a.value.type||d.Primary})),i=s=>{a.value=s},{state:l,show:b,hide:y}=Z(u.id,{onShow:i}),V=(s,c,k)=>()=>{s&&s(),c&&f(c),k&&k()},S=V(y,"hide"),j=V(b,"show"),z=V(y,"cancel"),F=V(y,"confirm",()=>{var s;(s=a.value)==null||s.onConfirm()});return(s,c)=>(_(),D(oo,h({modelValue:o(l),"onUpdate:modelValue":c[0]||(c[0]=k=>L(l)?l.value=k:null)},s.$attr,{"max-width":"700px",onHide:o(S),onShow:o(j)}),{default:e(()=>[t(E,null,{default:e(()=>[t(to,{class:"d-flex hide-center align-center justify-space-between"},{default:e(()=>[H(s.$slots,"header",{close:o(S),title:o(n).title},()=>[g("div",null,[t(T,{color:o(n).type,icon:o(n).icon},null,8,["color","icon"]),g("span",no,P(o(n).title),1)]),t(p,{icon:o(r).Close,variant:o(w).Plain,onClick:o(S)},null,8,["icon","variant","onClick"])])]),_:3}),t(U,null,{default:e(()=>[H(s.$slots,"description",{},()=>[g("div",io,P(o(n).description),1)])]),_:3}),t(A,null,{default:e(()=>[g("div",ao,[t(p,h(o(n).confirmBtn,{onClick:o(F)}),{default:e(()=>c[1]||(c[1]=[C("Confirm")])),_:1},16,["onClick"]),t(p,h(o(n).cancelBtn,{onClick:o(z)}),{default:e(()=>c[2]||(c[2]=[C("Cancel")])),_:1},16,["onClick"])])]),_:1})]),_:3})]),_:3},16,["modelValue","onHide","onShow"]))}}),so=$({__name:"DictionaryCard",props:{dictionary:{}},emits:["remove","update"],setup(v,{emit:m}){const u=m,f=O(),a=n=>{f.show(R.DictionaryUpdate),u("update",n)};return(n,i)=>(_(),D(E,{elevation:"2",link:"",title:n.dictionary.title},{default:e(()=>[t(U,null,{default:e(()=>[C(P(n.dictionary.description),1)]),_:1}),t(A,null,{default:e(()=>[t(p,{color:o(d).Primary,to:{name:o(B).DictionaryDetail,params:{id:n.dictionary.id}}},{default:e(()=>i[2]||(i[2]=[C("Detail")])),_:1},8,["color","to"]),t(p,{color:o(d).Secondary,onClick:i[0]||(i[0]=l=>a(n.dictionary))},{default:e(()=>i[3]||(i[3]=[C("Edit")])),_:1},8,["color"]),t(p,{color:o(d).Error,onClick:i[1]||(i[1]=l=>n.$emit("remove",n.dictionary.id))},{default:e(()=>i[4]||(i[4]=[C("Remove")])),_:1},8,["color"])]),_:1})]),_:1},8,["title"]))}}),lo=$({__name:"HomePage",setup(v){const m=q(),u=O(),f=Y(),a=l=>{m.push({name:B.DictionaryUpdate,params:{id:l.id}})},n=()=>{m.push({name:B.DictionaryCreate})},i=l=>{u.show(R.DictionaryConfirmRemove,{title:"Remove dictionary",description:"Are you sure you want to delete this dictionary?",type:d.Error,onConfirm:()=>{f.remove(l)}})};return(l,b)=>(_(),D(M,{class:"pa-4"},{default:e(()=>[t(ro,{id:o(R).DictionaryConfirmRemove},null,8,["id"]),t(M,null,{default:e(()=>[t(G,{name:"list"},{default:e(()=>[(_(!0),W(J,null,X(o(f).items,y=>(_(),D(I,{key:y.id,cols:"4"},{default:e(()=>[t(so,{dictionary:y,onRemove:i,onUpdate:a},null,8,["dictionary"])]),_:2},1024))),128)),t(I,{key:"add-button"},{default:e(()=>[t(p,{class:"big-square-button",color:o(d).Primary,variant:o(w).Tonal,onClick:n},{default:e(()=>[t(T,{icon:o(r).Add,size:o(K).XLarge},null,8,["icon","size"])]),_:1},8,["color","variant"])]),_:1})]),_:1})]),_:1})]),_:1}))}}),yo=Q(lo,[["__scopeId","data-v-b3390270"]]);export{yo as default};
