import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import google from "../assets/google.png"
import apple from "../assets/apple.png"
import logo1 from "../assets/logo.png"
import Cookies from 'universal-cookie'
import { useFormik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import * as yup from "yup"
import axios from 'axios'

const Login = () => {
  const cookies = new Cookies()
  console.log(cookies.get("token"))
  console.log(cookies.get("userId"))
  let navigate = useNavigate()

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post("http://localhost:4009/api/v1/login", values)
        console.log(response.data)

        console.log("STATUS:", response.status)

        if (response.status === 200) {
          console.log("Inside success block")
          console.log("Hello!!");

          const token = response.data.data.token
          console.log("TOKEN VALUE:", token)
          const decoded = jwtDecode(token)
          cookies.set("token", token, {
            path: "/",
            expires: new Date(decoded.exp * 1000)
          })

          cookies.set("userId", decoded.id, {
            path: "/",
            expires: new Date(decoded.exp * 1000)
          })
          console.log("Saved token:", cookies.get("token"))
          console.log("Saved userId:", cookies.get("userId"))
          console.log(decoded);
          navigate("/")

        }

      } catch (error) {
        console.log(error);
        alert("Invalid credentials")

      }

    },

    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Invalid email format")
    })
  })

  console.log(formik.touched);
  return (
    <div className='login-container'>
      <div className='login-card'>
        <img className='logo' src={logo1} alt="logo" />
        <h1>Welcome Back!</h1>

        <div className='input-group'>
          <input type="email" placeholder='Email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.email && formik.errors.email) && <small className='text-danger'>{formik.errors.email}</small>}
          <input type="password" placeholder='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.password && formik.errors.password) && <small className='text-danger'>{formik.errors.password}</small>}
        </div>

        <div className='forgot'>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type='submit' className='login-btn' onClick={formik.handleSubmit}>Log in</button>

        <p className='signup-text'>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div className='divider'>OR</div>

        <div className='social-container'>
          <button className='social-btn'>
            <img src={apple} alt="" /> Log in with Apple
          </button>
          <button className='social-btn'>
            <img src={google} alt="" /> Log in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login