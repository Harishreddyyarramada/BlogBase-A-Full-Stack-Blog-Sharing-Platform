import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home/Home.jsx";
import Posts from "./Components/Posts/Posts.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Feeds from './Components/Feeds/Feeds.jsx'
import Protectedroute from "./Components/Protected/Protectedroute.jsx";
import Pagenotfound from './Components/PagenotFound/PagenotFound.jsx'
import SinglePost from "./Components/SinglePost/SinglePost.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import { BrowserRouter , Routes , Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route index element={<Login/>} />
            <Route element={<Protectedroute/>}>
                <Route path="/Home" element={<Home/>} >
                    <Route path="posts" element={<Posts/>} />
                </Route>
                <Route path="/posts/:id" element={<SinglePost/>} />
                <Route path="/posts/feeds/:id" element={<Feeds />} />
                <Route path="/myprofile" element={<Profile/>} />
            </Route>
            <Route path="*" element={<Pagenotfound/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
