// import axios from "axios"
// import React, { useEffect, useState } from "react"
// import Cookies from "universal-cookie"

// const ManageStaff = () => {
//     const cookies = new Cookies()

//     const [staffs, setStaffs] = useState([])
//     const [editingStaffId, setEditingStaffId] = useState(null)

//     const [form, setForm] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         role: "",
//         profileImage: {
//             publi_id: "",
//             secure_url: ""
//         }
//     })

//     const onFileChanged = (e) => {
//         let file = e.target.files[0]
//         let reader = new FileReader()

//         reader.onloadend = () => {
//             setForm({
//                 ...form,
//                 profileImage: reader.result
//             })
//         }

//         reader.readAsDataURL(file)
//     }

//     const getStaffs = async () => {
//         try {

//             const response = await axios.get(
//                 "https://lcbe.onrender.com/api/v1/staff",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${cookies.get("token")}`
//                     }
//                 }
//             )

//             setStaffs(response.data.data)

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         getStaffs()
//     }, [])

//     const startEdit = (staff) => {
//         setForm({
//             firstName: staff.firstName,
//             lastName: staff.lastName,
//             email: staff.email,
//             role: staff.role,
//             profileImage: staff.profileImage
//         })

//         setEditingStaffId(staff._id)
//     }

//     const resetForm = () => {
//         setForm({
//             firstName: "",
//             lastName: "",
//             email: "",
//             role: "",
//             profileImage: {
//                 publi_id: "",
//                 secure_url: ""
//             }
//         })
//     }

//     const saveEdit = async () => {
//         try {
//             await axios.patch(
//                 `https://lcbe.onrender.com/api/v1/editStaff/${editingStaffId}`,
//                 form,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${cookies.get("token")}`
//                     }
//                 }
//             )

//             getStaffs()
//             resetForm()
//             setEditingStaffId(null)

//         } catch (error) {
//             console.log(error)
//             alert("Failed to edit staff")
//         }
//     }

//     const deleteStaff = async (id) => {
//         try {

//             await axios.delete(
//                 `https://lcbe.onrender.com/api/v1/deleteStaff/${id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${cookies.get("token")}`
//                     }
//                 }
//             )

//             getStaffs()

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <div>

//             <h1>Staff Management</h1>

//             {editingStaffId && (
//                 <div className="form">
//                     <input type="file" name="" onChange={(e) => onFileChanged(e)} />
//                     <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
//                     <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
//                     <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//                     <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
//                     <button onClick={saveEdit}>Save Changes</button>
//                 </div>
//             )}

//             <div className="product-list">

//                 {staffs.map((staff) => (

//                     <div
//                         className="product-item"
//                         key={staff._id}
//                     >

//                         <div className="product-content">

//                             <h3>{staff.firstName} {staff.lastName}</h3>

//                             <p>{staff.email}</p>

//                             <p>{staff.role}</p>

//                             <img src={staff.profileImage?.secure_url || "/default-avatar.png"} alt={staff.firstName} className="staff-avatar" />

//                         </div>

//                         <div className="actions">

//                             <button
//                                 className="edit"
//                                 onClick={() => startEdit(staff)}
//                             >
//                                 Edit
//                             </button>

//                             <button
//                                 className="delete"
//                                 onClick={() => deleteStaff(staff._id)}
//                             >
//                                 Delete
//                             </button>

//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </div>
//     )
// }

// export default ManageStaff