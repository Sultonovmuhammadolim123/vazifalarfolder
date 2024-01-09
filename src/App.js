import React, { useEffect, useState } from "react";
import "./Index.css";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidSave } from "react-icons/bi";

const App = () => {
  const [data, setData] = useState([]);
  const [chose, setChose] = useState(null)
  const [text , setText] = useState(null)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then( response => {
      if(response.ok )
      {
        return response.json()
      }
      else
      {
        throw new Error("API da Xatolik bor, tekshirib koring")
      }
    })
    .then( info => {setData(info)})
    .catch( xato => console.log(xato)) 
  } , [])


  const [qiymat, setQiymat] = useState("");

  const ochir = (raqam) => {
    let yangiData = data.filter((value) => value.id !== raqam);
    setData(yangiData); 
  };
  
  const yarat = (e) => {
    setQiymat(e.target.value);
  };

  const add = () => {
    let ynagiVazifa = { id: data.length , title: qiymat };
    setData([...data , ynagiVazifa]);
  };
  
  const search = (e) =>{
    let yangiMalumot = data.filter((value) => value.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setData(yangiMalumot)
  } 

   const edit = (e) =>{
    setChose(e.id)
    setText(e.title)
   }

   const getValue = (e) => {
      setText(e.target.value)
   }

   const save = () =>{
    let yangiInfo = data.map( (value) => value.id == chose ? {...value, title: text } : value )
    setData(yangiInfo)
    setChose(null)
   }  
   

   return (

    <div className="container">
      <aside>
        <h1> To-Do List: {data.length} ta vazifa </h1>
      </aside>
      <section>
        <div className="section-card">
          <div className="card-header">
            <div className="card-search">
              <h4>Search:</h4>

              <input onChange={search} type="text" placeholder="Search:" />

            </div>
            <div className="card-add">
              <h4>Add:</h4>
              <span>

                <input onChange={yarat} type="text" placeholder="Add:" />
                <button onClick={add}>Add</button>
              </span>
            </div>
          </div>
          <div className="card-info">


          <div   className="card-1">
           
        {data.map((value, index) => {
        return (
         <div className="card-2" key={value.id}>
         <div className="card-3">
          {
            value.id == chose 
            ?
            (<input  className="input-title" onChange={getValue} value={text} type="text" />)
            :
            value.title
          }
        </div>
          <button
            className="btn-api"
            onClick={() => ochir(value.id)}
          >
            <MdDeleteForever className="delete-icon" />
          </button>
       {
        value.id == chose ? (<button className="btn-save" onClick={save}><BiSolidSave className="save-icon" /></button> ) : (<button onClick={ () => edit(value) } className="btn-edit" ><AiFillEdit className="edite-icon" /></button>)
       }
        </div>
        );
         })}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;



{/* <table width={100} border={1} >
<thead>
  <tr>
    <th>NO:</th>
    <th>Vazifalar</th>
    <th>Activity</th>
    <th>Edite</th>
  </tr>
</thead>
<tbody>

  {data.map((value, index) => {
    return (
      <tr key={value.id}>
        <th>{index + 1}</th>
        <th>
          {
            value.id == chose 
            ?
            (<input  className="input-title" onChange={getValue} value={text} type="text" />)
            :
            value.title
          }
        </th>
        <th>
          <button
            className="btn-api"
            onClick={() => ochir(value.id)}
          >
            Delete
          </button>
        </th>
       {
        value.id == chose ? (<th><button className="btn-save" onClick={save}>save</button></th> ) : (<th><button onClick={ () => edit(value) } className="btn-edit" >edit</button></th>)
       }
      </tr>
    );
  })}
</tbody>
</table> */}