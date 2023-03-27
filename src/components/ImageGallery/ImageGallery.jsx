import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, showModal, ...otherProps }) => (
    <section>
        <ul className={css.ImageGallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
                <li key={id} className={css.ImageGalleryItem} onClick={showModal}>
                    <ImageGalleryItem 
                        tags={tags}
                        webUrl={webformatURL}
                        largeUrl={largeImageURL}
                        { ...otherProps } />
                </li>
            ))}
        </ul>
    </section>
);

ImageGallery.prototypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
    showModal: PropTypes.func.isRequired,
};

export default ImageGallery;