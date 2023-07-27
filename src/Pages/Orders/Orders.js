import React, { useState, useContext, useEffect } from "react";
import { LoaderContext, ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Chart from "../../Components/Chart&Table/Chart";
// import TransactionDataTable from "../../Components/Chart&Table/TransactionDataTable";
import OrderTable from "../../Components/Chart&Table/OrderTable";
import OrderSummary from "../../Reusable Components/OrderSummary";
import Loader from "../../Reusable Components/Loader";
import { transactionTableData } from "../../Components/Chart&Table/TransactionData";
import { data } from "../../Components/Chart&Table/ChartData";
import "../../App.sass";
import "../../Pages/Orders/Orders.sass";
import "../../Pages/Home/Home.sass";
import { collection, query, getDocs, where } from "firebase/firestore";
import db from "../../firebase"
import {useNavigate} from "react-router-dom"


const Orders = () => {
  const { isLoading } = useContext(LoaderContext);
  const { userName } = useContext(ProfileContext);
  // const [selectedRowId, setSelectedRowId] = useState(0)
  const [chartData, setChartData] = useState(data);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  


  // Change the corresponding chart, bar graph and list data if the transaction table row is clicked
  const handleRowClick = (id) => {
    let g=`/order/${id}`
    navigate(g);
  };

  useEffect(() => {
    document.title = "Orders | Admin Dashboard";
  }, []);

  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "orders"));
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
                <OrderTable
                  onRowClick={handleRowClick}
                  tableRows={rows}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Orders;
