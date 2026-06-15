import React, { useState, useEffect } from 'react'
import pookie from "../assets/pookie.jpeg"
import logo from "../assets/logo.png"
import Footer from '../component/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://lcbe.onrender.com/api/v1/getProds");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log("Products:", products);
  return (
    <>
      {/* <div>
        <h1>Shop essentials. Express your style.</h1>
        <div className='two'>
            <button className='btn-1'>Shop Now</button>
            <button className='btn-2'>View all</button>
        </div>

        <div className='discover'>
          <p>Discover beauty, jewelry, clothing, and more.</p>
          <img src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/abf59b00-1547-4b9a-a659-c954aba7949e.avif" alt="" />
        </div>
      </div>
      <div>

      </div> */}

      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Collection 2026</p>

          <h1>Discover Fashion Beauty & Accessories For Every Occasion.</h1>

          <p className="hero-subtext">
            Discover modern essentials designed for comfort, confidence, and everyday elegance.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/products")}>Shop Now</button>
            <button className="btn btn-secondary" onClick={() => navigate("/products")}>Explore</button>
          </div>
        </div>

        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b" alt="Fashion showcase" />
        </div>
      </section>

      <section className="featured">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">View all →</Link>
        </div>

        <div className="featured-grid">
          {products.slice(0, 4).map(product => (
            <div className="featured-card" key={product._id}>
              <img src={product.prodImage?.secure_url} alt={product.title || "Product"} />

              <h3>{products[0].title}</h3>
              <p className="price">₦{product.price.toLocaleString()}</p>

              <button className="btn-1" onClick={() => {navigate(`/product/${product._id}`)}}>View Product</button>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <h2 className="testimonial-title">Real stories. Real satisfaction.</h2>

        <div className="testimonial-wrapper">

          <div className="testimonial-card">
            <div className="logo"><img className='logo' src={logo1} alt="logo" /></div>

            <div className="quote">
              <span className="quote-icon">“</span>
              <p>
                Shopping here is always easy and quick. I find everything I need,
                and the checkout is hassle-free. Great selection and quality every time.
              </p>
            </div>

            <small className="author">Alex Rivera, Everyday Shopper</small>

            <div className="stats">
              <div>
                <h3>52K+</h3>
                <p>Satisfied customers</p>
              </div>

              <div>
                <h3>2M+</h3>
                <p>Items delivered</p>
              </div>
            </div>

            <a href="#" className="shop-link">Shop →</a>
          </div>

          <div className="testimonial-image">
            <img className='profile-pic' src={pookie} alt="" />
          </div>

        </div>
      </section>

      <div className='one'>
        <div className='browse'>
          <h3>BROWSE OUR FEATURED PICKS</h3>
          <h1>Shop essentials. Elevate your style.</h1>
          <p>Explore jewelry, clothing, bags, and beauty. Simple shopping for every user.</p>
          <button className='btn-1' onClick={() => {navigate(`/signup`)}}>Browse</button>
        </div>
        <div className='category'>
          <div className='categories'>
            <img src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/11865d1a-bc30-496b-a43a-c975f5637ce2.avif" alt="" />
            <div>
              <button className='undo'>BEAUTY</button>
              <h3>Beauty  Picks</h3>
              <p>Top skincare and makeup products.</p><br /><br /><br /><br />
              <a href="">View →</a>
            </div>
          </div>
          <div className='categories'>
            <img src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/e1680af6-e2b1-4e04-b55f-b42a2999708c.avif" alt="" />
            <div>
              <button className='undo'>CLOTHING</button>
              <h3>Latest fashion</h3>
              <p>New styles for men and women.</p><br /><br /><br /><br />
              <a href="">View →</a>
            </div>
          </div>
          <div className='categories'>
            <img src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/d8b9283e-e46f-4923-90c6-1d8c50bbc7c3.avif" alt="" />
            <div>
              <button className='undo'>BAGS</button>
              <h3>Everyday bags</h3>
              <p>Functional and stylish designs.</p><br /><br /><br /><br />
              <a href="">View →</a>
            </div>
          </div>
          <div className='categories'>
            <img src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/9e256429-519c-41cf-89ea-17a983ad362e.avif" alt="" />
            <div>
              <button className='undo'>JEWELRY</button>
              <h3>Timeless jewelry</h3>
              <p>Classic pieces for every occasion.</p><br /><br /><br /><br />
              <a href="">View →</a>
            </div>
          </div>
        </div>
      </div>
      <div className='rain'>
        <div className='color'>
          <div className='ease'>
            <h1>Shop easy. Shop everything. Shop now.</h1>
            <h4>→ Top picks in beauty and essentials.</h4>
            <hr />
            <h4>→ Jewelry, clothing, bags, find your style.</h4>
            <hr />
            <h4>→ Simple, secure shopping for everyone.</h4>
            <hr />
            <span className='cluster'>
              <button className='btn-3'>Start shopping</button>
              <button className='btn-4'>View products</button>
            </span>
          </div>
          <img src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/46c4a96e-b6c7-41c4-9474-6a0a5dda263f.avif" alt="" />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home