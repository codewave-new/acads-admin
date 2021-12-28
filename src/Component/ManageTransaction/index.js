import { useEffect,useState } from 'react'
import Transactions from './transactions'
import { Modal, Button,Pagination,Input } from 'antd';
import ShowInvoice from './ShowInvoice'
import {transactions} from '../../Services/postAPI'


const ManageTransaction=(props)=>{

    const [page,setPage]=useState(0)
    const [myTransactions,setMyTransactions]=useState([])
    const [transaction,myTransaction]=useState({})
    const [pageSize,setPageSize]=useState(10)
    const [count,setCount]=useState(0)
    const [currentPage,setCurrentPage]=useState(0)
    const [searchTerm,setSearchTerm]=useState('')
    const [show,showModal]=useState(false)
    
     const download=(transaction)=>{
        myTransaction(transaction)
        showModal(true)
    }

    const handleOk=()=>{
        showModal(false)
    }
    const handleCancel=()=>{
        showModal(false)
    }
    const searchTransactions=(e)=>{
        setSearchTerm(e.target.value)
    }

    const getTransactions=async ()=>{
        const institute_id=props.match.params.institute_id;
        const result=await transactions({institudeID:institute_id,pageNo:currentPage,pageSize:pageSize,invoiceNumber:searchTerm}) 
       if(result.data.status === 'success')
       {
            setCount(result.data.data.count)
            setMyTransactions(result.data.data)
       }
    }
    const pageChange=(page)=>{
        setCurrentPage(page-1)
    }
    useEffect(()=>{
        getTransactions()
        return () => {};
    },[props.match.params.institute_id,currentPage,searchTerm])

    return (
    <div>
        <Input type="text" placeholder="Search transactions" onChange={searchTransactions} style={{width:"20%","marginBottom":"10px"}}/>
        <Transactions transactionList={myTransactions} download={download} />
        <Pagination onChange={pageChange} total={pageSize} defaultPageSize={pageSize} current={currentPage+1} total={count}/>
        <Modal title="Invoice" visible={show} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <ShowInvoice data={transaction}/>
      </Modal>
    </div>
    )
}

export default ManageTransaction