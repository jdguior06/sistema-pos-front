import React, { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import ProductsHome from "../components/products/ProductsHome";

import { setDefaultSession } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ loginSuccess, setDefaultSession }) => {
  useEffect(() => {
    if (loginSuccess == true) {
      toast.success("Sesión iniciada con éxito!", { theme: "light" });
      setDefaultSession();
    }
  }, [loginSuccess]);

  return (
    <div className="sections-wrapper">
      <ToastContainer />
      <Dashboard />
      <ProductsHome />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginSuccess: state.auth.loginSuccess,
});

Home.propTypes = {
  setDefaultSession: PropTypes.func.isRequired,
  loginSuccess: PropTypes.bool,
};

export default connect(mapStateToProps, {
  setDefaultSession,
})(Home);
