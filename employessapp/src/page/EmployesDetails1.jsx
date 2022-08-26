import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletedata, deletes, getdata, patchdata, postdata } from '../Redux/actions'
import MaterialTable from "material-table";

export const Example = () => {

  const [data,setData] = useState([])

  const {store}  = useSelector((store)=>store) 

  const dispatch = useDispatch()

 

    const columns = [
        { title: "ID", field: "id", editable: false },

        { title: "Name", field: "name" },

        { title: "Email", field: "email" },

        { title: "Phone Number", field: "phone", type: "text", placeholder: "DOB" },

        { title: "Gender", field: "gender" , type:"text" , name:"Gender" },

        { title: "Hobbies", field: "hobbies" , type:"text" , name:"Hobbies" },

        { title: "DOB", field: "DOB" , type:"date", name:"DOB" }

      ];


    useEffect(()=>{

         
       dispatch(getdata())

       setData(store)

        // patchdata({name:"Aausaf"},3)

         },[])

         const datas = useMemo(

            () =>data,
        
          );


     
  return (<div>
     
     

  
<MaterialTable
        title="Employee Data"

         style={{width:"95vw", margin:"auto",marginTop:"4vh"}}

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

                dispatch(postdata(newRow));

                resolve();

              }, 2000);
            }),
          onRowDelete: (selectedRow) =>

            new Promise((resolve, reject) => 
            {
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

              dispatch(patchdata(updatedRow,updatedRow.id))

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
