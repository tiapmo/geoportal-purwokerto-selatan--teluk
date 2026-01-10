// ===== NAVBAR FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdown = document.querySelector('.dropdown');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    // ===== MOBILE MENU TOGGLE =====
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // ===== MOBILE DROPDOWN TOGGLE =====
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileDropdown();
            }
        });
    }
    
    // ===== CLOSE MENUS WHEN CLICKING OUTSIDE =====
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            // Close dropdown if clicking outside
            if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-toggle')) {
                closeMobileDropdown();
            }
            
            // Close navbar if clicking outside
            if (!e.target.closest('.navbar') && !e.target.closest('.mobile-toggle')) {
                closeMobileMenu();
            }
        }
    });
    
    // ===== SET ACTIVE NAV ITEM =====
    setActiveNavItem();
    
    // ===== WINDOW RESIZE HANDLER =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            resetMobileMenu();
        }
        updateMapHeight();
    });
    
    // ===== INITIALIZE =====
    updateMapHeight();
    
    // ===== FUNCTION DEFINITIONS =====
    
    function toggleMobileMenu() {
        navbar.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Change icon
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.className = 'fas fa-times';
            mobileToggle.setAttribute('aria-label', 'Close navigation menu');
            // Close dropdown when opening menu
            closeMobileDropdown();
        } else {
            icon.className = 'fas fa-bars';
            mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    }
    
    function closeMobileMenu() {
        navbar.classList.remove('active');
        mobileToggle.classList.remove('active');
        
        if (mobileToggle) {
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fas fa-bars';
            mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    }
    
    function toggleMobileDropdown() {
        dropdown.classList.toggle('active');
        
        if (dropdownArrow) {
            if (dropdown.classList.contains('active')) {
                dropdownArrow.style.transform = 'rotate(180deg)';
            } else {
                dropdownArrow.style.transform = 'rotate(0deg)';
            }
        }
    }
    
    function closeMobileDropdown() {
        dropdown.classList.remove('active');
        if (dropdownArrow) {
            dropdownArrow.style.transform = 'rotate(0deg)';
        }
    }
    
    function resetMobileMenu() {
        // Reset mobile menu on desktop
        navbar.classList.remove('active');
        dropdown.classList.remove('active');
        
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fas fa-bars';
            mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        }
        
        if (dropdownArrow) {
            dropdownArrow.style.transform = 'rotate(0deg)';
        }
    }
});

// ===== SET ACTIVE NAVIGATION ITEM =====
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Reset all active states
    navLinks.forEach(link => link.classList.remove('active'));
    dropdownItems.forEach(item => item.classList.remove('active'));
    
    // Check each nav link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== 'javascript:void(0)') {
            // Handle relative paths
            const linkPath = href.startsWith('../') ? href : '../' + href;
            if (currentPath.includes(linkPath) || 
                (href === '../' && (currentPath.endsWith('/') || currentPath.includes('index.html')))) {
                link.classList.add('active');
            }
        }
    });
    
    // Check dropdown items
    dropdownItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href)) {
            item.classList.add('active');
            // Also highlight parent dropdown
            const parentDropdown = item.closest('.dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector('.nav-link');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
        }
    });
}

// ===== UPDATE MAP HEIGHT FUNCTION =====
function updateMapHeight() {
    const mapContainer = document.querySelector('.map-container');
    const header = document.querySelector('.header');
    
    if (mapContainer && header) {
        const headerHeight = header.offsetHeight;
        const mapHeight = window.innerHeight - headerHeight;
        
        mapContainer.style.height = `${mapHeight}px`;
        
        // Force Leaflet map to resize
        if (typeof map !== 'undefined' && map.invalidateSize) {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    }
}

// Export functions for global access
window.navbarFunctions = {
    setActiveNavItem,
    updateMapHeight
};
