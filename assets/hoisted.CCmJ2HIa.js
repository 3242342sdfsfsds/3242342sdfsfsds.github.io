import"./hoisted.BWWlj9zZ.js";window.toggleRecipientFields=e=>{const t=document.getElementById("recipient-fields");t&&(t.style.display=e?"block":"none")};function s(){return JSON.parse(localStorage.getItem("BRANDNAME_cart")||"[]")}function y(e){localStorage.setItem("BRANDNAME_cart",JSON.stringify(e)),window.dispatchEvent(new Event("cart-updated")),u()}function u(){const e=s(),t=document.getElementById("cart-items"),o=document.getElementById("cart-empty"),a=document.getElementById("cart-heading"),d=document.getElementById("summary-lines"),l=document.getElementById("cart-total"),m=e.reduce((c,n)=>c+n.price*(n.qty||1),0),r=e.reduce((c,n)=>c+(n.qty||1),0);if(a.textContent=`Кошик · ${r} товарів`,!e.length){t.innerHTML="",o.style.display="",d.innerHTML="",l.textContent="0 грн";return}o.style.display="none",t.innerHTML=e.map((c,n)=>`
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${c.images?.[0]||"/images/placeholder.jpg"}" alt="${c.name}">
        </div>
        <div>
          <div class="cart-item-name">${c.name}</div>
          <div class="cart-item-meta">Розмір: ${c.size||"—"} · ${c.gender==="women"?"Жінкам":"Чоловікам"}</div>
          <div class="cart-item-meta">Колір: ${c.color||"—"}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${n},-1)">−</button>
            <span class="qty-val">${c.qty||1}</span>
            <button class="qty-btn" onclick="changeQty(${n},1)">+</button>
          </div>
          <span class="cart-remove" onclick="removeItem(${n})">Видалити</span>
        </div>
        <div class="cart-item-price">${(c.price*(c.qty||1)).toLocaleString("uk-UA")} грн</div>
      </div>`).join(""),d.innerHTML=e.map(c=>`<div style="display:flex;justify-content:space-between;"><span style="color:#6b6a68;">${c.name} ×${c.qty||1}</span><span>${(c.price*(c.qty||1)).toLocaleString("uk-UA")} грн</span></div>`).join(""),l.textContent=`${m.toLocaleString("uk-UA")} грн`}window.changeQty=(e,t)=>{const o=s();o[e].qty=Math.max(1,(o[e].qty||1)+t),y(o)};window.removeItem=e=>{const t=s();t.splice(e,1),y(t)};u();window.addEventListener("cart-updated",u);window.switchDelivery=e=>{const t=document.getElementById("branch-label"),o=document.getElementById("branch-field"),a=document.getElementById("carrier-fields"),d=document.getElementById("np-branch");t&&d&&(e==="locker"?(t.textContent="Номер поштомату / Точки видачі *",d.placeholder="Наприклад: 30567"):e==="branch"&&(t.textContent="Номер відділення *",d.placeholder="Наприклад: 12")),o&&(o.style.display=e==="carrier"?"none":""),a&&(a.style.display=e==="carrier"?"block":"none")};window.selectCity=(e,t)=>{document.getElementById("np-city").value=t,document.getElementById("np-city-ref").value=e};window.closeSuccessModal=()=>{window.location.href="/"};window.closeFailureModal=()=>{const e=document.getElementById("order-failed");e&&(e.style.display="none")};window.submitOrder=async()=>{if(!document.getElementById("terms-check")?.checked){window.showToast?.("Потрібно погодитися з умовами");return}const t=s();if(!t.length){window.showToast("Кошик порожній");return}const o=document.getElementById("f-name").value.trim(),a=document.getElementById("f-lastname").value.trim(),d=document.getElementById("f-phone").value.trim();if(!o||!a||!d){window.showToast("Заповніть ім'я, прізвище та телефон");return}const l=document.getElementById("submit-btn"),m=document.getElementById("other-recipient")?.checked;l.textContent="Відправка...",l.disabled=!0;const r={customer:{name:o,lastname:a,phone:d,email:document.getElementById("f-email").value},recipient:m?{name:document.getElementById("r-name").value,lastname:document.getElementById("r-lastname").value,phone:document.getElementById("r-phone").value}:null,delivery:{type:document.querySelector("input[name=delivery]:checked")?.value,city:document.getElementById("np-city").value,branch:document.getElementById("np-branch").value,street:document.getElementById("np-street")?.value,building:document.getElementById("np-building")?.value,apartment:document.getElementById("np-apartment")?.value},comment:document.getElementById("order-comment")?.value,payment:document.querySelector("input[name=payment]:checked")?.value,items:t.map(n=>({id:n.slug||n.id,color:n.color,name:n.name,price:n.price,size:n.size,qty:n.qty||1})),total:t.reduce((n,i)=>n+i.price*(i.qty||1),0)};let c=!1;try{if(!(await fetch("https://order-worker.fashion-order-worker.workers.dev/api/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)throw new Error;c=!0,window.trackEvent("purchase",{total:r.total,items_count:r.items.length,payment:r.payment,delivery_type:r.delivery.type}),localStorage.removeItem("BRANDNAME_cart"),window.dispatchEvent(new Event("cart-updated")),l.textContent="Замовлення прийнято!",l.disabled=!0;const i=document.getElementById("order-success");i&&(i.style.display="flex")}catch{window.trackEvent("order_submit_failed",{total:r.total,items_count:r.items.length});const n=document.getElementById("order-failed");n&&(n.style.display="flex"),l.textContent="Підтвердити замовлення",l.disabled=!1;return}};window.location.hash==="#checkout"&&setTimeout(()=>document.getElementById("checkout-panel")?.scrollIntoView({behavior:"smooth"}),300);window.copyOrder=async()=>{const e=s(),t=`
  BRDN ORDER

  Ім'я: ${document.getElementById("f-name").value}
  Прізвище: ${document.getElementById("f-lastname").value}
  Телефон: ${document.getElementById("f-phone").value}

  Товари:
  ${e.map(o=>`- ${o.name}
       Розмір: ${o.size}
       Колір: ${o.color}
       Кількість: ${o.qty}
       Ціна: ${o.price}`).join(`
`)}

  Разом: ${e.reduce((o,a)=>o+a.price*(a.qty||1),0)} грн
  `;await navigator.clipboard.writeText(t),window.trackEvent("order_copied"),window.showToast("Замовлення скопійовано")};
