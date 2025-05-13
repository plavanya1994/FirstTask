import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import starIcon from "../assets/Images/star-sharp-svgrepo-com.svg";
import starIconFilled from "../assets/Images/star-svgrepo-com (1).svg";
import Rating from "react-rating";

const Sidebar = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const[range,setRange]= useState();
  const [star,setStar]= useState(0);

  const onChangeHandler = (e) => {
    console.log(e.target.id);
    setSelectedValue(e.target.id);

    if (e.target.id === "all") {
      props.setData(props.productsData);
    } else {
      const receiveddata = props.productsData.filter(
        (item, index) => item.category === e.target.id
      );
      props.setData(receiveddata);
    }
  };

  const onChangeHandlerChange = (e) => {
    console.log(e.target.value)
    setRange(e.target.value)

    const prices = props.productsData.filter((item,index) => Math.round(item.price) == e.target.value)
    props.setData(prices)
    console.log(prices)

  }

  const onChangeHandlerStar = (value) => {
    console.log(value)

    const rating = props.productsData.filter ((item,index) => Math.round(item.rating) == value )
    props.setData(rating)

  }



  return (
    <>
      <div className="sidebarparent">
        <h3>Filter</h3>
        <div>
          <h5>Category</h5>
          <Form>
            <Form.Check
              type={"radio"}
              label={`all`}
              id={`all`}
              checked={selectedValue === `all`}
              onChange={(e) => onChangeHandler(e)}
            />
            <Form.Check
              type={"radio"}
              label={`beauty`}
              id={`beauty`}
              checked={selectedValue === `beauty`}
              onChange={(e) => onChangeHandler(e)}
            />
            <Form.Check
              type={"radio"}
              label={`fragrances`}
              id={`fragrances`}
              checked={selectedValue === `fragrances`}
              onChange={(e) => onChangeHandler(e)}
            />
            <Form.Check
              type={"radio"}
              label={`furniture`}
              id={`furniture`}
              checked={selectedValue === `furniture`}
              onChange={(e) => onChangeHandler(e)}
            />
            <Form.Check
              type={"radio"}
              label={`groceries`}
              id={`groceries`}
              checked={selectedValue === `groceries`}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form>
          <div>
            <Form.Label> Price Range {range}</Form.Label>
            <Form.Range value={range} min={0} max={1000} onChange={(e) => onChangeHandlerChange(e)}/>
          </div>
          <div>
            <h5>Rating</h5>
            {/* <div className="ratingparent">
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
            </div>
            <div className="ratingparent">
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
            </div>
            <div className="ratingparent">
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
            </div>
            <div className="ratingparent">
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
              <img src={starIcon} width={23} height={23} />
            </div> */}

            <Rating value={star} onChange={(value) => onChangeHandlerStar(value)}
              emptySymbol={
                <img src={starIcon} className="icon" width={23} height={23}/>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
