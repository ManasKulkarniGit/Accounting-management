import React, { useState, useEffect, } from "react";
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
// import { ProfileContext } from "../../App";
// import ListInTable from "../../Reusable Components/DataTable";
// import { userListTableColumns } from "./AddUsersData";
import "../../Reusable Styling/AddItem.sass";
import toast from 'react-hot-toast';
import db from "../../firebase"
import { collection, query, getDocs , where ,updateDoc ,doc} from "firebase/firestore";
import { useParams } from 'react-router-dom';

const UpdateSubProduct = () => {
  const { id , parentId }=useParams();
  // const {useName} = useContext(ProfileContext);
  const [subCategory, setSubCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [sellCost, setSellCost] = useState("");
  const [gst, setGst] = useState("");
  const [currentPost, setCurrentPost] = useState([]);
  const inig=()=>{
    if(currentPost.length !==0 ){
        setSubCategory(currentPost.subCategory);
        setQuantity(currentPost.quantity);
        setActualCost(currentPost.actualCost);
        setSellCost(currentPost.sellCost);
        setGst(currentPost.gst);
    }
  }
  // const [userRows, setUserRows] = useState([]);
  // const UUID = uuidv4();

  function handleSubmit(e) {
        e.preventDefault();
        const q = query(collection(db, "sub-product"), where("id", "==", id));

        getDocs(q)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
            querySnapshot.forEach((docg) => {
                const documentRef = doc(db, "sub-product", docg.id);
                const newData = {
                    subCategory:subCategory,
                    actualCost:actualCost,
                    sellCost:sellCost,
                    gst:gst,
                    id:id,
                    parentId:parentId,
                    quantity:quantity
                };
                updateDoc(documentRef, newData)
                .then(() => {
                    toast.success("Sub Product Updated successfully")
                    setActualCost("");
                    setSellCost("");
                    setGst("");
                    setQuantity("");
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
    document.title = "View Product | Admin Dashboard";
  }, []);

  useEffect(() => {
    const fetchData = async() => {

        try {
            const a=[]
            const q = query(collection(db, "sub-product"), where("id", "==", id));
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
            <h6>View Product</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>Sub Category</label>
                        <input
                          required
                          type="text"
                          placeholder="50 kg"
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          maxLength={50}
                          disabled={true}
                        />
                      </div>
                      <div className="form_input">
                        <label>Quantity</label>
                        <input
                          required
                          type="text"
                          placeholder="Quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="form_input">
                        <label>Actual Cost</label>
                        <input
                          required
                          type="text"
                          placeholder="500"
                          value={actualCost}
                          onChange={(e) => setActualCost(e.target.value)}
                          // disabled={true}
                        />
                      </div>
                      <div className="form_input">
                        <label>Sell Cost</label>
                        <input
                          required
                          type="text"
                          placeholder="800"
                          value={sellCost}
                          onChange={(e) => setSellCost(e.target.value)}
                          maxLength={50}
                          // disabled={true}
                        />
                      </div>
                      <div className="form_input">
                        <label>GST %</label>
                        <input
                          required
                          type="text"
                          placeholder="18"
                          value={gst}
                          onChange={(e) => setGst(e.target.value)}
                          maxLength={10}
                          // disabled={true}
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

export default UpdateSubProduct;
