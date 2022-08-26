


import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletedata, deletes, getdata } from '../Redux/actions'
import MaterialTable from "material-table";
export const Example = () => {
  const [data,setData] = useState([])
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



    const columns = [
        { title: "ID", field: "id", editable: false },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: "phone", type: "date", placeholder: "DOB" },
        { title: "City", field: "city" }
      ];


    useEffect(()=>{

         // dispatch(deletedata(1))
       //    postdata({
       //     name:"Aausaf",
       //     email:"aausafalam585@gmail.com",
       //     hobby:"Aau",
       //     gender:"male"
       //    })
    
       dispatch(getdata())
       setData(store)

        // patchdata({name:"Aausaf"},3)
         },[])
         const datas = useMemo(
            () =>data,
        
          );


     
  return (<div>
     
      {/* <form action="">
     <input placeholder='Enter name' type="text"  value={name} onChange={(event)=>{
         setname(event.target.value)
     }}/>
      <input placeholder='Enter email' type="text"  value={email} onChange={(event)=>{
         setemail(event.target.value)
     }}/>
      <input placeholder='Enter phone no.' type="text"  value={phone} onChange={(event)=>{
         setphone(event.target.value)
     }}/>
       <input type="date"  value={dob} onChange={(event)=>{
         setdob(event.target.value)
     }}/>
      
      <input id='radio' type="radio"  value="male" name='gender' onChange={(event)=>{
         setgender(event.target.value)
     }}/>
     <label htmlFor="radio">Male</label>
     <input id='female' type="radio"  value="Female" name='gender' onChange={(event)=>{
         setgender(event.target.value)
     }}/>
     <label htmlFor="female">Female </label>
   


     <input id='hobbies' type="checkbox"  value="Cricket" onChange={(event)=>{
         sethobbies(event.target.value)
     }}/>
     <label htmlFor="hobbies">Cricket</label>
     <input id='football' type="checkbox"  value="Football" onChange={(event)=>{
         sethobbies(hobbies + " " + event.target.value)
     }}/>
     <label htmlFor="hobbies">Football</label>
     <input id='reading' type="checkbox"  value="Reading Books" onChange={(event)=>{
         sethobbies(hobbies + " " + event.target.value)
     }}/>
     <label htmlFor="reading"> Reading Books </label>
     <input id='watching' type="checkbox"   value="Watching Movie" onChange={(event)=>{
         sethobbies(hobbies + " " + event.target.value);
     }}/>
     <label htmlFor="reading"> Matching Movie </label>

    <button onClick={(event)=>{
        add(event)
    }} >Submit</button>
     

     </form> */}
{/*     
    {
         store.map((ele)=>{
            return <>
            <p>{ele.name}</p>
            </>
         })
    } */}


<MaterialTable
        title="Employee Data"
        data={store}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
                console.log(newRow)
              const updatedRows = [
                ...store,
                { id: store+1, ...newRow }
              ];
              setTimeout(() => {
                postdata(newRow);

                resolve();
              }, 2000);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;

              const updatedRows = [...data];
              updatedRows.splice(index, 1);
              setTimeout(() => {
               
               dispatch(deletedata(selectedRow.id))
                resolve();
              }, 2000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              
              const index = oldRow.tableData.id;
              console.log(index+1)
              const updatedRows = [...data];
              updatedRows[index] = updatedRow;
              setTimeout(() => {
                setData(updatedRows);
                patchdata(updatedRow,updatedRow.id)
                resolve();
              }, 2000);
            })
        }}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first"
        }}
      />







    </div>
  )
}
