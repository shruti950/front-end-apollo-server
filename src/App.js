import './App.css';
import Posts from './components/posts';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import AddPost from './components/addPost';
import UpdatePost from './components/updatePost';
import Post from './components/post';
import StripePayment from './components/stripe-button/stripe-payment';
import Checkoutform from './components/stripe/checkOutForm';
// import ReactReadMoreReadLess from "N";
import LineComponent from './components/chart/lineComponents';
const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere";
const stripe = loadStripe('pk_test_51JXgciSJ5cEtd8TEOirPyf7RiYswQnSq6D4jUy6UrhdPJLWLcLTFIhE25hXkQxqT4x7qI6VEXpYbtTLzztukOosu00xiDgbzso')

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Posts /> },
    { path: "/:id", element: <Post /> },
    { path: "addpost", element: <AddPost /> },
    { path: "editpost/:id", element: <UpdatePost /> },
    { path: "payment", element: <StripePayment /> } ,
    { path: "chart", element: <LineComponent /> },
    // ...
  ]);
  return routes;
};

function App() {
  // const options = {
  //   clientSecret : '{{CLIENT_SECRET}}'
  // }
  return (
    <div className="App">
       {/* <Elements stripe={stripe}>
      <Checkoutform />
    </Elements> */}
    {/* <ReactReadMoreReadLess
        charLimit={200}
        readMoreText={"Read more ▼"}
        readLessText={"Read less ▲"}
        readMoreClassName="read-more-less--more"
        readLessClassName="read-more-less--less"
      >
        {longText}
      </ReactReadMoreReadLess> */}
      {/* <LineComponent/> */}
      <BrowserRouter>
        {/* <Route path="/" element={<Posts/>}/>
        <Route path="/addpost" element={<Posts/>}/> */}
        <AppRoutes/>
      </BrowserRouter>
      {/* <Posts/> */}
    </div>
  );
}


export default App;
