import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./productcard.css";
import Context from "../../reducer/Context";
import {INITIALIZE_LIST} from "../../reducer/Action.type";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {API} from "../Global";

export default function AdminProductCard({ product }) {
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${product._id}`);
  };

  const getList = async () => {
    return await fetch(`${API}/products`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((prod) => {
        context.pDispatch({
          type: INITIALIZE_LIST,
          payload: prod
        })
      });
  }

  const handleDelete = async () => {
    return await fetch(`${API}/products/${product._id}`, {
      method: "DELETE"
    }).then(data => data.json()).then(() => {
      getList();
      navigate(`/products`)
    })
  };

  return (
    <Card sx={{ width: 300, height: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent className="card-content">
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="div"
          className="card-content__subtext"
        >
          <div className="card-content__text">
            5 hours - <strong>Rs. {product.price}</strong>
          </div>
          <div className="card-content__action-btns">
            <IconButton
              aria-label="edit_product"
              color="success"
              size="large"
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              aria-label="edit_product"
              color="secondary"
              size="large"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
