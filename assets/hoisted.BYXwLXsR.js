import"./hoisted.CBzCBpvy.js";document.addEventListener("click",t=>{const o=t.target.closest("[data-open-splash]");if(!o)return;t.preventDefault(),t.stopPropagation();const n=JSON.parse(o.dataset.openSplash||"{}");window.openSizeSplashGlobal?.(n)});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelectorAll(".hero-slide"),o=document.querySelectorAll(".hero-dot");let n=0,l;function i(s){t[n].classList.remove("active"),o[n].classList.remove("active"),n=(s+t.length)%t.length,t[n].classList.add("active"),o[n].classList.add("active")}function d(){l=setInterval(()=>i(n+1),5500)}o.forEach(s=>s.addEventListener("click",()=>{clearInterval(l),i(parseInt(s.dataset.i||"0")),d()}));let r=0;const a=document.getElementById("hero");a?.addEventListener("touchstart",s=>{r=s.touches[0].clientX},{passive:!0}),a?.addEventListener("touchend",s=>{const h=s.changedTouches[0].clientX-r;Math.abs(h)>40&&(clearInterval(l),i(n+(h<0?1:-1)),d())},{passive:!0}),d()});window.openLookSplash=function(t){const o=JSON.parse(t),n=document.getElementById("look-splash"),l=n?.nextElementSibling,i=document.getElementById("look-splash-heading"),d=document.getElementById("look-splash-subheading");i&&(i.textContent=o.subtitle),d&&(d.textContent=o.title);const r=document.getElementById("look-splash-photo");r&&(r.innerHTML=` <img src="${o.image}" style="width:100%;height:100%;object-fit:cover;" /> `);const a=document.getElementById("look-splash-list");a&&o.products?.length?a.innerHTML=o.products.map(s=>`
       <div class="product-card">
         <a href="/product/${s.slug}" class="product-card-image">
           ${s.images?.[0]?`
             <img src="${s.images[0]}" class="product-card-img" />
           `:`
             <div class="img-placeholder">MOSROS</div>
           `}
           <div class="product-card-actions">
             <button class="product-card-btn add-cart"
               onclick="event.preventDefault();event.stopPropagation();window.lookAddToCart(this)"
               data-product='${JSON.stringify(s)}'>
               Додати
             </button>
           </div>
         </a>
         <div>
            <div class="product-card-topline">
              <div class="product-card-name">${s.name}</div>
              <button class="product-card-btn add-wish product-name-wish" onclick="event.preventDefault();event.stopPropagation();window.addToWishlist('${s.slug}')">
                <svg class="wish-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
            <div class="product-card-price">${s.price?.toLocaleString("uk-UA")} грн</div>
            ${s.colorCount>1?`<div class="product-card-colors">${s.colorCount} кольори</div>`:""}
         </div>
       </div>
       <style>
       .product-card-topline {
         display: flex;
         align-items: flex-start;
         justify-content: space-between;
         gap: 12px;
       }
       .product-name-wish {
         padding: 0;
         background: transparent;
         border: none;
         min-width: auto;
         height: auto;
         color: #0a0a0a;
         flex-shrink: 0;
       }
       .product-name-wish:hover {
         transform: scale(1.08);
       }
       .product-card-meta {
         padding-top: 10px;
       }
       </style>
     `).join(""):a&&(a.innerHTML='<div style="font-size:13px;color:#9a9896;padding:16px 0;">Товари образу незабаром</div>'),n?.classList.add("open"),l&&(l.style.display="block"),document.body.style.overflow="hidden"};window.closeLookSplash=function(){const t=document.getElementById("look-splash"),o=t?.nextElementSibling;t?.classList.remove("open"),o&&(o.style.display="none"),document.body.style.overflow=""};window.lookAddToCart=function(t){const o=JSON.parse(t.dataset.product||"{}");typeof window.openSizeSplashGlobal=="function"?window.openSizeSplashGlobal(o):(window.showToast?.("Оберіть розмір на сторінці товару"),setTimeout(()=>window.location.href=`/product/${o.slug}`,1200))};const e=document.getElementById("looks-scroll");let c=!1,u,p;const m=.4;let f=!1;function v(){if(e&&!c&&!f){e.scrollLeft+=m;const t=e.scrollWidth/2;e.scrollLeft>=t?e.scrollLeft-=t:e.scrollLeft<=0&&(e.scrollLeft+=t)}requestAnimationFrame(v)}requestAnimationFrame(v);e&&(e.addEventListener("mouseenter",()=>{f=!0}),e.addEventListener("mouseleave",()=>{c||(f=!1)}),e.addEventListener("mousedown",t=>{c=!0,e.classList.add("dragging"),u=t.pageX-e.offsetLeft,p=e.scrollLeft}),window.addEventListener("mouseup",()=>{c&&(c=!1,e.classList.remove("dragging"))}),e.addEventListener("mousemove",t=>{if(!c)return;t.preventDefault();const n=(t.pageX-e.offsetLeft-u)*1.5;e.scrollLeft=p-n;const l=e.scrollWidth/2;e.scrollLeft>=l?(e.scrollLeft-=l,u=t.pageX-e.offsetLeft,p=e.scrollLeft):e.scrollLeft<=0&&(e.scrollLeft+=l,u=t.pageX-e.offsetLeft,p=e.scrollLeft)}));
