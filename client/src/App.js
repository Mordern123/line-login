import Login from "./view/Login";
import MainPage from "./view/MainPage";
import ManageUser from "./view/ManageUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return( 
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/MainPage/ManageUser" element={<ManageUser />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
