import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AboutUsPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./componentUser/header";
import Footer from "./componentUser/footer";
import Register from "./Pages/register";
import Login from "./Pages/login";
import HealthcareProviderDashboard from "./pages/doctorManage/doctorManage";
import Admin from "./admin/HealthDashboard";
import CheckoutPage from "./pages/checkout and payments";
import Catalog from "./pages/Catalog";

import {UserDetail} from './pages/UserDetailComponent';


const App = () => {
  const location = useLocation();

  // Check if the current path is either "/admin", "/log-in", or "/register"
  const hideHeaderFooter =
    location.pathname === "/admin" ||
    location.pathname === "/log-in" ||
    location.pathname === "/register";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctor" element={<HealthcareProviderDashboard />} />
          <Route path="/CheckoutPage" element={<CheckoutPage />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/details/:username" element={<UserDetail doctorId={65} />} />
    
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
