import"./hoisted.BWWlj9zZ.js";window.toggleRecipientFields=e=>{const t=document.getElementById("recipient-fields");t&&(t.style.display=e?"block":"none")};function s(){return JSON.parse(localStorage.getItem("BRANDNAME_cart")||"[]")}function y(e){localStorage.setItem("BRANDNAME_cart",JSON.stringify(e)),window.dispatchEvent(new Event("cart-updated")),u()}function u(){const e=s(),t=document.getElementById("cart-items"),a=document.getElementById("cart-empty"),i=document.getElementById("cart-heading"),l=document.getElementById("summary-lines"),r=document.getElementById("cart-total"),o=e.reduce((c,n)=>c+n.price*(n.qty||1),0),d=e.reduce((c,n)=>c+(n.qty||1),0);if(i.textContent=`Кошик · ${d} товарів`,!e.length){t.innerHTML="",a.style.display="",l.innerHTML="",r.textContent="0 грн";return}a.style.display="none",t.innerHTML=e.map((c,n)=>`
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
      </div>`).join(""),l.innerHTML=e.map(c=>`<div style="display:flex;justify-content:space-between;"><span style="color:#6b6a68;">${c.name} ×${c.qty||1}</span><span>${(c.price*(c.qty||1)).toLocaleString("uk-UA")} грн</span></div>`).join(""),r.textContent=`${o.toLocaleString("uk-UA")} грн`}window.changeQty=(e,t)=>{const a=s();a[e].qty=Math.max(1,(a[e].qty||1)+t),y(a)};window.removeItem=e=>{const t=s();t.splice(e,1),y(t)};u();window.addEventListener("cart-updated",u);window.switchDelivery=e=>{const t=document.getElementById("branch-label"),a=document.getElementById("branch-field"),i=document.getElementById("carrier-fields"),l=document.getElementById("np-branch");t&&l&&(e==="locker"?(t.textContent="Номер поштомату / Точки видачі *",l.placeholder="Наприклад: 30567"):e==="branch"&&(t.textContent="Номер відділення *",l.placeholder="Наприклад: 12")),a&&(a.style.display=e==="carrier"?"none":""),i&&(i.style.display=e==="carrier"?"block":"none")};window.selectCity=(e,t)=>{document.getElementById("np-city").value=t,document.getElementById("np-city-ref").value=e};window.closeSuccessModal=()=>{window.location.href="/"};window.closeFailureModal=()=>{const e=document.getElementById("order-failed");e&&(e.style.display="none")};window.submitOrder=async()=>{if(!document.getElementById("terms-check")?.checked){window.showToast?.("Потрібно погодитися з умовами");return}const t=s();if(!t.length){window.showToast("Кошик порожній");return}const a=document.getElementById("f-name").value.trim(),i=document.getElementById("f-lastname").value.trim(),l=document.getElementById("f-phone").value.trim();if(!a||!i||!l){window.showToast("Заповніть ім'я, прізвище та телефон");return}const r=document.getElementById("submit-btn"),o=document.getElementById("other-recipient")?.checked;r.textContent="Відправка...",r.disabled=!0;const d={customer:{name:a,lastname:i,phone:l,email:document.getElementById("f-email").value},recipient:o?{name:document.getElementById("r-name").value,lastname:document.getElementById("r-lastname").value,phone:document.getElementById("r-phone").value}:null,delivery:{type:document.querySelector("input[name=delivery]:checked")?.value,city:document.getElementById("np-city").value,branch:document.getElementById("np-branch").value,street:document.getElementById("np-street")?.value,building:document.getElementById("np-building")?.value,apartment:document.getElementById("np-apartment")?.value},comment:document.getElementById("order-comment")?.value,payment:document.querySelector("input[name=payment]:checked")?.value,items:t.map(n=>({id:n.slug||n.id,color:n.color,name:n.name,price:n.price,size:n.size,qty:n.qty||1})),total:t.reduce((n,m)=>n+m.price*(m.qty||1),0)};let c=!1;try{if(!(await fetch("https://order-worker.fashion-order-worker.workers.dev/api/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})).ok)throw new Error;c=!0,window.trackEvent("purchase",{total:d.total,items_count:d.items.length,payment:d.payment,delivery_type:d.delivery.type}),localStorage.removeItem("BRANDNAME_cart"),window.dispatchEvent(new Event("cart-updated")),r.textContent="Замовлення прийнято!",r.disabled=!0;const m=document.getElementById("order-success");m&&(m.style.display="flex")}catch{window.trackEvent("order_submit_failed",{total:d.total,items_count:d.items.length});const n=document.getElementById("order-failed");n&&(n.style.display="flex"),r.textContent="Підтвердити замовлення",r.disabled=!1;return}};window.location.hash==="#checkout"&&setTimeout(()=>document.getElementById("checkout-panel")?.scrollIntoView({behavior:"smooth"}),300);window.copyOrder=async()=>{const e=s(),t=document.querySelector("input[name=delivery]:checked")?.value,a=document.querySelector("input[name=payment]:checked")?.value,i=document.getElementById("other-recipient")?.checked;let l="";t==="carrier"?l=`
Тип доставки: Нова Пошта — кур'єр
Місто: ${document.getElementById("np-city")?.value||""}
Вулиця: ${document.getElementById("np-street")?.value||""}
Будинок: ${document.getElementById("np-building")?.value||""}
Квартира: ${document.getElementById("np-apartment")?.value||""}
`:l=`Тип доставки: ${t==="locker"?"Нова Пошта — поштомат":"Нова Пошта — відділення"}
Місто: ${document.getElementById("np-city")?.value||""}
Номер відділення / поштомату: ${document.getElementById("np-branch")?.value||""}`;const r=`
BRDN ЗАМОВЛЕННЯ
=========================
Прізвище та Ім'я: ${document.getElementById("f-lastname")?.value||""} ${document.getElementById("f-name")?.value||""}
Телефон: ${document.getElementById("f-phone")?.value||""}
Email: ${document.getElementById("f-email")?.value||""}${i?`
=========================
ОДЕРЖУВАЧ
Ім'я та Прізвище: ${document.getElementById("r-name")?.value||""} ${document.getElementById("r-lastname")?.value||""}
Телефон:${document.getElementById("r-phone")?.value||""}`:""}
=========================
${l}
=========================
Оплата: ${a==="cod"?"Накладений платіж":"Безготівковий розрахунок"}
=========================
ТОВАРИ
${e.map(o=>`
• ${o.name}
  Артикул: ${o.slug||o.id}
  Розмір: ${o.size}
  Колір: ${o.color}
  Кількість: ${o.qty||1}
  Ціна: ${o.price} грн
  Сума: ${o.price*(o.qty||1)} грн
`).join(`
`)}
=========================
РАЗОМ:${e.reduce((o,d)=>o+d.price*(d.qty||1),0)} грн
=========================
`;await navigator.clipboard.writeText(r),window.trackEvent("order_copied"),window.showToast("Замовлення скопійовано")};
