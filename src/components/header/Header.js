import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import Context from "../../reducer/Context";
import { LOGOUT } from "../../reducer/Action.type";

export default function Header() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { userState, userDispatch } = useContext(Context);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenCartMenu = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EQUIPMENT RENTAL PORTAL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => navigate("/")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/products")}>
                <Typography textAlign="center">Products</Typography>
              </MenuItem>
              {userState.isAdmin ? (
                <>
                  <MenuItem onClick={() => navigate("/add-product")}>
                    <Typography textAlign="center">Add Product</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/cart")}>
                    <Typography textAlign="center">
                      View Rented Items
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => navigate("/contact")}>
                  <Typography textAlign="center">Contact Us</Typography>
                </MenuItem>
              )}

            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EQUIPMENT RENTAL PORTAL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/products")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Products
            </Button>
            {userState.isAdmin ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/add-product")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Add Product
                </Button>

                <Button
                  color="inherit"
                  onClick={() => navigate("/cart")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  View Rented Items
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate("/contact")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Contact Us
              </Button>
            )}

          </Box>

          {/* Account and Cart */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userState.isLoginSuccess ? (
                <MenuItem onClick={() => {
                  userDispatch({
                    type: LOGOUT
                  });
                  navigate("/");
                }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => navigate("/login")}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>

            {!userState.isAdmin ? (
              <>
                <Tooltip title="Cart">
                  <IconButton onClick={handleOpenCartMenu} sx={{ m: 1, p: 2 }}>
                    <Badge
                      badgeContent={context.state.cart.length}
                      color="secondary"
                    >
                      <ShoppingBagIcon fontSize="large" />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-cart"
                  anchorEl={anchorElCart}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElCart)}
                  onClose={handleCloseCartMenu}
                >
                  {context.state.cart.length > 0 ? (
                    <MenuItem
                      onClick={() => {
                        navigate("/cart");
                        setAnchorElCart(null);
                      }}
                    >
                      <Typography textAlign="center">Go To Cart</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Typography textAlign="center">Cart is Empty!</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : null}
            {/* <Tooltip title="Cart">
              <IconButton onClick={handleOpenCartMenu} sx={{ m: 1, p: 2 }}>
                <Badge
                  badgeContent={context.state.cart.length}
                  color="secondary"
                >
                  <ShoppingBagIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-cart"
              anchorEl={anchorElCart}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElCart)}
              onClose={handleCloseCartMenu}
            >
              {context.state.cart.length > 0 ? (
                <MenuItem
                  onClick={() => {
                    navigate("/user/cart");
                    setAnchorElCart(null);
                  }}
                >
                  <Typography textAlign="center">Go To Cart</Typography>
                </MenuItem>
              ) : (
                <MenuItem>
                  <Typography textAlign="center">Cart is Empty!</Typography>
                </MenuItem>
              )}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
