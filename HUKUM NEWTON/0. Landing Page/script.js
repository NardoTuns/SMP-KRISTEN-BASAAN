document.addEventListener("DOMContentLoaded", function() {
    
    // Pilih semua tombol materi
    const buttons = document.querySelectorAll('.topic-button');
    
    // Beri delay animasi yang berbeda untuk setiap tombol
    buttons.forEach((button, index) => {
        // Atur delay animasi (misal: 0.1s, 0.15s, 0.2s, dst.)
        button.style.animationDelay = `${index * 0.05}s`;
    });

});
