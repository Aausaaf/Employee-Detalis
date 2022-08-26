import axios from 'axios'



export const GET  = "GET"
export const POST = "POST"
export const PATCH = "PUT"
export const DELETE = "DELETE"


 export const get  = (payload) => ({
  type:GET,
  payload
})

export const post  = (payload) => ({
    type:GET,
    payload
  })
  
export const deletes = (payload) => ({
   type:DELETE,
   payload
})

export const edit = (payload) => ({
    type:PATCH,
    payload
 })
 



export const getdata = () =>  (dispatch) => {

    axios.get(`http://localhost:8080/employessdetails`).then((res)=>{

        //console.log(res.data)
       
         dispatch(get(res.data))
    }).catch((err)=>{

        console.log(err)

    })
}



 export const deletedata = (id) => (dispatch) => {
    axios.delete(`http://localhost:8080/employessdetails/${id}`).then((res)=>{
        if(res.data)
        {
            console.log(res.data)
           
        }

    })
    .catch((err)=>{
        console.log(err)
    })

    axios.get(`http://localhost:8080/employessdetails`).then((res)=>{

       // console.log(res.data)
       
         dispatch(get(res.data))
    }).catch((err)=>{

        console.log(err)

    })
}