import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSistrix } from 'react-icons/fa6';

export default function Searchbar({ onSubmit }) {
  const [searchText, setSearchText] = useState('');

  const handleNameChange = evt => {
    // console.log(evt);
    setSearchText(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchText.trim() === '') {
      toast.error('Enter photo category !');
      return;
    }
    onSubmit(searchText);
    resetForm();
  };
  const resetForm = () => {
    setSearchText('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.button} onClick={handleSubmit}>
          <FaSistrix size={25} />
          <span className={css.button_label}>Search</span>
        </button>

        <input
          className={css.input}
          onChange={handleNameChange}
          value={searchText}
          name="searchText"
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
