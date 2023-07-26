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

const Product = () => {
  const { id }=useParams();
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
  const [dvalue, setdvalue] = useState("");
  const [currentPost, setCurrentPost] = useState([]);
  const inig=()=>{
    if(currentPost.length !==0 ){
        setshopname(currentPost.shopname)
        setownername(currentPost.ownername)
        setemail(currentPost.email)
        setcontact(currentPost.contact)
        setacontact(currentPost.acontact)
        setgst(currentPost.gst)
        setaddress(currentPost.address)
        setpincode(currentPost.pincode)
        setdob(currentPost.dob)
        setshope(currentPost.shope)
        setcat(currentPost.cat)
        setdvalue(currentPost.type)
    }
  }

  function handleSubmit(e) {
        e.preventDefault();
        const q = query(collection(db, "customers"), where("id", "==", id));

        getDocs(q)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
            querySnapshot.forEach((docg) => {
                const documentRef = doc(db, "customers", docg.id);
                const newData = {
                    acontact:acontact,
                    address:address,
                    cat:cat,
                    contact:contact,
                    dob:dob,
                    email:email,
                    gst:gst,
                    id:id,
                    ownername:ownername,
                    pincode:pincode,
                    shope:shope,
                    shopname:shopname,
                    type:dvalue
                };
                updateDoc(documentRef, newData)
                .then(() => {
                    toast.success("Customer Updated successfully")
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
    document.title = "New Product | Admin Dashboard";
  }, []);

  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "customers"), where("id", "==", id));
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
            <h6>View Customer</h6>
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
                          placeholder="MacBook"
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
                          placeholder="Owner Name"
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
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Contact</label>
                        <input
                          required
                          type="text"
                          placeholder="Contact"
                          value={contact}
                          onChange={(e) => setcontact(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Alternate Contact</label>
                        <input
                          required
                          type="text"
                          placeholder="Alternate Contact"
                          value={acontact}
                          onChange={(e) => setacontact(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>GST %</label>
                        <input
                          required
                          type="text"
                          placeholder="GST"
                          value={gst}
                          onChange={(e) => setgst(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>Address</label>
                        <input
                          required
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>Pincode</label>
                        <input
                          required
                          type="text"
                          placeholder="Pincode"
                          value={pincode}
                          onChange={(e) => setpincode(e.target.value)}
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
                          placeholder="Shop Established"
                          value={shope}
                          onChange={(e) => setshope(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Type</label>
                        <input
                          required
                          type="text"
                          placeholder="Type"
                          value={dvalue}
                          onChange={(e) => setdvalue(e.target.value)}
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

export default Product;
