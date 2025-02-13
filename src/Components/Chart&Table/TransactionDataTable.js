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
import { collection, query, getDocs , deleteDoc , doc , where, updateDoc} from "firebase/firestore";
import db from "../../firebase"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const TransactionDataTable = ({ onRowClick, tableRows }) => {
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
    // "Product",
    // "Customer",
    "Staff Id",
    "Date",
    // "Quantity",
    "Payment Method",
    "Status",
    "Delete",
    "View Products",
    "Change Status",
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
          // console.log(documentRef);
          // console.log(document.data());
          const productsArray = document.data().products;
          const subproductsToUpdate = productsArray.map((product) => ({
            subproductId: product.subproductId,
            quantity: parseInt(product.quantity), 
          }));
          // console.log(subproductsToUpdate);
          deleteDoc(documentRef)
            .then(() => {
              subproductsToUpdate.forEach((subproduct) => {
                // const subproductRef = doc(db, "sub-product", subproduct.subproductId);
                let tmp = query(collection(db, "sub-product"), where("id", "==", subproduct.subproductId));
                getDocs(tmp)
                .then((querySnapshot) => {
                  if (!querySnapshot.empty) {
                  querySnapshot.forEach((docg) => {
                      const documentRef = doc(db, "sub-product", docg.id);
                      let oq=parseInt(docg.data().quantity)
                      let nq=oq+subproduct.quantity;
                      updateDoc(documentRef, {quantity : nq.toString()})
                      .then(() => {
                          console.log("product delete yes");
                          toast.success("Order deleted successfully");
                          seta(a.filter((row) => row.id !== id));
                      })
                      .catch((error) => {
                          console.error("Error updating document:", error);
                      });
                  });
                  } else {
                    console.log("Document with the specified attribute not found.");
                  }
              })
              .catch((error) => {
                  console.error("Error getting documents:", error);
              });
              });
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

  function handleUpdateStatus(id, newStatus) {
    const q = query(collection(db, "orders"), where("id", "==", id));
    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          const documentRef = doc(db, "orders", document.id);
  
          // Update the status field in the document with the new status
          updateDoc(documentRef, { status: newStatus })
            .then(() => {
              toast.success("Order status updated successfully");
              // Update the local state to reflect the new status
              seta((prevOrders) =>
                prevOrders.map((order) =>
                  order.id === id ? { ...order, status: newStatus } : order
                )
              );
            })
            .catch((error) => {
              console.error("Error updating document:", error);
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
                {/* <TableCell className="table_cell" sx={{ p: 1 }}>
                  <div className="cell_wrapper">
                    {row.ordername}
                  </div>
                </TableCell> */}
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
                <TableCell className="table_cell" sx={{ p: 1 }}>
                <select
                    value={row.status}
                    onChange={(e) => handleUpdateStatus(row.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="inprocess">Inprocess</option>
                  <option value="rejected">Rejected</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                    {/* Add more status options as needed */}
                </select>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Passing onRowClick as an empty default function
TransactionDataTable.defaultProps = {
  onRowClick: () => {},
};

TransactionDataTable.propTypes = {
  onRowClick: PropTypes.func,
};

export default TransactionDataTable;
