import {
    TableCell,
    Table,
    TableBody,
    TableHead,
    TableRow,
  } from "@mui/material";
  import Paper from "@mui/material/Paper";
  import { useTheme } from "@mui/material/styles";
  import { useState,useEffect } from "react";
  import PropTypes from "prop-types";
  import "../../Reusable Styling/Table.sass";
  import { collection, query, getDocs , deleteDoc , doc , where} from "firebase/firestore";
  import db from "../../firebase"
  import toast from "react-hot-toast";
  import { Link } from "react-router-dom";
  
  const SalesTable = ({ onRowClick, tableRows }) => {
    const theme = useTheme();
    const [a, seta] = useState(tableRows);
    useEffect(()=>{
      if(tableRows.length !== 0){
          seta(tableRows)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tableRows])
   
    const tableCellNamesForTransaction = [
      "Order ID",
      "Customer",
      "Staff Id",
      "Date",
      "Payment Method",
      "Status",
      "Delete",
      "View Products"
    ];
  
    function handleDelete(id) {
      // console.log(typeof(id),id)
      const q = query(collection(db, "orders"), where("id", "==", id));
      getDocs(q)
        .then((querySnapshot) => {
          // console.log("hiii")
          // console.log(querySnapshot.empty)
          if (!querySnapshot.empty) {
            const document = querySnapshot.docs[0];
            const documentRef = doc(db, "orders", document.id);
            deleteDoc(documentRef)
              .then(() => {
                toast.success("Order deleted successfully");
                seta(a.filter((row) => row.id !== id));
              })
              .catch((error) => {
                console.error("Error deleting document:", error);
              });
          } else {
            console.log("Document with the specified attribute not found.");
          }
        })
        .catch((error) => {
          console.error("Error getting documents:", error);
        });
      
    }
  
    return (
      <div
        component={Paper}
        className="table"
        sx={{
          pl: { sm: 1 },
          pr: { xs: 1, sm: 1 },
          "& th, & td": {
            fontSize: theme.breakpoints.values.sm < 600 ? "12px" : "inherit",
          },
          mt: 2,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="Table">
          <TableHead>
            <TableRow>
              {tableCellNamesForTransaction.map((name, i) => (
                <TableCell className="table_cell" sx={{ p: 1 }} key={i}>
                  {name}{" "}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {a &&
              a.map((row) => (
                <TableRow key={row.id} onClick={() => onRowClick(row.id)}>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.id}{" "}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    <div className="cell_wrapper">
                      {row.customername}
                    </div>
                  </TableCell>
                  {/* <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.customer}
                  </TableCell> */}
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.staffid}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.date}
                  </TableCell>
                  {/* <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.quantity}
                  </TableCell> */}
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {row.paymentmethod}
                  </TableCell>
                  <TableCell sx={{ p: 1 }}>
                    <span
                      className={`status ${
                        row.status && row.status.toLowerCase()
                      }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell>
                      <div className="cell_action_div">
                        {/* <Link
                          to={'/'}
                          style={{ textDecoration: "none", color: "unset" }}
                          className="view_btn"
                        >
                          View
                        </Link> */}
                        <div
                          className="delete_btn"
                          style={{width:"3.2rem"}}
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </div>
                      </div>
                  </TableCell>
                  <TableCell>
                    <Link
                        to={`/order/${row.id}/products`}
                        style={{ textDecoration: "none", color: "unset" }}
                        className="view_btn"
                      >
                        View
                      </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  // Passing onRowClick as an empty default function
  SalesTable.defaultProps = {
    onRowClick: () => {},
  };
  
  SalesTable.propTypes = {
    onRowClick: PropTypes.func,
  };
  
  export default SalesTable;
  