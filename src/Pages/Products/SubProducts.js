import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
// import { ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import ListInTable from "../../Reusable Components/DataTable";
import { subproductListTableColumns } from "./subProductData";
import "../../App.sass";
import { collection, query, getDocs , deleteDoc , doc , where} from "firebase/firestore";
import db from "../../firebase"
import toast from "react-hot-toast";


const SubProducts = () => {
  const {id} = useParams();
  const [rows, setRows] = useState([]);
  // const { userName } = useContext(ProfileContext);
  const newId = uuidv4();
  const ng=`/addsubproduct/${newId}/${id}`

  function handleDelete(id) {
    // console.log(typeof(id),id)
    const q = query(collection(db, "sub-product"), where("id", "==", id));
    getDocs(q)
      .then((querySnapshot) => {
        // console.log("hiii")
        // console.log(querySnapshot.empty)
        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          const documentRef = doc(db, "sub-product", document.id);
          deleteDoc(documentRef)
            .then(() => {
              toast.success("product deleted successfully");
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
            const q = query(collection(db, "sub-product"),where("parentId","==",id));
            const queryt = await getDocs(q);
            queryt.forEach((doc) => {
                a.push(doc.data())
            });
            setRows(a);
            console.log(rows);
        } catch(err) {
            console.error(err);
        }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]) 

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const g=`/subproduct/${params.row.id}/${params.row.parentId}`;
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
    document.title = "Product | Admin Dashboard";
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
              </h4>
            </div>
            <ListInTable
              rows={rows}
              columns={subproductListTableColumns.concat(actionColumn)}
              height={680}
            />
          </UserTable>
          <Link to={ng} style={{ textDecoration: "none", color: "unset" }}>
            <button className="view_btn">ADD</button>
          </Link>
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

export default SubProducts;
