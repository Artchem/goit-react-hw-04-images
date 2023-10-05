import { ToastContainer } from 'react-toastify';
import React, { Component } from 'react';
import { fetchPixabay } from 'services/api-pixabay';
import { toast } from 'react-toastify';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Error } from './Error/Error';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    showModal: false,
    searchText: '',
    page: 1,
    photos: null,
    totalPhotos: 0,
    loading: false,
    largeImageURL: null,
    error: null,
  };

  fetchPhotos = async () => {
    const { searchText, page, totalPhotos } = this.state;
    this.setState({ loading: true });
    try {
      const photos = await fetchPixabay(searchText, page);

      if (photos.hits.length === 0) {
        toast.info(`There are no images found for your request ${searchText}`);

        this.setState({
          error:
            'Sorry, there are no images found for your request. Please try again.',
        });
      }

      if (photos.hits.length !== 0 && page === 1) {
        toast.success(`You found ${photos.total} images `);
      }

      if (
        totalPhotos > 0 &&
        totalPhotos <= this.state.photos.length + 12 &&
        page !== 1
      ) {
        toast.info(`You have reached the end`);
      }

      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos.hits],
        totalPhotos: photos.total,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      // console.log('error.message :>> ', error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate = (_, prevState) => {
    const { searchText, page } = this.state;
    if (prevState.searchText !== searchText || prevState.page !== page) {
      this.fetchPhotos();
    }
  };

  handleFormSubmit = searchText => {
    // console.log(searchText);
    this.setState({
      searchText: searchText,
      page: 1,
      photos: [],
      totalPhotos: 0,
      error: null,
    });
  };

  toggleModal = photo => {
    this.setState({ largeImageURL: photo });
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, error, photos, totalPhotos, largeImageURL, showModal } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {error && <Error error={error} />}
        {photos && (
          <ImageGallery>
            <ImageGalleryItem onClick={this.toggleModal} photos={photos} />
          </ImageGallery>
        )}
        {photos &&
          totalPhotos !== photos.length &&
          photos.length < totalPhotos && <Button onBtnClick={this.loadMore} />}
        {showModal && (
          <Modal photo={largeImageURL} onClose={this.toggleModal}></Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
