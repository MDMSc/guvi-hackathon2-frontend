import React, { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./addproduct.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import { API } from "../Global";

export default function EditProduct() {
  const { _id } = useParams();
  const [prod, setProd] = useState(null);

  const getData = async function () {
    return await fetch(`${API}/products/${_id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((p) => setProd(p));
  };
  useEffect(() => {
    getData();
  }, []);

  return prod ? (
    <EditProductForm prod={prod} />
  ) : (
    <h2 className="container container-add">"Loading....."</h2>
  );
}

function EditProductForm({ prod }) {
  const navigate = useNavigate();

  const formik = new useFormik({
    initialValues: {
      name: prod.name,
      price: prod.price,
      type: prod.type,
      inStock: prod.inStock,
      image: prod.image,
    },

    onSubmit: () => {
      const data = {
        name: formik.values.name,
        price: formik.values.price,
        type: formik.values.type,
        inStock: formik.values.inStock,
        image: formik.values.image,
      };

      fetch(`${API}/products/update-product/${prod._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then(() => navigate("/products"));
    },

    validationSchema: yup.object({
      name: yup.string().required("Required!!!"),
      price: yup
        .number("Price must be a number")
        .required("Required!!!")
        .positive(),
      type: yup
        .string()
        .required("Required!!!")
        .oneOf(
          ["photography", "music", "scooty"],
          "Provide the correct category: photography, music or scooty"
        ),
      inStock: yup
        .number("Quantity must be a number")
        .required("Required!!!")
        .positive(),
      image: yup.string().required("Required!!!"),
    }),
  });

  return (
    <>
      <Header />
      <div className="container container-add">
        <Paper
          elevation={24}
          sx={{ minWidth: 650, paddingBottom: 3, paddingTop: 3 }}
          className="add-container"
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", marginBottom: 5 }}
          >
            Edit Product
          </Typography>

          <form onSubmit={formik.handleSubmit} className="add-form">
            <div className="form-control">
              <TextField
                id="name"
                placeholder="Product Name"
                variant="outlined"
                name="name"
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
              <TextField
                id="price"
                placeholder="Product Price"
                variant="outlined"
                name="price"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error">{formik.errors.price}</div>
              ) : null}
            </div>

            <div className="form-control">
              <TextField
                id="type"
                placeholder="Product Category"
                variant="outlined"
                name="type"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              />
              {formik.touched.type && formik.errors.type ? (
                <div className="error">{formik.errors.type}</div>
              ) : null}
            </div>

            <div className="form-control">
              <TextField
                id="inStock"
                placeholder="In-Stock Quantity"
                variant="outlined"
                name="inStock"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.inStock}
              />
              {formik.touched.inStock && formik.errors.inStock ? (
                <div className="error">{formik.errors.inStock}</div>
              ) : null}
            </div>

            <div className="form-control">
              <TextField
                id="image"
                placeholder="Image URL"
                variant="outlined"
                name="image"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
              />
              {formik.touched.image && formik.errors.image ? (
                <div className="error">{formik.errors.image}</div>
              ) : null}
            </div>

            <Button type="submit" color="primary" variant="contained">
              Edit Product
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}
