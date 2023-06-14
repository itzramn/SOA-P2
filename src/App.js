import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Auth";
import Employees from "./pages/Employees";
import Assets from "./pages/Assets";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="empleados" element={<Employees />} />'
        <Route path="activos" element={<Assets />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
