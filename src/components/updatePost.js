import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "./input/input";
import ButtonComponent from "./button/button";
import { PostsQueries } from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Container } from "reactstrap";
import SelectComponent from "./select/select";
export default function UpdatePost() {
  let navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState({ label: null, value: null });
  const id = useParams();
  const options = [
    { value: "FOOD", label: "Food" },
    { value: "ANIMAL", label: "Animal" },
    { value: "CRIME", label: "Crime" },
    { value: "SURGERY", label: "Surgery" },
  ];
  const { data, refetch } = useQuery(PostsQueries.getPost, {
    variables: {
      postId: parseInt(id.id),
    },
    onCompleted: (data) => {},
  });
  useEffect(() => {
    refetch();
    if (data) {
      setTitle(data.post.title);
      setBody(data.post.body);
      setUserId(data.post.userId);
      const lowerType = data.post.type.toLowerCase();
      const firstLetter = lowerType[0].toUpperCase();
      const type = firstLetter.concat(lowerType.substr(1, lowerType.length));
      setType({ label: type, value: data.post.type });
    }
  }, [data]);
  const [updatePost] = useMutation(PostsQueries.updatePost);

  const submitHandler = () => {
    console.log(title, body, userId, type);
    updatePost({
      variables: {
        updatePostId: id.id,
        postInput: {
          body: body,
          title: title,
          userId: userId,
          type: type.value,
        },
      },
    });
    navigate("/");
  };

  return (
    <>
      <Container>
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
          <SelectComponent
            value={type}
            options={options}
            onChange={(event) => setType(event)}
          />
          <div>
            <ButtonComponent
              type="submit"
              value="Submit"
              onClick={() => submitHandler()}
            />
          </div>
        </form>
      </Container>
    </>
  );
}
