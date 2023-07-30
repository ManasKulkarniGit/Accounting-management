import React, { useState, useEffect, } from "react";
// import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
// import { ProfileContext } from "../../App";
// import ListInTable from "../../Reusable Components/DataTable";
// import { userListTableColumns } from "./AddUsersData";
import "../../Reusable Styling/AddItem.sass";
import toast from 'react-hot-toast';
import db from "../../firebase"
import { collection, query, getDocs , where , addDoc} from "firebase/firestore";
import { useParams } from 'react-router-dom';

const AddOrder = () => {
  const { id }=useParams();
  // const {useName} = useContext(ProfileContext);
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [staffid, setStaffid] = useState("");
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState([]);


  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "customers"), where("id", "==", id));
            const queryt = await getDocs(q);
            queryt.forEach((doc) => {
                a.push(doc.data())
            });
            setCustomer(a[0])
        } catch(err) {
            console.error(err);
        }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 
  

  function handleSubmit(e) {
        e.preventDefault();    
        const newData = {
            id : uuidv4(),
            customer: id,
            customername : customer.ownername,
            date: date,
            products: [],
            paymentmethod : paymentMethod,
            staffid : staffid,
            status : status 
        }
        const orderCollectionRef = collection(db,"orders");
        addDoc(orderCollectionRef, newData)
        .then((docRef) => {
            toast.success("new Sub Product added successfully")
            setDate("");
            setPaymentMethod("");
            setStaffid("");
            setStatus("");

          })
          .catch((error) => {
            console.error("Error adding new product:", error);
          });
};
  

  useEffect(() => {
    document.title = "New Order | Admin Dashboard";
  }, []);

//   useEffect(() => {
//     const fetchData = async() => {

//         try {
//             const a=[]
//             const q = query(collection(db, "sub-product"), where("id", "==", id));
//             const queryt = await getDocs(q);
//             queryt.forEach((doc) => {
//                 a.push(doc.data())
//             });
//             setCurrentPost(a[0])
//         } catch(err) {
//             console.error(err);
//         }
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[]) 

//   useEffect(()=>{
//     if(currentPost.length !== 0){
//         inig();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[currentPost])

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>New Order</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>Date</label>
                        <input
                          required
                          type="text"
                          placeholder="DD/MM/YYYY"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          maxLength={50}
                        //   disabled={true}
                        />
                      </div>
                      <div className="form_input">
                        <label>Payment Method</label>
                        <input
                          required
                          type="text"
                          placeholder="online/cash"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Staff ID</label>
                        <input
                          required
                          type="text"
                          placeholder="500"
                          value={staffid}
                          onChange={(e) => setStaffid(e.target.value)}
                        //   disabled={true}
                        />
                      </div>
                      <div className="form_input">
                        <label>Status</label>
                        <input
                          required
                          type="text"
                          placeholder="pending"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          maxLength={50}
                        //   disabled={true}
                        />
                      </div>
                      {/* <div className="form_input">
                        <label>GST %</label>
                        <input
                          required
                          type="text"
                          placeholder="18"
                          value={gst}
                          onChange={(e) => setGst(e.target.value)}
                          maxLength={10}
                        //   disabled={true}
                        />
                      </div> */}
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

export default AddOrder;
