import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Rating = () => {
  const navigate = useNavigate()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const staff = {
    name: "Jane Doe"
  }

  const handleSubmit = () => {
    console.log({
      staff: staff.name,
      rating,
      comment
    })

    alert("Thank you for your feedback!")
    navigate("/")
  }

  return (
    <div className="rating-page">

      <h2>Rate Your Attendant</h2>

      <p>You were assisted by: <strong>{staff.name}</strong></p>

      {/* STAR RATING */}
      <div className="stars">
        {[1,2,3,4,5].map(num => (
          <span key={num} className={num <= rating ? "active" : ""} onClick={() => setRating(num)} >★</span>
        ))}
      </div>

      {/* COMMENT */}
      <textarea placeholder="Leave a comment (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button className="btn btn-secondary" onClick={handleSubmit}> Submit Rating </button>
    </div>
  )
}

export default Rating