import React from "react";
import ContentLoader from "react-content-loader";

const PostLoader = (props) => (
  <ContentLoader
    speed={2}
    width={1200} // Ширина карточки
    height={250} // Высота карточки
    viewBox="0 0 1200 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Изображение */}
    <rect x="10" y="10" rx="5" ry="5" width="350" height="250" />

    {/* Текст */}
    <rect x="380" y="20" rx="5" ry="5" width="750" height="20" />
    <rect x="380" y="50" rx="5" ry="5" width="750" height="20" />
    <rect x="380" y="80" rx="5" ry="5" width="750" height="20" />
    <rect x="380" y="110" rx="5" ry="5" width="750" height="20" />
    <rect x="380" y="140" rx="5" ry="5" width="750" height="20" />
    <rect x="380" y="170" rx="5" ry="5" width="750" height="20" />
    <rect x="380" y="200" rx="5" ry="5" width="750" height="20" />
  </ContentLoader>
);

const PostsLoader = (props) => (
  <div>
    <PostLoader />
    <PostLoader />
    <PostLoader />
    <PostLoader />
    <PostLoader />
  </div>
);

export default PostsLoader;
