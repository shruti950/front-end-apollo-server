import { gql } from "@apollo/client";

export const PostsQueries = {
  getPosts: gql`
    query ($offset: Int) {
      posts(offset: $offset) {
        pageCount
        post {
          id
          title
          body
          userId
        }
      }
    }
  `,
  addPost: gql`
    mutation ($postInput: PostInput) {
      addPost(postInput: $postInput) {
        title
      }
    }
  `,
  updatePost: gql`
    mutation ($updatePostId: ID!, $postInput: PostInput) {
      updatePost(id: $updatePostId, postInput: $postInput) {
        body
      }
    }
  `,
  getPost: gql`
    query ($postId: ID!) {
      post(id: $postId) {
        body
        title
        id
        userId
        type
      }
    }
  `,
  deletePost: gql`
    mutation ($deletePostId: ID!) {
      deletePost(id: $deletePostId) {
        body
      }
    }
  `,
  addPayment: gql`
    mutation ($paymentInput: payment) {
      addPayment(paymentInput: $paymentInput) {
        amount
        currency
        token
      }
    }
  `
};
