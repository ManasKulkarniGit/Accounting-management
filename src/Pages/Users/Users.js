import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import ListInTable from "../../Reusable Components/DataTable";
import { userColumns } from "./UsersData";
import "../../App.sass";
import { collection, query, getDocs , deleteDoc , doc , where} from "firebase/firestore";
import db from "../../firebase"
import toast from "react-hot-toast";


const Users = () => {
  const [rows, setRows] = useState([]);
  const { userName } = useContext(ProfileContext);

  function handleDelete(id) {
    // console.log(typeof(id),id)
    const q = query(collection(db, "staff"), where("id", "==", id));
    getDocs(q)
      .then((querySnapshot) => {
        // console.log("hiii")
        // console.log(querySnapshot.empty)
        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          const documentRef = doc(db, "staff", document.id);
          deleteDoc(documentRef)
            .then(() => {
              toast.success("staff deleted successfully");
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
  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "staff"));
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const g=`/users/update/${params.row.id}`
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
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "Staff | Admin Dashboard";
  });

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <UserTable className="users_list_container">
            <div className="users_list_container_title">
              <h4
                className="p-2 mb-0"
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                }}
              >
                Staff handled by Admin | {userName}
              </h4>
            </div>
            <ListInTable
              rows={rows}
              columns={userColumns.concat(actionColumn)}
              height={680}
            />
          </UserTable>
        </div>
      </main>
    </>
  );
};

export const UserTable = styled.div`
  z-index: 0;
  /* Resetting MUI table color props */
  p,
  div.MuiTablePagination-actions > button {
    color: inherit;
  }
  /* END */
`;

export default Users;
