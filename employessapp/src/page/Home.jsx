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
            accessorKey: "name", //simple recommended way to define a column
            header: "Name",
            muiTableHeadCellProps: { sx: { color: "green" } } //custom props
          },
          {
            accessorFn: (row) => row.email, //alternate way
            id: "email", //id required if you use accessorFn instead of accessorKey
            header: "Email",
            Header: <i style={{ color: "black" }}>Email</i> //optional custom markup
          },
          {
            accessorFn: (row) => row.phone, //alternate way
            id: "Phone No", //id required if you use accessorFn instead of accessorKey
            header: "Phone No",
            Header: <i style={{ color: "black" }}>Phone No</i> //optional custom markup
          },
          {
            accessorFn: (row) => row.gender, //alternate way
            id: "Gender", //id required if you use accessorFn instead of accessorKey
            header: "Gender",
            type:"radio",
            Header: <i style={{ color: "black" }}>Gender</i> //optional custom markup
          },
          {
            accessorFn: (row) => row.hobbies, //alternate way
            id: "hobbies", //id required if you use accessorFn instead of accessorKey
            header: "Hobbies",
            type:"checkbox",
            Header: <i style={{ color: "black" }}>Hobbies</i> //optional custom markup
          },
          {
            accessorFn: (row) => row.DOB, //alternate way
            id: "DOB", //id required if you use accessorFn instead of accessorKey
            header: "DOB",
            type:"date",
            Header: <i style={{ color: "black" }}>DOB</i> //optional custom markup
          }
        ],
        []
      );


  


  
      useEffect(()=>{

        // dispatch(deletedata(1))
      //    postdata({
      //     name:"Aausaf",
      //     email:"aausafalam585@gmail.com",
      //     hobby:"Aau",
      //     gender:"male"
      //    })
   
      dispatch(getdata())
      setdata(store)

       // patchdata({name:"Aausaf"},3)
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