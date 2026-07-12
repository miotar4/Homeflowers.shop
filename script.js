// ==========================================
// HOME FLOWERS SHOP - INTERACTIVE LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU TOGGLE ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle icon bars to xmark
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // --- 2. CATEGORY CAROUSEL SCROLL ---
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselWrapper = document.querySelector('.carousel-wrapper');

    if (carouselTrack && prevBtn && nextBtn && carouselWrapper) {
        // Scroll amount based on category card width
        const getScrollAmount = () => {
            const firstCard = carouselTrack.querySelector('.category-card');
            return firstCard ? firstCard.clientWidth + 24 : 300; // card width + gap
        };

        nextBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carouselWrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // --- 3. SHOPPING CART LOGIC ---
    let cart = [];
    const cartTrigger = document.getElementById('cartTrigger');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const cartBadge = document.getElementById('cartBadge');
    
    // Toggle Cart Drawer
    const toggleCart = () => {
        cartDrawer.classList.toggle('open');
    };

    if (cartTrigger) cartTrigger.addEventListener('click', toggleCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', toggleCart);
    if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', toggleCart);

    // Add to Cart Handlers
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const id = productCard.getAttribute('data-id');
            const name = productCard.getAttribute('data-name');
            const price = parseFloat(productCard.getAttribute('data-price'));
            const img = productCard.getAttribute('data-img');

            addItemToCart(id, name, price, img);
            
            // Animation effect on badge
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);

            // Open cart after adding
            cartDrawer.classList.add('open');
        });
    });

    const addItemToCart = (id, name, price, img) => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }
        updateCartUI();
    };

    const updateCartUI = () => {
        // Update Badge Count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;

        // Clear items container
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>ยังไม่มีสินค้าในตะกร้า</p>
                </div>
            `;
            cartTotalAmount.textContent = '฿0';
            return;
        }

        // Render items
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">฿${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="qty-btn dec-qty" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn inc-qty" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <button class="cart-item-remove remove-btn" data-id="${item.id}" aria-label="Remove item">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Calculate Total
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalAmount.textContent = `฿${totalPrice.toLocaleString()}`;

        // Add event listeners to newly created buttons
        addCartControlsListeners();
    };

    const addCartControlsListeners = () => {
        // Increase Qty
        document.querySelectorAll('.inc-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.qty-btn').getAttribute('data-id');
                const item = cart.find(i => i.id === id);
                if (item) item.quantity += 1;
                updateCartUI();
            });
        });

        // Decrease Qty
        document.querySelectorAll('.dec-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.qty-btn').getAttribute('data-id');
                const item = cart.find(i => i.id === id);
                if (item) {
                    item.quantity -= 1;
                    if (item.quantity === 0) {
                        cart = cart.filter(i => i.id !== id);
                    }
                }
                updateCartUI();
            });
        });

        // Remove Item
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.cart-item-remove').getAttribute('data-id');
                cart = cart.filter(i => i.id !== id);
                updateCartUI();
            });
        });
    };

    // --- 4. LOGIN / REGISTER MODAL LOGIC ---
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    const toggleModal = () => {
        loginModal.classList.toggle('open');
    };

    if (loginBtn) loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal();
    });
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', toggleModal);
    if (modalOverlay) modalOverlay.addEventListener('click', toggleModal);

    // Switch Tabs
    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }

    // Mock Login Submit
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('loginEmail').value;
            alert(`เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับคุณ ${emailInput}`);
            toggleModal();
            // Change top bar text to username
            if (loginBtn) {
                loginBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> สวัสดี, ${emailInput.split('@')[0]}`;
            }
        });
    }

    // Mock Register Submit
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regName = document.getElementById('regName').value;
            alert(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${regName}`);
            toggleModal();
        });
    }

    // Sticky Navbar shadow effect on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(110, 138, 120, 0.12)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-soft)';
        }
    });
});
