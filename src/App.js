import { Routes, Route } from 'react-router-dom';
import './App.css';
import ContactUs from './components/contact/ContactUs'
import Home from './components/body/Home';
// import Header from './components/header/Header';
import ProductsList from './components/body/ProductsList';
import Context from './reducer/Context';
import { useReducer } from 'react';
import {Reducer, UserReducer, FilterReducer, ProductReducer} from './reducer/Reducer.js';
import CartPage from './components/body/CartPage';
import AddProduct from './components/adminforms/AddProduct';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import EditProduct from './components/adminforms/EditProduct';

// const products = [
//   {
//     id: 1,
//     name: "AAAAAAAAAAA",
//     price: 300,
//     type: "photography",
//     inStock: 10,
//     image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
//   },
//   {
//     id: 2,
//     name: "BBBBBBBBBBBB",
//     price: 300,
//     type: "music",
//     inStock: 10,
//     image: "",
//   },
//   {
//     id: 3,
//     name: "CCCCCCCCCCCC",
//     price: 300,
//     type: "scooty",
//     inStock: 10,
//     image: "",
//   },
//   {
//     id: 4,
//     name: "DDDDDDDDDDDDDDDDDDDD",
//     price: 300,
//     type: "photography",
//     inStock: 10,
//     image: "",
//   },
//   {
//     id: 5,
//     name: "AAaBBBBBBBBBBBB",
//     price: 300,
//     type: "music",
//     inStock: 10,
//     image: "",
//   },
// ];

function App() {
  const [state, dispatch] = useReducer(Reducer, {
    cart: []
  });

  const [pState, pDispatch] = useReducer(ProductReducer, {
    initialList: [],
    singleProduct: {}
  })

  const [filterState, filterDispatch] = useReducer(FilterReducer, {
    byCatP: false,
    byCatM: false,
    byCatTW: false,
    searchQuery: ""
  });

  const [userState, userDispatch] = useReducer(UserReducer, {
    isLoginSuccess: false,
    isAdmin: false
  })

  return (
    <Context.Provider value={{state, dispatch, filterState, filterDispatch, userState, userDispatch, pState, pDispatch}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit/:_id" element={<EditProduct />} />
      </Routes>
      </Context.Provider>
  );
}

export default App;
