import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import "./productcard.css";
import Context from "../../reducer/Context";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../reducer/Action.type";
import {API} from "../Global";
import { useNavigate } from "react-router-dom";
import { CardActionArea, CardActions, IconButton } from "@mui/material";


export default function ProductCard({ product }) {
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    context.dispatch({
      type: ADD_TO_CART,
      payload: product
    });

    const data = {
      pid: product._id,
      qty: 1,
      numOfDays: 0,
      hoursPerDay: 0
    }

    fetch(`${API}/cart/add-cart/${product._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then(() => navigate("/products"));
  };

  const handleRemFromCart = () => {
    context.dispatch({
      type: REMOVE_FROM_CART,
      payload: product
    });
  };

  return (
    
    <Card sx={{ maxWidth: 345, minWidth: 345, maxHeight: 345, minHeight: 345 }}>
      <CardActionArea sx={{ maxWidth: 345, minWidth: 345, maxHeight: 285, minHeight: 285 }}>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
          sx={{objectFit: "contain"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            5 hours - <strong>Rs. {product.price}</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {context.state.cart.some((p) => p._id === product._id) ? (
        <IconButton aria-label="remove from shopping cart" size="large" color="primary" onClick={handleRemFromCart}>
          <CloseIcon color="action" />
        </IconButton>
      ) : (
        <IconButton aria-label="add to shopping cart" size="large" color="primary" onClick={handleAddToCart}>
          <ShoppingCartIcon />
        </IconButton>
      )}
      </CardActions>
    </Card>
  );
}
