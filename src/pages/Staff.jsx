import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Staff = () => {
  const navigate = useNavigate()
  const [staffList, setStaffList] = useState([])

  const getStaffs = async () => {
    try {
      const response = await axios.get("http://localhost:4009/api/v1/staff")
      setStaffList(response.data.data)
    } catch (error) {
      console.error("Error fetching staff:", error)
    }
  }

  getStaffs()

  useEffect(() => {
    getStaffs()
  }, [])


  const handleSelect = (staff) => {

    localStorage.setItem(
      "selectedStaff",
      JSON.stringify(staff)
    )

    navigate("/checkout")

  }

  return (
    <div className="staff-page">

      <h2>Select an Attendant</h2>
      <p>Choose a staff member to assist you with your order</p>

      <div className="staff-grid">

        {staffList.map(staff => (
          <div className="staff-card" key={staff._id}>
            <img
              src={staff?.profileImage?.secure_url}
              alt={staff.firstName}
            />
            <h3>{staff.name}</h3>

            <p>⭐ Rating: {staff.rating}</p>

            <p>Experience: {staff.experience}</p>

            <button
              className="btn btn-primary"
              onClick={() => handleSelect(staff)}
            >
              Select Staff
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Staff