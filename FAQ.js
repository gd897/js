var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    this.parentElement.classList.toggle("active");

    var pannel = this.nextElementSibling;

    if (pannel.style.display === "block") {
      // Efek saat menutup
      pannel.style.display = "none";
      pannel.style.opacity = "0";
      pannel.style.transform = "translateY(10px)";
    } else {
      // Efek saat membuka
      pannel.style.display = "block";

      // Gunakan timeout untuk memberi waktu properti `display` aktif dulu
      setTimeout(() => {
        pannel.style.opacity = "1";
        pannel.style.transform = "translateY(0)";
      }, 10); // Tambahkan sedikit delay untuk mengaktifkan animasi
    }
  });
}
