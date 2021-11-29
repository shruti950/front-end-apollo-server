import { useQuery } from '@apollo/client';
import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {  Spinner,Card, CardBody, CardTitle, CardText, Container } from 'reactstrap';
import { PostsQueries } from '../queries/queries';

export default function Post() {
  const id = useParams();
 const {loading,data,error,refetch} = useQuery(PostsQueries.getPost,{ variables : {
  "postId": parseInt(id.id)
}});
useEffect(() => {
 refetch()
}, [data]);
 if (loading)
 return (
   <div>
     <Spinner color="dark" type="grow">
       Loading...
     </Spinner>
   </div>
 );
if (error) return <p>{error.message}</p>;
  return (
    <>
    <Container>
    <Card>
      <CardBody>
        <CardTitle tag="h5">
          {data.post.title}
        </CardTitle>
        <CardText>
          {data.post.body}
        </CardText>
        <CardText>
          {data.post.type}
        </CardText>
      </CardBody>
    </Card>
    </Container>
    </>
  );
}
