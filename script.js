// Efek fade-in saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease-in-out";
    document.body.style.opacity = 1;
  }, 100);

  // Tampilkan menu & pencarian
  const dataMenu = menuData; // Ambil dari data.js
  tampilkanMenu(dataMenu);
  setupPencarian(dataMenu);
});

// Highlight menu saat scroll (jika pakai section dengan ID)
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Tampilkan menu sesuai data
function tampilkanMenu(data) {
  const container = document.getElementById("menuContainer");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Belum ada menu tersedia.</p>";
    return;
  }

  // Urutkan makanan dulu, lalu minuman, lalu abjad
  const makanan = data
    .filter(item => item.kategori === "makanan")
    .sort((a, b) => a.nama.localeCompare(b.nama));

  const minuman = data
    .filter(item => item.kategori === "minuman")
    .sort((a, b) => a.nama.localeCompare(b.nama));

  const gabungan = [...makanan, ...minuman];

  gabungan.forEach(item => {
    const div = document.createElement("div");
    div.className = `menu-item ${item.kategori}`;
    div.textContent = `${item.kategori === "minuman" ? "🍹" : "🍽"} ${item.nama} – ${item.harga}`;
    container.appendChild(div);
  });
}

// Filter kategori
function filterMenu(category) {
  let filteredData;
  if (category === "all") {
    filteredData = menuData;
  } else {
    filteredData = menuData.filter(item => item.kategori === category);
  }

  tampilkanMenu(filteredData);
}

// Setup pencarian
function setupPencarian(data) {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const hasil = data.filter(item =>
      item.nama.toLowerCase().includes(keyword)
    );
    tampilkanMenu(hasil);
  });
}