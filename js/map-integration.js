/**
 * map-integration.js - Fungsi untuk integrasi dengan peta Leaflet
 * Hanya digunakan di halaman peta (Kecamatan dan Desa Teluk)
 */

// ===== MAP CONFIGURATION =====
const MAP_CONFIG = {
    defaultCenter: [-7.4417, 109.2385], // Purwokerto Selatan
    defaultZoom: 13,
    minZoom: 10,
    maxZoom: 19,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileAttribution: '© OpenStreetMap contributors',
    mapboxToken: null // Jika menggunakan Mapbox, tambahkan token di sini
};

// ===== MAP FUNCTIONS =====

/**
 * Parse URL parameters
 */
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    
    if (!queryString) return params;
    
    queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    });
    
    return params;
}

/**
 * Initialize Leaflet map
 */
function initMap() {
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        console.error('❌ Leaflet library not loaded');
        return null;
    }
    
    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('❌ Map container (#map) not found');
        return null;
    }
    
    // Get URL parameters
    const params = getUrlParams();
    
    // Determine center and zoom from URL or use defaults
    const center = params.lat && params.lng ? 
        [parseFloat(params.lat), parseFloat(params.lng)] : 
        MAP_CONFIG.defaultCenter;
    
    const zoom = params.zoom ? parseInt(params.zoom) : MAP_CONFIG.defaultZoom;
    
    // Create map
    const map = L.map('map', {
        center: center,
        zoom: zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: true
    });
    
    // Add tile layer
    L.tileLayer(MAP_CONFIG.tileLayer, {
        attribution: MAP_CONFIG.tileAttribution,
        maxZoom: MAP_CONFIG.maxZoom
    }).addTo(map);
    
    console.log('🗺️ Map initialized at:', center, 'zoom:', zoom);
    
    // Add marker if coordinates provided in URL
    if (params.lat && params.lng && params.place) {
        addPlaceMarker(map, params.lat, params.lng, params.place);
        
        // Zoom to marker
        map.setView([params.lat, params.lng], zoom);
    }
    
    return map;
}

/**
 * Add custom marker to map
 */
function addPlaceMarker(map, lat, lng, title, description = '') {
    if (!map || typeof L === 'undefined') return null;
    
    // Custom marker icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-container">
                <div class="marker-pin"></div>
                <div class="marker-label">${title}</div>
            </div>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -36]
    });
    
    // Create marker
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    
    // Add popup
    const popupContent = `
        <div class="map-popup">
            <h4>${title}</h4>
            ${description ? `<p>${description}</p>` : ''}
            <div class="popup-coords">
                <small>Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}</small>
            </div>
        </div>
    `;
    
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
    });
    
    // Open popup if this is from URL
    if (window.location.search.includes('place=')) {
        marker.openPopup();
    }
    
    console.log(`📍 Marker added: ${title} (${lat}, ${lng})`);
    return marker;
}

/**
 * Add multiple markers from data
 */
function addMultipleMarkers(map, markersData) {
    if (!map || !Array.isArray(markersData)) return [];
    
    const markers = [];
    markersData.forEach(data => {
        const marker = addPlaceMarker(
            map, 
            data.lat, 
            data.lng, 
            data.title, 
            data.description
        );
        if (marker) markers.push(marker);
    });
    
    return markers;
}

/**
 * Fit map bounds to show all markers
 */
function fitMapToMarkers(map, markers) {
    if (!map || !markers || markers.length === 0) return;
    
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
}

/**
 * Add map controls
 */
function addMapControls(map) {
    if (!map) return;
    
    // Add scale control
    L.control.scale({ imperial: false }).addTo(map);
    
    // Add fullscreen control (jika library tersedia)
    if (typeof L.control.fullscreen !== 'undefined') {
        L.control.fullscreen().addTo(map);
    }
    
    // Add locate control
    if (typeof L.control.locate !== 'undefined') {
        L.control.locate({
            position: 'topright',
            strings: {
                title: "Tunjukkan lokasi saya"
            }
        }).addTo(map);
    }
    
    // Add layer control jika ada multiple layers
    const baseLayers = {
        "OpenStreetMap": L.tileLayer(MAP_CONFIG.tileLayer, {
            attribution: MAP_CONFIG.tileAttribution
        })
    };
    
    L.control.layers(baseLayers).addTo(map);
}

/**
 * Initialize all map functionality
 */
function initMapIntegration() {
    console.log('🗺️ Initializing map integration...');
    
    // Cek apakah halaman ini membutuhkan peta
    const hasMap = document.getElementById('map');
    if (!hasMap) {
        console.log('ℹ️ No map on this page');
        return;
    }
    
    // Tunggu hingga Leaflet dimuat (jika dimuat secara async)
    if (typeof L === 'undefined') {
        console.warn('⚠️ Leaflet not loaded yet, waiting...');
        
        // Cek setiap 500ms sampai Leaflet tersedia
        const checkLeaflet = setInterval(() => {
            if (typeof L !== 'undefined') {
                clearInterval(checkLeaflet);
                initMapIntegration();
            }
        }, 500);
        
        return;
    }
    
    // Initialize map
    const map = initMap();
    
    if (map) {
        // Add controls
        addMapControls(map);
        
        // Example: Add some sample markers (bisa dihapus atau disesuaikan)
        const sampleMarkers = [
            {
                lat: -7.4417,
                lng: 109.2385,
                title: "Masjid Jami' Purwokerto",
                description: "Masjid tertua di Purwokerto"
            },
            {
                lat: -7.4432,
                lng: 109.2401,
                title: "Museum BRI",
                description: "Museum sejarah perbankan"
            }
        ];
        
        const markers = addMultipleMarkers(map, sampleMarkers);
        
        // Fit map to markers jika ada lebih dari 1
        if (markers.length > 1) {
            fitMapToMarkers(map, markers);
        }
        
        console.log('✅ Map integration initialized');
    }
}

// ===== EXPORT =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MAP_CONFIG,
        initMap,
        addPlaceMarker,
        initMapIntegration
    };
}

// ===== EXECUTE =====
document.addEventListener('DOMContentLoaded', initMapIntegration);

// Juga coba saat window load untuk memastikan
window.addEventListener('load', function() {
    // Jika map belum diinisialisasi, coba lagi
    if (!window.mapInitialized) {
        initMapIntegration();
        window.mapInitialized = true;
    }
});
