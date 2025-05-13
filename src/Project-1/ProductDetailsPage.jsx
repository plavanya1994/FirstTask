import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { increment } from "../Redux/CartCounterSlice";
import { useDispatch } from "react-redux";



const ProductDetailsPage = () => {
    const dispatch = useDispatch()
    const [data,setData] = useState({});
    const {id} = useParams();
    const [cartData,setCartData] = useState([]);
    const [isButtonClick,setIsButtonClick] = useState(false)

    const URL ="https://dummyjson.com/products/"

    const fetchData = async(apiURL) => {
        // const res = await fetch(apiURL+id)
        // console.log(res)
        // const output = await res.json()
        // setData(output)
        axios.get(apiURL+id).then((res) => {
            setData(res.data)
        })
    }

    useEffect(() => {
        fetchData(URL)
        const y = JSON.parse(localStorage.getItem('list'))
        setCartData(y)

    },[])

    const cartHandler = () => {
        const x = cartData?.length ? [...cartData,data] : [data]
        setCartData(x)
        localStorage.setItem('list', JSON.stringify(x))
        setIsButtonClick(true)
        dispatch(increment())
    }

console.log(data)

    return(
    <>      
            <div>
                 <img src={data.images} width={50} height={50}/>
                 <h5>{data.title}</h5>
                 <h3>{data.price}</h3>
                 <h3>{data.description}</h3>  
                 {cartData.some((item) => item.id === data.id) ? (
                            <span>Item added to the cart</span>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={() => cartHandler()}
                            >
                              Add to Cart
                            </Button>
                          )}            
                {/* {isButtonClick ? <h3>item added to the cart</h3>:  <Button variant="primary" onClick={() => cartHandler()}>Add to Cart</Button> } */}

            </div>
    </>)

}
export default ProductDetailsPage;

