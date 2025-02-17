import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import "./stylepagenoutfound.css";

const NotFoundPage = () => {
  return (
    <div id='inner' className='container'>
      <Helmet>
        <title>404 - Страница не найдена</title>
        <meta name="description" content="Извините, но запрашиваемая вами страница не существует." />
        <meta name="keywords" content="404, страница не найдена, ошибка, несуществующая страница" />
      </Helmet>
      <h1 className='title'>404 - Страница не найдена</h1>
      <p className='message'>Извините, но запрашиваемая вами страница не существует.</p>
      <Link to="/" className="button">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
