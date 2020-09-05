import React from 'react';
import UserRestaurant from './UserRestaurant.css'
import {Link} from 'react-router-dom'
let Dummy_Res = [
    {
        "id":1,
        "title":"Restaurent1",
        "Address":"res.address1",
        "food_type":"Both",
        "RID":"r1"
    },
    {
      "id":2,
        "title":"Restaurent2",
        "Address":"res.address2",
        "food_type":"Non-Veg",
        "RID":"r2"
    },
    {
      "id":3,
        "title":"Restaurent3",
        "Address":"res.address3",
        "food_type":"Veg",
        "RID":"r3"
    }
]

const Row = ({id, title, Address,RID}) => (
  <div className="row">
    <div>{id}</div>
    <div><Link to={`res/${title}/menu`}>{title}</Link></div>
    <div>{Address}</div>    
    <div><Link className="action2" to={`/edit/${RID}`} >EDIT</Link>
    <button className="action2" >Delete</button></div>    
  </div>
);
const UserRestraurent = () => {
  const rows = Dummy_Res.map( (rowData) => <Row {...rowData} />);
  
  return (
    <>
    <div className="table">
    <div className="header">
      <div>ID</div>
      <div>Title</div>
      <div>Address</div>
      <div>Action</div>
    </div>
    <div className="body">
      {rows}
    </div>
  </div>
        </>
  );
};

export default UserRestraurent;
