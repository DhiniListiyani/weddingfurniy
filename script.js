document.addEventListener('DOMContentLoaded', function() {
    const openInvitationButton = document.getElementById('openInvitationButton');
    const introOverlay = document.getElementById('introOverlay');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');

    // Pastikan tombol 'Open Invitation' dan overlay ada sebelum menambahkan event listener
    if (openInvitationButton && introOverlay && mainContent) {
        openInvitationButton.addEventListener('click', function() {
            introOverlay.classList.add('fade-out'); // Tambahkan kelas untuk efek fade-out
            setTimeout(() => {
                introOverlay.style.display = 'none'; // Sembunyikan overlay setelah fade-out
                mainContent.classList.add('visible'); // Tampilkan konten utama
                
                // Putar musik secara otomatis
                if (bgMusic) {
                    bgMusic.play().catch(error => {
                        console.log("Autoplay was prevented:", error);
                        // Opsional: beritahu user jika autoplay gagal
                        // alert("Musik tidak dapat diputar otomatis. Silakan refresh atau klik di mana saja.");
                    });
                }
            }, 1000); // Sesuaikan durasi ini dengan transisi CSS Anda (misal: 1000ms = 1 detik)
        });
    }

    // --- Countdown Logic ---
    // Tanggal pernikahan (tahun, bulan-1, hari, jam, menit, detik)
    // Ingat bulan di JavaScript berbasis 0 (Januari=0, Oktober=9)
    // Untuk 11 Oktober 2025, 15:00:00 WIB
    const weddingDate = new Date("2025-10-11T15:00:00+07:00").getTime(); // Menggunakan ISO 8601 dengan offset WIB (+07:00)

    const countdownDays = document.getElementById("countdown-days");
    const countdownHours = document.getElementById("countdown-hours");
    const countdownMinutes = document.getElementById("countdown-minutes");
    const countdownSeconds = document.getElementById("countdown-seconds");

    // Hanya jalankan jika semua elemen countdown ditemukan
    if (countdownDays && countdownHours && countdownMinutes && countdownSeconds) {
        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            // Jika tanggal pernikahan sudah terlewati
            if (distance < 0) {
                clearInterval(updateCountdown);
                // Atur semua menjadi "00"
                countdownDays.textContent = "00";
                countdownHours.textContent = "00";
                countdownMinutes.textContent = "00";
                countdownSeconds.textContent = "00";
                // Tampilkan pesan di dalam div countdown
                document.getElementById('countdown').innerHTML = '<p style="color: #A38C7D; font-size: 1.2em; margin-top: 10px;">Kami Telah Menikah!</p>';
                return; // Hentikan fungsi
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Tampilkan angka dengan format dua digit (misal: 05, 12)
            countdownDays.textContent = String(days).padStart(2, '0');
            countdownHours.textContent = String(hours).padStart(2, '0');
            countdownMinutes.textContent = String(minutes).padStart(2, '0');
            countdownSeconds.textContent = String(seconds).padStart(2, '0');

        }, 1000);
    }

    // --- Gallery Logic ---
    const galleryImages = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg"]; // Tambahkan/sesuaikan nama file gambar Anda
    let currentImageIndex = 0;
    const carouselImage = document.getElementById("carouselImage");

    if (carouselImage && galleryImages.length > 0) {
        // Set gambar pertama saat dimuat
        carouselImage.src = galleryImages[currentImageIndex];

        window.prevImage = function() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            carouselImage.src = galleryImages[currentImageIndex];
        };

        window.nextImage = function() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            carouselImage.src = galleryImages[currentImageIndex];
        };
    }
});