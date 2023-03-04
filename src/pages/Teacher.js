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
  const [payload,setPayload] = useState({
                                          "data": {
                                            "name": "Teacher4"
                                          }
                                        })   
  const [teacherName,setTeacherName] = useState('');                                                                       

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
                  createdAt:cv.attributes.createdAt
               }
      });
      setTeachers(newaoo);
    })
    .catch();

  },[]);
  //Every Hook is a function

  //2.2 Function Defination Area
  let sendData =()=>{
    //alert("ok");
    fetch(`http://localhost:1337/api/teachers`,{
      "method":"POST",
      "headers":{
        "Content-Type": "application/json"
      },
      "body":JSON.stringify(payload)
    })
    .then((res)=>{
      // I want to convert the response into json readable
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  let changeValue =(event)=>{
    console.log(event.target.value);
    setTeacherName(event.target.value);
    console.log('HOOK teacherName',teacherName);

    setPayload({
      ...payload,
      data:{
        name:document.querySelector('input#teachername').value
      }
    });
  }
  let deleteTeacher = (e)=>{
    let x = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    let delid = e.target.closest('tr').querySelector('td:first-child').innerHTML;
    let ans = window.confirm("Are you sure do you really want to delete");
    console.log(typeof ans);
    if(ans === true){
      //console.log('Ok');
      //Call the DELETE REST API
      fetch(`http://localhost:1337/api/teachers/${delid}`,{
        method:"DELETE"
      })
      .then((res)=>{
        //This Json() function make the incoming data json readable
        return res.json();
      })
      .then((data)=>{
        x.remove();
        console.log(data);
        window.alert('Deleted Successfully')
      })
      .catch((err)=>{});
    }else{
      console.log('NotOk');
    }
  }

  //2.3 Return Statement
  return (
    <>
        <div className="container offset-2 ">
          <h1>Create Teacher</h1>
          <form className="mt-5">
            <div className="mb-3">
              <label htmlFor="teachername" className="form-label">Teacher Name</label>
              <input type="text" className="form-control" id="teachername" name="name" onKeyUp={(e)=>{changeValue(e)}}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={()=>{sendData()}}>Submit</button>
          </form>
          <br />
          <hr />
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CreatedAt</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                teachers.map((cv,idx,arr)=>{
                  return  <tr key={idx}>
                            <td>{cv.id}</td>
                            <td>{cv.name}</td>
                            <td>{cv.createdAt}</td>
                            <td>
                              <button className="btn btn-success btn-sm">View</button>
                              <button className="btn btn-primary btn-sm">Edit</button>
                              <button className="btn btn-danger btn-sm" onClick={(e)=>{deleteTeacher(e)}}>Delete</button>
                            </td>
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
