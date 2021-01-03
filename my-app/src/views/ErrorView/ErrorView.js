import errorImage from '../../images/errorImage.png';
import PropTypes from 'prop-types';
import s from '../ErrorView/ErrorView.module.css';

function ErrorView({ message }) {
  return (
    <div role="alert" className={s.wrapper}>
      <img src={errorImage} width="300" alt="error" className={s.image} />
      <p text={message} className={s.text}>
        {message}
      </p>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorView;
