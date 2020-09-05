import React from 'react';
import { useParams,Link } from 'react-router-dom';
let Dummy_Menu = [
    
      {
        "id":1,
        "ID":"Restaurent1",
        "Food_Name":"Menu.Food_Name1",
        "Price":"$60"
      }
    ,
    {
      "id":2,
      "ID":"Restaurent1",
      "Food_Name":"Menu.Food_Name2",
      "Price":"$60"
    },
    {
      "id":1,
      "ID":"Restaurent2",
        "Food_Name":"Menu.Food_Name2",
        "Price":"$30"
    },
    {
      "id":1,
      "ID":"Restaurent3",
        "Food_Name":"Menu.Food_Name3",
        "Price":"$20"
    }
]
const Row = ({id, Food_Name, Price}) => (
  <div className="row">
    <div>{id}</div>
    <div>{Food_Name}</div>
    <div>{Price}</div>    
    <div><Link className="action2" to={`/res//menu/${id}`} >EDIT</Link>
    <button className="action2" >Delete</button></div>    
  </div>
);
const AllMenuByResID = () => {
    const Rid = useParams().rid
    const loadedmenu = Dummy_Menu.filter(menu => menu.ID === Rid)
    const rows = loadedmenu.map( (rowData) => <Row {...rowData} Rid={Rid}/>);
    return  (
      <>
      <div className="table">
      <div className="header">
        <div>ID</div>
        <div>Food Name</div>
        <div>Price</div>
        <div>Action</div>
      </div>
      <div className="body">
        {rows}
      </div>
    </div>
          </>
    );
};

export default AllMenuByResID;
