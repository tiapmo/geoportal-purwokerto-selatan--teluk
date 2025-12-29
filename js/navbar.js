// File: js/navbar.js
function loadNavbar() {
    const navbarHTML = `
        <nav class="navbar">
            <div class="navbar-container">
                <div class="navbar-brand">
                    <div class="logo-kecamatan-small">
                        <img src="../img/logo_pwtsel.png" alt="Logo Kecamatan Purwokerto Selatan">
                    </div>
                    <div class="navbar-title">
                        <h1>Geoportal</h1>
                        <p>Data Spasial Digital</p>
                    </div>
                </div>
                
                <div class="navbar-menu">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="../" class="nav-link">
                                <i class="fas fa-home"></i>
                                <span>Beranda</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../Kecamatan/" class="nav-link">
                                <i class="fas fa-map"></i>
                                <span>Peta Kecamatan</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../teluk/" class="nav-link">
                                <i class="fas fa-water"></i>
                                <span>Peta Desa Teluk</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../tentang/" class="nav-link">
                                <i class="fas fa-info-circle"></i>
                                <span>Tentang Kami</span>
                            </a>
                        </li>
                    </ul>
                    
                    <div class="mobile-menu-btn">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
                
                <div class="mobile-menu">
                    <div class="mobile-menu-header">
                        <div class="mobile-menu-logo">
                            <img src="../img/logo_pwtsel.png" alt="Logo Kecamatan">
                            <div>
                                <h3>Geoportal</h3>
                                <p>Data Spasial Digital</p>
                            </div>
                        </div>
                        <div class="mobile-menu-close">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                    <ul class="mobile-nav">
                        <li>
                            <a href="../">
                                <i class="fas fa-home"></i>
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a href="../Kecamatan/">
                                <i class="fas fa-map"></i>
                                Peta Kecamatan
                            </a>
                        </li>
                        <li>
                            <a href="../teluk/">
                                <i class="fas fa-water"></i>
                                Peta Desa Teluk
                            </a>
                        </li>
                        <li>
                            <a href="../tentang/">
                                <i class="fas fa-info-circle"></i>
                                Tentang Kami
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    // Insert navbar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Add CSS styles
    const navbarCSS = `
        <style>
        .navbar {
            background: linear-gradient(135deg, #1A5276 0%, #2C3E50 100%);
            color: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            position: sticky;
            top: 0;
            z-index: 1000;
            padding: 0 20px;
            border-bottom: 3px solid #3498DB;
        }
        
        .navbar-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
        }
        
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 15px;
            text-decoration: none;
        }
        
        .logo-kecamatan-small {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            overflow: hidden;
            background: white;
            padding: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border: 2px solid #3498DB;
        }
        
        .logo-kecamatan-small img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        
        .navbar-title h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            color: white;
            font-family: 'Poppins', sans-serif;
        }
        
        .navbar-title p {
            font-size: 0.8rem;
            margin: 0;
            color: rgba(255, 255, 255, 0.8);
            font-family: 'Poppins', sans-serif;
        }
        
        .navbar-menu {
            display: flex;
            align-items: center;
        }
        
        .navbar-nav {
            display: flex;
            list-style: none;
            gap: 10px;
            margin: 0;
            padding: 0;
        }
        
        .nav-item {
            position: relative;
        }
        
        .nav-link {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            font-weight: 500;
            border-radius: 25px;
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .nav-link:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .nav-link i {
            font-size: 1.1rem;
        }
        
        .nav-link span {
            font-size: 0.95rem;
        }
        
        .nav-link.active {
            background: #3498DB;
            border-color: #3498DB;
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }
        
        .mobile-menu-btn {
            display: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: white;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
        }
        
        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #1A5276;
            z-index: 2000;
            padding: 20px;
        }
        
        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .mobile-menu-logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .mobile-menu-logo img {
            width: 50px;
            height: 50px;
            background: white;
            padding: 5px;
            border-radius: 8px;
        }
        
        .mobile-menu-logo h3 {
            margin: 0;
            color: white;
            font-size: 1.3rem;
        }
        
        .mobile-menu-logo p {
            margin: 0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
        }
        
        .mobile-menu-close {
            font-size: 1.5rem;
            cursor: pointer;
            color: white;
            padding: 10px;
        }
        
        .mobile-nav {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .mobile-nav li {
            margin-bottom: 15px;
        }
        
        .mobile-nav a {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            color: white;
            text-decoration: none;
            font-size: 1.1rem;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        .mobile-nav a:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
            .navbar-nav {
                display: none;
            }
            
            .mobile-menu-btn {
                display: block;
            }
            
            .navbar-container {
                padding: 8px 0;
            }
            
            .logo-kecamatan-small {
                width: 40px;
                height: 40px;
            }
            
            .navbar-title h1 {
                font-size: 1.3rem;
            }
            
            .navbar-title p {
                font-size: 0.7rem;
            }
        }
        
        @media (max-width: 480px) {
            .navbar {
                padding: 0 10px;
            }
            
            .navbar-title h1 {
                font-size: 1.2rem;
            }
            
            .navbar-title p {
                display: none;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', navbarCSS);
    
    // Initialize navbar functionality
    initializeNavbar();
}

function initializeNavbar() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Highlight active page
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove trailing slashes for comparison
        const cleanCurrentPage = currentPage.replace(/\/$/, '');
        const cleanLinkHref = linkHref.replace(/\/$/, '');
        
        // Check if current page matches link
        if (cleanCurrentPage.includes(cleanLinkHref.replace('../', '')) || 
            (cleanCurrentPage === '' && cleanLinkHref === '../')) {
            link.classList.add('active');
        }
    });
}

// Load navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}
