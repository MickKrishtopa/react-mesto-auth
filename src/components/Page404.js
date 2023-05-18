import image404 from '../image/404.png';

export default function Page404() {
  return (
    <img
      src={image404}
      alt="Страница не найдена"
      style={{ width: '80%', margin: 'auto', display: 'block' }}
    />
  );
}
