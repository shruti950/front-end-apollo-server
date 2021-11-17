import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {useNavigate} from 'react-router-dom'
import InputComponent from "./input/input";
import ButtonComponent from "./button/button";
import { PostsQueries } from "../queries/queries";

export default function AddPost() {
  let navigate = useNavigate()
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [userId, setUserId] = useState(null);

  const [addPost, { loading, data, error }] = useMutation(
    PostsQueries.addPost
    );


    const submitHandler= () =>{
    addPost({variables:{ "postInput":{ 
      userId : parseInt(userId),
      title : title,
      body : body
    }}})
    navigate('/')
  }
  if(loading) return <p>loading..</p>
  if(error) return <p>{error}</p>
  
  return (
    <>
      <form>
        <div>
          <InputComponent
            placeholder="Title"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <InputComponent
            placeholder="Body"
            name="body"
            onChange={(event) => setBody(event.target.value)}
          />
          <InputComponent
            placeholder="UserId"
            name="userId"
            onChange={(event) => setUserId(event.target.value)}
          />
        </div>
        <div>
          <ButtonComponent
            type="submit"
            value="Submit"
            onClick={()=>submitHandler()}
          />
        </div>
      </form>
    
    </>
  );
}
