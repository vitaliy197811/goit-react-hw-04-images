/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import css from './App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import fetchPage from 'pixabayApi';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [ search, setSearch ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ loader, setLoader ] = useState(false);
  const [ loadMore, setLoadMore ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ imageURL, setImageURL ] = useState('');

  const searchImage = query => {
    if (search === query) {
      return;
    }
    setSearch(query);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoader(true);

    fetchPage(search, page)
      .then(data => {
        if (data.hits.length < 1) {
          setLoader(false);
          setLoadMore(false);
          return alert('No images found for your request');
        }
        
        const newImages = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => {
          return ({ id, tags, webformatURL, largeImageURL });
        });
        setImages([ ...images, ...newImages]);
        setLoader(false);
        setLoadMore(page < Math.ceil(data.total / 12) ? true : false);
      });
  }, [ search, page ]);

  const addImageURL = url => {
    setImageURL(url);
  };

  const toggleShowModal = () => {
    setShowModal( !showModal );
  };

  const showLoadMore = () => {
    setPage(page + 1);
  };
    

    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchImage} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            showModal={toggleShowModal}
            imageURL={addImageURL}
          />
        )}
        {loader && (<Loader />)}
        {loadMore && (<Button onClick={showLoadMore} />)}
        {showModal && (<Modal 
          close={toggleShowModal} 
          url={imageURL} />)}
      </div>
    );
};

export default App;