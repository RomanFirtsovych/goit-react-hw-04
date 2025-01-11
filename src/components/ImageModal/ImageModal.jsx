import ReactDOM from 'react-dom';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <img src={image.urls.regular} alt={image.alt_description || 'Image'} />
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
