import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';
import s from '../SearchForm/SearchForm.module.css';

function SearchForm({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return toast.warn('Please enter what you want to find');
    }
    onSearch(value.trim());
    setValue('');
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Find your movie"
          onChange={handleChange}
        />
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  onSearch: propTypes.func.isRequired,
};

export default SearchForm;
