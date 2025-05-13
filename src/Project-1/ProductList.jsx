import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Sidebar from "./Sidebar";
import starIcon from "../assets/Images/star-sharp-svgrepo-com.svg";
import starIconFilled from "../assets/Images/star-svgrepo-com (1).svg";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import { useContext } from "react";
import Pagination from "./Pagination";
import { increment,decrement } from "../Redux/CartCounterSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


const ProductList = () => {
  const term = useSelector((state) => state.search.name)
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { searchQuery } = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 10;

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        if (term != "") {
          const filteredProducts = res.data.products.filter((product) =>
            product.title.toLowerCase().includes(term.toLowerCase())
          );
          setData(filteredProducts);
        }else{
          setData(res.data.products);
        }
        console.log(res.data.products);
        setProductsData(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const y = JSON.parse(localStorage.getItem("list"));
    setCart(y);
  }, []);

  const navigateFunction = (id) => {
    navigate(`/products/${id}`);
  };

  const cartHandler = (receiveditem, e) => {
    e.preventDefault();
    e.stopPropagation();
    const x = cart?.length ? [...cart, receiveditem] : [receiveditem];
    setCart(x);
    localStorage.setItem("list", JSON.stringify(x));
    dispatch(increment());
  };

  console.log(searchQuery);

  // useEffect(() => {
  //   if (searchQuery != "") {
  //     const filteredProducts = productsData.filter((product) =>
  //       product.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setData(filteredProducts);
  //   }
  // }, [searchQuery]);

  useEffect(() => {
    console.log(term)
    if (term != "") {
      const filteredProducts = productsData.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setData(filteredProducts);
    }
  }, [term]);

  let numOfPages = Math.ceil(data?.length / pageCount);
  let start = currentPage * pageCount;
  let end = start + pageCount;

  return (
    <>
      <div className="parentdiv">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numOfPages={numOfPages}
        />

        <div className="row">
          <div className="col-2 m-20">
            <div>
              <Sidebar
                data={data}
                setData={setData}
                productsData={productsData}
              />
            </div>
          </div>
          <div className="col-10 m-auto">
            <div className="cardstyles">
              {data?.length > 0 ? (
                // data.map((eachitem) => {
                data.slice(start, end).map((eachitem) => {
                  return (
                    <div>
                      <Card
                        style={{ width: "18rem"}}
                        key={eachitem.id}
                        onClick={() => navigateFunction(eachitem.id)}
                      >
                        <Card.Img variant="top" src={eachitem.images} />
                        <Card.Body>
                          <Card.Title>{eachitem.title}</Card.Title>
                          <Card.Text>${eachitem.price}</Card.Text>
                          <Rating
                            initialRating={Math.round(eachitem.rating)}
                            readonly
                            emptySymbol={
                              <img
                                src={starIcon}
                                className="icon"
                                width={23}
                                height={23}
                              />
                            }
                            fullSymbol={
                              <img
                                src={starIconFilled}
                                className="icon"
                                width={23}
                                height={23}
                              />
                            }
                          />
                          {cart?.some((item) => item.id === eachitem.id) ? (
                            <span>Item added to the cart</span>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={(e) => cartHandler(eachitem, e)}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h3>No data Found</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductList;
