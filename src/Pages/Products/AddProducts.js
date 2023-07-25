import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
// import ListInTable from "../../Reusable Components/DataTable";
// import { userListTableColumns } from "./AddUsersData";
import "../../Reusable Styling/AddItem.sass";
import toast from 'react-hot-toast';
import { collection,addDoc } from "firebase/firestore";
import db from "../../firebase"



const AddProducts = () => {

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  // const [actualCost, setActualCost] = useState("");
  // const [sellCost, setSellCost] = useState("");
  // const [gst,setgst] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  // const [userRows, setUserRows] = useState([]);
  // const UUID = uuidv4();

  function handleSubmit(e) {
      e.preventDefault();

      if (!productName || !category || !brand) {
        alert("Please fill in all fields");
        return;
      }
      
      const newRow = {
        id: uuidv4(),
        productName:productName ,
        category:category ,
        brand:brand,
        // actualCost:actualCost,
        // sellCost:sellCost,
        // gst:gst,
        // quantity :quantity,
        description:description,
      };
      const usersCollectionRef = collection(db, "main-product");
      addDoc(usersCollectionRef, newRow)
        .then((docRef) => {
          toast.success("new staff added successfully")
          setProductName("");
          setCategory("");
          setBrand("");
          // setActualCost("");
          // setSellCost("");
          // setgst("");
          // setQuantity("");
          setDescription("");
        })
        .catch((error) => {
          console.error("Error adding new product:", error);
        });
      // setUserRows([...userRows, newRow]);
    };
  

  // const handleDelete = (id) => {
  //   setUserRows(userRows.filter((item) => item.id !== id));
  // };

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cell_action_div">
  //           <Link
  //             to="/users/test"
  //             style={{ textDecoration: "none", color: "unset" }}
  //             className="view_btn"
  //           >
  //             View
  //           </Link>
  //           <div
  //             className="delete_btn"
  //             onClick={() => handleDelete(params.row.id)}
  //           >
  //             Delete
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  useEffect(() => {
    document.title = "New Product | Admin Dashboard";
  }, []);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>Add Product</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>ProductName</label>
                        <input
                          required
                          type="text"
                          placeholder="MacBook"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Category</label>
                        <input
                          required
                          type="text"
                          placeholder="Laptop"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Brand</label>
                        <input
                          required
                          type="text"
                          placeholder="Apple"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>
                      {/* <div className="form_input">
                        <label>Actual Cost</label>
                        <input
                          required
                          type="text"
                          placeholder="500"
                          value={actualCost}
                          onChange={(e) => setActualCost(e.target.value)}
                          maxLength={50}
                        />
                      </div> */}
                      {/* <div className="form_input">
                        <label>Selling Cost</label>
                        <input
                          required
                          type="text"
                          placeholder="500"
                          value={sellCost}
                          onChange={(e) => setSellCost(e.target.value)}
                          maxLength={10}
                        />
                      </div> */}
                      {/* <div className="form_input">
                        <label>GST %</label>
                        <input
                          required
                          type="text"
                          placeholder="18"
                          value={gst}
                          onChange={(e) => setgst(e.target.value)}
                          maxLength={10}
                        />
                      </div> */}
                      {/* <div className="form_input">
                        <label>Quantity</label>
                        <input
                          required
                          type="text"
                          placeholder="100"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          maxLength={10}
                        />
                      </div> */}
                      <div className="form_input">
                        <label>Description</label>
                        <input
                          required
                          type="text"
                          placeholder="Macbook air..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                    </div>
                    <button type="submit">Save</button>
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="item_list_div">
              {userRows.length > 0 && (
                <>
                  <h6 className="px-2 mb-0 mt-2">List of users</h6>
                  <ListInTable
                    key={UUID}
                    rows={userRows}
                    columns={userListTableColumns.concat(actionColumn)}
                    height={400}
                  />
                </>
              )}
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default AddProducts;
