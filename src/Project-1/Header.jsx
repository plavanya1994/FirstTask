import React,{useState,useEffect, useContext} from "react";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchTerm } from "../Redux/SearchSlice";


const Header = () => {
  const dispatch = useDispatch();
  const [numberofitems,setNumberOfItems] = useState(0);
  const navigate = useNavigate();
  const {searchQuery, setSearchQuery} = useContext(SearchContext)
  const count = useSelector((state) => state.counter.value)
  const term = useSelector((state) => state.search.name)

    useEffect(() => {
      const y = JSON.parse(localStorage.getItem("list"));
      setNumberOfItems(y?.length);
    }, [localStorage]);

    const navigateFunction = () => {
      navigate(`/shoppingcart`)
    }

    const searchHandler = (e) => {
      // setSearchQuery(e.target.value)
      dispatch(searchTerm(e.target.value))
    }
    
  return (
    <>
      <nav className="navbarstyle">
        <div className="header_container">
          <h2>LOGO</h2>
          <input
            type="search"
            className="nav_search"
            style={{ borderRadius: "20px", borderColor: "#ddd7d7" }}
            placeholder="Search Product"
            // value={searchQuery}
            value={term}
            onChange={(e) => searchHandler(e)}
          />
          <div className="headercart pointer" onClick={() => navigateFunction()}>
            <i className="fa-solid fa-cart-shopping"></i>{" "}
            <Badge bg="secondary">{count}</Badge>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
