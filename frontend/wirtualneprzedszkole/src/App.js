import Users from './pages/User/Users';
import UserEdit from "./pages/UserEdit/UserEdit";
import Home from './pages/Home/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/'></Route>
        <Route index element={<Home/>}></Route>
        <Route path="users">
          <Route index element={<Users/>}></Route>
        </Route>
        <Route path="form">
          <Route index element={"form.html"}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
