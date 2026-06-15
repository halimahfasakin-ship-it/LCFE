import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo1 from "../assets/logo.png"
import Cookies from 'universal-cookie'
import { useFormik } from 'formik'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import * as yup from "yup"

const Signup = () => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [image, setimage] = useState(null)
  const [loading, setLoading] = useState(false)
  const onFileChanged = (e) => {
        console.log(e.target.files[0]);
        let file = e.target.files[0]
        setimage(e.target.files[0])
        let reader = new FileReader();

        reader.onloadend = () => {
            console.log(reader.result);
            setimage(reader.result)

        }

        reader.readAsDataURL(file)
    }

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: ""
    },

    onSubmit: async (values) => {
      // console.log("FINAL VALUES:", JSON.stringify(values, null, 2));
      // alert("Account created successfully! Please log in.")
      // navigate("/login")
      try {
        setLoading(true)
        const response = await axios.post("https://lcbe.onrender.com/api/v1/addUserToDB", { ...values })
        console.log(response.data);

        if (response.status === 201) {
          alert("Account created successfully! Please log in.")
          navigate("/")
        }

      } catch (error) {
        if (error.response?.status == 400) {
          console.log(error.response.data);
          alert("User already exists");
          return;
        } else {
          console.log(error);
          alert("Error creating user")

        }
      }finally{
        setLoading(false)
      }

    },

    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().required("Email is required").email("Invalid email format"),
      password: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password too weak"),
      gender: yup.string().required("Gender is required")
    })
  })

  // console.log(formik.values);
  // console.log(formik.errors);
  console.log(formik.touched);
  const [role, setRole] = useState("user")

  return (
    <div className='login-container'>
      <div className='login-card'>

        <img className='logo' src={logo1} alt="logo" />
        <h1>Create Account</h1>

        {/* Form */}
        <form className='input-group'>
          <input type="text" placeholder='First Name' name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.firstName && formik.errors.firstName) && <small className='text-danger'>{formik.errors.firstName}</small>}
          <input type="text" placeholder='Last Name' name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.lastName && formik.errors.lastName) && <small className='text-danger'>{formik.errors.lastName}</small>}
          <input type="email" placeholder='Email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.email && formik.errors.email) && <small className='text-danger'>{formik.errors.email}</small>}
          <input type="password" placeholder='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.password && formik.errors.password) && <small className='text-danger'>{formik.errors.password}</small>}
          <input type="text" placeholder='Gender' name='gender' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {/* Extra field depending on role
          {role === "staff" && (
            <input type="text" placeholder='Staff ID / Department Code' />
          )} */}
        </form>

        <button type='submit' className='login-btn' onClick={formik.handleSubmit}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className='signup-text'>
          Already have an account? <Link to="/login">Log in</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup