import React, { useContext, useState } from "react";
import {
    Button,
    InputLabel,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../Global";
import Context from "../../reducer/Context";
import { IS_ADMIN, LOGIN_SUCCESS } from "../../reducer/Action.type";


const initialValues = {
    username: "",
    password: "",
  };
  
const validationSchema = yup.object({
    username: yup.string().required("Required!!!"),
    password: yup.string().required("Required!!!"),
});

export default function Signup() {
  const [msg, setMsg] = useState("");
  const { userState, userDispatch } = useContext(Context);
  const navigate = useNavigate();

  const onSubmit = () => {
    postLogin();
    if(userState.isLoginSuccess){
      navigate("/");
    }
  };

  const postLogin = async () => {
    const signupDetails = {
      username: formik.values.username,
      password: formik.values.password,
    };

    const response = await fetch(`${API}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupDetails),
    });

    const resData = await response.json();
    setMsg(resData.message);
  };

  const formik = new useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="container container-login">

      <Typography
          variant="h3"
          component="span"
          sx={{ flexGrow: 1, fontWeight: "bold", p: 2 }}
        >
        EQUIPMENT RENTAL PORTAL
      </Typography>
      <Paper
        elevation={24}
        sx={{ minWidth: 500, paddingBottom: 3, paddingTop: 3, backgroundColor: "rgba(210, 210, 210, 0.6)", borderRadius: 10 }}
        className="add-container"
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Signup
        </Typography>

        {msg ? <div className="error">{msg}</div> : null}

        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="form-control">
            <InputLabel htmlFor="name" sx={{ fontWeight: "bold" }}>
              Username{" "}
            </InputLabel>
            <TextField
              id="username"
              variant="outlined"
              name="username"
              placeholder="Enter your Username"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>

          <div className="form-control">
            <InputLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
              Password{" "}
            </InputLabel>
            <TextField
              id="password"
              type="password"
              placeholder="Enter your Name"
              variant="outlined"
              name="password"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <Button type="submit" color="primary" variant="contained">
            Sign Up
          </Button>
            
          <p>Try Logging In now!!!</p>
          <Link to="/login">Back to Login Page</Link>
        </form>
      </Paper>
    </div>
  );
}
