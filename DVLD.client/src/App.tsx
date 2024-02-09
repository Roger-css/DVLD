import People from "./Pages/People";
import SignIn from "./Pages/Sign/SignIn";
import "./css/normalize.css";
import { Route, Routes } from "react-router-dom";
import EmptyPage from "./Pages/ExtraPages/EmptyPage";
import InitialData from "./layout/InitialData";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<InitialData />}>
          <Route index element={<EmptyPage />} />
          <Route path="people" element={<People />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
