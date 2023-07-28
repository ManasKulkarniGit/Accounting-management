import React, { useState, useEffect } from "react";
import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import TransactionDataTable from "../../Components/Chart&Table/TransactionDataTable";
import OrderSummary from "../../Reusable Components/OrderSummary";
import { transactionTableData } from "../../Components/Chart&Table/TransactionData";
import "../../Reusable Styling/Table.sass";
import { collection, query, getDocs, where } from "firebase/firestore";
import db from "../../firebase"
import SalesTable from "../../Components/Chart&Table/SalesTable";
// import { toast } from "react-hot-toast";

const Sales = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  // const [selectedRowId, setSelectedRowId] = useState(
  //   transactionTableData[0]?.id
  // );
  // const selectedRow = transactionTableData.find(
  //   (row) => row.id === selectedRowId
  // );

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

  const handleRowClick = (id) => {
    // setSelectedRowId(id);
  };

  useEffect(() => {
    document.title = "All Orders | Admin Dashboard";
  });

  async function getSubproducts() {
    const subproductsCollectionRef = collection(db, "sub-product");
    const subproductsQuerySnapshot = await getDocs(
      query(subproductsCollectionRef)
    );
    const subproducts = subproductsQuerySnapshot.docs.map((doc) => doc.data());
    return subproducts;
  }
  const [totalBalance,settotalBalance] = useState(0);
  const [totalq,settotalq] = useState(0);
  const totalsales=rows.length
  const [totalPendingOrder, settotalPendingOrder] = useState([]);
  const [totalDeliveredOrder, settotalDeliveredOrder] = useState([]);
  const [totalCashPaymentOrder, settotalCashPaymentOrder] = useState([]);
  const [totalOnlinePaymentOrder, settotalOnlinePaymentOrder] = useState([]);

  async function Handle() {

        const subproducts = await getSubproducts();
        // console.log(subproducts)
        let total=0;
        let c=0;
        let d=0;
        let p=0;
        let ca=0;
        let on=0;
        if (rows.length > 0) {
          rows.forEach((order) => {
                if(order.status === "pending"){
                  p=p+1
                }
                else{
                  d=d+1
                }
                if(order.paymentmethod === "cash"){
                  ca=ca+1
                }
                else{
                  on=on+1
                }
              if(order.products.length > 0){
                order.products.forEach((sub)=>{
                  c=c+1 
                  let u=subproducts.filter((a)=>
                    sub.subproductId === a.id
                  )
                  total+=(sub.quantity*u[0].sellCost)
                })                
              }
          });
          settotalBalance(total)
          settotalq(c)
          settotalPendingOrder(p)
          settotalOnlinePaymentOrder(on)
          settotalCashPaymentOrder(ca)
          settotalDeliveredOrder(d)
          
        } else {
            console.log("No sales");
        }      
    }
  
    useEffect(() => {
      if(rows.length !== 0){
        Handle();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows]); 




  // const totalBalance = transactionTableData.reduce(
  //   (acc, curr) => acc + curr.amount,
  //   0
  // );

  // const totalPendingOrder = transactionTableData.filter((data) => {
  //   return data.status === "Pending";
  // }).length;

  // const totalDeliveredOrder = transactionTableData.filter((data) => {
  //   return (data.status = "Delivered");
  // }).length;

  // const totalCashPaymentOrder = transactionTableData.filter((data) => {
  //   return data.method.includes("Cash");
  // }).length;

  // const totalOnlinePaymentOrder = transactionTableData.filter((data) => {
  //   return data.method.includes("Online");
  // }).length;

  const tableHeaders = [
    "Total Balance",
    "Total Sales",
    "Total Quantity",
    "Total Delivered",
    "Total Pending",
    "Cash Payment",
    "Online payment",
  ];

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <SalesTable
            tableRows={rows}
            onRowClick={handleRowClick}
          />
          <div
            component={Paper}
            className="table"
            sx={{
              pl: { sm: 1 },
              pr: { xs: 1, sm: 1 },
              "& th, & td": {
                fontSize:
                  theme.breakpoints.values.sm < 600 ? "12px" : "inherit",
              },
              mt: 2,
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="Table"
              style={{ fontSize: "11.5px" }}
            >
              <TableHead>
                <TableRow>
                  {tableHeaders.map((name, i) => (
                    <TableCell className="table_cell" sx={{ p: 1 }} key={i}>
                      {name}{" "}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalBalance}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalsales}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalq}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalDeliveredOrder} Delivered
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalPendingOrder} Pending
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalCashPaymentOrder} - Cash On Delivery
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalOnlinePaymentOrder} - Online payment
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sales;
