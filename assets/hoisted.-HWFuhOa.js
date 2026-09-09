import"./hoisted.Byh6F2l-.js";document.addEventListener("click",t=>{const e=t.target.closest("[data-open-splash]");if(!e)return;t.preventDefault(),t.stopPropagation();const s=JSON.parse(e.dataset.openSplash||"{}");window.openSizeSplashGlobal?.(s)});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelectorAll(".hero-slide"),e=document.querySelectorAll(".hero-dot");let s=0,d;function i(o){t[s].classList.remove("active"),e[s].classList.remove("active"),s=(o+t.length)%t.length,t[s].classList.add("active"),e[s].classList.add("active")}function l(){d=setInterval(()=>i(s+1),5500)}e.forEach(o=>o.addEventListener("click",()=>{clearInterval(d),i(parseInt(o.dataset.i||"0")),l()}));let c=0;const a=document.getElementById("hero");a?.addEventListener("touchstart",o=>{c=o.touches[0].clientX},{passive:!0}),a?.addEventListener("touchend",o=>{const p=o.changedTouches[0].clientX-c;Math.abs(p)>40&&(clearInterval(d),i(s+(p<0?1:-1)),l())},{passive:!0}),l()});window.openLookSplash=function(t){const e=JSON.parse(t),s=document.getElementById("look-splash"),d=s?.nextElementSibling,i=document.getElementById("look-splash-heading"),l=document.getElementById("look-splash-subheading");i&&(i.textContent=e.subtitle),l&&(l.textContent=e.title);const c=document.getElementById("look-splash-photo");c&&(c.innerHTML=` <img src="${e.image}" style="width:100%;height:100%;object-fit:cover;" /> `);const a=document.getElementById("look-splash-list");a&&e.products?.length?a.innerHTML=e.products.map(o=>`
       <div class="product-card">

         <a href="/product/${o.slug}" class="product-card-image">

           ${o.images?.[0]?`
             <img src="${o.images[0]}" class="product-card-img" />
           `:`
             <div class="img-placeholder">MOSROS</div>
           `}

           <div class="product-card-actions">
             <button class="product-card-btn add-cart"
               onclick="event.preventDefault();event.stopPropagation();window.lookAddToCart(this)"
               data-product='${JSON.stringify(o)}'>
               Додати
             </button>
           </div>
         </a>
         <div>
            <div class="product-card-topline">
              <div class="product-card-name">${o.name}</div>
              <button class="product-card-btn add-wish product-name-wish" onclick="event.preventDefault();event.stopPropagation();window.addToWishlist('${o.slug}')">
                <svg class="wish-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
            <div class="product-card-price">${o.price?.toLocaleString("uk-UA")} грн</div>
            ${o.colorCount>1?`<div class="product-card-colors">${o.colorCount} кольори</div>`:""}
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
     `).join(""):a&&(a.innerHTML='<div style="font-size:13px;color:#9a9896;padding:16px 0;">Товари образу незабаром</div>'),s?.classList.add("open"),d&&(d.style.display="block"),document.body.style.overflow="hidden"};window.closeLookSplash=function(){const t=document.getElementById("look-splash"),e=t?.nextElementSibling;t?.classList.remove("open"),e&&(e.style.display="none"),document.body.style.overflow=""};window.lookAddToCart=function(t){const e=JSON.parse(t.dataset.product||"{}");typeof window.openSizeSplashGlobal=="function"?window.openSizeSplashGlobal(e):(window.showToast?.("Оберіть розмір на сторінці товару"),setTimeout(()=>window.location.href=`/product/${e.slug}`,1200))};const n=document.getElementById("looks-scroll");let r=!1,u,h;n&&(n.addEventListener("mousedown",t=>{r=!0,n.classList.add("dragging"),u=t.pageX-n.offsetLeft,h=n.scrollLeft}),window.addEventListener("mouseup",()=>{r=!1,n.classList.remove("dragging")}),n.addEventListener("mouseleave",()=>{r=!1,n.classList.remove("dragging")}),n.addEventListener("mousemove",t=>{if(!r)return;t.preventDefault();const s=(t.pageX-n.offsetLeft-u)*1.5;n.scrollLeft=h-s}));
