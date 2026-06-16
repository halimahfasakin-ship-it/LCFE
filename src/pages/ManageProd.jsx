import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Cookies from "universal-cookie"

const ManageProd = () => {
  const cookies = new Cookies()
  const [products, setProducts] = useState([])
  const [image, setimage] = useState(null)
  const [editingProductId, setEditingProductId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  // base 64
  const onFileChanged = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setimage(reader.result) // BASE64 STRING
    }

    reader.readAsDataURL(file)
  }

  async function getProducts() {
    try {
      const response = await axios.get("https://lcbe.onrender.com/api/v1/getProds")
      console.log("Products:", response.data.data)
      setProducts(response.data.data)
      console.log(response.data);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    quantity: 1,
    stock: 0
  })


  // ADD PRODUCT
  const addProduct = async () => {
    try {
      const res = await axios.post(
        "https://lcbe.onrender.com/api/v1/addProdToDB",
        {
          ...form,
          prodImage: image, // BASE64 STRING
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )

      toast.success(res.data.message)
      getProducts()
      resetForm()
    } catch (err) {
      console.log(err.response?.data || err)
      toast.error(err.response?.data?.message || "Failed to add product")
    }
  }

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://lcbe.onrender.com/api/v1/deleteProd/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`
        }
      })
      getProducts()
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete product")
    }
  }

  const editProduct = async (id) => {
    try {
      await axios.patch(`https://lcbe.onrender.com/api/v1/editProd/${id}`, { ...form, prodImage: image }, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`
        }
      })
      getProducts();
      setEditingProductId(null);
      setForm({
        title: "",
        price: "",
        category: "",
        description: "",
        quantity: 1,
        stock: 0
      })
    } catch (error) {
      console.log(error)
      toast.error("Failed to edit product")
    }
  }

  const startEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
      stock: product.stock
    })
    setimage(product.prodImage)
    setEditingProductId(product._id)
  }

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      category: "",
      description: "",
      quantity: 1,
      stock: 0
    })
    setimage(null)
  }

  const cancelEdit = () => {
    resetForm()
    setEditingProductId(null)
  }

  const saveEdit = async () => {
    try {
      await axios.patch(
        `https://lcbe.onrender.com/api/v1/editProd/${editingProductId}`,
        {
          ...form,
          prodImage: image,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )

      getProducts()
      resetForm()
    } catch (err) {
      console.log(err.response?.data || err)
      toast.error("Edit failed")
    }
  }

  // const onFileChanged = (e) => {
  //   const file = e.target.files[0]
  //   const formData = new FormData()
  //   formData.append("file", file)
  //   formData.append("upload_preset", "lcReact")
  //   axios.post("https://api.cloudinary.com/v1_1/dlqj8y7s9/image/upload", formData)
  //     .then(res => {
  //       setForm({ ...form, prodImage: res.data.secure_url })
  //     })
  // }

  return (
    <div className="crud-page">

      <h1>Product Management</h1>

      {/* ADD FORM */}
      <div className="form">

        <input type="file" name="" onChange={(e) => onFileChanged(e)} />

        <input
          placeholder="Product Name"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="description-input"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="btn btn-secondary" onClick={editingProductId ? () => saveEdit() : addProduct}>
          {editingProductId ? "Save Changes" : "Add Product"}
        </button>

      </div>

      {/* PRODUCT LIST */}
      <div className="product-list">

        {products.map(product => (
          <div className="product-item" key={product._id}>

            <div className="product-image-container">
              <img
                src={product.prodImage?.secure_url}
                alt={product.title}
                className="product-img"
              />
            </div>

            <div className="product-content">
              <h3>{product.title}</h3>

              <p className="product-price">
                ₦{product.price?.toLocaleString()}
              </p>

              <p className="product-category">
                {product.category}
              </p>

              <p className="product-stock">
                Stock: {product.stock}
              </p>

              <p className="product-description">
                {product.description}
              </p>
            </div>

            <div className="actions">
              <button
                className="edit"
                onClick={() => startEdit(product)}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default ManageProd