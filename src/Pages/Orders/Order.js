import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
// import ListInTable from "../../Reusable Components/DataTable";
// import { userListTableColumns } from "./AddUsersData";
import "../../Reusable Styling/AddItem.sass";
import toast from 'react-hot-toast';
import db from "../../firebase"
import { collection, query, getDocs , where ,updateDoc ,doc} from "firebase/firestore";
import { useParams } from 'react-router-dom';

const Order = () => {
  const { id }=useParams();
  const [customer, setcustomer] = useState("");
  const [date, setdate] = useState("");
  const [Product, setProduct] = useState("");
  const [quantity, setquantity] = useState("");
  const [paym,setpaym] = useState("");
  const [staff, setstaff] = useState("");
  const [status, setstatus] = useState("");
  const [currentPost, setCurrentPost] = useState([]);
  const inig=()=>{
    if(currentPost.length !==0 ){
        setcustomer(currentPost.customer)
        setdate(currentPost.date)
        setProduct(currentPost.ordername)
        setpaym(currentPost.paymentmethod)
        setquantity(currentPost.quantity)
        setstaff(currentPost.staffid)
        setstatus(currentPost.status)
    }
  }
  // const [userRows, setUserRows] = useState([]);
  // const UUID = uuidv4();

  function handleSubmit(e) {
        e.preventDefault();
        const q = query(collection(db, "orders"), where("id", "==", id));

        getDocs(q)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
            querySnapshot.forEach((docg) => {
                const documentRef = doc(db, "orders", docg.id);
                const newData = {
                    customer:customer,
                    date:date,
                    id:id,
                    ordername:Product,
                    paymentmethod:paym,
                    quantity:quantity,
                    staffid:staff,
                    status:status
                };
                updateDoc(documentRef, newData)
                .then(() => {
                    toast.success("Product Updated successfully")
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


    //   const newRow = {
    //     id: uuidv4(),
    //     productName:productName ,
    //     category:category ,
    //     brand:brand,
    //     actualCost:actualCost,
    //     sellCost:sellCost,
    //     gst:gst,
    //     quantity :quantity,
    //     description:description,
    //   };
    //   const usersCollectionRef = collection(db, "products");
    //   addDoc(usersCollectionRef, newRow)
    //     .then((docRef) => {
    //       toast.success("new staff added successfully")
    //       setProductName("");
    //       setCategory("");
    //       setBrand("");
    //       setActualCost("");
    //       setSellCost("");
    //       setgst("");
    //       setQuantity("");
    //       setDescription("");
    //     })
    //     .catch((error) => {
    //       console.error("Error adding new product:", error);
    //     });
      // setUserRows([...userRows, newRow]);
};
  

  useEffect(() => {
    document.title = "Order | Admin Dashboard";
  }, []);

  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "orders"), where("id", "==", id));
            const queryt = await getDocs(q);
            queryt.forEach((doc) => {
                a.push(doc.data())
            });
            setCurrentPost(a[0])
        } catch(err) {
            console.error(err);
        }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  useEffect(()=>{
    if(currentPost.length !== 0){
        inig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPost])

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>View Order</h6>
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
                          placeholder="Product Name"
                          value={Product}
                          onChange={(e) => setProduct(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Date</label>
                        <input
                          required
                          type="text"
                          placeholder="Date"
                          value={date}
                          onChange={(e) => setdate(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Customer</label>
                        <input
                          required
                          type="text"
                          placeholder="Customer"
                          value={customer}
                          onChange={(e) => setcustomer(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Payment Method</label>
                        <input
                          required
                          type="text"
                          placeholder="Payment Method"
                          value={paym}
                          onChange={(e) => setpaym(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Quantity</label>
                        <input
                          required
                          type="text"
                          placeholder="Quantity"
                          value={quantity}
                          onChange={(e) => setquantity(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>Staff</label>
                        <input
                          required
                          type="text"
                          placeholder="Staff"
                          value={staff}
                          onChange={(e) => setstaff(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>Status</label>
                        <input
                          required
                          type="text"
                          placeholder="Status"
                          value={status}
                          onChange={(e) => setstatus(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <button type="submit">Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Order;
