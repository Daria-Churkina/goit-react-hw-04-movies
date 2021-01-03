import error404 from '../../images/error404.jpg';
import s from './NotFoundView.module.css';

export default function NotFoundView() {
  return (
    <main role="alert" className={s.main}>
      <img src={error404} alt="Error" className={s.image} />
      <h1 className={s.title}>Page not found </h1>
    </main>
  );
}
