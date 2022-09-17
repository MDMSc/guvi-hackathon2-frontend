import React, { useContext, useEffect } from "react";
import Context from "../../reducer/Context";
import Header from "../header/Header";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import './productlist.css';
import {API} from "../Global";
import { INITIALIZE_LIST } from "../../reducer/Action.type";
import AdminProductCard from "./AdminProductCard";


export default function ProductsList() {
  const {pState, pDispatch} = useContext(Context);
  const {filterState} = useContext(Context);
  const {userState} = useContext(Context);

  const getList = async () => {
    return await fetch(`${API}/products`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((prod) => {
        pDispatch({
          type: INITIALIZE_LIST,
          payload: prod
        })
      });
  }

  useEffect(() => {
    getList()
  }, [])

  const filteredList = () => {
    let filterValues = pState.initialList;

    if(filterState.byCatP){
      filterValues = filterValues.filter((p) => p.type === "photography");
    }
    if(filterState.byCatM){
      filterValues = filterValues.filter((p) => p.type === "music");
    }
    if(filterState.byCatTW){
      filterValues = filterValues.filter((p) => p.type === "scooty");
    }

    if(filterState.searchQuery){
      filterValues = filterValues.filter((p) => (
        p.name.toLowerCase().includes(filterState.searchQuery.toLowerCase())
      ));
    }
    return filterValues;
  }

  return (
    <>
    <Header />
    <div className="container container-plist">
      <Filters />
      <div className="container-cards container-cards_plist">
        {filteredList().map((product) => (
          <div className="card-single" key={product._id}>
            {
              userState.isAdmin ? (<AdminProductCard product={product} />) : (<ProductCard product={product} />)
            }
           </div>
        ))}
      </div>
    </div>
    </>
  );
}
