const x={context:void 0,registry:void 0};let O=F;const y=1,A=2,L={owned:null,cleanups:null,context:null,owner:null};var a=null;let E=null,p=null,h=null,w=null,b=0;function Q(e,s){const t=p,i=a,l=e.length===0,o=l?L:{owned:null,cleanups:null,context:null,owner:s===void 0?i:s},f=l?e:()=>e(()=>I(()=>S(o)));a=o,p=null;try{return C(f,!0)}finally{p=t,a=i}}function N(e,s,t){const i=k(e,s,!1,y);R(i)}function I(e){if(p===null)return e();const s=p;p=null;try{return e()}finally{p=s}}function W(e,s,t){let i=e.value;return(!e.comparator||!e.comparator(i,s))&&(e.value=s,e.observers&&e.observers.length&&C(()=>{for(let l=0;l<e.observers.length;l+=1){const o=e.observers[l],f=E&&E.running;f&&E.disposed.has(o),(f?!o.tState:!o.state)&&(o.pure?h.push(o):w.push(o),o.observers&&M(o)),f||(o.state=y)}if(h.length>1e6)throw h=[],new Error},!1)),s}function R(e){if(!e.fn)return;S(e);const s=a,t=p,i=b;p=a=e,$(e,e.value,i),p=t,a=s}function $(e,s,t){let i;try{i=e.fn(s)}catch(l){return e.pure&&(e.state=y,e.owned&&e.owned.forEach(S),e.owned=null),e.updatedAt=t+1,V(l)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?W(e,i):e.value=i,e.updatedAt=t)}function k(e,s,t,i=y,l){const o={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:s,owner:a,context:null,pure:t};return a===null||a!==L&&(a.owned?a.owned.push(o):a.owned=[o]),o}function D(e){if(e.state===0)return;if(e.state===A)return B(e);if(e.suspense&&I(e.suspense.inFallback))return e.suspense.effects.push(e);const s=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<b);)e.state&&s.push(e);for(let t=s.length-1;t>=0;t--)if(e=s[t],e.state===y)R(e);else if(e.state===A){const i=h;h=null,C(()=>B(e,s[0]),!1),h=i}}function C(e,s){if(h)return e();let t=!1;s||(h=[]),w?t=!0:w=[],b++;try{const i=e();return H(t),i}catch(i){t||(w=null),h=null,V(i)}}function H(e){if(h&&(F(h),h=null),e)return;const s=w;w=null,s.length&&C(()=>O(s),!1)}function F(e){for(let s=0;s<e.length;s++)D(e[s])}function B(e,s){e.state=0;for(let t=0;t<e.sources.length;t+=1){const i=e.sources[t];if(i.sources){const l=i.state;l===y?i!==s&&(!i.updatedAt||i.updatedAt<b)&&D(i):l===A&&B(i,s)}}}function M(e){for(let s=0;s<e.observers.length;s+=1){const t=e.observers[s];t.state||(t.state=A,t.pure?h.push(t):w.push(t),t.observers&&M(t))}}function S(e){let s;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),i=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const o=l.pop(),f=t.observerSlots.pop();i<l.length&&(o.sourceSlots[f]=i,l[i]=o,t.observerSlots[i]=f)}}if(e.owned){for(s=e.owned.length-1;s>=0;s--)S(e.owned[s]);e.owned=null}if(e.cleanups){for(s=e.cleanups.length-1;s>=0;s--)e.cleanups[s]();e.cleanups=null}e.state=0,e.context=null}function V(e){throw e}function J(e,s,t){let i=t.length,l=s.length,o=i,f=0,n=0,u=s[l-1].nextSibling,r=null;for(;f<l||n<o;){if(s[f]===t[n]){f++,n++;continue}for(;s[l-1]===t[o-1];)l--,o--;if(l===f){const c=o<i?n?t[n-1].nextSibling:t[o-n]:u;for(;n<o;)e.insertBefore(t[n++],c)}else if(o===n)for(;f<l;)(!r||!r.has(s[f]))&&s[f].remove(),f++;else if(s[f]===t[o-1]&&t[n]===s[l-1]){const c=s[--l].nextSibling;e.insertBefore(t[n++],s[f++].nextSibling),e.insertBefore(t[--o],c),s[l]=t[o]}else{if(!r){r=new Map;let d=n;for(;d<o;)r.set(t[d],d++)}const c=r.get(s[f]);if(c!=null)if(n<c&&c<o){let d=f,T=1,q;for(;++d<l&&d<o&&!((q=r.get(s[d]))==null||q!==c+T);)T++;if(T>c-n){const G=s[f];for(;n<c;)e.insertBefore(t[n++],G)}else e.replaceChild(t[n++],s[f++])}else f++;else s[f++].remove()}}}function K(e,s,t,i={}){let l;return Q(o=>{l=o,s===document?e():X(s,e(),s.firstChild?null:void 0,t)},i.owner),()=>{l(),s.textContent=""}}function X(e,s,t,i){if(t!==void 0&&!i&&(i=[]),typeof s!="function")return m(e,s,i,t);N(l=>m(e,s(),l,t),i)}function m(e,s,t,i,l){if(x.context){!t&&(t=[...e.childNodes]);let n=[];for(let u=0;u<t.length;u++){const r=t[u];r.nodeType===8&&r.data.slice(0,2)==="!$"?r.remove():n.push(r)}t=n}for(;typeof t=="function";)t=t();if(s===t)return t;const o=typeof s,f=i!==void 0;if(e=f&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(x.context)return t;if(o==="number"&&(s=s.toString()),f){let n=t[0];n&&n.nodeType===3?n.data=s:n=document.createTextNode(s),t=g(e,t,i,n)}else t!==""&&typeof t=="string"?t=e.firstChild.data=s:t=e.textContent=s}else if(s==null||o==="boolean"){if(x.context)return t;t=g(e,t,i)}else{if(o==="function")return N(()=>{let n=s();for(;typeof n=="function";)n=n();t=m(e,n,t,i)}),()=>t;if(Array.isArray(s)){const n=[],u=t&&Array.isArray(t);if(v(n,s,t,l))return N(()=>t=m(e,n,t,i,!0)),()=>t;if(x.context){if(!n.length)return t;for(let r=0;r<n.length;r++)if(n[r].parentNode)return t=n}if(n.length===0){if(t=g(e,t,i),f)return t}else u?t.length===0?P(e,n,i):J(e,t,n):(t&&g(e),P(e,n));t=n}else if(s.nodeType){if(x.context&&s.parentNode)return t=f?[s]:s;if(Array.isArray(t)){if(f)return t=g(e,t,i,s);g(e,t,null,s)}else t==null||t===""||!e.firstChild?e.appendChild(s):e.replaceChild(s,e.firstChild);t=s}else console.warn("Unrecognized value. Skipped inserting",s)}return t}function v(e,s,t,i){let l=!1;for(let o=0,f=s.length;o<f;o++){let n=s[o],u=t&&t[o],r;if(!(n==null||n===!0||n===!1))if((r=typeof n)=="object"&&n.nodeType)e.push(n);else if(Array.isArray(n))l=v(e,n,u)||l;else if(r==="function")if(i){for(;typeof n=="function";)n=n();l=v(e,Array.isArray(n)?n:[n],Array.isArray(u)?u:[u])||l}else e.push(n),l=!0;else{const c=String(n);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return l}function P(e,s,t=null){for(let i=0,l=s.length;i<l;i++)e.insertBefore(s[i],t)}function g(e,s,t,i){if(t===void 0)return e.textContent="";const l=i||document.createTextNode("");if(s.length){let o=!1;for(let f=s.length-1;f>=0;f--){const n=s[f];if(l!==n){const u=n.parentNode===e;!o&&!f?u?e.replaceChild(l,n):e.insertBefore(l,t):u&&n.remove()}else o=!0}}else e.insertBefore(l,t);return[l]}const Y=()=>[],_=(e,s=0)=>{s<=100&&setTimeout(()=>{const t=document.querySelector('div.ql-editor.ql-blank[data-test-ql-editor-contenteditable="true"]');t?(t.focus(),setTimeout(()=>document.execCommand("insertText",!1,e),1e3)):_(e,++s)},50)},j=(e,s,t=0)=>{if(s==="tw")return!0;const i=document.querySelector(".ember-view.share-box-feed-entry__trigger");i?(i.click(),setTimeout(()=>{_(e)},500)):!i&&t<20&&setTimeout(()=>{j(e,s,++t)},100)};(async()=>{const e=await chrome.runtime.sendMessage({distpatch:"isLog"});if(window.location.href.includes("www.com")&&!e)return;const{search:s}=window.location;(s==null?void 0:s.includes("?share-bookmark=true"))&&chrome.storage.local.get("share",({share:i})=>{j(i.list,i.type)})})();const U=document.createElement("div");U.id="extension-root";document.body.append(U);K(Y,U);
