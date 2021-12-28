

const PaymentSummary=({price,gst,totalPrice,discountedAmount,generateOrder,offline})=>{
   const summary_box={
    height: "75%",
    width: "64%",
    background: "#fff",
    padding:"5%"
   }
    return (
        <>
    <h5>Payment Summary</h5>
    <div style={summary_box}>
       
       <div>
          <span><b>Price:</b> {price}</span><br />
          <span><b>GST:</b> {gst}</span><br />
          <span><b>Total Amount:</b> {parseInt(price)+parseInt(gst)}</span><br />
         <span>  <b>Discount:</b> {discountedAmount}</span><br />
         
          
          <hr />
          <b>GRAND TOTAL : {(parseInt(price)+parseInt(gst))-discountedAmount}</b>
      </div>
      <div>
         <button style={{"margin":"2px"}} onClick={generateOrder}  className="btn btn-primary">CHECKOUT</button>
         <button style={{"margin":"2px"}} onClick={offline}  className="btn btn-primary">OFFLINE</button>
      </div>
    </div>
       </> 
   
        )
}

export default PaymentSummary