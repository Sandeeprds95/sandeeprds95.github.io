// Roles are listed newest first. Each role ends when the next one starts.
const roles = [...document.querySelectorAll("[data-amazon-timeline] [data-role]")];
const dateFormat = new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" });

function monthIndex(value) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value ?? "")) return null;
  const [year, month] = value.split("-").map(Number);
  return year * 12 + month - 1;
}

function monthLabel(index) {
  return dateFormat.format(new Date(Date.UTC(Math.floor(index / 12), index % 12, 1)));
}

function duration(start, end) {
  const elapsed = Math.max(0, end - start);
  const years = Math.floor(elapsed / 12);
  const months = elapsed % 12;
  const parts = [];
  if (years) parts.push(years + (years === 1 ? " year" : " years"));
  if (months) parts.push(months + (months === 1 ? " month" : " months"));
  return parts.join(" ") || "Less than a month";
}

function renderTenure(today = new Date()) {
  const current = today.getFullYear() * 12 + today.getMonth();
  const starts = roles.map(role => monthIndex(role.dataset.start));
  const firstStart = starts.at(-1);
  const total = document.querySelector("[data-total-tenure]");

  if (total && firstStart != null) total.textContent = duration(firstStart, current);

  roles.forEach((role, index) => {
    const range = role.querySelector("[data-range]");
    const start = starts[index];
    const end = index === 0 ? current : starts[index - 1];
    if (!range || start == null) return;
    range.textContent = end == null
      ? "Started " + monthLabel(start)
      : monthLabel(start) + " – " + (index === 0 ? "Present" : monthLabel(end)) +
        " · " + duration(start, end);
    range.hidden = false;
  });
}

renderTenure();
window.addEventListener("pageshow", () => renderTenure());
