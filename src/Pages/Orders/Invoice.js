import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
// import ListInTable from "../../Reusable Components/DataTable";
// import { orderProductsListTableColumns } from "./OrderProductsData";
import "../../App.sass";
import { collection, query, getDocs , where} from "firebase/firestore";
import db from "../../firebase"
import "./invoice.css"
import html2PDF from "jspdf-html2canvas";

// import toast from "react-hot-toast";



const Invoice = () => {
  const {id} = useParams();
  // console.log(id)
  const [rows, setRows] = useState([]);
  const [tot, settot] = useState(0);
  const [customer,setCustomer] = useState("customer");

  // const downloadPdf = () => {
  //   const page = document.querySelector(".toinvoice");
  //   html2PDF(page, {
  //     jsPDF: {
  //       format: "a4",
  //     },
  //     imageType: "image/jpeg",
  //     output: "Report.pdf",
  //   });
  // };

  const downloadPdf = async () => {
    try {
      // Hide the download button temporarily
      const downloadButton = document.querySelector(".download-button");
      downloadButton.style.display = "none";
  
      // Wait for a brief moment to ensure the button is hidden before generating the PDF
      await new Promise((resolve) => setTimeout(resolve, 100));
  
      // Generate the PDF
      const page = document.querySelector(".toinvoice");
      html2PDF(page, {
        jsPDF: {
          format: "a4",
        },
        imageType: "image/jpeg",
        output: `${id}.pdf`,
      });
  
      // Show the download button again after generating the PDF
      downloadButton.style.display = "block";
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // const { userName } = useContext(ProfileContext);
  // const newId = uuidv4();
  // const ng=`/subproduct/${newId}/${id}`

  async function getorder() {
    const a=[]
      const q = query(collection(db, "orders"), where("id", "==", id));
      const queryt = await getDocs(q);
      queryt.forEach((doc) => {
          a.push(doc.data())
      });
      return a[0]
  }


  async function getcustomer(id) {
    const a=[]
      const q = query(collection(db, "customers"), where("id", "==", id));
      const queryt = await getDocs(q);
      queryt.forEach((doc) => {
          a.push(doc.data())
      });
      return a[0]
  }


  async function getSubproduct(th) {
      const a=[]
      const q = query(collection(db, "sub-product"), where("id", "==", th));
      const queryt = await getDocs(q);
      queryt.forEach((doc) => {
          a.push(doc.data())
      });
      return a[0]
}

  async function maketable() {
    
      const td=[]
      const order = await getorder();
      const customerData = await getcustomer(order.customer);
      setCustomer(customerData);
      let g=0;
      // console.log(order)
      // if (order.length > 0) {
        for (const mainProduct of order.products) {
              console.log(mainProduct)
              const fg= await getSubproduct(mainProduct.subproductId)
              const total = (mainProduct.quantity*fg.sellCost).toString();
              g+=parseInt(total)
              let u=fg.productName+"-"+fg.subCategory
              let d={
                customer:order.customername,
                pname:u,
                sellcost:fg.sellCost,
                gst:fg.gst,
                quantity:mainProduct.quantity,
                total:total,
                id:order.id,
                date:order.date,
              }
              td.push(d)
        }
      settot(g.toString())
      // console.log(td)
      setRows(td)
  }

  useEffect(() => {
    maketable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  
  useEffect(() => {
    document.title = "Invoice | Admin Dashboard";
  });

  return (
    
    <>
      {rows.length ===0?<h2>Generating Invoice</h2>:
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          
          <div className="toinvoice">
          <div className="container">
          <div className="row">
              <div className="col-lg-12">
                  <div className="carrd">
                      <div className="card-body">
                          <div className="invoice-title">
                              {/* <h4 class="float-end font-size-15">Invoice #DS0204 <span class="badge bg-success font-size-12 ms-2">Paid</span></h4> */}
                              <div className="mb-4">
                                <h3 className="mb-1 text-muted">Bootdey.com</h3>
                              </div>
                              <div className="text-muted">
                                  <p className="mb-1">3184 Spruce Drive Pittsburgh, PA 15201</p>
                                  <p className="mb-1"><i className="uil uil-envelope-alt me-1"></i> xyz@987.com</p>
                                  <p><i className="uil uil-phone me-1"></i> 012-345-6789</p>
                              </div>
                          </div>

                          <hr className="my-4"></hr>

                          <div className="row">
                              <div className="col-sm-6">
                                  <div className="text-muted">
                                      <h5 className="font-size-16 mb-3">Billed To:</h5>
                                      {/* {customer.ownername} */}
                                      <h5 class="font-size-15 mb-2">{customer.shopname}</h5>
                                      <p class="mb-1">Owner    : {customer.ownername}</p>
                                      <p class="mb-1">Address  : {customer.address}</p>
                                      <p class="mb-1">GSTIN/UIN: {customer.gst}</p>
                                  </div>
                              </div>
                              
                              <div className="col-sm-6">
                                  <div className="text-muted text-sm-end">
                                      <div>
                                          <h5 className="font-size-15 mb-1">Invoice No:</h5>
                                          <p>{rows[0].id}</p>
                                      </div>
                                      <div className="mt-4">
                                          <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                                          <p>{rows[0].date}</p>
                                      </div>
                                  </div>
                              </div>
                              
                          </div>
                          
                          
                          <div className="py-2">
                              <h5 className="font-size-15">Order Summary</h5>

                              <div className="table-responsive">
                                  <table className="table align-middle table-nowrap table-centered mb-0">
                                      <thead>
                                          <tr>
                                              <th style={{width: "70px"}}>No.</th>
                                              <th>Item</th>
                                              <th>GST %</th>
                                              <th>Price</th>
                                              <th>Quantity</th>
                                              <th className="text-end" style={{width: "120px"}}>Total</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                      { 
                                        rows.map((row, index) => (
                                          <tr key={index}>
                                              <th scope="row">{index+1}</th>
                                              <td>
                                                  <div>
                                                      <h5 className="text-truncate font-size-14 mb-1">{row.pname}</h5>
                                                      {/* <p class="text-muted mb-0">Watch, Black</p> */}
                                                  </div>
                                              </td>
                                              <td>{row.gst}</td>
                                              <td>{row.sellcost}</td>
                                              <td>{row.quantity}</td>
                                              <td className="text-end">{row.total}</td>
                                          </tr>
                                        ))
                                      }
 
                                          
                                          <tr>
                                              <th scope="row" colSpan="4" className="border-0 text-end">Total</th>
                                              <td className="border-0 text-end"><h4 className="m-0 fw-semibold">{tot}</h4></td>
                                          </tr>
                                          
                                      </tbody>
                                  </table>
                                </div>
                                <div className="d-print-none mt-4">
                            <div className="float-end">
                                
                                <button onClick={downloadPdf} className="btn btn-primary w-md download-button">Download</button>
                            </div>
                          </div>

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


          </div>
        </div>
      </main>
      }
    </>
    
  );
};

// export const UserTable = styled.div`
//   z-index: 0;
//   /* Resetting MUI table color props */
//   p,
//   div.MuiTablePagination-actions > button {
//     color: inherit;
//   }
//   /* END */
// `;

export default Invoice;
