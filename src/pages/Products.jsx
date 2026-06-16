import axios from 'axios'
import { react, useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";
import Cookies from 'universal-cookie'

const Products = () => {
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setloading] = useState(true)
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const token = cookies.get("token")


  const filteredProducts = category ? products.filter(prod => prod.category.toLowerCase() === category) : products;
  const getProducts = async () => {
    try {

      const response = await axios.get("https://lcbe.onrender.com/api/v1/getProds")

      console.log(response.data)

      setProducts(response.data.data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("https://lcbe.onrender.com/api/v1/getProds")
        console.log(response.data)
        setProducts(response.data.data)
        setloading(false)
      } catch (error) {
        console.log(error)
      }

    }
    getProducts()
  }, [])

  const addToCart = async (productId) => {
    const token = cookies.get("token")
    if (!token) {
      alert("Login Required");
      navigate("/login")
      return
    }
    try {
      const response = await axios.post(
        "https://lcbe.onrender.com/api/v1/addToCart",
        {
          userId,
          productId,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`
          }
        }
      );
      alert(response.data.message);
      window.location.reload()
    } catch (error) {
      console.log(error);
      alert("Failed to add product to cart");
    }
  }

  return (
    <div>{
      loading ? <InfinitySpin
      width="200"
      color='#6c63ff'
      />:
      <div className="products-page">
        <h2 className="page-title">All Products</h2>

        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>

                <img src={product.prodImage?.secure_url} alt={product.title} />

                <h3>{product.title}</h3>

                <p className="price">
                  ₦{product.price.toLocaleString()}
                </p>

                <span className="category">{product.category}</span>

                <span className='cluster-1'>
                  <button className="btn-primary" onClick={() => navigate(`/product/${product._id}`)}>View Details</button>
                  <button className='btn-secondary' onClick={() => addToCart(product._id)}>Add to cart</button>
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    }</div>
  )
}

export default Products