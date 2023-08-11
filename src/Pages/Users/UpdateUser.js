import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
// import ListInTable from "../../Reusable Components/DataTable";
// import { userListTableColumns } from "./AddUsersData";
import "../../Reusable Styling/AddItem.sass";
import toast from 'react-hot-toast';
import { collection,updateDoc,query, getDocs, where,doc } from "firebase/firestore";
import db from "../../firebase"
import { useParams } from "react-router-dom";



const UpdateUser = () => {
  const {id} = useParams();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setadress] = useState("");
  const [pass,setpass] = useState("");
  const [currentPost, setCurrentPost] = useState([]);
  const inig=()=>{
    if(currentPost.length !==0 ){
        setUserName(currentPost.userName);
        setFullName(currentPost.fullName);
        setEmail(currentPost.email);
        setPhone(currentPost.phone);
        setadress(currentPost.address);
        setpass(currentPost.password);
    }
  }

  // const [userRows, setUserRows] = useState([]);
  // const UUID = uuidv4();

  function handleSubmit(e) {
      e.preventDefault();

      if (isNaN(phone)) {
        alert("Phone no must be number.");
        return;
      } else if (phone.length !== 10) {
        alert("Phone number should be 10 digits");
        return;
      }

      if (!email.includes("@")) {
        alert("Email must be include @...");
        return;
      }

      if (!userName || !fullName || !email || !phone) {
        alert("Please fill in all fields");
        return;
      }
      
      
      const q = query(collection(db, "staff"), where("id", "==", id));

      getDocs(q)
      .then((querySnapshot) => {
          if (!querySnapshot.empty) {
          querySnapshot.forEach((docg) => {
              const documentRef = doc(db, "staff", docg.id);
              const newData = {
                userName: userName.substring(0, 15),
                fullName: fullName.substring(0, 50),
                email:email,
                address:adress,
                password:pass,
                phone: phone.length !== 10 || isNaN(parseInt(phone)) ? "" : phone,
              };
              updateDoc(documentRef, newData)
              .then(() => {
                  toast.success("Staff Updated successfully")
                  setUserName("");
                  setFullName("");
                  setEmail("");
                  setPhone("");
                  setadress("");
                  setpass("");
                  setPhone("");
              })
              .catch((error) => {
                  console.error("Error updating document:", error);
              });
          });
          } else {
              console.log("document not found");
          }
      })
      .catch((error) => {
          console.error("Error getting documents:", error);
      });

    };
  


  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "staff"), where("id", "==", id));
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


  useEffect(() => {
    document.title = "New Users | Admin Dashboard";
  }, []);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>Add staff</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>Username</label>
                        <input
                          required
                          type="text"
                          placeholder="janedoe09"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          maxLength={15}
                        />
                      </div>
                      <div className="form_input">
                        <label>Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Jane Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Email</label>
                        <input
                          required
                          type="mail"
                          placeholder="janedoe@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Address:</label>
                        <input
                          required
                          type="text"
                          placeholder="address"
                          value={adress}
                          onChange={(e) => setadress(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Password:</label>
                        <input
                          required
                          type="text"
                          placeholder="password"
                          value={pass}
                          onChange={(e) => setpass(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                      <div className="form_input">
                        <label>Phone no:</label>
                        <input
                          required
                          type="text"
                          inputMode="numeric"
                          placeholder="8779089089"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <button type="submit">Update</button>
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

export default UpdateUser;
