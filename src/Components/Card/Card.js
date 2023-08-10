import React from "react";
import { Link } from "react-router-dom";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import "./Card.sass";

const Card = ({ type, backgroundColor }) => {
  let data;
  switch (type) {
    case "sales":
      data = {
        title: "Total Sales",
        link: "/orders/sales",
        linkName: "See all earnings",
        dataTitle: "Total income generated after excluding marketing costs.",
        icon: <MonetizationOnOutlinedIcon className="icon" />,
      };
      break;

    case "orders":
      data = {
        title: "Total Orders",
        link: "/orders/sales",
        linkName: "See all orders",
        dataTitle:
          "Total no of orders shipped including free gifts for customer acquisition.",
        icon: <ShoppingCartOutlinedIcon className="icon" />,
      };
      break;

    case "products":
      data = {
        title: "Products Sold",
        link: "/products",
        linkName: "See all products",
        dataTitle: "All products shipped including free gifts and offers.",
        icon: <LoyaltyIcon className="icon" />,
      };
      break;

    case "users":
      data = {
        title: "New Users",
        link: "/users",
        linkName: "See all users",
        dataTitle:
          "Total no of users who subscribed for the daily newsletters and/or created a new account.",
        isMoney: true,
        icon: <PersonOutlinedIcon className="icon" />,
      };
      break;

    default:
      break;
  }
  return (
    <>
      <div
        className="card_div"
        title={data.dataTitle}
        style={{
          backgroundColor: `${backgroundColor}`,
          padding: "0.5rem",
          color: "#222",
        }}
      >
        <div className="card_div_left_content align-items-start">
          <p className="title">{data.title}</p>
          <Link
            to={data.link}
            style={{ textDecoration: "none", color: "unset" }}
          >
            <p className="link">{data.linkName}</p>
          </Link>
        </div>
        <div className="card_div_right_content align-items-center">
          <div className="growth_div text-center">
            {
              <>
                <p className="m-0 text-danger font-weight-bold">
                  {data.growthAmt}
                </p>
              </>
            }
          </div>
          {data.icon}
        </div>
      </div>
    </>
  );
};

export default Card;
