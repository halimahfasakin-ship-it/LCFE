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

    <h1 className="checkout-title">Checkout</h1>

    <div className="checkout-layout">

      {/* LEFT SIDE */}
      <div className="checkout-left">

        {/* SHIPPING DETAILS */}
        <div className="checkout-card">
          <h2>Shipping Details</h2>

          <div className="shipping-info">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@gmail.com</p>
            <p><strong>Phone:</strong> +234 812 345 6789</p>
            <p><strong>Address:</strong> 123 Main Street, Lagos</p>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="checkout-card">
          <h2>Order Items</h2>

          <div className="product-list">
            {cart?.products?.map((item) => (
              <div className="product-item" key={item.productId._id}>

                <img
                  src={item.productId?.prodImage?.secure_url}
                  alt={item.productId.title}
                />

                <div className="product-details">
                  <h4>{item.productId.title}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    ₦
                    {(item.productId.price * item.quantity)
                      .toLocaleString()}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">

        <div className="summary-box">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart?.products?.length || 0}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <button
            className="confirm-btn"
            onClick={handleConfirm}
          >
            Confirm Order
          </button>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>

    <Footer />

  </div>
)
}

export default Checkout