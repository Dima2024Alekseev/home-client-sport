import { useEffect } from "react";

const useTitle = (title, icon, innerTitle, linkText) => {
  useEffect(() => {
    document.title = title;
    if (icon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = icon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    if (innerTitle) {
      const contentTitle = document.querySelector('.content .title h1');
      if (contentTitle) {
        contentTitle.textContent = innerTitle;
      }
    }
    if (linkText) {
      const linkElement = document.querySelector('.links div:nth-child(2) a');
      if (linkElement) {
        linkElement.textContent = linkText;
      }
    }
  }, [title, icon, innerTitle, linkText]);
};

export default useTitle;
