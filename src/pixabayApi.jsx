import axios from 'axios';
import PropTypes from 'prop-types';

async function fetchPage( { search }, page ) {
    try {
        const { data } = await axios.get(`https://pixabay.com/api/?key=30417508-2d287071902608180e72a4847&q=${search}&page=${page}&per_page=12&image_type=photo&orientation=horizontal&safesearch=true`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

fetchPage.prototypes = {
    search: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
};

export default fetchPage;