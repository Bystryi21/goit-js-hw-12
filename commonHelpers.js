import{a as v,i as u,S}from"./assets/vendor-53a1b719.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const E="44781462-ae4aaccc0a5ec19c0259ffb3b",P="https://pixabay.com/api/",q="photo",M="horizontal",I=!0;async function g(t,o,r){const a=`${P}?key=${E}&q=${encodeURIComponent(t)}&image_type=${q}&orientation=${M}&safesearch=${I}&page=${o}&per_page=${r}`;try{const e=await v.get(a);if(e.status!==200)throw new Error("Network response was not ok");const{hits:s,totalHits:i}=e.data;return{hits:s,totalHits:i}}catch(e){throw console.error(e),e}}const h=document.querySelector(".gallery"),n=document.querySelector('[data-action="load-more"]'),d=document.querySelector(".spinner"),O=document.querySelector(".search-form"),f="is-hidden";let l="",c=1,p=15,y=0;function m(t){t.classList.add(f)}function x(t){t.classList.remove(f)}function L(t,o){t.disabled=!0,o.classList.remove(f)}function b(t,o){t.disabled=!1,o.classList.add(f)}m(n);O.addEventListener("submit",T);async function T(t){t.preventDefault(),h.innerHTML="",c=1;const o=t.currentTarget;if(l=o.elements.search.value.trim(),!l){u.error({title:"Error",message:"Search field cannot be empty!"});return}x(n),L(n,d);try{const{hits:r,totalHits:a}=await g(l,c,p);y=Math.ceil(a/p),$(r),r.length>0&&r.length!==a?(b(n,d),n.addEventListener("click",w)):m(n)}catch(r){console.error(r),u.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{o.reset()}}async function w(){c+=1,L(n,d);try{const{hits:t}=await g(l,c,p);$(t)}catch(t){console.error(t),u.error({title:"Error",message:"Failed to fetch more images. Please try again later."})}finally{b(n,d),c===y&&(m(n),n.removeEventListener("click",w))}}function $(t){const o=t.map(r=>`<li>
        <a href="${r.largeImageURL}" data-lightbox="gallery" data-title="${r.tags}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
          <div class="info">
            <p><strong>Likes:</strong> ${r.likes}</p>
            <p><strong>Views:</strong> ${r.views}</p>
            <p><strong>Comments:</strong> ${r.comments}</p>
            <p><strong>Downloads:</strong> ${r.downloads}</p>
          </div>
        </a>
      </li>`).join("");h.insertAdjacentHTML("beforeend",o)}new S(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
