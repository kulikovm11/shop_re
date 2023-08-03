import {Route, Routes} from "react-router-dom";


import {MainLayout} from "./layouts/MainLayout";
import {Header} from "./components";
import {UserForm} from "./components/User/userForm";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage";
import {AboutProductPage, CartPage, DiscountsPage, HomePage, NotFoundPage, WishListPage} from "./pages";




const App = () => {

  return (
      <div>

        <Header/>
        <UserForm/>


        <Routes>

          <Route path={'/'} element={<MainLayout/>}>

            <Route index element={<HomePage/>}/>
            <Route path={'/:id'} element={<AboutProductPage/>}/>
            <Route path={'profile'} element={<ProfilePage/>}/>
            <Route path={'wish'} element={<WishListPage/>}/>
            <Route path={'cart'} element={<CartPage/>}/>

          </Route>

          <Route path={'*'} element={<NotFoundPage/>}/>

        </Routes>



      </div>
  );
};

export {App};
