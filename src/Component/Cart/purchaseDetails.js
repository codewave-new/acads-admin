import { InputNumber } from 'antd';
import PaymentSummary from './paymentSummary';
const PurchaseDetails=()=>{
    return (
   
        <div className="row">
        <div className="col-md-4">
        <label>Price per Job Post</label><br />
        <InputNumber />
        </div>
        <div className="col-md-4">
        <label>Discount</label> <br />
        <InputNumber />
        </div>
        <div className="col-md-4"><PaymentSummary /></div>
        </div>
        
   
        )
}

export default PurchaseDetails