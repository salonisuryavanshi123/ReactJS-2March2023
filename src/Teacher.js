//1. Import Area

import { useEffect, useState } from "react";

//2. Defination Area
function Teacher() {
  //2.1 Hooks Area

  // const[variable,setVariable] = useState(initialValue);
  const[teachers,setTeachers] = useState([
                                          {
                                            id:1,
                                            name:'Sunita',
                                            createdAt:'1394947'
                                          },
                                          {
                                            id:2,
                                            name:'Vinita',
                                            createdAt:'14995699'
                                          }
                                        ]);

  // useEffect is for page load
  // useEffect(cbfn,arr);
  useEffect(()=>{
    //Executed after the pageload/component render

    fetch(`http://localhost:1337/api/teachers`)
    .then((res)=>{
      // this make res JSON readable
      return res.json()
    })
    .then((data)=>{
      console.log(data.data);
      let newaoo = data.data.map((cv,idx,arr)=>{
        return {
                  id:cv.id,
                  name:cv.attributes.name,
                  createAt:cv.attributes.createdAt
               }
      });
      setTeachers(newaoo);
    })
    .catch();

  },[]);
  //Every Hook is a function

  //2.2 Function Defination Area

  //2.3 Return Statement
  return (
    <>
        <div className="container">
          <form className="mt-5 offset-1">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <br />
          <hr />
          <table className="table mt-5 offset-1">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {
                teachers.map((cv,idx,arr)=>{
                  return  <tr>
                            <td>{cv.id}</td>
                            <td>{cv.name}</td>
                            <td>{cv.createdAt}</td>
                          </tr>
                })
              }
              
            </tbody>
          </table>
        </div>   
    </>
  );
}

//3. Export Area
export default Teacher;
