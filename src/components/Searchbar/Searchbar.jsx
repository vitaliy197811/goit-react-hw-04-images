import React from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import css from './Searchbar.module.css';

class Searchbar extends React.Component {
    state = {
        search: '',
    };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    handleChange = e => {
        this.setState({ search: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({ search: '', });
    };

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <FcSearch size={25} />
                    </button>
                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                        value={this.state.search}
                    />
                </form>
            </header>
        );
    }
}

export default Searchbar;