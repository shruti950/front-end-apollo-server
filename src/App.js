import './App.css';
import Posts from './components/posts';
import { BrowserRouter, Routes, Route, Link,useRoutes } from 'react-router-dom';
import AddPost from './components/addPost';
import UpdatePost from './components/updatePost';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Posts /> },
    { path: "addpost", element: <AddPost /> },
    { path: "editpost/:id", element: <UpdatePost /> },
    // ...
  ]);
  return routes;
};

function App() {
  return (
    <div className="App">
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
