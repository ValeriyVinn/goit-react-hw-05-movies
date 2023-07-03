import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SharedLayout.style.css';

const SharedLayout = ({ onSubmit }) => {
  return (
    <div  className="main">
      <div className="header">
        <NavLink to="/" end className="home">
          Home
        </NavLink>

        <NavLink to="/movies" className="movies">Movies</NavLink>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>

      <ToastContainer autoClose={3000} />
    </div>
  );
};
export default SharedLayout;