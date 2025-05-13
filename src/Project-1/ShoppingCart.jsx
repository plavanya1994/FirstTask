import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { increment,decrement } from "../Redux/CartCounterSlice";

const ShoppingCart = () => {
  const [shoppingcart, setShoppingCart] = useState([]);

  useEffect(() => {
    const y = JSON.parse(localStorage.getItem("list"));
    console.log(y);
    setShoppingCart(y);
  }, []);

  const deleteHandler = (id) => {
    const y = shoppingcart.filter((eachitem) => eachitem.id != id);
    // setShoppingCart(y)
    setShoppingCart(y);
    localStorage.setItem("list", JSON.stringify(y));
  };

  function getTotalPrice(items) {
    return items.reduce((total, item) => total + item.price, 0);
  }

  return (
    <>
      <h1 className="textstyle">Shopping Cart</h1>
      <div>
        {shoppingcart.map((item) => (
          <div className="row rowpadding">
            <div className="col-8 d-flex">
              <img
                src={item.images}
                width={80}
                height={80}
                className="imgmargin"
              />
              <div>
                <h5>{item.title}</h5>
                <h5>{item.price}</h5>
              </div>
            </div>

            <div className="col-4">
              <span onClick={() => deleteHandler(item.id)} className="pointer">
                Remove
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="right">
        <h5>Total {getTotalPrice(shoppingcart)}</h5>
        <Button>Proceed to checkout</Button>
      </div>
    </>
  );
};
export default ShoppingCart;
