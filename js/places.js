/**
 * places.js - Fungsi khusus untuk Tempat Bersejarah
 * Hanya digunakan di halaman beranda
 */

// ===== DATA TEMPAT BERSEJARAH =====
const HISTORICAL_PLACES = [
    {
        id: 'masjid-jami',
        name: "Masjid Jami' Purwokerto",
        lat: -7.4417,
        lng: 109.2385,
        address: "Jl. Masjid No. 1, Kelurahan Karangreja",
        year: 1875,
        category: "Sejarah",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Masjid tertua di Purwokerto yang dibangun pada tahun 1875 dengan arsitektur perpaduan Jawa dan Arab.",
        tags: ["Cagar Budaya", "Tempat Ibadah"],
        link: "teluk/?lat=-7.4417&lng=109.2385&zoom=16&place=Masjid%20Jami%27%20Purwokerto"
    },
    {
        id: 'museum-bri',
        name: "Museum Bank Rakyat Indonesia",
        lat: -7.4432,
        lng: 109.2401,
        address: "Jl. Jend. Sudirman No. 45",
        year: 1992,
        category: "Museum",
        image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Museum yang menyimpan sejarah perbankan di Indonesia dengan koleksi uang kuno dan artefak perbankan.",
        tags: ["Edukasi", "Sejarah Perbankan"],
        link: "teluk/?lat=-7.4432&lng=109.2401&zoom=16&place=Museum%20BRI"
    },
    {
        id: 'taman-andhang',
        name: "Taman Andhang Pangrenan",
        lat: -7.4398,
        lng: 109.2352,
        address: "Jl. Taman Andhang Pangrenan",
        year: 1920,
        category: "Taman",
        image: "https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Taman kota bersejarah yang menjadi ruang terbuka hijau dan tempat rekreasi keluarga sejak era kolonial.",
        tags: ["Rekreasi", "Ruang Terbuka"],
        link: "teluk/?lat=-7.4398&lng=109.2352&zoom=16&place=Taman%20Andhang%20Pangrenan"
    },
    {
        id: 'stasiun-purwokerto',
        name: "Stasiun Purwokerto",
        lat: -7.4465,
        lng: 109.2428,
        address: "Jl. Stasiun No. 1",
        year: 1915,
        category: "Transportasi",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Stasiun kereta api besar yang dibangun tahun 1915, menjadi pusat transportasi penting di jalur selatan Jawa.",
        tags: ["Stasiun", "Transportasi"],
        link: "teluk/?lat=-7.4465&lng=109.2428&zoom=16&place=Stasiun%20Purwokerto"
    }
];

// ===== PLACES FUNCTIONS =====

/**
 * Track klik pada tempat bersejarah
 */
function trackPlaceClick(placeName) {
    console.log(`📍 Place clicked: ${placeName}`);
    
    // Simpan ke localStorage untuk analytics
    try {
        const history = JSON.parse(localStorage.getItem('placeClicks') || '[]');
        history.push({
            place: placeName,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
        
        // Keep only last 50 items
        if (history.length > 50) history.shift();
        localStorage.setItem('placeClicks', JSON.stringify(history));
    } catch (e) {
        console.warn('Could not save place click:', e);
    }
    
    // Google Analytics jika tersedia
    if (typeof gtag === 'function') {
        gtag('event', 'place_click', {
            'event_category': 'Historical Places',
            'event_label': placeName
        });
    }
}

/**
 * Preload gambar untuk performa
 */
function preloadPlaceImages() {
    const imageUrls = HISTORICAL_PLACES.map(place => place.image);
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        
        img.onload = () => {
            console.log(`🖼️ Preloaded: ${url}`);
        };
    });
}

/**
 * Setup tooltips untuk tempat
 */
function setupPlaceTooltips() {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'place-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: var(--primary, #1A5276);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 250px;
        text-align: center;
        white-space: nowrap;
    `;
    document.body.appendChild(tooltip);
    
    // Setup tooltip for address links
    document.querySelectorAll('.address-link').forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            tooltip.textContent = 'Klik untuk melihat di peta desa';
            positionTooltip(tooltip, e);
        });
        
        link.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        });
        
        link.addEventListener('mousemove', (e) => positionTooltip(tooltip, e));
    });
}

/**
 * Position tooltip
 */
function positionTooltip(tooltip, event) {
    tooltip.style.left = (event.pageX + 15) + 'px';
    tooltip.style.top = (event.pageY + 15) + 'px';
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
}

/**
 * Setup card hover effects
 */
function setupCardEffects() {
    const placeCards = document.querySelectorAll('.place-card, .feature-card');
    
    placeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-subtle)';
        });
    });
}

/**
 * Setup click tracking untuk semua tempat
 */
function setupPlaceTracking() {
    document.querySelectorAll('.address-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Dapatkan nama tempat dari elemen terdekat
            const card = this.closest('.feature-card, .place-card');
            const placeName = card?.querySelector('h4')?.textContent || 'Unknown Place';
            
            trackPlaceClick(placeName);
            
            // Optional: Tambahkan loading state
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });
}

/**
 * Setup animasi scroll untuk cards
 */
function setupScrollAnimations() {
    const placeCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, { threshold: 0.1 });
    
    placeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Inisialisasi semua fungsi tempat bersejarah
 */
function initPlaces() {
    console.log('🏛️ Initializing historical places...');
    
    // Cek apakah halaman ini memiliki fitur tempat bersejarah
    const hasPlaces = document.querySelector('.feature-card, .historical-places, .address-link');
    if (!hasPlaces) {
        console.log('ℹ️ No historical places on this page');
        return;
    }
    
    // Preload gambar
    preloadPlaceImages();
    
    // Setup tooltips
    setupPlaceTooltips();
    
    // Setup card effects
    setupCardEffects();
    
    // Setup click tracking
    setupPlaceTracking();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    console.log(`✅ ${HISTORICAL_PLACES.length} historical places initialized`);
}

// ===== EXPORT =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HISTORICAL_PLACES,
        trackPlaceClick,
        initPlaces
    };
}

// ===== EXECUTE =====
document.addEventListener('DOMContentLoaded', initPlaces);
