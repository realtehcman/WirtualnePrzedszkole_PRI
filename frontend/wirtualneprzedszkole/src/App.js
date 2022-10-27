import Users from './pages/User/Users';
import Home from './pages/Home/Home';
import AddUser from './pages/CreateUser/AddUser';
import Login from './pages/Login/Login'
import UserNavi from './pages/User/UserNavi'
import GroupNavi from './pages/GroupDisplay/GroupNavi'
import GroupIdNavi from './pages/GroupDisplay/GroupIdNavi'
import AddGroup from './pages/CreateGroup/AddGroup';
import ChildrenNavi from './pages/Children/ChildrenNavi';
import AddChild from './pages/CreateChild/AddChild';
import ChildNavi from './pages/Children/ChildNavi';
import LoginService from "./pages/Login/LoginService"
import UserChildNavi from "./pages/UserChild/UserChildNavi"
import EditUserNavi from './pages/EditUser/EditUserNavi';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";


function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/'>
        <Route index element={<Login/>}></Route>
        </Route>
        <Route path="users" element={<PrivateOutlet />}>
          <Route index element={<Users/>}></Route>
        </Route>
        <Route path='add-user' element={<PrivateOutlet />}>
          <Route index element={<AddUser/>}></Route>
        </Route>
        <Route path='/home' element={<PrivateOutlet />}>
          <Route index element={<Home/>}></Route>
        </Route>
        <Route path='/user/:id' element={<PrivateOutlet />}>
          <Route index element={<UserNavi/>}></Route>
        </Route>
        <Route path='/groups' element={<PrivateOutlet />}>
          <Route index element={<GroupNavi/>}></Route>
        </Route>
        <Route path='/group/:id' element={<PrivateOutlet />}>
          <Route index element={<GroupIdNavi/>}></Route>
        </Route>
        <Route path='/add-group' element={<PrivateOutlet />}>
          <Route index element={<AddGroup/>}></Route>
        </Route>
        <Route path="children" element={<PrivateOutlet />}>
          <Route index element={<ChildrenNavi/>}></Route>
        </Route>
        <Route path='/add-child' element={<PrivateOutlet />}>
          <Route index element={<AddChild/>}></Route>
        </Route>
        <Route path='/child/:id' element={<PrivateOutlet />}>
          <Route index element={<ChildNavi/>}></Route>
        </Route>
        <Route path='/user/:id/child' element={<PrivateOutlet />}>
          <Route index element={<UserChildNavi/>}></Route>
        </Route>
        <Route path="/user/:id/edit" element={<PrivateOutlet />}>
          <Route index element={<EditUserNavi/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
}

function useAuth() {
  return LoginService.isLoggedIn();
}