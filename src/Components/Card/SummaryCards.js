import React,{useEffect,useState} from "react";
import SummaryCard from "../../Reusable Components/SummaryCard";
import { generateRandomTotal } from "../../Reusable Components/Function";
import db from "../../firebase"
import { collection, query, getDocs , where ,updateDoc ,doc} from "firebase/firestore";






const SummaryCards = () => {
  const [currentPost, setCurrentPost] = useState([]);
  const [totalBalance,settotalBalance] = useState(0);
  const [totalq,settotalq] = useState(0);
  const [totalPendingOrder, settotalPendingOrder] = useState([]);
  const [totalDeliveredOrder, settotalDeliveredOrder] = useState([]);
  // const [totalCashPaymentOrder, settotalCashPaymentOrder] = useState([]);
  // const [totalOnlinePaymentOrder, settotalOnlinePaymentOrder] = useState([]);
  async function getSubproducts() {
    const subproductsCollectionRef = collection(db, "sub-product");
    const subproductsQuerySnapshot = await getDocs(
      query(subproductsCollectionRef)
    );
    const subproducts = subproductsQuerySnapshot.docs.map((doc) => doc.data());
    return subproducts;
  }

  const inig=async()=>{
    if(currentPost.length !==0 ){
      const subproducts = await getSubproducts();
      let total=0;
      let c=0;
      let d=0;
      let p=0;
        currentPost.forEach((order) => {
              if(order.status === "pending"){
                p=p+1
              }
              else{
                d=d+1
              }
            if(order.products.length > 0){
              order.products.forEach((sub)=>{
                c=c+1 
                let u=subproducts.filter((a)=>
                  sub.subproductId === a.id
                )
                // console.log(u,sub.subproductId);
                total+=(parseInt(sub.quantity*u[0].sellCost))
              })                
            }
        });
        settotalBalance(total)
        settotalq(c)
        settotalPendingOrder(p)
        settotalDeliveredOrder(d)
     
    }
  }

  useEffect(() => {
    const fetchData = async() => {
        const a=[]
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const startOfMonthDate = new Date(currentYear, currentMonth, 1);
        const endOfMonthDate = new Date(currentYear, currentMonth + 1, 0);
        const q = query(collection(db, "orders"), where("date", ">=", startOfMonthDate),where("date","<=",endOfMonthDate));
        const queryt = await getDocs(q);
        queryt.forEach((doc) => {
            a.push(doc.data())
        });
        setCurrentPost(a)
        
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
      <SummaryCard
        summaryTitle="Total Revenue"
        summaryPercentage={12}
        summaryDescriptionTitle="Total sales This Month"
        summaryTotal={"\u20B9"+totalBalance.toString()}
        summaryDescriptionText="Total sales till todays date"
      />
      <SummaryCard
        summaryTitle="Orders Delivered"
        summaryPercentage={generateRandomTotal(10000).percentageCalculator}
        summaryDescriptionTitle="Total Delivered Orders this month"
        summaryTotal={totalDeliveredOrder}
        summaryDescriptionText="orders delivered till todays date"
      />
      <SummaryCard
        summaryTitle="Orders Pending"
        summaryPercentage={generateRandomTotal(1000).percentageCalculator}
        summaryDescriptionTitle="Total Pending Orders this month"
        summaryTotal={totalPendingOrder}
        summaryDescriptionText="orders pending till todays date"
      />
    </>
  );
};

export default SummaryCards;
