const axios = require('axios');
export const fetchJobResults = async (position="JavaScript", location="Berlin") => { //how to give default!
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/positions.json?description=${position}&location=${location}`
      );
      const data  = await response.json();
      if (response.ok) {
        console.log(data);
        return data;
      } else {
        console.log("there was a problem fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };


  export const fetchSingleJob = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/positions/${id}.json`
      );
      const data  = await response.json();
      if (response.ok) {
        console.log(data);
        return data;
      } else {
        console.log("there was a problem fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  export const getUserInfo = async() =>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_BE_URL}/api/users/me`,{
        withCredentials:true
      })
      const data = await res.data
      // console.log(data)
      return data
    }catch(err){console.log(err)}
  }
  
  export const logout = async() =>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_BE_URL}/api/users/auth/logout`,{
        withCredentials:true
      })
      const data = await res.data
      console.log(data)
      return data
    }catch(err){console.log(err)}
  }