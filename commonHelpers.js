import{a as v,i as f,S}from"./assets/vendor-53a1b719.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const E="44781462-ae4aaccc0a5ec19c0259ffb3b",P="https://pixabay.com/api/",q="photo",M="horizontal",I=!0;async function h(e,o,r){const a=`${P}?key=${E}&q=${encodeURIComponent(e)}&image_type=${q}&orientation=${M}&safesearch=${I}&page=${o}&per_page=${r}`;try{const t=await v.get(a);if(t.status!==200)throw new Error("Network response was not ok");const{hits:s,totalHits:i}=t.data;return{hits:s,totalHits:i}}catch(t){throw console.error(t),t}}const g=document.querySelector(".gallery"),n=document.querySelector('[data-action="load-more"]'),d=document.querySelector(".spinner"),O=document.querySelector(".search-form"),u="is-hidden";let l="",c=1,p=15,y=0;function m(e){e.classList.add(u)}function x(e){e.classList.remove(u)}function L(e,o){e.disabled=!0,o.classList.remove(u)}function w(e,o){e.disabled=!1,o.classList.add(u)}m(n);O.addEventListener("submit",H);async function H(e){e.preventDefault(),g.innerHTML="",c=1;const o=e.currentTarget;if(l=o.elements.search.value.trim(),!l){f.error({title:"Error",message:"Search field cannot be empty!"});return}x(n),L(n,d);try{const{hits:r,totalHits:a}=await h(l,c,p);y=Math.ceil(a/p),$(r),r.length>0&&r.length!==a?(w(n,d),n.addEventListener("click",b)):m(n),T()}catch(r){console.error(r),f.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{o.reset()}}async function b(){c+=1,L(n,d);try{const{hits:e}=await h(l,c,p);$(e)}catch(e){console.error(e),f.error({title:"Error",message:"Failed to fetch more images. Please try again later."})}finally{w(n,d),c===y&&(m(n),n.removeEventListener("click",b))}}function $(e){const o=e.map(r=>`<li>
        <a href="${r.largeImageURL}" data-lightbox="gallery" data-title="${r.tags}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
          <div class="info">
            <p><strong>Likes:</strong> ${r.likes}</p>
            <p><strong>Views:</strong> ${r.views}</p>
            <p><strong>Comments:</strong> ${r.comments}</p>
            <p><strong>Downloads:</strong> ${r.downloads}</p>
          </div>
        </a>
      </li>`).join("");g.insertAdjacentHTML("beforeend",o)}new S(".gallery a",{captionsData:"alt",captionDelay:250});function T(){const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
