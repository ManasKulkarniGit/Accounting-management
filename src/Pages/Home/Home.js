import React, { useEffect, useContext,useState } from "react";
import { ThemeContext, LoaderContext } from "../../App";
import { motion } from "framer-motion";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Card from "../../Components/Card/Card";
import SummaryCards from "../../Components/Card/SummaryCards";
import Chart from "../../Components/Chart&Table/Chart";
import Loader from "../../Reusable Components/Loader";
// import TransactionDataTable from "../../Components/Chart&Table/TransactionDataTable";
// import { transactionTableData } from "../../Components/Chart&Table/TransactionData";
// import { data } from "../../Components/Chart&Table/ChartData";
import "../../App.sass";
import "./Home.sass";
import { collection, query, getDocs , where } from "firebase/firestore";
import db from "../../firebase"


const Home = () => {
  const { handleDarkMode } = useContext(ThemeContext);
  const { isLoading } = useContext(LoaderContext);
  const [currentPost, setCurrentPost] = useState([]);
  const [data, setdata] = useState([]);
  const currentDate = new Date();
  // const currentMonth = currentDate.getMonth();
  // const currentYear = currentDate.getFullYear();

  // const startOfWeeks = [];
  // const endOfWeeks = [];
  // for (let weekNumber = 1; weekNumber <= 4; weekNumber++) {
  //     const startOfWeek = new Date(currentYear, currentMonth, 1 + (weekNumber - 1) * 7);
  //     const endOfWeek = new Date(currentYear, currentMonth, startOfWeek.getDate() + 6);
  //     startOfWeeks.push(startOfWeek);
  //     endOfWeeks.push(endOfWeek);
  // }

  // const currentDate = new Date();
  const startOfWeeks = [];
  const endOfWeeks = [];
  
  for (let weekNumber = 4; weekNumber >= 1; weekNumber--) {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - (7 * weekNumber));
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      startOfWeeks.push(startOfWeek);
      endOfWeeks.push(endOfWeek);
  }

  useEffect(() => {
    document.title = "Home | Admin Dashboard";
  }, []);
  useEffect(() => {
    const fetchData = async() => {
      const a=[]
      for (let i = 0; i < startOfWeeks.length; i++) {
        let b=[]
        const start = startOfWeeks[i];
        const end = endOfWeeks[i];
        const q = query(collection(db, "orders"), where("date", ">=", start),where("date","<=",end));
        const queryt = await getDocs(q);
        queryt.forEach((doc) => {
            b.push(doc.data())
        });
        a.push(b);
      }
      console.log(a);
      setCurrentPost(a)
        
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const inig=()=>{
    if(currentPost.length !==0 ){
      const formattedData = [];
      currentPost.forEach((weekSales, index) => {
        const weekStats = {
          name: `Week ${index + 1}`,
          "Total Orders": weekSales.length,
          "Orders Delivered": weekSales.filter(order => order.status === 'delivered').length,
          "Orders Pending": weekSales.filter(order => order.status === 'pending').length,
        };

        formattedData.push(weekStats);
      });
      setdata(formattedData)   
    }
  }

  useEffect(()=>{
    if(currentPost.length !== 0){
        inig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPost])







  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <main className="dashboard_container_main">
              <Sidebar />
              <div className="dashboard_container_right_panel" id="report_page">
                <Navbar handleDarkMode={handleDarkMode} />
                <div className="cards_container">
                  <Card type="sales" backgroundColor={"#DCFCE7"} />
                  <Card type="orders" backgroundColor={"#FFF4DE"} />
                  <Card type="products" backgroundColor={"#F4E8FF"} />
                  <Card type="users" backgroundColor={"#FFE2E6"} />
                </div>
                <div className="charts_container">
                  <Chart
                    data={data}
                    title="Orders in last 4-weeks"
                    fillColor1="#2196f3"
                    fillColor2="#4caf50"
                    fillColor3="#ff9800"
                  />
                </div>
                <div className="summary_cards_container">
                  <SummaryCards />
                </div>
                {/* <div className="lists_container">
                  <h4 className="p-2">Latest Tranaction</h4>
                  <TransactionDataTable tableRows={transactionTableData} />
                </div> */}
              </div>
            </main>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Home;
