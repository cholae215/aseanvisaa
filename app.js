const ASEAN_MEMBERS = [
  { id: "brunei", name: "Brunei Darussalam", shortName: "Brunei", flag: "🇧🇳", capital: "Bandar Seri Begawan", region: "Borneo", stay: "Tourist entry: passport-specific; visa-free windows vary by nationality.", url: "https://www.immigration.gov.bn/", linkText: "Brunei Immigration", searchable: true },
  { id: "cambodia", name: "Cambodia", shortName: "Cambodia", flag: "🇰🇭", capital: "Phnom Penh", region: "Mainland", stay: "Tourist visa: 30 days; some ASEAN passports are visa-exempt.", url: "https://www.evisa.gov.kh/", linkText: "Cambodia eVisa", searchable: true },
  { id: "indonesia", name: "Indonesia", shortName: "Indonesia", flag: "🇮🇩", capital: "Jakarta / Nusantara transition", region: "Archipelago", stay: "Visitor Visa: 30 days for eligible passports; confirm visa-free eligibility.", url: "https://evisa.imigrasi.go.id/", linkText: "Indonesia eVisa", searchable: true },
  { id: "laos", name: "Lao PDR", shortName: "Laos", flag: "🇱🇦", capital: "Vientiane", region: "Mainland", stay: "Visa-free and 30-day tourist visa options depend on nationality.", url: "https://laoevisa.gov.la/", linkText: "Lao eVisa", searchable: true },
  { id: "malaysia", name: "Malaysia", shortName: "Malaysia", flag: "🇲🇾", capital: "Kuala Lumpur", region: "Peninsula + Borneo", stay: "Stay length varies by nationality; check the official visa list.", url: "https://malaysiavisa.imi.gov.my/", linkText: "Malaysia eVisa", searchable: true },
  { id: "myanmar", name: "Myanmar", shortName: "Myanmar", flag: "🇲🇲", capital: "Naypyidaw", region: "Mainland", stay: "Tourist eVisa is generally 28 days; confirm current entry conditions.", url: "https://evisa.moip.gov.mm/", linkText: "Myanmar eVisa", searchable: true },
  { id: "philippines", name: "Philippines", shortName: "Philippines", flag: "🇵🇭", capital: "Manila", region: "Archipelago", stay: "Visa-free stays for eligible passports are commonly up to 30 days.", url: "https://evisa.gov.ph/", linkText: "Philippines eVisa", searchable: true },
  { id: "singapore", name: "Singapore", shortName: "Singapore", flag: "🇸🇬", capital: "Singapore", region: "City-state", stay: "Allowed stay is set on arrival; visa need depends on passport.", url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements", linkText: "Singapore ICA entry guide", searchable: true },
  { id: "thailand", name: "Thailand", shortName: "Thailand", flag: "🇹🇭", capital: "Bangkok", region: "Mainland", stay: "Visa-exempt and eVisa stays differ by nationality and current policy.", url: "https://www.thaievisa.go.th/", linkText: "Thailand eVisa", searchable: true },
  { id: "vietnam", name: "Vietnam", shortName: "Vietnam", flag: "🇻🇳", capital: "Hanoi", region: "Mainland", stay: "Vietnam eVisa: up to 90 days; visa exemptions vary by passport.", url: "https://evisa.gov.vn/", linkText: "Vietnam eVisa", searchable: true },
  { id: "timor-leste", name: "Timor-Leste", shortName: "Timor-Leste", flag: "🇹🇱", capital: "Dili", region: "Island nation", stay: "Entry conditions are nationality- and route-specific; verify directly.", url: "https://migracao.gov.tl/wp/visas-permits/", linkText: "Timor-Leste Migration Service", searchable: true }
];

const ORIGIN_LABELS = {
  brunei: "Brunei", cambodia: "Cambodia", indonesia: "Indonesia", laos: "Laos", malaysia: "Malaysia", myanmar: "Myanmar", philippines: "Philippines", singapore: "Singapore", thailand: "Thailand", vietnam: "Vietnam", "timor-leste": "Timor-Leste", usa: "USA", uk: "UK", eu: "EU", japan: "Japan", china: "China", india: "India", australia: "Australia", other: "Other passport"
};
const ASEAN_ORIGINS = new Set(["brunei", "cambodia", "indonesia", "laos", "malaysia", "myanmar", "philippines", "singapore", "thailand", "vietnam"]);
const NON_ASEAN_CAMBODIA_EXAMPLES = new Set(["usa", "uk", "japan", "india", "australia"]);
function getMember(id) {
  return ASEAN_MEMBERS.find((member) => member.id === id);
}

function getVisaGuidance(origin, destination) {
  const target = getMember(destination);
  const portal = target?.url || "https://asean.org/member-states/";
  const isCambodiaSample = destination === "cambodia" && NON_ASEAN_CAMBODIA_EXAMPLES.has(origin);

  if (origin === destination) {
    return {
      status: "verify", statusText: "Domestic travel", title: "No cross-border visa", duration: "Domestic rules apply", context: "This route is within your passport country.", source: portal, sourceText: `${target.shortName} official site ↗`, documents: ["Carry your valid passport or national ID", "Check local arrival and transit rules"], caveat: "Domestic identification and local entry rules still apply. This checker is for cross-border tourism."
    };
  }

  if (origin === "timor-leste" || destination === "timor-leste") {
    return {
      status: "verify", statusText: "Verify directly", title: "Official check needed", duration: "Passport-specific", context: "Timor-Leste rules are not covered by this quick-reference sample.", source: "https://migracao.gov.tl/wp/visas-permits/", sourceText: "Timor-Leste Migration Service ↗", documents: ["Passport validity requirement for your route", "Visa or arrival authorization, if required", "Onward travel and accommodation details"], caveat: "Timor-Leste became ASEAN's 11th member in October 2025, after the 2016 visa-exemption framework was agreed. This guide does not assume the same exemption automatically applies; confirm directly with each country's immigration authority and your carrier."
    };
  }

  if (origin === "myanmar" && destination === "malaysia") {
    return {
      status: "required", statusText: "Visa required", title: "Check Malaysia visa rules", duration: "Confirm with Immigration", context: "Malaysia's published list excludes Myanmar from its general ASEAN short-stay exemption.", source: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/", sourceText: "Malaysia Immigration visa list ↗", documents: ["Confirm visa eligibility before booking", "Passport validity per Malaysia entry rules", "Check the permitted stay on the issued visa"], caveat: "Malaysia states that its under-one-month ASEAN exemption does not cover Myanmar citizens. The exact permit and stay length must be confirmed with Malaysian Immigration."
    };
  }

  if (ASEAN_ORIGINS.has(origin) && ASEAN_ORIGINS.has(destination)) {
    return {
      status: "free", statusText: "Visa-free (short visit)", title: "Visa-free short visit", duration: "Framework: up to 14 days", context: "Short visits only; national or bilateral rules may allow more.", source: "https://asean.org/overview/", sourceText: "ASEAN visa-exemption framework ↗", documents: ["Valid national passport", "Return or onward ticket", "Confirm the destination's local entry conditions"], caveat: "The ASEAN framework describes a visit exemption of up to 14 days for eligible nationals. This does not authorize work; national rules and bilateral arrangements can differ."
    };
  }

  if (isCambodiaSample) {
    return {
      status: "required", statusText: "Visa required", title: "Tourist visa required", duration: "Up to 30 days", context: "For this passport example, a tourist visa is needed before entry.", source: "https://www.evisa.gov.kh/", sourceText: "Apply / check Cambodia eVisa ↗", documents: ["Passport valid for 6+ months", "Recent digital passport photo", "Return or onward travel details", "Cambodia e-Arrival Card for air arrivals"], caveat: "Cambodia's tourist visa permits a 30-day stay. The official portal lists six-month passport validity; the e-Arrival Card is required before air arrival at covered airports. Verify your exact passport and route before booking."
    };
  }

  if (destination === "malaysia" && origin === "india") {
    return {
      status: "free", statusText: "Visa-free (time-limited policy)", title: "Temporary visa exemption", duration: "Exemption through 31 Dec 2026", context: "Malaysia Immigration currently lists an exemption for Indian citizens.", source: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/", sourceText: "Malaysia Immigration visa list ↗", documents: ["Passport validity per Malaysia entry rules", "Return or onward ticket", "Malaysia Digital Arrival Card, if applicable"], caveat: "Malaysia's published Indian-citizen exemption is time-limited and the exact permitted stay and conditions must be checked on the official immigration site before departure."
    };
  }

  if (destination === "indonesia" && new Set(["usa", "uk", "japan", "india", "australia"]).has(origin)) {
    return {
      status: "arrival", statusText: "Visa on Arrival", title: "Visitor visa available on arrival", duration: "30 days", context: "These passport examples are listed for Indonesia's Visitor Visa; an official e-VOA is also available.", source: "https://evisa.imigrasi.go.id/front/info/evoa", sourceText: "Indonesia Immigration e-VOA guide ↗", documents: ["Passport valid for at least 6 months", "Return or onward ticket", "Complete Indonesia arrival card before travel"], caveat: "Indonesia lists these nationalities as eligible for a 30-day Visitor Visa and describes visa on arrival as an option. Use the official e-VOA guide to confirm current eligible entry points and exact requirements."
    };
  }

  if (destination === "vietnam" && ["uk", "japan"].includes(origin)) {
    return {
      status: "free", statusText: "Visa-Free", title: "Visa-exempt short stay", duration: "Up to 45 days", context: "UK and Japanese tourist passports are included in Vietnam's current 45-day exemption policy.", source: "https://en.baochinhphu.vn/viet-nam-to-offers-45-day-visa-free-entry-for-citizens-from-12-countries-to-promote-inbound-tourism-111250811151108483.htm", sourceText: "Vietnam Government News — visa exemption ↗", documents: ["Passport valid for at least 6 months", "Return or onward travel details", "Confirm the policy dates for your travel"], caveat: "Vietnam's published exemption for UK and Japanese citizens runs through 14 March 2028. Confirm current policy, passport type and entry conditions before departure."
    };
  }

  if (destination === "vietnam" && ["usa", "india", "australia"].includes(origin)) {
    return {
      status: "evisa", statusText: "e-Visa Required", title: "Apply for an e-Visa", duration: "Up to 90 days", context: "Vietnam's Immigration Department offers foreign visitors an e-Visa for eligible passports.", source: "https://evisa.gov.vn/", sourceText: "Vietnam Immigration e-Visa ↗", documents: ["Passport matching the e-Visa application", "Check passport expiry against current entry rules", "Return/onward ticket and listed entry gate, if required"], caveat: "Vietnam e-Visas can be valid for up to 90 days. Eligibility, entry count, border gates and the stay granted depend on the issued e-Visa and current rules."
    };
  }

  return {
    status: "verify", statusText: "Verify with officials", title: "Passport-specific check needed", duration: "Check official rules", context: "This passport-and-destination combination is not in the curated example set.", source: portal, sourceText: `${target?.shortName || "Destination"} official entry guide ↗`, documents: ["Check passport validity (six months is common, but not universal)", "Check whether a visa or eVisa is needed", "Return/onward ticket and arrival form, if required"], caveat: "No eligibility result is guessed for this combination. Open the official destination immigration or eVisa resource and confirm the rules for your exact nationality, travel date, route and purpose."
  };
}

function completeChecklist(items) {
  const documents = [...items];
  if (!documents.some((item) => /six[- ]months?|6\s*\+?\s*months?/i.test(item))) {
    documents.push("Check whether a six-month passport-validity rule applies");
  }
  if (!documents.some((item) => /return|onward/i.test(item))) {
    documents.push("Return/onward ticket if required by the destination");
  }
  return documents;
}

function updateVisaResult(origin, destination) {
  const guidance = getVisaGuidance(origin, destination);
  const originNode = document.getElementById("result-origin");
  const destinationNode = document.getElementById("result-destination");
  const title = document.getElementById("result-title");
  const context = document.getElementById("result-context");
  const duration = document.getElementById("result-duration");
  const source = document.getElementById("result-source");
  const caveat = document.getElementById("result-caveat");
  const pill = document.getElementById("status-pill");
  const list = document.getElementById("document-list");
  const destinationMember = getMember(destination);

  originNode.textContent = ORIGIN_LABELS[origin] || "Selected passport";
  destinationNode.textContent = destinationMember?.shortName || "Selected destination";
  title.textContent = guidance.title;
  context.textContent = guidance.context;
  duration.textContent = guidance.duration;
  source.href = guidance.source;
  source.textContent = guidance.sourceText;
  caveat.textContent = guidance.caveat;
  pill.textContent = guidance.statusText;
  pill.className = `status-pill status-${guidance.status}`;
  list.replaceChildren(...completeChecklist(guidance.documents).map((item) => {
    const li = document.createElement("li");
    const tick = document.createElement("span");
    tick.setAttribute("aria-hidden", "true");
    tick.textContent = "✓";
    li.append(tick, document.createTextNode(item));
    return li;
  }));
}

function renderMemberCards() {
  const grid = document.getElementById("states-grid");
  if (!grid) return;
  const cards = ASEAN_MEMBERS.map((member) => {
    const card = document.createElement("article");
    card.className = `state-card${member.id === "timor-leste" ? " state-card-timor" : ""}`;
    const head = document.createElement("div");
    head.className = "state-card-head";
    const flag = document.createElement("span");
    flag.className = "state-flag";
    flag.setAttribute("role", "img");
    flag.setAttribute("aria-label", `${member.name} flag`);
    flag.textContent = member.flag;
    const region = document.createElement("span");
    region.className = "state-region";
    region.textContent = member.id === "timor-leste" ? "NEW MEMBER" : member.region;
    head.append(flag, region);
    const name = document.createElement("h3");
    name.textContent = member.name;
    const capital = document.createElement("p");
    capital.className = "state-capital";
    capital.textContent = `Capital · ${member.capital}`;
    const stay = document.createElement("p");
    stay.className = "state-stay";
    const strong = document.createElement("strong");
    strong.textContent = "Tourist stay · ";
    stay.append(strong, document.createTextNode(member.stay));
    const link = document.createElement("a");
    link.className = "state-link";
    link.href = member.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${member.linkText}, opens in a new tab`);
    link.append(document.createTextNode(member.linkText));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append(arrow);
    card.append(head, name, capital, stay, link);
    return card;
  });
  grid.replaceChildren(...cards);
}

function setupMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;
  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    nav.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
    nav.classList.toggle("is-open", !expanded);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) close(); });
}

const TIMELINE_DETAILS = [
  { title: "The concept", body: "A single tourist authorization has been suggested to make visits across parts of Southeast Asia easier to plan. A proposal is not an entry permission." },
  { title: "Under discussion", body: "Member-country alignment, border processes and visa policies would need agreement before any pilot could begin." },
  { title: "No pilot framework announced", body: "The materials reviewed do not announce an operating pilot or finalized common application. Continue to use each country's own entry rules." },
  { title: "Not implemented", body: "There is no active ASEAN-wide tourist visa. Apply separately for each destination that requires permission." }
];
function setupTimeline() {
  const buttons = [...document.querySelectorAll(".timeline-step")];
  const detail = document.getElementById("timeline-detail");
  if (!detail || !buttons.length) return;
  buttons.forEach((button) => button.addEventListener("click", () => {
    const stage = Number(button.dataset.stage);
    buttons.forEach((item) => {
      const selected = item === button;
      item.setAttribute("aria-pressed", String(selected));
    });
    const entry = TIMELINE_DETAILS[stage];
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = entry.title;
    p.append(strong, document.createElement("br"), document.createTextNode(entry.body));
    const icon = document.createElement("span");
    icon.className = "timeline-detail-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = stage === 0 ? "✳" : stage === 1 ? "↗" : "○";
    detail.replaceChildren(icon, p);
  }));
}

function setupFaq() {
  const questions = [...document.querySelectorAll(".faq-question")];
  questions.forEach((button) => button.addEventListener("click", () => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(shouldOpen));
    answer.hidden = !shouldOpen;
    const item = button.closest(".faq-item");
    item.classList.toggle("is-open", shouldOpen);
    const icon = button.querySelector(".faq-chevron");
    if (icon) icon.textContent = shouldOpen ? "−" : "+";
  }));
}

function setupRouteChecker() {
  const form = document.getElementById("visa-form");
  const origin = document.getElementById("origin-select");
  const destination = document.getElementById("destination-select");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    updateVisaResult(origin.value, destination.value);
  });
  origin?.addEventListener("change", () => updateVisaResult(origin.value, destination.value));
  destination?.addEventListener("change", () => updateVisaResult(origin.value, destination.value));

  const heroDestination = document.getElementById("hero-destination");
  document.getElementById("hero-search-button")?.addEventListener("click", () => {
    destination.value = heroDestination.value;
    updateVisaResult(origin.value, destination.value);
    document.getElementById("visa-checker").scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => origin.focus({ preventScroll: true }), 400);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMemberCards();
  setupMobileNavigation();
  setupTimeline();
  setupFaq();
  setupRouteChecker();
  updateVisaResult(document.getElementById("origin-select")?.value || "usa", document.getElementById("destination-select")?.value || "cambodia");
  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
});
