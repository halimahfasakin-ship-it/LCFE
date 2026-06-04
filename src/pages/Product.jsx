import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from "universal-cookie"

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const token = cookies.get("token")
  console.log(cookies.get("token"))
  console.log(cookies.get("userId"))



  const getProd = async () => {

    try {

      console.log("Token:", token)
      const response = await axios.get(
        `http://localhost:4009/api/v1/getProd/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setProduct(response.data.data)
      console.log(product);


    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  const addToCart = async () => {

    const token = cookies.get("token")

    if (!token) {
      alert("Please login first")
      navigate("/login")
      return
    }

    try {

      const response = await axios.post(
        "http://localhost:4009/api/v1/addToCart",
        {
          userId,
          productId: product._id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(response.data)

      alert("Product added to cart")

    } catch (error) {

      console.log(error)

      alert(
        error?.response?.data?.message ||
        "Failed to add product to cart"
      )

    }

  }

  useEffect(() => {

    getProd()

  }, [id])

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading product...</h2>
  }

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Product not found</h2>
  }


  return (
    <div className="product-details">

      <div className="product-image">
        <img src={product?.prodImage?.secure_url} alt={product.title} />
      </div>

      <div className="product-info">

        <h1>{product.title}</h1>

        <p className="category">
          Category: {product?.category}
        </p>

        <p className="price">
          ₦{product?.price?.toLocaleString()}
        </p>

        <p className="description">
          {product?.description}
        </p>

        <div className="actions">

          <button
            className="btn-primary"
            onClick={() => navigate("/staff")}
          >
            Select Attendant
          </button>

          <button className="btn-1" onClick={addToCart}>
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  )
}

export default Product