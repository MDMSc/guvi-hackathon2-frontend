import React, { useContext, useState, useEffect } from "react";
import "./cartpage.css";
import Context from "../../reducer/Context";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CHANGE_CART_QTY, INITIALIZE_CART, REMOVE_FROM_CART } from "../../reducer/Action.type";
import Header from "../header/Header";
import {API} from "../Global";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { state, dispatch } = useContext(Context);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const getList = async () => {
    return await fetch(`${API}/cart`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((prod) => {
        dispatch({
          type: INITIALIZE_CART,
          payload: prod
        })
      });
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    setTotal(
      state.cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [state.cart]);

  const handleDelete = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item
    });
  };

  const addToCartCheckout = async (data) => {
    return await fetch(`${API}/cart/add-cart/${data._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then(() => navigate("/cart"));
  }
  const handleCheckout = () => {
    state.cart.map((p) => {
      const data = {
        pid: p._id,
        qty: p.qty,
        numOfDays: 0,
        hoursPerDay: 0
      }
      addToCartCheckout(data)
    }) 
  }

  return (
    <>
    <Header />
    <div className="container container-cart">
      <div className="container-cards container-cards_cart">
        <List sx={{ width: "100%", maxWidth: 700 }}>

          {state.cart.map((item, index) => (
            <div key={index}>
              <ListItem
                alignItems="flex-start"
                disablePadding
                sx={{
                  backgroundColor: "white",
                  m: 1,
                  border: "1px solid black",
                }}
              >
                <Grid container spacing={1} sx={{ p: 1 }}>
                  <Grid item xs={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <ListItemText
                      primary={item.name}
                      secondary={`5 hours - Rs. ${item.price}`}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControl sx={{ m: 1 }} fullWidth size="small">
                      <InputLabel variant="standard"></InputLabel>
                      <Select
                        labelId="product-qty"
                        id="product-qty"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch({
                            type: CHANGE_CART_QTY,
                            payload: {
                              _id: item._id,
                              qty: e.target.value
                            }
                          })
                        }}
                      >
                        {[...Array(item.inStock).keys()].map((x) => (
                          <MenuItem value={x+1} key={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                          {/* Date Time */}
                  </Grid>

                  <Grid item xs={1}>
                    <IconButton aria-label="delete" onClick={() => handleDelete(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>

              </ListItem>
            </div>
          ))}
        </List>
      </div>

      <div className="cart_summary">
        <div className="title">Subtotal ({state.cart.length}) Items</div>
        <div style={{ fontWeight: 700, fontSize: 20 }}>Total: {total}</div>
        <Button
          variant="contained"
          aria-label="proceed to checkout"
          disabled={state.cart.length === 0}
          onClick={() => handleCheckout()}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
    </>
  );
}
