import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ tags, webUrl, largeUrl, imageURL, }) => (
            <img
                src={webUrl}
                alt={tags}
                className={css.ImageGalleryItemImage}
                onClick={() => {
                    imageURL(largeUrl);
                }}
            />
);

ImageGalleryItem.prototypes = {
    webUrl: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeUrl: PropTypes.string.isRequired,
};

export default ImageGalleryItem;