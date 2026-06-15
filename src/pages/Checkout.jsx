import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Checkout = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const token = cookies.get("token")
  console.log("userId:", cookies.get("userId"))
  console.log("token:", cookies.get("token"))

  const [cart, setCart] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const loadPaystackScript = () => {
    return new Promise((resolve, reject) => {
      if (window.PaystackPop) {
        return resolve(window.PaystackPop)
      }

      const script = document.createElement("script")
      script.src = "https://js.paystack.co/v1/inline.js"
      script.onload = () => resolve(window.PaystackPop)
      script.onerror = () => reject(new Error("Unable to load Paystack script"))
      document.body.appendChild(script)
    })
  }

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
    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.state) {
      setMessage("Please complete all shipping fields before placing your order.")
      return
    }

    if (!cart?.products?.length) {
      setMessage("Your cart is empty.")
      return
    }

    if (!token) {
      setMessage("Login is required to complete checkout.")
      return
    }

    if (!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY) {
      setMessage("Paystack public key is not configured.")
      return
    }

    setLoading(true)
    setMessage("")

    const deliveryAddress = `${formData.address}, ${formData.city}, ${formData.state}`

    try {
      const response = await axios.post(
        "https://lcbe.onrender.com/api/v1/initialize-payment",
        { deliveryAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const paystackData = response.data.data
      const paystack = await loadPaystackScript()

      const handler = paystack.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: total * 100,
        ref: paystackData.reference,
        onClose: () => {
          setMessage("Payment window closed before completion.")
        },
        callback: async (res) => {
          try {
            setMessage("Verifying payment...")
            const verifyResponse = await axios.post(
              "https://lcbe.onrender.com/api/v1/verify-payment",
              {
                reference: res.reference,
                deliveryAddress
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )

            setMessage("Payment successful! Order created.")
            console.log("Order created:", verifyResponse.data.data)
          } catch (err) {
            console.error(err)
            setMessage("Payment succeeded but verification failed. Please contact support.")
          }
        }
      })

      handler.openIframe()
    } catch (error) {
      console.error(error)
      setMessage(error?.response?.data?.message || "Unable to start payment. Please try again.")
    } finally {
      setLoading(false)
    }
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
                name="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="johndoe@gmail.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+234..."
                />
              </div>

            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street address"
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Lagos"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Lagos State"
                />
              </div>

            </div>

          </form>
        </div>
        <div className="products-card">
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

          <div className="summary-header">
            <h2>Order Summary</h2>
            <span>{cart?.products?.length || 0} items</span>
          </div>

          <div className="summary-body">

            {cart?.products?.map((item) => (
              <div
                className="summary-product"
                key={item.productId._id}
              >
                <span>
                  {item.productId.title}
                  <small> × {item.quantity}</small>
                </span>

                <span>
                  ₦{(
                    item.productId.price *
                    item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            ))}

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>₦0</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

          </div>

          <button
            className="place-order-btn"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Processing payment..." : "Place Order"}
          </button>

          {message && <p className="checkout-message">{message}</p>}

          <p className="secure-checkout">
            Secure Checkout
          </p>

        </div>

      </div>
    </div>
  )
}

export default Checkout