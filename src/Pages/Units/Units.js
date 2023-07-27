import React, { useContext, useEffect,useState } from "react";
import styled from "styled-components";
import { ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import ListInTable from "../../Reusable Components/DataTable";
import { unitListTableColumns } from "./UnitData";
import "../../App.sass";
import { collection, query, getDocs , deleteDoc , doc , where} from "firebase/firestore";
import db from "../../firebase"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";



const Units = () => {
  const { userName } = useContext(ProfileContext);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "customers"));
            const queryt = await getDocs(q);
            queryt.forEach((doc) => {
                a.push(doc.data())
            });
            setRows(a);
        } catch(err) {
            console.error(err);
        }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 


  useEffect(() => {
    document.title = "Customers | Admin Dashboard";
  });

  function handleDelete(id) {
    // console.log(typeof(id),id)
    const q = query(collection(db, "customers"), where("id", "==", id));
    getDocs(q)
      .then((querySnapshot) => {
        // console.log("hiii")
        // console.log(querySnapshot.empty)
        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          const documentRef = doc(db, "customers", document.id);
          deleteDoc(documentRef)
            .then(() => {
              toast.success("customer deleted successfully");
              setRows(rows.filter((row) => row.id !== id));
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const g=`/customer/${params.row.id}`
        const orders = `/customer/${params.row.id}/orders`
        return (
          <div className="cell_action_div">
            <Link
              to={g}
              style={{ textDecoration: "none", color: "unset" }}
              className="view_btn"
            >
              View
            </Link>
            <div
              className="delete_btn"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link
              to={orders}
              style={{ textDecoration: "none", color: "unset" }}
              className="view_btn"
            >
              Orders
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="products_list_container">
            <div className="products_list_container_title">
              <h4
                className="p-2 mb-0"
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                }}
              >
                Customers handled by Admin | {userName}
              </h4>
            </div>
            <ListInTable
              rows={rows}
              columns={unitListTableColumns.concat(actionColumn)}
              height={400}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export const ProductListContainer = styled.div`
  /* Resetting MUI table color props */
  p,
  .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel,
  div.MuiTablePagination-actions > button button {
    color: inherit;
  }

  .MuiToolbar-root {
    color: inherit;
  }
  /* END */
`;

export default Units;
