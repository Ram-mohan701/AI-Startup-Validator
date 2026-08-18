import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import History from "./pages/History";
import Register from "./components/Register";
import Login from "./components/Login"
import ProtectedRoute  from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/history" element={<ProtectedRoute><History/></ProtectedRoute>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;