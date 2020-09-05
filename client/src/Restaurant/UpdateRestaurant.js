import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import Input from '../shared/from/Input';
import Button from '../shared/from/Button';
import { useForm } from '../shared/hooks/form-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../shared/util/validators';
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
const UpdateRestaurent = (props) => {
  const history = useHistory()
  const resId = useParams().rid;
  const loadedmenu = Dummy_Res.filter(menu => menu.RID === resId)

  
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: loadedmenu[0].title,
        isValid: true
      },
      Address: {
        value: loadedmenu[0].Address,
        isValid: true
      }
    },
    true
  );
  const title = formState.inputs.title.value
  const Address = formState.inputs.Address.value
  const [data,setdata] = useState({id:{resId},title:{title},address:{Address}})
  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    history.push('/')
  };

    return <> 
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
    <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={data.title.title}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="Address"
        element="textarea"
        label="Address"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={data.address.Address}
        initialValid={formState.inputs.Address.isValid}
      />
      <Button type="submit" disabled={!formState.isValid} >
        UPDATE PLACE
      </Button>
      </form>
    </>
};

export default UpdateRestaurent;
