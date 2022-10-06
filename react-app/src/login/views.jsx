import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Test from "./test";

const Views = () => {
  return (
    <Routes>
      <Route path='/test' element={<Test />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default Views;
