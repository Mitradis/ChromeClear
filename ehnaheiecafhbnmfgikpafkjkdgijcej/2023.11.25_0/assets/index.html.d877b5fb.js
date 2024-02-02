import{S as l,a as w,$ as c,g as C,b,i as x,E as f}from"./common.8ee52035.js";const I=async()=>{await chrome.runtime.sendMessage({distpatch:"isLog"})};I();const a={winMaxWidth:800,winMaxHeight:600,showTooltip:l.isShowTooltip(),showURL:l.isShowURL()};class k extends HTMLLIElement{init(e){if(this.id=e.id,this.parentFolderId=e.parentId,this.bookmarkTitle=e.title,e.url===void 0){const t=document.createElement("span");k.addFaviconAndTitle(e,t),this.appendChild(t),this.classList.add("folder"),this.isFolder=!0,this.childBookmarks=e.children,this.onmouseover=this.displayFolderContent}else k.addFaviconAndTitle(e,this),this.classList.add("bookmark"),this.isBookmark=!0,this.url=e.url,this.onmouseover=this.highlight}static addFaviconAndTitle(e,t){const o=document.createElement("img");o.src=C(e.url),t.appendChild(o),t.appendChild(document.createTextNode(e.title))}highlight(){if(this.unHighlightActiveFolder(),this.isFolder){this.classList.add("hover");const e=this.firstChild;a.showTooltip&&e.title==""&&e.offsetWidth<e.scrollWidth&&(e.title=this.bookmarkTitle)}else(a.showTooltip||a.showURL)&&this.title==""&&(a.showTooltip&&this.offsetWidth<this.scrollWidth&&(this.title=this.bookmarkTitle),a.showURL&&this.isBookmark&&(this.title+=(this.title==""?"":`
`)+this.url))}unHighlight(){this.classList.remove("hover")}unHighlightActiveFolder(){let e=this.rootFolder.activeFolder;if(e!=null){const t=this.parentFolder.id;for(;e!=null&&e.id!=t;)e.unHighlight(),e.folderContent.style.top="-1px",e=e.parentFolder}}fillFolder(){this.folderContent=document.createElement("ul",{is:"ext-folder-content"}),this.appendChild(this.folderContent),this.folderContent.fillFolderContent(this.childBookmarks),this.folderContent.childBookmarks=this.childBookmarks,this.childBookmarks=void 0,this.hasSubFolders||this.fillTreeDepth()}fillTreeDepth(){if(!this.isRoot&&this.treeDepth==null){let e=1;this.treeDepth=e;let t=this.parentFolder;for(;!t.isRoot&&(t.treeDepth==null||e>t.treeDepth);)t.treeDepth=++e,t=t.parentFolder}}open(){const e=this.url;b(e)?alert("Bookmarklets are not supported since v2023.03.05 because of Manifest V3. For more details see https://developer.chrome.com/docs/extensions/mv3/mv3-migration/#executing-arbitrary-strings"):chrome.tabs.update({url:e}).then(m)}openInNewTab(e){chrome.tabs.create({url:this.url,active:e||l.isSwitchToNewTab()}).then(m)}openInNewWindow(e=!1){chrome.windows.create({url:this.url,incognito:e}).then(m)}openInIncognitoWindow(){this.openInNewWindow(!0)}getY(){const e=document.body;return this.getBoundingClientRect().top+e.scrollTop-e.clientTop}displayFolderContent(){if(this.classList.contains("hover"))return;this.highlight(),this.rootFolder.activeFolder=this,this.childBookmarks!==void 0&&this.fillFolder();const e=document.body,t=e.style,o=this.getY(),i=this.folderContent.offsetHeight;let n=1;o+i>e.scrollTop+a.winMaxHeight&&(n=o+1+i-a.winMaxHeight-e.scrollTop,n>o-e.scrollTop&&(n=o-e.scrollTop),this.folderContent.style.top="-"+n+"px");var s=0,h=window.innerWidth-e.clientWidth,d=a.winMaxWidth-h,p=this;do s+=p.clientWidth+1,p=p.parentFolder;while(!p.isRoot);if(s<d&&this.treeDepth>1){var u=(d-s)/this.treeDepth;u<this.folderContent.clientWidth&&(this.folderContent.style.width=u+"px")}s+=this.folderContent.offsetWidth,s<=d&&e.clientWidth<s?t.width=s+"px":s>d&&(t.width=d+"px",this.folderContent.style.width=this.folderContent.clientWidth-(s-d)+"px")}showContextMenu(e){const t=c("contextMenu");if(t.initialized||(x.initAll(t),t.initialized=!0,l.isHideCMOpenIncognito()&&t.querySelectorAll('li[data-action="openInIncognitoWindow"], li[data-action="openAllInIncognitoWindow"]').forEach(f.hide)),t.selectedBookmark=this,t.setAttribute("for",this.classList.contains("bookmark")?"bookmark":"folder"),this.isFolder){const p=this.hasBookmarks;t.querySelectorAll(".forFolder").forEach(u=>u.classList.toggle("enabled",p))}t.querySelector('li[data-action="reorder"]').classList.toggle("enabled",this.canBeReordered),t.querySelector('li[data-action="remove"]').classList.toggle("enabled",this.isBookmark||this.isEmptyFolder),f.show(t);const o=document.body;let i=o.clientWidth;const n=t.style,s=t.clientWidth+3,h=o.offsetWidth-o.clientWidth;e.clientX+s>=o.clientWidth?e.clientX>s?n.left=e.clientX-s+"px":(i+=s-e.clientX,o.style.width=i+h+"px",n.left="1px"):n.left=e.clientX+"px",e.clientY+t.clientHeight<window.innerHeight?n.top=e.pageY+"px":e.clientY<t.clientHeight?(o.style.minHeight=e.pageY+t.clientHeight+5+"px",n.top=e.pageY+"px"):n.top=e.pageY-t.clientHeight+"px";const d=c("transparentLayer");d.style.right=(h>0?1:0)+"px",f.show(d)}get isEmptyFolder(){return this.isFolder&&this.folderContent.childBookmarks.length===0}get canBeReordered(){return this.parentElement.canBeReordered}get hasBookmarks(){return this.isFolder&&this.folderContent.childBookmarks.some(e=>e.url!==void 0)}}customElements.define("ext-bookmark",k,{extends:"li"});class F extends HTMLLIElement{static create(e){const t=document.createElement("li",{is:"ext-open-all"});return t._init(e),t}_init(e){this.containingFolderContent=e,this.classList.add("openAllInTabs");const t=document.createElement("img");t.src="../../../icons/transparent.svg",this.appendChild(t),this.appendChild(document.createTextNode(chrome.i18n.getMessage("openAllInTabs"))),this.onmouseup=this._onClick,this.onmouseover=this._onMouseOver}_onClick(e){e.stopImmediatePropagation();const t=parseInt(l.getButtonAction(e.button));t===0?this.containingFolderContent.openAllInTabs(!0):t===1&&this.containingFolderContent.openAllInTabs()}_onMouseOver(){a.showTooltip&&this.title===""&&this.offsetWidth<this.scrollWidth&&(this.title=this.innerText)}}customElements.define("ext-open-all",F,{extends:"li"});class B extends HTMLUListElement{fillFolderContent(e){e.forEach(t=>{const o=document.createElement("li",{is:"ext-bookmark"});o.init(t),this.appendChild(o),this.isRoot?o.parentFolder=o.rootFolder=this:(o.parentFolder=this.parentElement,o.rootFolder=o.parentFolder.rootFolder,o.isFolder&&(o.parentFolder.hasSubFolders=!0,o.fillFolder()))}),this.isRoot||(this.addSeparator(),this.appendChild(F.create(this)),this._addEmpty())}openAllInTabs(e=!1){this.childBookmarks.filter(t=>t.url!==void 0).forEach((t,o)=>{o===0&&e?chrome.tabs.update({url:t.url}):chrome.tabs.create({url:t.url,active:o===0})}),m()}openAllInNewWindow(e=!1){const t=this.childBookmarks.filter(o=>o.url!==void 0).map(o=>o.url);chrome.windows.create({url:t,incognito:e}).then(m)}openAllInIncognitoWindow(){this.openAllInNewWindow(!0)}_addEmpty(){const e=document.createElement("li");e.classList.add("empty"),e.appendChild(document.createTextNode("("+chrome.i18n.getMessage("empty")+")")),this.appendChild(e)}addSeparator(){const e=document.createElement("li");e.className="separator",e.isSeparator=!0,this.appendChild(e)}get canBeReordered(){return this.isRoot?this.childElementCount>=3:this.childBookmarks.length>1}reorder(e){const t=this.isRoot?this.childBookmarks[e?0:1]:this.childBookmarks,o=[];let i=null;do{const n=e?this.firstChild:this.lastChild;if(n.isSeparator){e&&(i=n);break}o.push(n),this.removeChild(n)}while(this.hasChildNodes());t.sort((n,s)=>n.url===void 0&&s.url!==void 0?-1:n.url!==void 0&&s.url===void 0?1:n.title.localeCompare(s.title)),t.forEach((n,s)=>{chrome.bookmarks.move(n.id,{index:s});const h=o.find(d=>d.id===n.id);h!==void 0&&this.insertBefore(h,i)})}remove(e){g(),chrome.bookmarks.remove(e.id).then(()=>{if(this._removeFromUI(e),!this.isRoot){const t=this.parentElement;t.unHighlight(),t.displayFolderContent()}})}_removeFromUI(e){this.removeChild(e);const t=e.id;this.childBookmarks.splice(this.childBookmarks.findIndex(o=>o.id===t),1)}}customElements.define("ext-folder-content",B,{extends:"ul"});function g(){const r=c("contextMenu");r.selectedBookmark.unHighlight(),f.hide(r),f.hide(c("transparentLayer"))}function y(r){var e=r.srcElement;const t=this;if(e!=t){for(;!(e instanceof HTMLLIElement);)e=e.parentElement;if(e.classList.contains("enabled")){const o=e.dataset.action,i=t.selectedBookmark;switch(o){case"openInNewTab":i.openInNewTab();break;case"openInNewWindow":i.openInNewWindow();break;case"openInIncognitoWindow":i.openInNewWindow(!0);break;case"openAllInTabs":i.folderContent.openAllInTabs();break;case"openAllInNewWindow":i.folderContent.openAllInNewWindow();break;case"openAllInIncognitoWindow":i.folderContent.openAllInIncognitoWindow();break;case"reorder":{const n=i.parentElement;n.reorder(!0),n.isRoot&&n.reorder(!1),g();break}case"remove":{i.parentElement.remove(i);break}case"openBookmarkManager":{const n=i.isFolder?i.id:i.parentFolderId;chrome.tabs.create({url:`chrome://bookmarks/?id=${n}`,active:!0}).then(m);break}default:throw Error(o+" is not yet implemented")}}}}document.addEventListener("DOMContentLoaded",function(){function r(){return!1}document.addEventListener("contextmenu",o=>o.preventDefault()),w("#transparentLayer").on("mouseup",g).on("mousedown",r),w("#contextMenu").on("mouseup",y).on("mousedown",r),c("bookmarksMenu").on("mousedown",r);const e=document.documentElement.style;["bodyClr","fntClr","bmBgClr","disabledItemFntClr","activeBmFntClr","activeBmBgClrFrom","activeBmBgClrTo"].forEach(o=>{e.setProperty(`--${o}`,l.getColor(o))}),e.setProperty("--fav-icon-width",l.getFavIconWidth()+"px"),e.setProperty("--scrollbar-width",l.getScrollBarWidth()+"px"),e.setProperty("--font",`${l.getFontSize()}px "${l.getFontFamily()}"`),e.setProperty("--bookmark-max-width",l.getMaxWidth()+l.getMaxWidthMeasure()),T();var t=c("bookmarksMenu");t.onmouseup=function(o){for(var i=o.srcElement;!(i instanceof HTMLLIElement);)i=i.parentElement;var n=parseInt(l.getButtonAction(o.button));switch(n){case 0:i.isBookmark&&(o.ctrlKey?i.openInNewTab():o.shiftKey?i.openInNewWindow():i.open());break;case 1:i.isBookmark?i.openInNewTab(o.shiftKey):i.isFolder&&i.hasBookmarks&&i.folderContent.openAllInTabs();break;case 2:(i.isBookmark||i.isFolder)&&(i.isBookmark&&i.classList.add("hover"),i.showContextMenu(o));break}}});function T(){chrome.bookmarks.getTree().then(r=>{const e=i=>!l.isBookmarkHidden(i.title),t=c("bookmarksMenu");t.isRoot=!0;const o=r[0].children;t.fillFolderContent(o[0].children.filter(e)),t.addSeparator(),t.fillFolderContent(o[1].children.filter(e)),t.childBookmarks=[o[0].children,o[1].children]})}function m(){window.close()}