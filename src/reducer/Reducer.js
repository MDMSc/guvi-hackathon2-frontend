import React from "react";
import {
  ADD_TO_CART,
  CHANGE_CART_QTY,
  REMOVE_FROM_CART,
  FILTER_BY_PHOTOGRAPHY,
  FILTER_BY_MUSICAL,
  FILTER_BY_TW,
  FILTER_BY_SEARCH,
  CLEAR_FILTERS,
  LOGIN_SUCCESS,
  IS_ADMIN,
  LOGOUT,
  INITIALIZE_LIST,
  GET_SINGLE,
  INITIALIZE_CART,
} from "./Action.type";

export const Reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_CART:
      return {
        ...state,
        cart: [...action.payload],
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.payload._id),
      };
    case CHANGE_CART_QTY:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c._id === action.payload._id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const FilterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_BY_PHOTOGRAPHY:
      return { ...state, byCatP: !state.byCatP };
    case FILTER_BY_MUSICAL:
      return { ...state, byCatM: !state.byCatM };
    case FILTER_BY_TW:
      return { ...state, byCatTW: !state.byCatTW };
    case FILTER_BY_SEARCH:
      return { ...state, searchQuery: action.payload };
    case CLEAR_FILTERS:
      return {
        byCatP: false,
        byCatM: false,
        byCatTW: false,
        searchQuery: "",
      };
    default:
      return state;
  }
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(state.isLoginSuccess)
      return {...state, isLoginSuccess: !state.isLoginSuccess};
    case IS_ADMIN:
      return {...state, isAdmin: !state.isAdmin};
    case LOGOUT:
      return {
        isLoginSuccess: false,
        isAdmin: false
      }
    default:
      return state;
  }
}

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_LIST:
      return {
        ...state,
        initialList: [...action.payload] ,
      };
    case GET_SINGLE:
      return {
        ...state,
        singleProduct: {...action.payload} ,
      };
    default:
      return state;
  }
}
