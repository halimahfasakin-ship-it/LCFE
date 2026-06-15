import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Footer from '../component/Footer'

const Checkout = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const token = cookies.get("token")
  console.log("userId:", cookies.get("userId"))
  console.log("token:", cookies.get("token"))

  const [cart, setCart] = useState(null)
  const getCart = async () => {
    try {
      const response = await axios.get(
        `https://lcbe.onrender.com/api/v1/getUserCart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setCart(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const handleConfirm = async () => {
    console.log("Create Order here");

  }

  const selectedStaff = JSON.parse(localStorage.getItem("selectedStaff"))

  const total = cart?.products?.reduce((sum, item) => sum + item.productId.price * item.quantity, 0) || 0

  return (
    <div className="checkout-page">

  <div className="checkout-wrapper">

    {/* LEFT SECTION */}
    <div className="checkout-form-card">

      <h2>Shipping Information</h2>

      <form className="shipping-form">

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="+234..."
            />
          </div>

        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            placeholder="Street address"
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              placeholder="Lagos"
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              placeholder="Lagos State"
            />
          </div>

        </div>

      </form>

      <div className="products-section">

        <h2>Your Items</h2>

        {cart?.products?.map((item) => (
          <div
            className="checkout-product"
            key={item.productId._id}
          >

            <img
              src={item.productId?.prodImage?.secure_url}
              alt={item.productId.title}
            />

            <div className="checkout-product-info">
              <h4>{item.productId.title}</h4>
              <p>Qty: {item.quantity}</p>
            </div>

            <div className="checkout-price">
              ₦{(
                item.productId.price * item.quantity
              ).toLocaleString()}
            </div>

          </div>
        ))}

      </div>

    </div>

    {/* RIGHT SECTION */}
    <div className="checkout-summary-card">

      <h2>Order Summary</h2>

      <div className="summary-line">
        <span>Subtotal</span>
        <span>₦{total.toLocaleString()}</span>
      </div>

      <div className="summary-line">
        <span>Delivery Fee</span>
        <span>Free</span>
      </div>

      <div className="summary-line total-line">
        <span>Total</span>
        <span>₦{total.toLocaleString()}</span>
      </div>

      <button
        className="place-order-btn"
        onClick={handleConfirm}
      >
        Place Order
      </button>

    </div>

  </div>

  <Footer />

</div>
  )
}

export default Checkout