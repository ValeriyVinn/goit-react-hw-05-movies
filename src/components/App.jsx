import { NavLink, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Домашняя</NavLink>
          </li>
          <li>
            <NavLink to="/dogs">Коллекция</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<div>Домашняя</div>}></Route>
        <Route path="/dogs" element={<div>Коллекция</div>}></Route>
      </Routes>
    </div>
  );
};
