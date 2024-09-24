import axios from 'axios';
const qs = require('qs');

export const checkUser = async (userName, password) =>{
   const urls = ['http://localhost:5000/api/owner/verify','http://localhost:5000/api/customer/verify', 'http://localhost:5000/api/worker/verify']
   const data ={
    userName: userName,
    password: password
    }
    for (let a = 0; a < urls.length; a++) {
      try {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: urls[a],
          };          
        const result = await (await axios(options)).data
        if(result.length > 0){
          return result[0]
        }
          
      } catch(error) {
        console.log(error)
      }
    }
    return{}
}