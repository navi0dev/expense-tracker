import React, { useState , useEffect, useCallback} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.name || !values.email || !values.password) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", values, {
        withCredentials: true, // Only if using cookies/sessions
      });
      console.log("Response from server:", response);

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        console.log("Registered user:", response.data.user);

        // Store user data (if your backend sends token/user info)
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Optional
        if (!response.data.user.isAvatarImageSet) {
          navigate("/setAvatar");
        } else {
          navigate("/");
        }
        
      } else {
        toast.error(response.data.message || "Registration failed!");
        console.error("Registration failed response:", response.data);
      }


    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("User already exists. Please login or use a different email.");
      } else if (err.response && err.response.status === 400) {
        toast.error("Please fill in all required fields.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Registration error:", err);
      }
    }

    finally {
      setLoading(false);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
  <>
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: { color: { value: "#000" } },
          fpsLimit: 60,
          particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: "#ffcc00" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            links: { enable: false },
            move: { enable: true, speed: 2 },
            life: {
              duration: { sync: false, value: 3 },
              count: 0,
              delay: { random: { enable: true, minimumValue: 0.5 }, value: 1 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <Container className="mt-5" style={{ position: "relative", zIndex: 2, color: "white" }}>
        <Row>
          <h1 className="text-center">
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
          </h1>
          <h1 className="text-center text-white">Welcome to Expense Management System</h1>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-white text-center mt-5">Registration</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="mt-4"
              >
                <Link to="/forgotPassword" className="text-white">
                  Forgot Password?
                </Link>

                <Button type="submit" className="text-center mt-3" disabled={loading}>
                  {loading ? "Registering..." : "Signup"}
                </Button>

                <p className="mt-3" style={{ color: "#9d9494" }}>
                  Already have an account?{" "}
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  </>
);

};

export default Register;
