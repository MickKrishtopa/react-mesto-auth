import { Link } from 'react-router-dom';
import image404 from '../image/404.png';

export default function Page404() {
  return (
    <>
      <Link
        to="/"
        style={{
          margin: '20px 0 0 ',
          display: 'block',
          color: 'white',
          textAlign: 'center',
          fontSize: '24px',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        ← Back
      </Link>
      <img
        src={image404}
        alt="Страница не найдена"
        style={{ width: '80%', margin: 'auto', display: 'block' }}
      />
    </>
  );
}
