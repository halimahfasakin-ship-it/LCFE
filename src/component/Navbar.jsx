import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = ({ setCartOpen }) => {
    const cookies = new Cookies();

    const [token, setToken] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        profileImage: {
            publi_id: "",
            secure_url: ""
        }
    });

    const handleCartClick = () => {
        setCartOpen(true);
    };

    const handleNavLinkClick = () => {
        window.scrollTo(0, 0);
    };

    // ===================== FETCH USER =====================
    useEffect(() => {
        const savedToken = cookies.get("token");
        setToken(savedToken);

        if (!savedToken) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(
                    `https://lcbe.onrender.com/api/v1/getUser/${cookies.get("userId")}`,
                    {
                        headers: {
                            Authorization: `Bearer ${savedToken}`
                        }
                    }
                );

                const data = await res.json();
                setUser(data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, []);

    // ===================== FETCH CART COUNT =====================
    const getCartCount = async () => {
        try {
            const response = await fetch(
                `https://lcbe.onrender.com/api/v1/getUserCart/${cookies.get("userId")}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("token")}`
                    }
                }
            );

            const data = await response.json();

            console.log("Cart Response:", data);

            const products = data?.products || data?.data?.products || [];

            const count = products.reduce((acc, item) => {
                return acc + (item?.quantity || 0);
            }, 0);

            setCartCount(count);

        } catch (error) {
            console.error("Cart error:", error);
        }
    };

    // 👇 THIS IS THE FIX (you were missing this)
    useEffect(() => {
        if (token) {
            getCartCount();
        }
    }, [token]);

    // ===================== LOGOUT =====================
    const logout = () => {
        ["token", "userId", "firstName"].forEach((key) => {
            cookies.remove(key, { path: "/" });
        });

        localStorage.clear();
        window.location.href = "/login";
    };

    const deleteAccount = async (id) => {
        try {
            await axios.delete(
                `https://lcbe.onrender.com/api/v1/deleteStaff/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("token")}`
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top custom-navbar" onClick={handleNavLinkClick}>
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">Leemah's Collection</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse custom-collapse" id="navbarText">

                    <ul className="navbar-nav mx-auto mb-0">
                        <li className="nav-item"><Link className="nav-link" to="/products">All products</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/products?category=women">Women</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/products?category=men">Men</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/products?category=accessories">Accessories</Link></li>
                    </ul>

                    <div className="nav-buttons d-flex align-items-center gap-3">

                        {!token ? (
                            <>
                                <Link to="/login" className="nav-auth-link">Login</Link>
                                <Link to="/signup" className="btn-signup">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <div className="profile-avatar"
                                    onClick={() => setOpenProfile(!openProfile)}>
                                    {user.firstName?.charAt(0).toUpperCase()}
                                </div>
                                {openProfile && (
                                    <div className="profile-dropdown">
                                        <p><strong>{user.firstName} {user.lastName}</strong></p>
                                        <p>{user.email}</p>
                                        <p>{user.role}</p>

                                        <hr />

                                        <button onClick={logout} className="dropdown-btn logout">
                                            Logout
                                        </button>

                                        <button onClick={() => deleteAccount(user._id)} className="dropdown-btn edit">
                                            Edit Account
                                        </button>

                                        <button
                                            onClick={() => {
                                                toast.error("This action cannot be undone");
                                                deleteAccount(user._id);
                                            }}
                                            className="dropdown-btn delete"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <Link to="/cart" className="cart-icon-wrapper" onClick={handleCartClick}>
                            <span className="cart-icon">🛒</span>
                            <span className="cart-badge">{cartCount}</span>
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;