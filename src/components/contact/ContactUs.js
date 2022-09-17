import React, { useRef } from "react";
import {
  Button,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./contact.css";
import emailjs from "emailjs-com";
import Header from "../header/Header";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required!!!"),
  email: yup.string().email("Invalid email").required("Required!!!"),
  message: yup.string().required("Required!!!"),
});

export default function ContactUs() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_jikjmrm",
      "template_wq7olzi",
      form.current,
      "HKupPKARljw_TPM6P"
    );
    e.target.reset();
  };

  const formik = new useFormik({
    initialValues,
    onSubmit: sendEmail,
    validationSchema,
  });

  return (
    <>
    <Header />
    <div className="container container-contact">
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
          Contact Us
        </Typography>
        <p>Please provide feedback or Ask your query</p>

        <form
          ref={form}
          onSubmit={formik.handleSubmit}
          className="contact-form"
        >
          <div className="form-control">
            <InputLabel htmlFor="name" sx={{ fontWeight: "bold" }}>
              Name{" "}
            </InputLabel>
            <TextField
              id="name"
              variant="outlined"
              name="name"
              placeholder="Enter your Name"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-control">
            <InputLabel htmlFor="email" sx={{ fontWeight: "bold" }}>
              Email{" "}
            </InputLabel>
            <TextField
              id="email"
              placeholder="Enter your Name"
              variant="outlined"
              name="email"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-control">
            <InputLabel htmlFor="message" sx={{ fontWeight: "bold" }}>
              Message{" "}
            </InputLabel>
            <TextField
              id="message"
              name="message"
              placeholder="Message"
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
            />
          </div>

          <Button type="submit" color="primary" variant="contained">
            Contact Us
          </Button>
        </form>
      </Paper>
    </div>
    </>
  );
}
