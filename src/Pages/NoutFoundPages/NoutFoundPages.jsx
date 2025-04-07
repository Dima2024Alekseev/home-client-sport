import React from 'react';
import { Link } from 'react-router-dom';
import "./stylepagenoutfound.css";


const NotFoundPage = () => {
  return (
    <div id='inner' className='container'>
      <h1 className='title'>404 <br />Страница не найдена</h1>
      <p className='message'>Извините, но запрашиваемая вами страница не существует.</p>
      <Link to="/" className="button">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
