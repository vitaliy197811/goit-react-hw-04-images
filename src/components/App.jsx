import React from 'react';
import css from './App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import fetchPage from 'pixabayApi';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

class App extends React.Component {
  state = {
    search: '',
    images: [],
    page: 1,
    loader: false,
    loadMore: false,
    showModal: false,
    imageURL: '',
    imageAlt: '',
  };

  searchImage = search => {
    if (search !== this.state.search) {
      this.setState({
        search,
        images: [],
        page: 1,
      });
    }
  };
  
  componentDidUpdate( prevProps, prevState) {
    const { search, page, } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loader: true, });
      fetchPage( search, page )
      .then(data => {
        if (data.hits.length < 1) {
          this.setState({
            loader: false,
            loadMore: false,
          });
          return alert('No images found for your request');
        }

        data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
            this.setState(({ images }) => ({
              images: [...images, { id, webformatURL, largeImageURL }],
              loader: false,
              loadMore: page < Math.ceil(data.total / 12) ? true : false,
            }));
        });
      })
      .catch(error => console.log(error));
    }
  }

  addImageURL = url => {
    this.setState({ imageURL: url });
  };

  addImagelAlt = e => {
    this.setState({ imageAlt: e });
  };

  toggleShowModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  showLoadMore = () => {
    this.setState( prevState => ({ page: prevState.page + 1 }));
  };
    

  render() {
    const { images, loader, loadMore, showModal, imageURL } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.searchImage} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            showModal={this.toggleShowModal}
            imageURL={this.addImageURL}
            imagelAlt={this.addImagelAlt}
          />
        )}
        {loader && (<Loader />)}
        {loadMore && (<Button onClick={this.showLoadMore} />)}
        {showModal && (<Modal 
          closeModal={this.toggleShowModal} 
          url={imageURL} />)}
      </div>
    );
  }
}

export default App;