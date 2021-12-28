import { InputNumber,Switch } from 'antd';
import PaymentSummary from './paymentSummary';
const PurchaseDetails=({gst,price,totalPrice,discountType,changeDiscountType,discount,discountedAmount,generateOrder,offline})=>{
    
    return (
   
        <div className="row" style={{justifyContent:"right"}}>
        <div className="col-md-4">
       
        <label>Discount</label> <br />
        <InputNumber onChange={(value)=>discount(value)} />
        <span style={{"marginLeft":"6px"}}>%</span><Switch onChange={(checked)=>changeDiscountType(checked)} style={{"marginLeft":"6px"}}/><span style={{"marginLeft":"6px"}}>Fixed Price</span>
        <PaymentSummary price={price} discountedAmount={discountedAmount} generateOrder={generateOrder} offline={offline} gst={gst} totalPrice={totalPrice}/>

        </div>
        
        </div>
        
   
        )
}

export default PurchaseDetails