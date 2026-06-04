import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  return (
    <div className="dashboard">

      {/* TOP BAR */}
      <div className="topbar">
        <h2>Leemah's Store</h2>
        <button className="btn-primary" onClick={() => navigate("/manage-products")}>
          + Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="card">
          <h3>Users</h3>
          <h2>{users.length}</h2>
        </div>

        <div className="card">
          <h3>Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <h2>{orders.length}</h2>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <h2>$8,430</h2>
        </div>
      </div>

      

      {/* MAIN CONTENT */}
      <div className="main">

        {/* TABLE */}
        <div className="table-section card">
          <h3>Recent Orders</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#1234</td>
                <td>Halimah</td>
                <td>Bag</td>
                <td className="success">Delivered</td>
              </tr>

              <tr>
                <td>#1235</td>
                <td>John</td>
                <td>Shoes</td>
                <td className="pending">Pending</td>
              </tr>

              <tr>
                <td>#1236</td>
                <td>Aisha</td>
                <td>Dress</td>
                <td className="danger">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SIDE */}
        <div className="side">
          <div className="card">
            <h3>Top Product</h3>
            <p>Leather Bag</p>
          </div>

          <div className="card">
            <h3>Monthly Sales</h3>
            <p>$8,430</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;