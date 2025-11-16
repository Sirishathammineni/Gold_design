// ====== Simulated Live Gold Rate ======
let baseGoldRate = 12415;
const rateElement = document.getElementById("gold-rate");

function updateGoldRate() {
  const change = (Math.random() * 40 - 20).toFixed(2); // ±20 fluctuation
  baseGoldRate = Math.max(6000, baseGoldRate + parseFloat(change));
  rateElement.textContent = `Current Gold Rate: ₹${baseGoldRate.toLocaleString()} per gram`;
}

// Update every 5 seconds
setInterval(updateGoldRate, 5000);
updateGoldRate();

// ====== Load Dataset ======
async function loadDataset() {
  try {
    const response = await fetch("dataset.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error loading dataset:", err);
    alert("Unable to load dataset.");
    return [];
  }
}

// ====== Display Designs ======
function displayDesigns(designs, rate) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (designs.length === 0) {
    container.innerHTML = `<p style="text-align:center;">No designs found within this range.</p>`;
    return;
  }

  designs.forEach((item) => {
    const price = (item.weight * rate).toFixed(2);
    const card = document.createElement("div");
    card.classList.add("design-card");
    card.innerHTML = `
      <img src="${item.image_url}" alt="${item.name}">
      <div class="design-info">
        <h3>${item.name}</h3>
        <p>Category: ${item.category}</p>
        <p>Weight: ${item.weight} g</p>
        <p class="price">Estimated Price: ₹${price.toLocaleString()}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// ====== Filter Function ======
async function filterDesigns() {
  const weightInput = document.getElementById("weight").value;
  const categoryInput = document.getElementById("category").value;
  const dataset = await loadDataset();

  if (!weightInput) {
    alert("Please enter a weight!");
    return;
  }

  const filtered = dataset.filter((item) => {
    const weightMatch = parseFloat(item.weight) <= parseFloat(weightInput);
    const categoryMatch = categoryInput === "all" || item.category === categoryInput;
    return weightMatch && categoryMatch;
  });

  displayDesigns(filtered, baseGoldRate);
}

document.getElementById("search-btn").addEventListener("click", filterDesigns);

// ====== Ads Slideshow ======
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active-dot"));

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active-dot");

  setTimeout(showSlides, 3000); // Change slide every 3 seconds
}
