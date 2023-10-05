import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ photos, onClick }) => {
  return photos.map(photo => (
    <li key={photo.id} className={css.ImageGalleryItem}>
      <img
        onClick={() => onClick(photo.largeImageURL)}
        className={css.image}
        src={photo.webformatURL}
        alt={photo.tags}
      />
    </li>
  ));
};
