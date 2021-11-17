import React,{useState} from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import InputComponent from "./input/input";
import ButtonComponent from "./button/button";
import { PostsQueries } from '../queries/queries';
import { useMutation,useQuery } from '@apollo/client';

export default function UpdatePost() {
  let navigate = useNavigate()
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [userId, setUserId] = useState(null);
  const id = useParams()
  const {loading,data,error} = useQuery(PostsQueries.getPost,{
    variables : {
      "postId": parseInt(id.id)
    },
    onCompleted:(data)=>{
    setTitle(data.post.title)
    setBody(data.post.body)
    setUserId(data.post.userId)
    }
  })
  const [updatePost] = useMutation(
    PostsQueries.updatePost
    );

  const submitHandler= () =>{
    updatePost({variables:{ 
      "updatePostId": parseInt(id.id),
      "postInput" : { 
        userId : parseInt(userId),
        title : title,
        body : body
    }}})
    navigate('/')
  }
 
  return (
    <>
         <form>
        <div>
          <InputComponent
            placeholder="Title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <InputComponent
            placeholder="Body"
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
          <InputComponent
            placeholder="UserId"
            name="userId"
            value={userId}
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
