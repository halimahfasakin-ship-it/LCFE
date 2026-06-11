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

      <h2>Order Summary</h2>

      <div className="checkout-container">

        {/* PRODUCT */}
        {cart?.products?.map(item => (
          <div className='summary-card' key={item.productId._id}>
            <h3>{item.productId.title}</h3>
            <img src={item.productId?.prodImage?.secure_url || null} alt="" />
            <p>Qty: {item.quantity}</p>
            <p>
              ₦
              {(item.productId.price * item.quantity)
                .toLocaleString()}
            </p>
          </div>
        ))}

        {/* STAFF */}
        {/* <div className="summary-card">
          <h3>Selected Staff</h3>
          <img src={selectedStaff?.profileImage?.secure_url || null} alt={selectedStaff?.firstName} />
          <p>{selectedStaff?.firstName} {selectedStaff?.lastName}</p>
          <p>⭐ {selectedStaff?.rating}</p>
        </div> */}

      </div>

      {/* TOTAL */}
      <div className="total">
        <h3>Total: ₦{total.toLocaleString()}</h3>
      </div>

      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Confirm Order
      </button>

    </div>
  )
}

export default Checkout