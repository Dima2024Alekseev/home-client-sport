import React from 'react';
import { Link } from 'react-router-dom';
import "./stylepagenoutfound.css";

const HomeIcon = () => (
  <svg className='icon-nout_found_page' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const NotFoundPage = () => {
  return (
    <div id='inner' className='container'>
      <h1 className='title'>404 <br />Страница не найдена</h1>
      <p className='message'>Извините, но запрашиваемая вами страница не существует.</p>

      <Link to="/" className="button">
        <HomeIcon />
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;