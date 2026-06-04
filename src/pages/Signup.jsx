import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo1 from "../assets/logo.png"
import Cookies from 'universal-cookie'
import { useFormik } from 'formik'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import * as yup from "yup"

const Signup = () => {
    const [image, setimage] = useState(null)
    // base 64
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
            gender: "",
            role: "user"
        },

        onSubmit: async (values) => {
            console.log(values);
            try {
                const response = await axios.post("https://lcbe.onrender.com/api/v1/addUserToDB", { ...values, profileImage: image })
                console.log(response.data);

                if (response.status == 200) {
                    alert("User created successfully!")
                    navigate("/")
                }

            } catch (error) {
                if (error.response == 400) {
                    console.log(error.response.data);
                    alert("Error creating user");
                    return;
                } else {
                    console.log(error);
                    alert("Error creating user")

                }
            }

        },

        validationSchema: yup.object({
            firstName: yup.string().required("First name is required"),
            lastName: yup.string().required("Last name is required"),
            email: yup.string().required("Email is required").email("Invalid email format"),
            password: yup.string().required("Password is required")
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

        {/* Role Selection */}
        <div className='role-box'>
          <p className='role-title'>Sign up as:</p>

          <div className='role-options' onChange={formik.handleChange} value={formik.values.role} onBlur={formik.handleBlur}>
            <label>
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
              />
              User
            </label>

            <label>
              <input
                type="radio"
                value="staff"
                checked={role === "staff"}
                onChange={(e) => setRole(e.target.value)}
              />
              Staff
            </label>
          </div>
        </div>

        {/* Form */}
        <div className='input-group'>
          <input type="file" name="" onChange={(e) => onFileChanged(e)} /><br />
          <input type="text" placeholder='First Name' name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.firstName && formik.errors.firstName) && <small className='text-danger'>{formik.errors.firstName}</small>}
          <input type="text" placeholder='Last Name' name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.lastName && formik.errors.lastName) && <small className='text-danger'>{formik.errors.lastName}</small>}
          <input type="email" placeholder='Email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.email && formik.errors.email) && <small className='text-danger'>{formik.errors.email}</small>}
          <input type="password" placeholder='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {(formik.touched.password && formik.errors.password) && <small className='text-danger'>{formik.errors.password}</small>}
          {/* Extra field depending on role */}
          {role === "staff" && (
            <input type="text" placeholder='Staff ID / Department Code' />
          )}
        </div>

        <button type='submit' className='login-btn' onClick={formik.handleSubmit}>
          Create {role === "staff" ? "Staff" : "User"} Account
        </button>

        <p className='signup-text'>
          Already have an account? <Link to="/login">Log in</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup