import People from "./Pages/People";
import SignIn from "./Pages/SignIn";
import "./css/normalize.css";
import { Route, Routes } from "react-router-dom";
import EmptyPage from "./Pages/EmptyPage";
import InitialData from "./layout/InitialData";
import Users from "./Pages/Users";
import ApplicationTypes from "./Pages/Applications/ApplicationTypes";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<InitialData />}>
          <Route index element={<EmptyPage />} />
          <Route path="people" element={<People />} />
          <Route path="users" element={<Users />} />
          <Route path="AppTypes" element={<ApplicationTypes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
