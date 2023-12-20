import SignIn from "./Pages/Sign/SignIn";
import "./css/normalize.css";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
