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

    axios.get(`https://example-hoga.herokuapp.com/employessdetails`).then((res)=>{

        //console.log(res.data)
       
         dispatch(get(res.data))
    }).catch((err)=>{

        console.log(err)

    })
}



 export const deletedata = (id) => (dispatch) => {
    axios.delete(`https://example-hoga.herokuapp.com/employessdetails/${id}`).then((res)=>{
        if(res.data)
        {
            console.log(res.data)
           
        }

    })
    .catch((err)=>{
        console.log(err)
    })

    axios.get(`https://example-hoga.herokuapp.com/employessdetails`).then((res)=>{

       // console.log(res.data)
       
         dispatch(get(res.data))
    }).catch((err)=>{

        console.log(err)

    })
}



 
export const postdata = (data) => (dispatch) => {
    axios.post(`https://example-hoga.herokuapp.com/employessdetails`,data)
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



 export const patchdata = (data,index) => (dispatch) => {
    axios.patch(`https://example-hoga.herokuapp.com/employessdetails/${index}`,data)
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