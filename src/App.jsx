import React, { useState } from "react";
import Navbar from "./Component/Navbar";
import Cart from "./Component/Cart";
import "./Styles/product.css";
import Product from "./Component/Product";

const App = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleClick = (item) => {
    // add the item
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true; //help of id check item present
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000); //already added show warning
      return;
    }
    setCart([...cart, item]); //else add item
  };

  const handleChange = (item, d) => {
    //change amount of item
    let ind = -1;
    cart.forEach((data, index) => {
      //find index of item in cart
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart; //create temp. array to modify
    tempArr[ind].amount += d; //update amount of item

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1; // amount not below 1
    setCart([...tempArr]); // update the cart with modify temp. array
  };

  return (
    <>
      <Navbar size={cart.length} setShow={setShow} />
      {show ? (
        <Product handleClick={handleClick} />
      ) : (
        //false
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
      )}
      {warning && <div className="warning">Item is already added.</div>}
    </>
  );
};

export default App;
