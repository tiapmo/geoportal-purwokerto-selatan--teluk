// ===== DATA GEOJSON SEMENTARA =====
// nanti ganti dengan file GeoJSON hasil export QGIS
var geojsonKecamatan = {};  // isi dengan data GeoJSON kecamatan
var geojsonTeluk = {};      // isi dengan data GeoJSON desa

// ===== FUNGSI INISIALISASI MAP =====
function initMap(mapId, geojsonData, center, zoom=13) {
    // tampilkan div map
    var mapDiv = document.getElementById(mapId);
    mapDiv.style.display = 'block';

    // buat map
    var map = L.map(mapId).setView(center, zoom);

    // tambahkan tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // tambahkan GeoJSON
    L.geoJSON(geojsonData, {
        style: {
            color: "#2ecc71",
            weight: 2,
            opacity: 0.7,
            fillOpacity: 0.2
        }
    }).addTo(map);
}

// ===== EVENT CLICK CARD =====
document.getElementById('preview-kecamatan').addEventListener('click', function() {
    this.style.display = 'none';
    initMap('map-kecamatan', geojsonKecamatan, [-7.43, 109.23], 13); // ganti koordinat sesuai pusat kecamatan
});

document.getElementById('preview-teluk').addEventListener('click', function() {
    this.style.display = 'none';
    initMap('map-teluk', geojsonTeluk, [-7.43, 109.23], 15); // ganti koordinat sesuai desa
});
