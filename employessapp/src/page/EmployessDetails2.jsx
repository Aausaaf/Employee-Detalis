import axios from 'axios'
import React, { useState ,useMemo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletedata, getdata } from '../Redux/actions'
import MaterialReactTable from "material-react-table";


const Home = () => {

  
  
   const [name,setname] = useState("")

   const [email,setemail] = useState("")

   const [phone,setphone] = useState("")

   const [gender,setgender] = useState("")

   const [dob,setdob] = useState("")

   const [handleerror,sethandleerror] = useState(true)
  

   const [hobbies,sethobbies] = useState("")

   const [data,setdata] = useState([])

   const {store}  = useSelector((store)=>store) 
   
   const dispatch = useDispatch()
 

   const postdata = (data) => {

      axios.post(`http://localhost:8080/employessdetails`,data)

      .then((res)=>{

        if(res.data)
        {
            console.log(res.data)

            dispatch(getdata())

        }
        else
        {
            alert("Some Error")
        }
      }).catch((err)=>{

        console.log(err)

        alert(err.message)
      })
   }
   

   const patchdata = (data,index) => {

    axios.patch(`http://localhost:8080/employessdetails/${index}`,data)
    .then((res)=>{
      if(res.data)
      {
          console.log(res.data)
          dispatch(getdata())
      }
      else
      {
          alert("Some Error")
      }
    }).catch((err)=>{
      console.log(err)
      alert(err.message)
    })
 }
 

  const add = (event) => {
    
    event.preventDefault()

    postdata({
        name:name,
        email:email,
        phone:phone,
        hobbies:hobbies,
        gender:gender,
        DOB:dob
    })
  }



 
    

      const columns = useMemo(
        () => [
          {
            accessorKey: "name",
            header: "Name",
            muiTableHeadCellProps: { sx: { color: "green" } } 
          },
          {
            accessorFn: (row) => row.email, //
            id: "email",
            header: "Email",
            Header: <i style={{ color: "black" }}>Email</i> 
          },
          {
            accessorFn: (row) => row.phone, 
            id: "Phone No", 
            header: "Phone No",
            Header: <i style={{ color: "black" }}>Phone No</i> 
          },
          {
            accessorFn: (row) => row.gender, 
            id: "Gender", 
            header: "Gender",
            type:"radio",
            Header: <i style={{ color: "black" }}>Gender</i> 
          },
          {
            accessorFn: (row) => row.hobbies, 
            id: "hobbies",
            header: "Hobbies",
            type:"checkbox",
            Header: <i style={{ color: "black" }}>Hobbies</i>
          },
          {
            accessorFn: (row) => row.DOB, 
            id: "DOB", 
            header: "DOB",
            type:"date",
            Header: <i style={{ color: "black" }}>DOB</i> 
          }
        ],
        []
      );


  


  
      useEffect(()=>{

      
   
      dispatch(getdata())
      setdata(store)

      
        },[])
       

        const datas = useMemo(
            () =>data,
        
          );
  //console.log(store)
    if(handleerror)
    {
        if(store.length>0)
        {
            setdata(store)
            sethandleerror(false)
        }
        
    }
    console.log(data)
 
  return (
    <>
     
     




    <h1 className='Header'>Employess Details</h1>

    <MaterialReactTable 
    columns={columns} 
    data={datas}
    editable={{
        onRowAdd:(newRow)=>Promise((resolve,reject)=>{
            console.log(newRow)
        })
    }}
    enableEditing={{
        onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
            console.log(newRow)
        })
    }}
    enableClickToCopy={true}
   
    />


  

    






    </>
  )
}

export default Home