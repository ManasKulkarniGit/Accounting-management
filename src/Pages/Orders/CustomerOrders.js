import React, { useState, useContext, useEffect } from "react";
import { LoaderContext, ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import TransactionDataTable from "../../Components/Chart&Table/TransactionDataTable";
import OrderSummary from "../../Reusable Components/OrderSummary";
import Loader from "../../Reusable Components/Loader";
import "../../App.sass";
import "../../Pages/Orders/Orders.sass";
import "../../Pages/Home/Home.sass";
import { collection, query, getDocs, where } from "firebase/firestore";
import db from "../../firebase"
import {Link, useParams} from "react-router-dom"


const CustomerOrders = () => {
  const {id} = useParams();
  const { isLoading } = useContext(LoaderContext);
  const { userName } = useContext(ProfileContext);
  // const [selectedRowId, setSelectedRowId] = useState(0)
  const [rows, setRows] = useState([]);
  const ng = `/customer/${id}/addorder`
  // const navigate = useNavigate();
  


  // Change the corresponding chart, bar graph and list data if the transaction table row is clicked
  // const handleRowClick = (id) => {
  //   let g=`/order/${id}`
  //   navigate(g);
  // };

  useEffect(() => {
    document.title = "Orders | Admin Dashboard";
  }, []);

  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "orders"),where("customer","==",id));
            const queryt = await getDocs(q);
            queryt.forEach((doc) => {
                a.push(doc.data())
            });
            // console.log(a)
            setRows(a);
        } catch(err) {
            console.error(err);
        }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="dashboard_container_main">
          <Sidebar />
          <div className="dashboard_container_right_panel">
            <Navbar />
            <div className="order_info_container_div">
              <h4
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                }}
              >
                Orders handled by Admin | {userName}
              </h4>
              <div className="order_div_wrapper">
                <OrderSummary />
                {/* <div className="charts_container">
                  <Chart
                    title="Order handled by Admin ( Last 4 weeks)"
                    fillColor1="#027F89"
                    fillColor2="#82ca9d"
                    fillColor3="#ffc658"
                    data={chartData}
                    onRowClick={handleRowClick}
                  />
                </div> */}
              </div>
              <div className="transaction_list_div">
                <h4 className="transaction_list_div_title">
                  Orders
                </h4>
                <TransactionDataTable
                  // onRowClick={handleRowClick}
                  tableRows={rows}
                />
              </div>
              <Link to={ng} style={{ textDecoration: "none", color: "unset" }}>
                  <button className="btn btn-primary">ADD</button>
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default CustomerOrders;
