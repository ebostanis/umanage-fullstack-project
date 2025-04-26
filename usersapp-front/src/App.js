import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import UsersView from "./components/user/UsersView";
import Home from "./Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.jsx";
import AddUser from "./components/user/AddUser.jsx";
import UserView from "./components/user/UserView.jsx";
import AboutPage from "./components/AboutPage.jsx";


function App() {
  return (
    <div className="App">

      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/users" element={<UsersView/>}></Route>
            <Route exact path="*" element={<NotFoundPage/>}></Route>
            <Route exact path="/add-user" element={<AddUser/>}></Route>
            <Route exact path="/users/:id"element={<UserView/>}></Route>
            <Route exact path="/about"element={<AboutPage/>}></Route>
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;
