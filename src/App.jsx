import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NotificationProvider } from './Components/NotificationContext';
import ScrollTop from './Components/ScrollTop';
import useTitle from './Components/UseTitle';
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Boxing from './Pages/Directions/Boxing';
import Grappling from './Pages/Directions/Grappling';
import Hand from './Pages/Directions/Hand-To-Hand-Combat';
import Karate from './Pages/Directions/Karate';
import Kickboxing from './Pages/Directions/Kickboxing';
import Mma from './Pages/Directions/MMA';
import Women from './Pages/Directions/Womens-Self-Defense';
import Events from "./Pages/Events/Events";
import Press from './Pages/Press-Center/Press-Center';
import PageContact from "./Pages/Page-Contact/Page-Contact";
import Schedule from "./Pages/Schedules/Schedule";
import Store from './Pages/Online-Store/Online-Store';
import Authorization from './Pages/Account-Authorization';
import Waiting from './Pages/Waiting-List';
import ScheduleEditor from './Pages/Admin/AdminSchedule/ScheduleEditor';
import AdminDashboard from './Pages/Admin/AdminDashboard/AdminDashboard';
import AttendanceJournal from './Pages/AttendanceJournal';
import AdminPrice from "./Pages/Admin/AdminPrice/AdminPrice";
import EditProduct from './Pages/Admin/AdminProduct/EditProduct';
import Price from "./Pages/Price/Price";
import NotFoundPage from './Pages/NoutFoundPages/NoutFoundPages';
import logo_title from "./img/log-club.png";
import axios from 'axios';
import "./styles/config.css";

// Перехватчик для обработки ошибок 401
const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Удаляем токены из локального хранилища
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAuthenticated');

        // Перенаправляем на страницу авторизации
        navigate('/authorization-account');
      }
      return Promise.reject(error);
    }
  );
};

const AppContent = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const navigate = useNavigate();

  // Инициализация перехватчика Axios
  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  // Проверка авторизации
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  // Проверка роли администратора
  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role === 'admin';
    }
    return false;
  };

  return (
    <TransitionGroup>
      <CSSTransition timeout={200} key={location.pathname} nodeRef={nodeRef} classNames="fade">
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/boxing" element={<Boxing />} />
            <Route path="/grappling" element={<Grappling />} />
            <Route path="/hand-to-hand-combat" element={<Hand />} />
            <Route path="/karate" element={<Karate />} />
            <Route path="/kickboxing" element={<Kickboxing />} />
            <Route path="/mma" element={<Mma />} />
            <Route path="/womens-self-defense" element={<Women />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/press-center" element={<Press />} />
            <Route path="/contact" element={<PageContact />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/online-store" element={<Store />} />
            <Route path="/price" element={<Price />} />
            <Route path="/authorization-account" element={<Authorization />} />
            <Route path="/waiting-list" element={<Waiting />} />
            <Route
              path="/schedule-editor"
              element={isAuthenticated() && isAdmin() ? <ScheduleEditor /> : <Navigate to="/authorization-account" />}
            />
            <Route
              path="/admin-dashboard"
              element={isAuthenticated() && isAdmin() ? <AdminDashboard /> : <Navigate to="/authorization-account" />}
            />
            <Route
              path="/attendance-journal" element={<AttendanceJournal />}
            />
            <Route
              path="/admin-price"
              element={isAuthenticated() && isAdmin() ? <AdminPrice /> : <Navigate to="/authorization-account" />}
            />
            <Route
              path="/admin-products"
              element={isAuthenticated() && isAdmin() ? <EditProduct /> : <Navigate to="/authorization-account" />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default function App() {
  useTitle(logo_title);

  return (
    <NotificationProvider>
      <Router>
        <ScrollTop />
        <AppContent />
      </Router>
    </NotificationProvider>
  );
}