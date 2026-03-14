const searchInput = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
const results = document.getElementById("results");

// AUTOCOMPLETE
searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();

  if (query.length < 1) {
    suggestions.innerHTML = "";
    return;
  }

  const res = await fetch(`/api/autocomplete?q=${query}`);
  const data = await res.json();

  suggestions.innerHTML = data
    .map((item) => `<li class="suggest-item">${item.title}</li>`)
    .join("");
});

// CLICK SUGGESTION
suggestions.addEventListener("click", (e) => {
  if (!e.target.classList.contains("suggest-item")) return;

  const keyword = e.target.textContent;

  searchInput.value = keyword;

  suggestions.innerHTML = "";

  performSearch(keyword);
});

// ENTER SEARCH
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    performSearch(searchInput.value);
  }
});

// SEARCH FUNCTION
async function performSearch(query) {
  if (query.length < 1) return;

  results.innerHTML = "Searching...";

  try {
    const placeRes = await fetch(`/api/search?q=${query}`);
    const places = await placeRes.json();

    const historyRes = await fetch(`/api/history?q=${query}`);
    const history = await historyRes.json();

    let html = "";

    // ===== TEMPAT =====
    if (places.length > 0) {
      html += "<h2>Places in Seattle</h2>";

      html += places
        .map(
          (place) => `

    <div class="result">

     <h3>${place.title}</h3>

     <p>${place.description}</p>

     <small>${place.location}</small>

    </div>

   `,
        )
        .join("");
    }

    // ===== SEJARAH =====
    if (history.length > 0) {
      html += "<h2>History of Seattle</h2>";

      html += history
        .map(
          (item) => `

    <div class="result">

     <h3>${item.year} - ${item.title}</h3>

     <p>${item.description}</p>

    </div>

   `,
        )
        .join("");
    }

    if (html === "") {
      html = "<p>No results found.</p>";
    }

    results.innerHTML = html;
  } catch (err) {
    console.error(err);
    results.innerHTML = "Error loading results.";
  }
}
