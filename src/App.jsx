import { useState, useEffect } from 'react'

// Helper Component for Image Placeholders
function ImagePlaceholder({ height, text }) {
  return (
    <div 
      className="d-flex align-items-center justify-content-center bg-light text-secondary rounded-4 border border-secondary-subtle border-2" 
      style={{ height: height || '240px', borderStyle: 'dashed !important' }}
    >
      <div className="text-center p-3">
        <i className="bi bi-image fs-1 d-block mb-2 text-muted"></i>
        <span className="d-block small text-uppercase tracking-wider fw-semibold text-muted">
          {text || 'ใส่รูปภาพที่นี่'}
        </span>
        <span className="d-block xx-small text-muted mt-1" style={{ fontSize: '0.75rem' }}>
          (คลิกแก้ไขโค้ดเพื่อใส่รูปภาพของคุณ)
        </span>
      </div>
    </div>
  )
}

function App() {
  // --- STATE ---
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState('login')
  const [user, setUser] = useState(null)
  
  // Form States
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regPassword, setRegPassword] = useState('')

  // Sticky Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('main-navbar')
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('shadow')
        } else {
          navbar.classList.remove('shadow')
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // --- PRODUCTS DATA ---
  const products = [
    {
      id: '1',
      name: 'ช่อดอกลาเวนเดอร์แห้งพรีเมียม',
      category: 'ดอกไม้แห้ง',
      price: 450,
      badge: 'ขายดี',
      rating: 5,
      reviews: 24,
      placeholderText: 'รูปช่อดอกลาเวนเดอร์แห้ง (280x280)'
    },
    {
      id: '2',
      name: 'ช่อดอกทิวลิปประดิษฐ์สไตล์เกาหลี',
      category: 'ดอกไม้ประดิษฐ์',
      price: 390,
      badge: 'ใหม่',
      rating: 4,
      reviews: 18,
      placeholderText: 'รูปช่อดอกทิวลิปประดิษฐ์ (280x280)'
    },
    {
      id: '3',
      name: 'เซ็ตกล่องของขวัญดอกไม้กุหลาบและเทียนหอม',
      category: 'ของขวัญ',
      price: 750,
      badge: 'แนะนำ',
      rating: 5,
      reviews: 32,
      placeholderText: 'รูปเซ็ตของขวัญกุหลาบ (280x280)'
    },
    {
      id: '4',
      name: 'ช่อไฮเดรนเยียแห้งแนววินเทจ',
      category: 'ดอกไม้แห้ง',
      price: 590,
      badge: 'ขายดี',
      rating: 4,
      reviews: 15,
      placeholderText: 'รูปช่อไฮเดรนเยียแห้ง (280x280)'
    }
  ]

  // --- CART OPERATIONS ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id)
      if (existing) {
        return prevCart.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    setCartOpen(true) // auto open cart drawer
  }

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      }).filter(Boolean)
    )
  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartBadgeCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // --- MOCK AUTH ---
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (loginEmail) {
      setUser({ email: loginEmail, name: loginEmail.split('@')[0] })
      alert(`เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับคุณ ${loginEmail}`)
      setLoginModalOpen(false)
      // reset form
      setLoginEmail('')
      setLoginPassword('')
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (regName && regEmail) {
      setUser({ email: regEmail, name: regName })
      alert(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${regName}`)
      setLoginModalOpen(false)
      // reset form
      setRegName('')
      setRegEmail('')
      setRegPhone('')
      setRegPassword('')
    }
  }

  const handleLogout = () => {
    setUser(null)
    alert('ออกจากระบบเรียบร้อยแล้ว')
  }

  return (
    <div style={{ backgroundColor: '#FAF8F6', color: '#2A332E', minHeight: '100vh' }}>
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-dark text-light-emphasis py-2" style={{ fontSize: '0.85rem' }}>
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex gap-3">
            <span><i className="bi bi-telephone text-success me-1"></i> 081-234-5678</span>
            <span className="text-secondary">|</span>
            <span><i className="bi bi-envelope text-success me-1"></i> contact@homeflowershop.com</span>
          </div>
          <div>
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white"><i className="bi bi-person-check text-success me-1"></i> สวัสดี, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-sm btn-outline-light py-0 border-0"
                  style={{ fontSize: '0.8rem' }}
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setModalTab('login'); setLoginModalOpen(true); }}
                className="text-light-emphasis text-decoration-none"
              >
                <i className="bi bi-person me-1"></i> เข้าสู่ระบบ / สมัครสมาชิก
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. HERO BANNER */}
      <header className="py-5 text-center text-white position-relative" 
        style={{ 
          background: 'linear-gradient(rgba(42, 51, 46, 0.7), rgba(42, 51, 46, 0.85))',
          paddingTop: '6rem !important',
          paddingBottom: '6rem !important'
        }}
      >
        {/* Placeholder label for Banner Image background */}
        <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex align-items-center justify-content-center" 
          style={{ zIndex: 0, opacity: 0.1, border: '2px dashed white', pointerEvents: 'none' }}>
          <span className="fs-3 fw-bold text-uppercase">[ ภาพพื้นหลังแบนเนอร์หลัก 1200 x 380 ]</span>
        </div>

        <div className="container position-relative py-5" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold font-serif mb-3" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}>
            Home Flowers Shop
          </h1>
          <p className="lead fw-light mb-4 text-white-50">
            ยินดีต้อนรับเข้าสู่ร้านค้าดอกไม้แห้งและดอกไม้ประดิษฐ์
          </p>
          <a href="#best-sellers" className="btn btn-lg px-4 rounded-pill btn-success" style={{ backgroundColor: '#6E8A78', borderColor: '#6E8A78' }}>
            เลือกชมสินค้า
          </a>
        </div>
      </header>

      {/* 3. STICKY NAVBAR */}
      <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom" style={{ height: '70px', transition: 'box-shadow 0.3s ease' }}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" href="#" style={{ fontFamily: "'Playfair Display', serif", color: '#4A5D51' }}>
            <i className="bi bi-flower1 text-success"></i> Home<span style={{ color: '#C28C7E' }}>Flowers</span>
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <a className="nav-link active fw-medium" aria-current="page" href="#">หน้าหลัก</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#categories">ดอกไม้แห้ง</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#categories">ดอกไม้ประดิษฐ์</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#categories">ของขวัญ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#how-to-buy">วิธีการสั่งซื้อ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="#how-to-buy">คำสั่งซื้อ</a>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <button 
                onClick={() => setCartOpen(true)}
                className="btn position-relative p-2" 
                style={{ color: '#4A5D51' }}
                aria-label="Open Shopping Cart"
              >
                <i className="bi bi-bag-heart-fill fs-3"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {cartBadgeCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. MAIN CONTENT */}
      <main className="container py-5">
        
        {/* SECTION: CATEGORIES ("แนะนำร้านค้า") */}
        <section id="categories" className="py-4">
          <div className="text-center mb-5">
            <h2 className="fw-semibold text-uppercase" style={{ color: '#4A5D51' }}>แนะนำร้านค้า</h2>
            <p className="text-muted">เลือกชมหมวดหมู่สินค้าที่จัดสรรเป็นพิเศษสำหรับคุณ</p>
            <hr className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#C28C7E', opacity: 1 }} />
          </div>

          <div className="row g-4 justify-content-center">
            {/* Category Card 1 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center p-3 bg-white">
                <ImagePlaceholder height="200px" text="ช่อแนะนำ (240x240)" />
                <div className="card-body pt-3 px-1 pb-0">
                  <h5 className="card-title fw-medium mb-0">ช่อแนะนำ</h5>
                </div>
              </div>
            </div>

            {/* Category Card 2 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center p-3 bg-white">
                <ImagePlaceholder height="200px" text="ดอกไม้แห้ง (240x240)" />
                <div className="card-body pt-3 px-1 pb-0">
                  <h5 className="card-title fw-medium mb-0">ดอกไม้แห้ง</h5>
                </div>
              </div>
            </div>

            {/* Category Card 3 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center p-3 bg-white">
                <ImagePlaceholder height="200px" text="ดอกไม้ประดิษฐ์ (240x240)" />
                <div className="card-body pt-3 px-1 pb-0">
                  <h5 className="card-title fw-medium mb-0">ดอกไม้ประดิษฐ์</h5>
                </div>
              </div>
            </div>

            {/* Category Card 4 */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center p-3 bg-white">
                <ImagePlaceholder height="200px" text="ของขวัญ (240x240)" />
                <div className="card-body pt-3 px-1 pb-0">
                  <h5 className="card-title fw-medium mb-0">ของขวัญ</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: BEST SELLERS ("รูปแบบช่อขายดี") */}
        <section id="best-sellers" className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-semibold text-uppercase" style={{ color: '#4A5D51' }}>รูปแบบช่อขายดี</h2>
            <p className="text-muted">สินค้าขายดีที่ลูกค้าชื่นชอบและสั่งซื้อมากที่สุด</p>
            <hr className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#C28C7E', opacity: 1 }} />
          </div>

          <div className="row g-4">
            {products.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative bg-white">
                  
                  {/* Badge */}
                  <span className="position-absolute top-0 start-0 m-3 badge rounded-pill py-2 px-3" 
                    style={{ 
                      backgroundColor: product.badge === 'ใหม่' ? '#6E8A78' : '#C28C7E', 
                      zIndex: 2,
                      fontSize: '0.85rem'
                    }}
                  >
                    {product.badge}
                  </span>

                  {/* Image Slot */}
                  <div className="p-3 bg-white">
                    <ImagePlaceholder height="220px" text={product.placeholderText} />
                  </div>

                  {/* Details */}
                  <div className="card-body d-flex flex-column pt-0 px-3 pb-3">
                    <span className="text-uppercase text-secondary fw-semibold mb-1" style={{ fontSize: '0.75rem' }}>
                      {product.category}
                    </span>
                    <h6 className="card-title fw-medium text-dark-emphasis mb-2 text-truncate" style={{ fontSize: '0.98rem' }} title={product.name}>
                      {product.name}
                    </h6>
                    
                    {/* Rating stars */}
                    <div className="d-flex text-warning small align-items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i className={`bi bi-star-fill me-1 ${i < product.rating ? 'text-warning' : 'text-secondary-subtle'}`} key={i}></i>
                      ))}
                      <span className="text-muted ms-1" style={{ fontSize: '0.75rem' }}>({product.reviews} รีวิว)</span>
                    </div>

                    {/* Footer Row */}
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold fs-5" style={{ color: '#A66E61' }}>
                        ฿{product.price}
                      </span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center p-2" 
                        style={{ width: '38px', height: '38px', color: '#6E8A78', borderColor: '#6E8A78' }}
                        aria-label="Add to Cart"
                      >
                        <i className="bi bi-cart-plus-fill"></i>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: STEPS ("วิธีการสั่งซื้อ") */}
        <section id="how-to-buy" className="py-5 mt-4">
          <div className="text-center mb-5">
            <h2 className="fw-semibold text-uppercase" style={{ color: '#4A5D51' }}>วิธีการสั่งซื้อง่ายๆ ใน 3 ขั้นตอน</h2>
            <p className="text-muted">การซื้อดอกไม้ตกแต่งบ้านหรือของขวัญพิเศษไม่เคยง่ายเท่านี้มาก่อน</p>
            <hr className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#C28C7E', opacity: 1 }} />
          </div>

          <div className="row g-4 text-center">
            {/* Step 1 */}
            <div className="col-12 col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <div className="d-inline-flex align-items-center justify-content-center bg-light text-success rounded-circle mb-4" style={{ width: '70px', height: '70px' }}>
                  <i className="bi bi-cart-check fs-2 text-success" style={{ color: '#6E8A78' }}></i>
                </div>
                <h5 className="fw-semibold mb-3" style={{ color: '#4A5D51' }}>1. เลือกสินค้าใส่ตะกร้า</h5>
                <p className="text-secondary small mb-0">เลือกสรรช่อดอกไม้แห้งหรือดอกไม้ประดิษฐ์ที่คุณประทับใจ แล้วกดเพิ่มลงในตะกร้าสินค้า</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <div className="d-inline-flex align-items-center justify-content-center bg-light text-success rounded-circle mb-4" style={{ width: '70px', height: '70px' }}>
                  <i className="bi bi-credit-card fs-2 text-success" style={{ color: '#6E8A78' }}></i>
                </div>
                <h5 className="fw-semibold mb-3" style={{ color: '#4A5D51' }}>2. ชำระเงินสะดวก</h5>
                <p className="text-secondary small mb-0">ทำการตรวจสอบรายการสินค้า กรอกข้อมูลการจัดส่ง และเลือกช่องทางชำระเงินที่ต้องการ</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <div className="d-inline-flex align-items-center justify-content-center bg-light text-success rounded-circle mb-4" style={{ width: '70px', height: '70px' }}>
                  <i className="bi bi-truck fs-2 text-success" style={{ color: '#6E8A78' }}></i>
                </div>
                <h5 className="fw-semibold mb-3" style={{ color: '#4A5D51' }}>3. รอรับดอกไม้ที่บ้าน</h5>
                <p className="text-secondary small mb-0">จัดส่งห่ออย่างแน่นหนา เพื่อส่งมอบถึงมือคุณในสภาพที่สมบูรณ์ที่สุดอย่างรวดเร็ว</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 5. FOOTER */}
      <footer className="footer py-5 mt-5 text-light-emphasis" style={{ backgroundColor: '#2A332E', borderTop: '5px solid #6E8A78' }}>
        <div className="container py-4">
          <div className="row g-4">
            
            {/* Logo/Description */}
            <div className="col-12 col-lg-4">
              <a className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2 mb-3 text-white" href="#" style={{ fontFamily: "'Playfair Display', serif" }}>
                <i className="bi bi-flower1 text-success"></i> Home<span>Flowers</span>
              </a>
              <p className="text-secondary small">
                เราคัดสรรดอกไม้แห้งและดอกไม้ประดิษฐ์คุณภาพดีเยี่ยม เพื่อสร้างบรรยากาศอบอุ่นและมีชีวิตชีวาให้บ้านและงานสำคัญของคุณ
              </p>
              <div className="d-flex gap-3 mt-4">
                <a href="#" className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255,255,255,0.05)' }} aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255,255,255,0.05)' }} aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255,255,255,0.05)' }} aria-label="Line">
                  <i className="bi bi-line"></i>
                </a>
              </div>
            </div>

            {/* Categories links */}
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <h5 className="text-white mb-4 fw-medium" style={{ fontSize: '1rem' }}>หมวดหมู่สินค้า</h5>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><a href="#categories" className="text-secondary text-decoration-none">ช่อแนะนำ</a></li>
                <li><a href="#categories" className="text-secondary text-decoration-none">ดอกไม้แห้ง</a></li>
                <li><a href="#categories" className="text-secondary text-decoration-none">ดอกไม้ประดิษฐ์</a></li>
                <li><a href="#categories" className="text-secondary text-decoration-none">ของขวัญ / ของชำร่วย</a></li>
              </ul>
            </div>

            {/* Help Links */}
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
              <h5 className="text-white mb-4 fw-medium" style={{ fontSize: '1rem' }}>ช่วยเหลือ & ข้อมูล</h5>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><a href="#how-to-buy" className="text-secondary text-decoration-none">วิธีการสั่งซื้อ</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">นโยบายการคืนสินค้า</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">คำถามที่พบบ่อย (FAQs)</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">ติดตามการจัดส่ง</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="text-white mb-4 fw-medium" style={{ fontSize: '1rem' }}>ติดต่อเรา</h5>
              <ul className="list-unstyled d-flex flex-column gap-3 small text-secondary">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-geo-alt-fill text-danger fs-5 mt-0"></i>
                  <span>123/45 ถนนดอกไม้ทอง กรุงเทพมหานคร 10110</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-telephone-fill text-success fs-5"></i>
                  <span>081-234-5678</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-envelope-fill text-info fs-5"></i>
                  <span>info@homeflowershop.com</span>
                </li>
              </ul>
            </div>

          </div>

          <hr className="border-secondary my-4" />

          <div className="text-center small text-secondary">
            <p className="mb-0">&copy; 2026 Home Flowers Shop. All Rights Reserved. ออกแบบและพัฒนาเพื่อการเรียนรู้ด้วย React และ Bootstrap</p>
          </div>
        </div>
      </footer>

      {/* 6. CART DRAWER (BOOTSTRAP OFFCANVAS) */}
      <div className={`offcanvas offcanvas-end ${cartOpen ? 'show' : ''}`} 
        tabIndex="-1" 
        style={{ visibility: cartOpen ? 'visible' : 'hidden', zIndex: 1050 }}
        aria-labelledby="cartDrawerLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-semibold" id="cartDrawerLabel" style={{ color: '#4A5D51' }}>ตะกร้าสินค้าของคุณ</h5>
          <button type="button" onClick={() => setCartOpen(false)} className="btn-close text-reset" aria-label="Close"></button>
        </div>
        
        <div className="offcanvas-body d-flex flex-column">
          {cart.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
              <i className="bi bi-cart-x fs-1 mb-3"></i>
              <p className="mb-0">ยังไม่มีสินค้าในตะกร้า</p>
            </div>
          ) : (
            <div className="flex-grow-1 overflow-auto mb-3" style={{ maxHeight: 'calc(100vh - 250px)' }}>
              {cart.map((item) => (
                <div key={item.id} className="d-flex gap-3 align-items-start pb-3 mb-3 border-bottom">
                  {/* Image Placeholder */}
                  <div style={{ width: '70px', flexShrink: 0 }}>
                    <div className="bg-light border rounded d-flex align-items-center justify-content-center text-secondary" style={{ height: '70px', fontSize: '0.65rem' }}>
                      <span>รูปภาพ</span>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-dark fw-medium small">{item.name}</h6>
                    <p className="text-danger small mb-2 fw-semibold">฿{item.price}</p>
                    <div className="d-flex align-items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                        <i className="bi bi-minus"></i>
                      </button>
                      <span className="small">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-sm text-secondary border-0 p-0 fs-5 align-self-start"
                    aria-label="Remove item"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-auto border-top pt-3 bg-white">
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3" style={{ color: '#4A5D51' }}>
                <span>ราคารวมทั้งหมด:</span>
                <span style={{ color: '#A66E61' }}>฿{cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => { alert('ดำเนินการสั่งซื้อเสร็จสิ้น! ขอบคุณที่สั่งซื้อสินค้ากับเรา'); setCart([]); setCartOpen(false); }}
                className="btn btn-success w-100 py-3 fw-semibold rounded-pill"
                style={{ backgroundColor: '#6E8A78', borderColor: '#6E8A78' }}
              >
                ดำเนินการสั่งซื้อ
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Backdrop for Offcanvas */}
      {cartOpen && <div onClick={() => setCartOpen(false)} className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>}

      {/* 7. LOGIN / REGISTER MODAL */}
      <div className={`modal fade ${loginModalOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow-lg p-4">
            
            <div className="modal-header border-0 pb-0 position-relative">
              <button type="button" onClick={() => setLoginModalOpen(false)} className="btn-close position-absolute end-0 top-0 m-2" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              
              {/* Modal Tabs */}
              <ul className="nav nav-tabs nav-justified mb-4" id="authTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button 
                    onClick={() => setModalTab('login')}
                    className={`nav-link border-0 border-bottom border-2 fw-medium fs-5 pb-2 ${modalTab === 'login' ? 'active text-success border-success' : 'text-secondary'}`} 
                    type="button"
                  >
                    เข้าสู่ระบบ
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    onClick={() => setModalTab('register')}
                    className={`nav-link border-0 border-bottom border-2 fw-medium fs-5 pb-2 ${modalTab === 'register' ? 'active text-success border-success' : 'text-secondary'}`} 
                    type="button"
                  >
                    สมัครสมาชิก
                  </button>
                </li>
              </ul>

              {/* Login Form */}
              {modalTab === 'login' && (
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="modalLoginEmail" className="form-label small fw-medium">อีเมล / เบอร์โทรศัพท์</label>
                    <input 
                      type="text" 
                      className="form-control rounded-3 py-2" 
                      id="modalLoginEmail" 
                      placeholder="ระบุอีเมลหรือเบอร์โทรศัพท์ของคุณ" 
                      required 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="modalLoginPassword" className="form-label small fw-medium">รหัสผ่าน</label>
                    <input 
                      type="password" 
                      className="form-control rounded-3 py-2" 
                      id="modalLoginPassword" 
                      placeholder="ระบุรหัสผ่าน" 
                      required 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="text-end mb-4">
                    <a href="#" className="text-success text-decoration-none small">ลืมรหัสผ่าน?</a>
                  </div>
                  <button type="submit" className="btn btn-success w-100 py-2 rounded-pill fw-medium" style={{ backgroundColor: '#6E8A78', borderColor: '#6E8A78' }}>
                    เข้าสู่ระบบ
                  </button>
                </form>
              )}

              {/* Register Form */}
              {modalTab === 'register' && (
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3">
                    <label htmlFor="modalRegName" className="form-label small fw-medium">ชื่อ - นามสกุล</label>
                    <input 
                      type="text" 
                      className="form-control rounded-3 py-2" 
                      id="modalRegName" 
                      placeholder="ระบุชื่อ-นามสกุลของคุณ" 
                      required 
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="modalRegEmail" className="form-label small fw-medium">อีเมล</label>
                    <input 
                      type="email" 
                      className="form-control rounded-3 py-2" 
                      id="modalRegEmail" 
                      placeholder="ระบุอีเมลของคุณ" 
                      required 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="modalRegPhone" className="form-label small fw-medium">เบอร์โทรศัพท์</label>
                    <input 
                      type="tel" 
                      className="form-control rounded-3 py-2" 
                      id="modalRegPhone" 
                      placeholder="ระบุเบอร์โทรศัพท์" 
                      required 
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="modalRegPassword" className="form-label small fw-medium">รหัสผ่าน</label>
                    <input 
                      type="password" 
                      className="form-control rounded-3 py-2" 
                      id="modalRegPassword" 
                      placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)" 
                      required 
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100 py-2 rounded-pill fw-medium" style={{ backgroundColor: '#6E8A78', borderColor: '#6E8A78' }}>
                    สมัครสมาชิก
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
