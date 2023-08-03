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



const Addcustomer = () => {

  const [shopname, setshopname] = useState("");
  const [ownername, setownername] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [acontact, setacontact] = useState("");
  const [gst,setgst] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [dob, setdob] = useState("");
  const [shope, setshope] = useState("");
  const [cat, setcat] = useState("");
  const [dvalue, setdvalue] = useState("Type");
  const handleeChange = (event) => {
    setdvalue(event.target.value);
  };
  // const [userRows, setUserRows] = useState([]);
  // const UUID = uuidv4();

  function handleSubmit(e) {
      e.preventDefault();

      if (!shopname || !ownername || !email || !contact || !acontact || !gst || !address || !pincode|| !dob|| !shope || !cat ) {
        alert("Please fill in all fields");
        return;
      }

      if (!email.includes("@")) {
        alert("Email must be include @...");
        return;
      }

      if (isNaN(contact)) {
        alert("Contact no must be number.");
        return;
      } else if (contact.length !== 10) {
        alert("Contact number should be 10 digits");
        return;
      }
      
      const newRow = {
        id: uuidv4(),
        shopname:shopname ,
        ownername:ownername ,
        email:email,
        contact:contact,
        acontact:acontact,
        gst:gst,
        address :address,
        pincode:pincode,
        dob:dob,
        shope:shope,
        cat:cat,
        type:dvalue
      };
      const usersCollectionRef = collection(db, "customers");
      addDoc(usersCollectionRef, newRow)
        .then((docRef) => {
          toast.success("new Customer added successfully")
          setacontact("")
          setshope("")
          setshopname("")
          setownername("")
          setemail("")
          setcontact("")
          setacontact("")
          setgst("")
          setaddress("")
          setpincode("")
          setdob("")
          setcat("")
          setdvalue("")
        })
        .catch((error) => {
          console.error("Error adding new product:", error);
        });
      // setUserRows([...userRows, newRow]);
    };
  

  useEffect(() => {
    document.title = "New Customer | Admin Dashboard";
  }, []);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>Add Customer</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>Shop Name</label>
                        <input
                          required
                          type="text"
                          placeholder="shop name"
                          value={shopname}
                          onChange={(e) => setshopname(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Owner Name</label>
                        <input
                          required
                          type="text"
                          placeholder="owner name"
                          value={ownername}
                          onChange={(e) => setownername(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Email</label>
                        <input
                          required
                          type="text"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Contact</label>
                        <input
                          required
                          type="text"
                          placeholder="contact"
                          value={contact}
                          onChange={(e) => setcontact(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>Alternate Contact</label>
                        <input
                          required
                          type="text"
                          placeholder="alternate contact"
                          value={acontact}
                          onChange={(e) => setacontact(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>Address</label>
                        <input
                          required
                          type="text"
                          placeholder="address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Pincode</label>
                        <input
                          required
                          type="text"
                          placeholder="pincode"
                          value={pincode}
                          onChange={(e) => setpincode(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>GST Number</label>
                        <input
                          required
                          type="text"
                          placeholder="GST number"
                          value={gst}
                          onChange={(e) => setgst(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>DOB</label>
                        <input
                          required
                          type="text"
                          placeholder="DOB"
                          value={dob}
                          onChange={(e) => setdob(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Shop Established</label>
                        <input
                          required
                          type="text"
                          placeholder="Shop established"
                          value={shope}
                          onChange={(e) => setshope(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Category</label>
                        <input
                          required
                          type="text"
                          placeholder="Category"
                          value={cat}
                          onChange={(e) => setcat(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Type</label>
                        <select value={dvalue} onChange={handleeChange}>
                            <option value="Type">Type</option>
                            <option value="Rent">Rent</option>
                            <option value="Owner">Owner</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit">Save</button>
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

export default Addcustomer;
