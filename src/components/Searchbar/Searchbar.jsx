import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSistrix } from 'react-icons/fa6';

export default class Searchbar extends Component {
  state = {
    searchText: '',
  };

  handleNameChange = evt => {
    // console.log(evt);
    this.setState({ searchText: evt.target.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchText.trim() === '') {
      toast.error('Enter photo category !');
      return;
    }
    this.props.onSubmit(this.state.searchText);
    this.resetForm();
  };
  resetForm = () => {
    this.setState({ searchText: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.SearchForm}>
          <button
            type="submit"
            className={css.button}
            onClick={this.handleSubmit}
          >
            <FaSistrix size={25} />
            <span className={css.button_label}>Search</span>
          </button>

          <input
            className={css.input}
            onChange={this.handleNameChange}
            value={this.state.searchText}
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
}
