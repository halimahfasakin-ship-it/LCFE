import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useState } from 'react';

const Navbar = ({ setCartOpen }) => {
    const handleCartClick = () => {
        setCartOpen(true);
    };
    const handleNavLinkClick = () => {
        window.scrollTo(0, 0);
    }
    const cookies = new Cookies();
    const firstName = cookies.get("firstName");
    const token = cookies.get('token');
    const logout = () => {
        cookies.remove('token', { path: '/' });
        cookies.remove('userId', { path: '/' });
        window.location.href = '/login';
    }
    const [cartCount, setCartCount] = useState(0);
    const getCartCount = async () => {
        try {
            const response = await fetch(`https://lcbe.onrender.com/api/v1/getUserCart/${cookies.get("userId")}`)
            const data = await response.json()
            const count = data.data.products.reduce((acc, item) => acc + item.quantity,0)
             {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`
                }
            };
            setCartCount(count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };
    useEffect(() => {
        if (token) {
            getCartCount();
        }
    }, []);
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
                                <Link to="/login" className="nav-auth-link"> Login </Link>
                                <Link to="/signup" className="btn-signup"> Sign Up </Link>
                            </>
                        ) : (
                            <>
                                <div className="profile-circle"> {firstName?.charAt(0).toUpperCase() || "U"} </div>
                                <button className="btn btn-outline-danger btn-sm" onClick={logout}> Logout </button>
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
}

export default Navbar;
