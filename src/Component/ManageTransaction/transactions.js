
import moment from 'moment'

const Transactions =({transactionList,download,...props})=>{
    const styleSheet={
        "respTable":{
            "width":"100%",
            "display":"table"
        },
      
        "tableHeader":{
            "display": "table-header-group",
            backgroundColor: "#ccc",
            fontSize: "15px",
            fontWeight:"500"
        },
        "headercell":{
            "display": "table-cell",
            padding: "10px",
            textAlign: "justify",
            borderBottom: "1px solid black",
            textTransform: "uppercase"
        },
        tableBody:{
            "display":'table-row-group'
        },
        tableRow:{
            "display":'table-row'
        },
        tableCell:{
            "display":'table-cell',
            "padding":"12px"
        },
        button:{
            border:"none",
            padding:"10px",
            borderRadius:"12px"
        }
    }

    return (
    <div style={styleSheet.respTable}>
        
        <div style={styleSheet.tableHeader}>
        <div style={styleSheet.headercell}>
           Invoice No.
        </div>
        <div style={styleSheet.headercell}>
            Paid
        </div>
        <div style={styleSheet.headercell}>
        Razorpay Order
        </div>
        <div style={styleSheet.headercell}>
        Purchased On
        </div>
        <div style={styleSheet.headercell}>
        Due
        </div>
        <div style={styleSheet.headercell}>
        Payment Type
        </div>
        <div style={styleSheet.headercell}>
            No of jobs
        </div>
        <div style={styleSheet.headercell}>
           Actions
        </div>
        </div>
        <div style={styleSheet.tableBody}>
            {
                 transactionList?.data?.length > 0?
                transactionList?.data?.map(tran=>{
                    return (  <div style={styleSheet.tableRow}>
            
                        <div style={styleSheet.tableCell}>
                        {tran.invoiceNumber}
                        </div>
                        <div style={styleSheet.tableCell}>
                        {tran.amountPaid}
                        </div>
                        <div style={styleSheet.tableCell}>
                        {tran.orderData?.razorpay_order_id}
                        </div>
                        <div style={styleSheet.tableCell}>
                       {moment(tran.createdAt).format("MMM Do YY")}
                        </div>
                        <div style={styleSheet.tableCell}>
                         ---
                        </div>
                        <div style={styleSheet.tableCell}>
                         {tran.paymentType}
                        </div>

                        <div style={styleSheet.tableCell}>
                         {tran.orderData?.jobs.length} jobs
                        </div>
                        <div style={styleSheet.tableCell}>
                         <button style={styleSheet.button} onClick={()=>download(tran)}>Download Invoice</button>
                        </div>
                        
                    </div>)
                }):<div style={{"textAlign":"center","width":"100%"}}>No Transactions found</div>
            }
      

        </div>
        
    </div>

    )
}

export default Transactions