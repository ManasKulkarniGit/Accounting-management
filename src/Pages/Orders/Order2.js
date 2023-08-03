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
import { collection, query, getDocs , where ,updateDoc ,doc, arrayUnion} from "firebase/firestore";
import { useParams } from 'react-router-dom';

const Order2 = () => {
  const { id }=useParams();
  // const [customer, setcustomer] = useState("");
  // const [date, setdate] = useState("");
  // const [Product, setProduct] = useState("");
  const [quantity, setquantity] = useState("");
  // const [paym,setpaym] = useState("");
  // const [staff, setstaff] = useState("");
  // const [status, setstatus] = useState("");
  // const [currentPost, setCurrentPost] = useState([]);
  // const inig=()=>{
  //   if(currentPost.length !==0 ){
  //       setcustomer(currentPost.customer)
  //       setdate(currentPost.date)
  //       setProduct(currentPost.ordername)
  //       setpaym(currentPost.paymentmethod)
  //       setquantity(currentPost.quantity)
  //       setstaff(currentPost.staffid)
  //       setstatus(currentPost.status)
  //   }
  // }
  // const [userRows, setUserRows] = useState([]);
  // const UUID = uuidv4();
  
    



  function handleSubmit(e) {
        e.preventDefault();

        if(isNaN(quantity)){
          alert("Quantity must be a number");
        }

        const q = query(collection(db, "orders"), where("id", "==", id));

        getDocs(q)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
            querySnapshot.forEach((docg) => {
                const documentRef = doc(db, "orders", docg.id);
                const newData = {
                    // customer:customer,
                    // date:date,
                    // id:id,
                    // ordername:Product,
                    // paymentmethod:paym,
                    // quantity:quantity,
                    // staffid:staff,
                    // status:status
                    subproductId:subproductId,
                    quantity : quantity
                };
                updateDoc(documentRef, {products : arrayUnion(newData)})
                .then(() => {
                    toast.success("Product Updated successfully")
                    setquantity("");
                    setSubProductId("");
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

};
  

  useEffect(() => {
    document.title = "Order | Admin Dashboard";
  }, []);

//   useEffect(() => {
//     const fetchData = async() => {

//         try {
//             const a=[]
//             const q = query(collection(db, "orders"), where("id", "==", id));
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

    const [options, setOptions] = useState([]);
    // const [selectedProduct, setSelectedProduct] = useState({ mainProductId: "", subProductId: "" });
    const [subproductId, setSubProductId] = useState("");
    // async function getMainProducts() {
    //   const mainProductsCollectionRef = collection(db, "main-product");
    //   const mainProductsQuerySnapshot = await getDocs(mainProductsCollectionRef);
    //   const mainProducts = mainProductsQuerySnapshot.docs.map((doc) => doc.data());
    //   return mainProducts;
    // }
    async function getSubproducts() {
      const subproductsCollectionRef = collection(db, "sub-product");
      const subproductsQuerySnapshot = await getDocs(
        query(subproductsCollectionRef)
      );
      const subproducts = subproductsQuerySnapshot.docs.map((doc) => doc.data());
      return subproducts;
    }
    async function populateDropdown() {
    //   const mainProducts = await getMainProducts();
      const options = [];
  
    //   for (const mainProduct of mainProducts) {
        const subproducts = await getSubproducts();
        if (subproducts.length > 0) {
          subproducts.forEach((subproduct) => {
            const option = (
              <option key={String(Math.floor(Math.random() * (10000 - 2 + 1)) + 2)} value={`${subproduct.id}`}>
                {subproduct.productName} - {subproduct.subCategory}
              </option>
            );
            options.push(option);
          });
        } else {
        //   const option = (
        //     <option key={mainProduct.id} value={mainProduct.id}>
        //       {mainProduct.name}
        //     </option>
        //   );
        //   options.push(option);
            console.log("Subproducts not found");
        }
    //   }
  
      setOptions(options);
    }
  
    useEffect(() => {
      populateDropdown();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 



  function handleDropdownChange(event) {
    const selectedValue = event.target.value;
    // const [mainProductId, subProductId] = selectedValue.split("-");
    const subProductId = selectedValue;
    // setSelectedProduct({ mainProductId, subProductId });
    setSubProductId(subProductId)

  }

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
                      {/* <div className="form_input">
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
                      </div> */}
                      <select id="productDropdown" onChange={handleDropdownChange}>
                        <option value="">Select a product</option>
                        {options}
                     </select>
                  
                        {/* <p>Subproduct ID: {subproductId}</p> */}
                        <br></br>
                        <br></br>
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
                    </div>
                    <button type="submit">Update</button>
                  </form>
                  {/* <select id="productDropdown" onChange={handleDropdownChange}>
                    <option value="">Select a product</option>
                    {options}
                  </select>
                  <p>Main Product ID: {selectedProduct.mainProductId}</p>
                  <p>Subproduct ID: {subproductId}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Order2;
