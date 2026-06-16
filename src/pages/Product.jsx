import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from "universal-cookie"
import { InfinitySpin } from 'react-loader-spinner'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const token = cookies.get("token")


  useEffect(() => {
    const getProd = async () => {
      try {
        const response = await axios.get(`https://lcbe.onrender.com/api/v1/getProd/${id}`,
          {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`
          }
        }
        )
        console.log(response.data.data);
        
        setProduct(response.data.data)
        setLoading(false)
      } catch (error) {
        console.log("Error:", error.response?.data || error)
      }
    }

    getProd()

  }, [id])


  const addToCart = async () => {


    try {

      const response = await axios.post(
        "https://lcbe.onrender.com/api/v1/addToCart",
        {
          userId,
          productId: product._id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        },

      )
      console.log(response.data)


      alert("Product added to cart")
      window.location.reload()

    } catch (error) {

      console.log(error)

      alert(
        error?.response?.data?.message ||
        "Failed to add product to cart"
      )

    }

  }

  // useEffect(() => {

  //   getProd()

  // }, [id])

  // if (loading) {
  //   return <h2 style={{ padding: "20px" }}>Loading product...</h2>
  // }

  // if (!product) {
  //   return <h2 style={{ padding: "20px" }}>Product not found</h2>
  // }


  return (
    <div className='d-flex justify-content-center align-items-center flex-wrap gap-3 mt-5'>{
      loading ? <InfinitySpin
        width="200"
        color='#6c63ff'
      /> :
        <div className="product-details">
          <div className="product-image">
            <img src={product?.prodImage?.secure_url} alt={product.title} />
          </div>
          <div className="product-info">
            <h1>{product?.title}</h1>
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
              {/* <button className="btn-primary" onClick={() => navigate("/staff")}>Select Attendant</button> */}
              <button className="btn-1" onClick={addToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
    }</div>
  )
}

export default Product