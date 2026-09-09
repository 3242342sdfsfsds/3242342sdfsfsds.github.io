import"./hoisted.CBzCBpvy.js";window.toggleRecipientFields=e=>{const t=document.getElementById("recipient-fields");t&&(t.style.display=e?"block":"none")};function s(){return JSON.parse(localStorage.getItem("BRANDNAME_cart")||"[]")}function y(e){localStorage.setItem("BRANDNAME_cart",JSON.stringify(e)),window.dispatchEvent(new Event("cart-updated")),u()}function u(){const e=s(),t=document.getElementById("cart-items"),o=document.getElementById("cart-empty"),i=document.getElementById("cart-heading"),l=document.getElementById("summary-lines"),d=document.getElementById("cart-total"),a=e.reduce((n,c)=>n+c.price*(c.qty||1),0),r=e.reduce((n,c)=>n+(c.qty||1),0);if(i.textContent=`Кошик · ${r} товарів`,!e.length){t.innerHTML="",o.style.display="",l.innerHTML="",d.textContent="0 грн";return}o.style.display="none",t.innerHTML=e.map((n,c)=>`
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${n.images?.[0]||"/images/placeholder.jpg"}" alt="${n.name}">
        </div>
        <div>
          <div class="cart-item-name">${n.name}</div>
          <div class="cart-item-meta">Розмір: ${n.size||"—"} · ${n.gender==="women"?"Жінкам":"Чоловікам"}</div>
          <div class="cart-item-meta">Колір: ${n.color||"—"}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${c},-1)">−</button>
            <span class="qty-val">${n.qty||1}</span>
            <button class="qty-btn" onclick="changeQty(${c},1)">+</button>
          </div>
          <span class="cart-remove" onclick="removeItem(${c})">Видалити</span>
        </div>
        <div class="cart-item-price">${(n.price*(n.qty||1)).toLocaleString("uk-UA")} грн</div>
      </div>`).join(""),l.innerHTML=e.map(n=>`<div style="display:flex;justify-content:space-between;"><span style="color:#6b6a68;">${n.name} ×${n.qty||1}</span><span>${(n.price*(n.qty||1)).toLocaleString("uk-UA")} грн</span></div>`).join(""),d.textContent=`${a.toLocaleString("uk-UA")} грн`}window.changeQty=(e,t)=>{const o=s();o[e].qty=Math.max(1,(o[e].qty||1)+t),y(o)};window.removeItem=e=>{const t=s();t.splice(e,1),y(t)};u();window.addEventListener("cart-updated",u);window.switchDelivery=e=>{const t=document.getElementById("branch-label"),o=document.getElementById("branch-field"),i=document.getElementById("carrier-fields"),l=document.getElementById("np-branch");t&&l&&(e==="locker"?(t.textContent="Номер поштомату / Точки видачі *",l.placeholder="Наприклад: 30567"):e==="branch"&&(t.textContent="Номер відділення *",l.placeholder="Наприклад: 12")),o&&(o.style.display=e==="carrier"?"none":""),i&&(i.style.display=e==="carrier"?"block":"none")};window.selectCity=(e,t)=>{document.getElementById("np-city").value=t,document.getElementById("np-city-ref").value=e};window.closeSuccessModal=()=>{window.location.href="/"};window.closeFailureModal=()=>{const e=document.getElementById("order-failed");e&&(e.style.display="none")};window.submitOrder=async()=>{if(!document.getElementById("terms-check")?.checked){window.showToast?.("Потрібно погодитися з умовами");return}if(!p())return;const t=s();if(!t.length){window.showToast("Кошик порожній");return}const o=document.getElementById("f-name").value.trim(),i=document.getElementById("f-lastname").value.trim(),l=document.getElementById("f-phone").value.trim();if(!o||!i||!l){window.showToast("Заповніть ім'я, прізвище та телефон");return}const d=document.getElementById("submit-btn"),a=document.getElementById("other-recipient")?.checked;d.textContent="Відправка...",d.disabled=!0;const r={customer:{name:o,lastname:i,phone:l,email:document.getElementById("f-email").value},recipient:a?{name:document.getElementById("r-name").value,lastname:document.getElementById("r-lastname").value,phone:document.getElementById("r-phone").value}:null,delivery:{type:document.querySelector("input[name=delivery]:checked")?.value,city:document.getElementById("np-city").value,branch:document.getElementById("np-branch").value,street:document.getElementById("np-street")?.value,building:document.getElementById("np-building")?.value,apartment:document.getElementById("np-apartment")?.value},comment:document.getElementById("order-comment")?.value,payment:document.querySelector("input[name=payment]:checked")?.value,items:t.map(c=>({id:c.slug||c.id,color:c.color,name:c.name,price:c.price,size:c.size,qty:c.qty||1})),total:t.reduce((c,m)=>c+m.price*(m.qty||1),0)};let n=!1;try{if(!(await fetch("https://order-worker.fashion-order-worker.workers.dev/api/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)throw new Error;n=!0,window.trackEvent("purchase",{total:r.total,items_count:r.items.length,payment:r.payment,delivery_type:r.delivery.type}),localStorage.removeItem("BRANDNAME_cart"),window.dispatchEvent(new Event("cart-updated")),d.textContent="Замовлення прийнято!",d.disabled=!0;const m=document.getElementById("order-success");m&&(m.style.display="flex")}catch{window.trackEvent("order_submit_failed",{total:r.total,items_count:r.items.length}),window.showOrderFailureModal(),d.textContent="Підтвердити замовлення",d.disabled=!1;return}};window.location.hash==="#checkout"&&setTimeout(()=>document.getElementById("checkout-panel")?.scrollIntoView({behavior:"smooth"}),300);window.openMessengerOrderModal=()=>{if(!p())return;const e=document.getElementById("order-failed"),t=e?.querySelector(".success-title"),o=e?.querySelector(".success-text");t&&(t.textContent="Підтвердження через меседжер"),o&&(o.innerHTML=`
      Якщо вам зручніше оформити замовлення через Instagram, Facebook або Telegram,
      ви можете скопіювати замовлення та надіслати його нам.

      <br><br>

      Ми підтвердимо замовлення вручну та зв'яжемося з вами найближчим часом.
    `),e&&(e.style.display="flex"),window.trackEvent?.("messenger_checkout_opened")};window.showOrderFailureModal=()=>{const e=document.getElementById("order-failed"),t=e?.querySelector(".success-title"),o=e?.querySelector(".success-text");t&&(t.textContent="Нам дуже шкода 😔"),o&&(o.innerHTML=`
      Під час оформлення замовлення сталася технічна помилка на нашій стороні.

      <br><br>

      Ваше замовлення НЕ втрачено.

      <br><br>

      Скопіюйте його та надішліть нам через Instagram, Facebook або Telegram.
      Ми обробимо його вручну та зв'яжемося з вами.
    `),e&&(e.style.display="flex")};window.copyOrder=async()=>{const e=s(),t=document.querySelector("input[name=delivery]:checked")?.value,o=document.querySelector("input[name=payment]:checked")?.value,i=document.getElementById("other-recipient")?.checked;let l="";t==="carrier"?l=`
    Тип доставки: Нова Пошта — кур'єр
    Місто: ${document.getElementById("np-city")?.value||""}
    Вулиця: ${document.getElementById("np-street")?.value||""}
    Будинок: ${document.getElementById("np-building")?.value||""}
    Квартира: ${document.getElementById("np-apartment")?.value||""}
    `:l=`Тип доставки: ${t==="locker"?"Нова Пошта — поштомат":"Нова Пошта — відділення"}
    Місто: ${document.getElementById("np-city")?.value||""}
    Номер відділення / поштомату: ${document.getElementById("np-branch")?.value||""}`;const d=`
    MOSROS ЗАМОВЛЕННЯ
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
    Оплата: ${o==="cod"?"Накладений платіж":"Оплата за реквізитами IBAN"}
    =========================
    ТОВАРИ
    ${e.map(a=>`
    • ${a.name}
      Артикул: ${a.slug||a.id}
      Розмір: ${a.size}
      Колір: ${a.color}
      Кількість: ${a.qty||1}
      Ціна: ${a.price} грн
      Сума: ${a.price*(a.qty||1)} грн
    `).join(`
`)}
    =========================
    РАЗОМ:${e.reduce((a,r)=>a+r.price*(r.qty||1),0)} грн
    =========================
    `;await navigator.clipboard.writeText(d),window.trackEvent("order_copied"),window.showToast("Замовлення скопійовано")};function p(){if(!s().length)return window.showToast("Кошик порожній"),!1;const t=document.getElementById("f-name")?.value?.trim(),o=document.getElementById("f-lastname")?.value?.trim(),i=document.getElementById("f-phone")?.value?.trim();if(!t||!o||!i)return window.showToast("Заповніть ім'я, прізвище та телефон"),!1;if(!document.getElementById("np-city")?.value?.trim())return window.showToast("Вкажіть місто доставки"),!1;if(document.querySelector("input[name=delivery]:checked")?.value==="carrier"){const r=document.getElementById("np-street")?.value?.trim(),n=document.getElementById("np-building")?.value?.trim();if(!r||!n)return window.showToast("Для кур'єрської доставки потрібно вказати вулицю та будинок"),!1}else if(!document.getElementById("np-branch")?.value?.trim())return window.showToast("Вкажіть номер відділення або поштомату"),!1;if(document.getElementById("other-recipient")?.checked){const r=document.getElementById("r-name")?.value?.trim(),n=document.getElementById("r-lastname")?.value?.trim(),c=document.getElementById("r-phone")?.value?.trim();if(!r||!n||!c)return window.showToast("Заповніть дані одержувача"),!1}return!0}
