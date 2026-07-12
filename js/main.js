const ORDER_EMAIL = "colekouremetis2@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderOrderItems();
  wireNav();
  wireFulfillmentToggle();
  wireOrderForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});

function renderMenu() {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = WEEKLY_MENU.map(item => `
    <article class="menu-card">
      ${item.tag ? `<span class="tag">${escapeHtml(item.tag)}</span>` : ""}
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <span class="price">${escapeHtml(item.price)}</span>
    </article>
  `).join("");
}

function renderOrderItems() {
  const container = document.getElementById("order-items");
  container.innerHTML = WEEKLY_MENU.map((item, i) => `
    <label class="checkbox-option">
      <input type="checkbox" name="items" value="${escapeHtml(item.name)}" id="item-${i}">
      ${escapeHtml(item.name)}
    </label>
  `).join("");
}

function wireNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function wireFulfillmentToggle() {
  const radios = document.querySelectorAll('input[name="fulfillment"]');
  const addressRow = document.getElementById("address-row");
  const addressInput = document.getElementById("address");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      const isDelivery = document.querySelector('input[name="fulfillment"]:checked').value === "Delivery";
      addressRow.hidden = !isDelivery;
      addressInput.required = isDelivery;
    });
  });
}

function wireOrderForm() {
  const form = document.getElementById("order-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const fulfillment = form.fulfillment.value;
    const address = form.address.value.trim();
    const notes = form.notes.value.trim();
    const items = Array.from(form.querySelectorAll('input[name="items"]:checked')).map(cb => cb.value);

    if (items.length === 0) {
      alert("Please select at least one item before sending your order.");
      return;
    }

    const subject = `Order Request — ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Fulfillment: ${fulfillment}`,
      fulfillment === "Delivery" ? `Delivery Address: ${address}` : null,
      "",
      "Items:",
      ...items.map(i => `- ${i}`),
      "",
      notes ? `Notes: ${notes}` : null
    ].filter(Boolean);

    const mailto = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
