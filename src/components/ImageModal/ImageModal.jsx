import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.fullscreenModal}
      overlayClassName={styles.overlay}
      contentLabel="Image Fullscreen Modal"
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Full-size Image'}
        className={styles.fullscreenImage}
      />
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
    </ReactModal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
