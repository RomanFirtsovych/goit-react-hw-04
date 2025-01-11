import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, page, per_page: 12 },
        headers: { Authorization: `Client-ID ux-3CiEURyjqtv_gzZau536tQhsj_pyuHUzg3hEXv3w` },
      });

      const newImages = response.data.results;

      if (newImages.length === 0 && page === 1) {
        setError('No images found for this query.');
        return;
      }

      setImages((prev) => [...prev, ...newImages]);
      setHasMore(newImages.length > 0);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setHasMore(false);
    setError(null);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  useEffect(() => {
    if (!query) return;
    fetchImages();
  }, [query, fetchImages]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {hasMore && !loading && <LoadMoreBtn onClick={loadMore} />}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          image={modalImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
