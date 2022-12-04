import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
    const [ search, setSearch ] = useState('');

    const handleChange = e => {
        setSearch( e.currentTarget.value.toLowerCase() );
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ search });
        setSearch('');
    };

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={css.SearchFormButton}>
                    <FcSearch size={25} />
                </button>
                <input
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                    value={search}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;