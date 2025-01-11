import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className={styles.image}
        onClick={onClick}
      />
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
