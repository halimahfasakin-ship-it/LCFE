import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [cart, setCart] = useState(null)
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const token = cookies.get("token")
  console.log("Cart userId:", userId)
  const getCart = async () => {

    try {

      const response = await axios.get(
        `https://lcbe.onrender.com/api/v1/getUserCart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token") || ""}`
          }
        }
      )
      setCart(response.data.data)
      console.log(
  JSON.stringify(response.data.data, null, 2)
)
      setCartItems(response.data.data.products)

    } catch (error) {

      console.log(error)

    }

  }

  const removeItem = async (productId) => {

    try {

      await axios.delete(
        `https://lcbe.onrender.com/api/v1/removeFromCart/${userId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`
          }
        }
      )
      getCart()

    } catch (error) {

      console.log(error)

    }

  }


  const increaseQty = async (productId) => {

    try {

      await axios.patch(
        `https://lcbe.onrender.com/api/v1/increaseQuantity/${userId}/${productId}`
      ,{}, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`
        }
      })

      getCart()

    } catch (error) {

      console.log(error)


    }
  }

  const decreaseQty = async (productId) => {

    try {

      await axios.patch(
        `https://lcbe.onrender.com/api/v1/decreaseQuantity/${userId}/${productId}`
      ,{}, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}` 
        }
      })
      getCart()

    } catch (error) {

      console.log(error)

    }

  }

  const total = cart?.products?.reduce(
  (acc, item) => acc + ((item.productId?.price || 0) * item.quantity),
  0
) || 0

  useEffect(() => {

    if (userId) {
      getCart()
    }

  }, [])

  return (
    <div className="cart-page">

      <h2>Your Cart</h2>

      {!cart?.products?.length?(
              <p>Your cart is empty</p>
            ) : (
        <>
          <div className="cart-list">

              {cart?.products?.filter(item => item.productId)?.map(item => (
                <div className="cart-item" key={item.productId._id}>

                  <img
                    src={item.productId?.prodImage?.secure_url}
                    alt={item.productId?.title}
                  />

                  <div>
                    <h3>{item.productId?.title}</h3>
                    <p>₦{item.productId?.price?.toLocaleString() || 0}</p>
                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item.productId._id)}> - </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.productId._id)}> + </button>
                    </div>
                  </div>
                  <button className="remove" onClick={() => removeItem(item.productId._id)}> Remove </button>
                </div>
              ))}
            </div>
          <div className="cart-summary">
            <h3>Total: ₦{total.toLocaleString()}</h3>
            <button className="btn btn-secondary" onClick={() => navigate("/staff")}> Proceed </button>
          </div>
        </>
      )}

    </div>
  )
}

export default Cart