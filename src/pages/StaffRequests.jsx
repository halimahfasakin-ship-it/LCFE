// import React, { useState } from 'react'

// const initialRequests = [
//   {
//     id: 1,
//     name: "Jane Doe",
//     email: "jane@gmail.com",
//     experience: "2 years in sales"
//   },
//   {
//     id: 2,
//     name: "Aisha Bello",
//     email: "aisha@gmail.com",
//     experience: "1 year in retail"
//   }
// ]

// const StaffRequests = () => {
//   const [requests, setRequests] = useState(initialRequests)

//   const handleApprove = (id) => {
//     console.log("Approved staff:", id)

//     setRequests(prev => prev.filter(req => req.id !== id))
//   }

//   const handleReject = (id) => {
//     console.log("Rejected staff:", id)

//     setRequests(prev => prev.filter(req => req.id !== id))
//   }

//   return (
//     <div className="staff-requests">

//       <h1>Staff Requests</h1>
//       <p>Approve or reject users requesting staff access</p>

//       <div className="request-grid">

//         {requests.length === 0 ? (
//           <p>No pending requests</p>
//         ) : (
//           requests.map(req => (
//             <div className="request-card" key={req.id}>

//               <h3>{req.name}</h3>
//               <p>{req.email}</p>
//               <p>{req.experience}</p>

//               <div className="actions">

//                 <button
//                   className="approve-btn"
//                   onClick={() => handleApprove(req.id)}
//                 >
//                   Approve
//                 </button>

//                 <button
//                   className="reject-btn"
//                   onClick={() => handleReject(req.id)}
//                 >
//                   Reject
//                 </button>

//               </div>

//             </div>
//           ))
//         )}

//       </div>

//     </div>
//   )
// }

// export default StaffRequests