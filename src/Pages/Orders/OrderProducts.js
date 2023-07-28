import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
// import { v4 as uuidv4 } from "uuid";
// import { ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import ListInTable from "../../Reusable Components/DataTable";
import { orderProductsListTableColumns } from "./OrderProductsData";
import "../../App.sass";
import { collection, query, getDocs , deleteDoc , doc , where} from "firebase/firestore";
import db from "../../firebase"
import toast from "react-hot-toast";


const OrderProducts = () => {
  const {id} = useParams();
  // console.log(id)
  const [rows, setRows] = useState([]);
  // const { userName } = useContext(ProfileContext);
  // const newId = uuidv4();
  // const ng=`/subproduct/${newId}/${id}`

  async function getOrderProducts(orderId) {
    const orderCollectionRef = collection(db, "orders");
      const orderQuerySnapshot = await getDocs(
        query(orderCollectionRef, where("id", "==", orderId))
      );
      if (!orderQuerySnapshot.empty) {
        const orderDoc = orderQuerySnapshot.docs[0];
        const orderData = orderDoc.data();
    
        const products = orderData.products;
        console.log(products)
        const productPromises = products.map(async (product) => {
          const productId = product.subproductId;
          const productQuantity = product.quantity;
          const productDocCollectionRef = collection(db,"sub-product")
    
          try {
            const productDocSnapshott = await getDocs(
                query(productDocCollectionRef, where("id", "==", productId))
              );
            const productDocSnapshot = productDocSnapshott.docs[0];
            if (productDocSnapshot.exists()) {
              const productData = productDocSnapshot.data();
              const cost = parseInt(productData.sellCost,10);
              const iquantity = parseInt(productQuantity);
              const total = (cost*iquantity).toString();
              const rowData = {
                id : productData.id,
                productName: productData.productName,
                subCategory: productData.subCategory,
                cost : productData.sellCost,
                quantity: productQuantity,
                gst: productData.gst,
                total : total,
              };
              return rowData;
            } else {
              return null; // or handle if the product document doesn't exist
            }
          } catch (error) {
            console.error("Error fetching product information:", error);
            return null; // or handle the error accordingly
          }
        });
    
        const productDataArray = await Promise.all(productPromises);
        const validProductDataArray = productDataArray.filter((product) => product !== null);
    
        // Here, validProductDataArray contains the order's products along with their information
        return validProductDataArray;
      } else {
        console.log("Order document not found.");
        return [];
      }
  }


  useEffect(() => {
    const fetchData = async () => {
      const a = await getOrderProducts(id);
      setRows(a);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
//   useEffect(() => {
//     const fetchData = async() => {

//         try {
//             const a=[]
//             const q = query(collection(db, "sub-product"),where("parentId","==",id));
//             const queryt = await getDocs(q);
//             queryt.forEach((doc) => {
//                 a.push(doc.data())
//             });
//             setRows(a);
//             console.log(rows);
//         } catch(err) {
//             console.error(err);
//         }
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[id]) 

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const g=`/subproduct/${params.row.id}/${id}`;
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
              columns={orderProductsListTableColumns.concat(actionColumn)}
              height={680}
            />
          </UserTable>
          <Link to={`/orderadd/${id}`} style={{ textDecoration: "none", color: "unset" }}>
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

export default OrderProducts;
