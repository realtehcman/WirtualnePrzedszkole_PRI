import Users from './pages/User/Users';
import CurrentUser from './pages/Home/CurrentUser';
import AddUser from './pages/CreateUser/AddUser';
import Login from './pages/Login/Login'
import RestartPassword from './pages/Login/RestartPassword';
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
import MessageNavi from './pages/messages/MessageNavi';
import SendMessageNavi from './pages/messages/SendMessageNavi';
import SentMessageNavi from './pages/messages/SentMessageNavi';
import ReadMessageNavi from './pages/messages/ReadMessageNavi';
import GalleryNavi from "./pages/gallery/GalleryNavi";
import GaleriaNavi from "./pages/gallery/GaleriaNavi";
import StatusMessageNavi from './pages/messages/StatusMessageNavi';
import ViewMessageNavi from './pages/messages/ViewMessageNavi';
import KnowledgeNavi from './pages/gallery/KnowledgeNavi';
import ViewGalleryNavi from './pages/gallery/ViewGalleryNavi';
import AddGalleryNavi from './pages/gallery/AddGalleryNavi';
import FolderNavi from './pages/Folders/FolderNavi'
import EditChildNavi from './pages/Children/EditChildNavi';
import KadraNavi from './pages/Kadra/KadraNavi';

import React, {useState} from 'react';

import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import ChangePassword from './pages/Login/ChangePassword';
import AddFolderNavi from './pages/Folders/AddFolderNavi';
import FolderOtherNavi from './pages/Folders/FolderOtherNavi';
import AssignTeacherNavi from './pages/GroupDisplay/AssignTeacherNavi';


function App() {
  const [navVisible, showNavbar] = useState(false);

  return (
    <div data-testid="app" className="App">
      <BrowserRouter>
        <navbar visible={navVisible} show={showNavbar} />
        <Routes>
          <Route path="/home" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Profil</h1>
              </div>
            }
          />

          <Route path="/">
            <Route index element={<Login />}></Route>
          </Route>
          <Route path="restart-password">
            <Route index element={<RestartPassword />}></Route>
          </Route>
          <Route path="change/:token">
            <Route index element={<ChangePassword />}></Route>
          </Route>
          <Route path="users" element={<PrivateOutlet />}>
            <Route index element={<Users />}></Route>
          </Route>
          <Route path="add-user" element={<PrivateOutlet />}>
            <Route index element={<AddUser />}></Route>
          </Route>
          <Route path="/home" element={<PrivateOutlet />}>
            <Route index element={<CurrentUser />}></Route>
          </Route>
          <Route path="/home/restart-password" element={<PrivateOutlet />}>
            <Route index element={<RestartPassword />}></Route>
          </Route>
          <Route path="/user/:id" element={<PrivateOutlet />}>
            <Route index element={<UserNavi />}></Route>
          </Route>
          <Route path="/groups" element={<PrivateOutlet />}>
            <Route index element={<GroupNavi />}></Route>
          </Route>
          <Route path="/group/:id" element={<PrivateOutlet />}>
            <Route index element={<GroupIdNavi />}></Route>
          </Route>
          <Route path="/add-group" element={<PrivateOutlet />}>
            <Route index element={<AddGroup />}></Route>
          </Route>
          <Route path="children" element={<PrivateOutlet />}>
            <Route index element={<ChildrenNavi />}></Route>
          </Route>
          <Route path="/add-child" element={<PrivateOutlet />}>
            <Route index element={<AddChild />}></Route>
          </Route>
          <Route path="/child/:id" element={<PrivateOutlet />}>
            <Route index element={<ChildNavi />}></Route>
          </Route>
          <Route path="/user/:id/child" element={<PrivateOutlet />}>
            <Route index element={<UserChildNavi />}></Route>
          </Route>
          <Route path="/user/:id/edit" element={<PrivateOutlet />}>
            <Route index element={<EditUserNavi />}></Route>
          </Route>
          <Route path="/Message" element={<PrivateOutlet />}>
            <Route index element={<MessageNavi />}></Route>
          </Route>
          <Route path="/SendMessage" element={<PrivateOutlet />}>
            <Route index element={<SendMessageNavi />}></Route>
          </Route>
          <Route path="/SentMessage" element={<PrivateOutlet />}>
            <Route index element={<SentMessageNavi />}></Route>
          </Route>
          <Route path="/ReadMessage/:id" element={<PrivateOutlet />}>
            <Route index element={<ReadMessageNavi />}></Route>
          </Route>
          <Route path="/AddGallery" element={<PrivateOutlet />}>
            <Route index element={<AddGalleryNavi />}></Route>
          </Route>
          <Route path='/Gallery' element={<PrivateOutlet />}>
            <Route index element={<GalleryNavi/>}></Route>
          </Route>
          <Route path="/StatusMessage/:id" element={<PrivateOutlet />}>
            <Route index element={<StatusMessageNavi />}></Route>
          </Route>
          <Route path="/ViewMessage/:id" element={<PrivateOutlet />}>
            <Route index element={<ViewMessageNavi />}></Route>
          </Route>
          <Route path="/Knowledge" element={<PrivateOutlet />}>
            <Route index element={<KnowledgeNavi />}></Route>
          </Route>
          <Route path='/ViewGallery/:id' element={<PrivateOutlet />}>
            <Route index element={<ViewGalleryNavi/>}></Route>
          </Route>
          <Route path='/AddGallery' element={<PrivateOutlet />}>
            <Route index element={<AddGalleryNavi/>}></Route>
          </Route>
          <Route path='/Galeria' element={<PrivateOutlet />}>
            <Route index element={<GaleriaNavi/>}></Route>
          </Route>
          <Route path='/Folder/:folderName/:id' element={<PrivateOutlet />}>
            <Route index element={<FolderNavi/>}></Route>
          </Route>
          <Route path='/addFolder' element={<PrivateOutlet />}>
            <Route index element={<AddFolderNavi/>}></Route>
          </Route>
          <Route path='/folderOther/:folderId' element={<PrivateOutlet />}>
            <Route index element={<FolderOtherNavi/>}></Route>
          </Route>
          <Route path='/Assign-teacher/:id' element={<PrivateOutlet />}>
            <Route index element={<AssignTeacherNavi/>}></Route>
          </Route>
          <Route path="/EditChild/:id" element={<PrivateOutlet />}>
            <Route index element={<EditChildNavi />}></Route>
          </Route>
          <Route path="/Kadra" element={<PrivateOutlet />}>
            <Route index element={<KadraNavi />}></Route>
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
