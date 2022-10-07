import { Text } from "@chakra-ui/layout";
import { Route, Routes } from "react-router-dom";
import Login from "./login/login";
import Test from "./login/test";
import User from "./webpages/user";
//import { useContext } from "react";
//import AccountContext from "./AccountStatus";
import PrivateRoute from "./PrivateRoute";

const Views = () => {
  /*const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Failing to load...</Text>
  ) : (*/
  
  return (
    <Routes>
      <Route path='/test' element={<Test />} />
      <Route path='/user' element={<User />} />
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Text>You Logged In!</Text>}/>
      </Route>
      <Route path="*" element={<Login />}/>
    </Routes>
  );
};

export default Views;
