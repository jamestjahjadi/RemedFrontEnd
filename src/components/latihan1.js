import React, { useState, useEffect } from 'react'
import {API} from './../supports'
import Axios from 'axios'

const Home = () =>{
    const [data,setdata]=useState([])
    const [newdata,setnewdata]=useState({})
    const [searchdata,setsearch]=useState({})

    const [editData,seteditdata]=useState({})
    const [isEdit,setedit]=useState(false)
    const [isEditid,setId]=useState()




    useEffect(()=>{
        Axios.get(`${API}/table/get-table`)
        .then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err) 
        })
    },[])

    const editButton=(idtable)=>{
        setedit(!isEdit)
        setId(idtable)
    }

    const renderbody=()=>{
        return data.map((val,index)=>{
            return (
                isEdit && isEditid === val.idtable?(
                    (
                      <tr>
                          <td><input type='text' className='form-control' placeholder='Nama'  onChange={(e)=>{seteditdata({...editData,name:e.target.value})}} /></td>
                          <td><input type='text' className='form-control' placeholder='Usia'  onChange={(e)=>{seteditdata({...editData,usia:e.target.value})}} /></td>
                          <td><input type='text' className='form-control' placeholder='Pekerjaan'  onChange={(e)=>{seteditdata({...editData,pekerjaan:e.target.value})}} /></td>
                          <td><button className='btn-info' onClick={()=>editDataTable(val.idtable)}>Safe</button></td>
                      </tr>  
                    )
                ):
                <tr key={index}>
                <td>{val.name}</td>
                <td>{val.usia}</td>
                <td>{val.pekerjaan}</td>
                <td><button className='btn-info' onClick={()=>editButton(val.idtable)}>edit</button> <button  className='btn-info' onClick={()=>deleteData(val.idtable)}>delete</button></td>
            </tr>
            )
        })
    }
  
 const deleteData=(idtable)=>{
     
     Axios.delete(`${API}/table/delete-data?idtable=${idtable}`)
     .then((res)=>{
         setdata(res.data)
     }).catch((err)=>{
         console.log(err)
     })
 }
 
 const editDataTable=(idtable)=>{
     Axios.put(`${API}/table/edit-table/${idtable}`,editData)
     .then((res)=>{
         setdata(res.data)
         setedit(!isEdit)
         setId()
     }).catch((err)=>{
         console.log(err)
         
     })
 }

    const addNewData=()=>{
        Axios.post(`${API}/table/post-data`,newdata)
        .then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const deleteAllData=()=>{
        Axios.delete(`${API}/table/delete-all`)
        .then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const searchTable=()=>{
    
        Axios.get(`${API}/table/search-table?pekerjaan=${searchdata.pekerjaan}`)
        .then((res)=>{
        setdata(res.data)            
        }).catch((err)=>{
            console.log(err)            
        })
    }
    
   
    
    return(
        <div>
            <h1>SOAL 1</h1>
            <div className='row'>
                <div className='col-md-4 mb-4'>
                    <input placeholder='search by job' onChange={(e)=>{setsearch({...searchdata,pekerjaan:e.target.value})}}></input>
                    <button onClick={searchTable} className='btn-info'>submit</button>
                </div>
                
            </div>
            <button onClick={deleteAllData}  className='btn-info'>delete all</button>

            <table className='table mb-4'>
                <thead>
                    <tr>
                        <td>Nama</td>
                        <td>Usia</td>
                        <td>Pekerjaan</td>
                        <td>Act</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderbody()
                    }
                </tbody>
            </table>
            <div className='row'>
                <div className='col-md-3'> <input type='text' className='form-control' placeholder='Nama'  onChange={(e)=>{setnewdata({...newdata,name:e.target.value})}} /> </div>
                <div className='col-md-3'> <input type='number' className='form-control' placeholder='Usia'  onChange={(e)=>{setnewdata({...newdata,usia:e.target.value})}}  /> </div>
                <div className='col-md-3'> <input type='text' className='form-control' placeholder='Pekerjaan'  onChange={(e)=>{setnewdata({...newdata,pekerjaan:e.target.value})}}  /> </div>
                <div className='col-md-3'> <input type='button' onClick={addNewData} className='form-control btn-info' value='add Data'  /> </div>
            </div>
        </div>
    )
}

export default Home