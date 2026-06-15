import axios from "axios"
import React, { useState, useEffect } from "react"
import Cookies from "universal-cookie"

const ManageProd = () => {
  const cookies = new Cookies()

  const [products, setProducts] = useState([])
  const [image, setImage] = useState(null)
  const [editingProductId, setEditingProductId] = useState(null)

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    quantity: 1,
    stock: 0,
  })

  // HANDLE IMAGE
  const onFileChanged = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  // GET PRODUCTS
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://lcbe.onrender.com/api/v1/getProds"
      )
      setProducts(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // RESET FORM
  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      category: "",
      description: "",
      quantity: 1,
      stock: 0,
    })
    setImage(null)
    setEditingProductId(null)
  }

  // ADD PRODUCT (FIXED)
  const addProduct = async () => {
    try {
      const formData = new FormData()

      formData.append("title", form.title)
      formData.append("price", form.price)
      formData.append("category", form.category)
      formData.append("description", form.description)
      formData.append("quantity", form.quantity)
      formData.append("stock", form.stock)
      formData.append("prodImage", image)

      const res = await axios.post(
        "https://lcbe.onrender.com/api/v1/addProdToDB",
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      alert(res.data.message)
      getProducts()
      resetForm()
    } catch (err) {
      console.log(err.response?.data || err)
      alert(err.response?.data?.message || "Failed to add product")
    }
  }

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://lcbe.onrender.com/api/v1/deleteProd/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )

      getProducts()
    } catch (err) {
      console.log(err)
      alert("Failed to delete product")
    }
  }

  // START EDIT
  const startEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
      stock: product.stock,
    })

    setImage(null)
    setEditingProductId(product._id)
  }

  // SAVE EDIT (FIXED)
  const saveEdit = async () => {
    try {
      const formData = new FormData()

      formData.append("title", form.title)
      formData.append("price", form.price)
      formData.append("category", form.category)
      formData.append("description", form.description)
      formData.append("quantity", form.quantity)
      formData.append("stock", form.stock)

      if (image) {
        formData.append("prodImage", image)
      }

      await axios.patch(
        `https://lcbe.onrender.com/api/v1/editProd/${editingProductId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      getProducts()
      resetForm()
    } catch (err) {
      console.log(err.response?.data || err)
      alert("Failed to edit product")
    }
  }

  return (
    <div>
      <h1>Product Management</h1>

      {/* FORM */}
      <div className="form">
        <input type="file" onChange={onFileChanged} />

        <input
          placeholder="Product Name"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={editingProductId ? saveEdit : addProduct}
        >
          {editingProductId ? "Save Changes" : "Add Product"}
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img
              src={product.prodImage?.secure_url}
              alt={product.title}
            />

            <h3>{product.title}</h3>
            <p>₦{product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>

            <button onClick={() => startEdit(product)}>
              Edit
            </button>

            <button
              onClick={() => deleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProd