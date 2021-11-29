import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import InputComponent from "./input/input";
import ButtonComponent from "./button/button";
import { PostsQueries } from "../queries/queries";
import { Container, FormGroup } from "reactstrap";
import SelectComponent from "./select/select";
export default function AddPost() {
  let navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState(null);

  const [addPost, { loading, error }] = useMutation(PostsQueries.addPost);
  const options = [
    { value: "FOOD", label: "Food" },
    { value: "ANIMAL", label: "Animal" },
    { value: "CRIME", label: "Crime" },
    { value: "SURGERY", label: "Surgery" },
  ];
  const submitHandler = () => {
    addPost({
      variables: {
        postInput: {
          userId: parseInt(userId),
          title: title,
          body: body,
          type: type,
        },
      },
    });
    console.log("addpost");
    navigate("/");
    return;
  };
  if (loading) return <p>loading..</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Container>
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
            <FormGroup>
              {/* <Label for="exampleSelectMulti">Type</Label>
              <Input id="exampleSelectMulti" name="select" type="select">
                <option selected hidden>
                  Select...
                </option>
                <option>Food</option>
                <option>Animal</option>
                <option>Crime</option>
                <option>Surgery</option>
              </Input> */}
              <SelectComponent
                options={options}
                onChange={(event) => setType(event.value)}
              />
            </FormGroup>
          </div>
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
