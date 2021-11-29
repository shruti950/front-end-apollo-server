import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Spinner, CardTitle, CardText, Container } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./posts.css";
import ButtonComponent from "./button/button";
import { PostsQueries } from "../queries/queries";
// const getPosts = gql`
//   query ($offset: Int) {
//     posts(offset: $offset) {
//       title
//       body
//       userId
//     }
//   }
// `;

export default function Posts(props) {
  let navigate = useNavigate();
  const [offset, setOffset] = useState(1);
  useEffect(() => {
    setOffset(offset);
  }, [offset]);

  const { loading, data, error, refetch } = useQuery(PostsQueries.getPosts, {
    variables: {
      offset: offset,
    },
  });
  useEffect(() => {
    refetch();
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);
  const [deletePost] = useMutation(PostsQueries.deletePost);
  if (loading)
    return (
      <div>
        <Spinner color="dark" type="grow">
          Loading...
        </Spinner>
      </div>
    );
  if (error) return <p>{error.message}</p>;

  const addPost = async () => {
    navigate("/addpost");
  };
  const handlePageClick = (e) => {
    const selected = e.selected;
    setOffset(selected + 1);
    refetch();
  };
  const updatePost = () => {
    navigate("/editpost");
  };
  const removePost = (id) => {
    deletePost({
      variables: {
        deletePostId: parseInt(id),
      },
    });
    refetch();
    if (data.posts.post.length === 1) {
      setOffset(1);
      refetch();
    }
  };
  return (
    <div>
      <Container className="bg-light border">
        <div className="button-right">
          <ButtonComponent value="Add Post" type="button" onClick={addPost} />
        </div>
        {data.posts.post.map((post) => (
          <div>
            <Card body>
              <Link to={{ pathname: `/${post.id}` }}>
                <div className="card-flex">
                  <div className="left-align">
                    <CardTitle tag="h5">{post.userId}</CardTitle>
                    <CardText>{post.title}</CardText>
                  </div>
                  <div className="flex-center">
                    <Link to={{ pathname: `/editpost/${post.id}` }}>
                      <CardText>
                        <ButtonComponent value="Update" onClick={updatePost} />
                      </CardText>
                    </Link>
                    <CardText>
                      <ButtonComponent
                        value="Delete"
                        onClick={() => removePost(post.id)}
                      />
                    </CardText>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        ))}
      </Container>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={data.posts.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={offset - 1}
      />
    </div>
  );
}
