const RoleGuard = ({ role }) => {
  const cookies = new Cookies();

  const token = cookies.get("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = jwtDecode(token);

  if (decoded.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};