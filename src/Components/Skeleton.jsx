import React from "react";
import ContentLoader from "react-content-loader";

const MobilePostLoader = () => {
  const width = 375;
  const height = 350;
  const imageWidth = 300;
  const imageHeight = 200;
  const textWidth = 300;
  const textLines = 3;

  return (
    <ContentLoader
      speed={3}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Изображение */}
      <rect x="30" y="10" rx="5" ry="5" width={imageWidth} height={imageHeight} />

      {/* Текст */}
      {Array.from({ length: textLines }).map((_, index) => (
        <rect
          key={index}
          x={30}
          y={imageHeight + 20 + index * 30}
          rx="5"
          ry="5"
          width={textWidth}
          height="20"
        />
      ))}
    </ContentLoader>
  );
};

const TabletPostLoader = () => {
  const width = 768;
  const height = 300;
  const imageWidth = 400;
  const imageHeight = 250;
  const textWidth = 300;
  const textLines = 8;

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Изображение */}
      <rect x="20" y="10" rx="5" ry="5" width={imageWidth} height={imageHeight} />

      {/* Текст */}
      {Array.from({ length: textLines }).map((_, index) => (
        <rect
          key={index}
          x={imageWidth + 30}
          y={20 + index * 30}
          rx="5"
          ry="5"
          width={textWidth}
          height="20"
        />
      ))}
    </ContentLoader>
  );
};

const DesktopPostLoader = () => {
  const width = 1200;
  const height = 250;
  const imageWidth = 350;
  const imageHeight = 230;
  const textWidth = 750;
  const textLines = 7;

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Изображение */}
      <rect x="10" y="10" rx="5" ry="5" width={imageWidth} height={imageHeight} />

      {/* Текст */}
      {Array.from({ length: textLines }).map((_, index) => (
        <rect
          key={index}
          x={imageWidth + 20}
          y={20 + index * 30}
          rx="5"
          ry="5"
          width={textWidth}
          height="20"
        />
      ))}
    </ContentLoader>
  );
};

const PostsLoader = () => {
  // Определяем тип устройства на основе ширины экрана
  const width = window.innerWidth;
  let LoaderComponent;

  if (width < 640) {
    LoaderComponent = MobilePostLoader;
  } else if (width >= 640 && width < 1024) {
    LoaderComponent = TabletPostLoader;
  } else {
    LoaderComponent = DesktopPostLoader;
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <LoaderComponent />
      <LoaderComponent />
      <LoaderComponent />
      <LoaderComponent />
      <LoaderComponent />
    </div>
  );
};

export default PostsLoader;