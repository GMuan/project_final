import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Exerciselist from "./Exerciselist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/exerciselist" element={<Exerciselist />} />
    </Routes>
  );
}

export default App;