import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const API_KEY = 'ux-3CiEURyjqtv_gzZau536tQhsj_pyuHUzg3hEXv3w';
const BASE_URL = 'https://api.unsplash.com/search/photos';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: { query, page, per_page: 12 },
        headers: { Authorization: `Client-ID ${API_KEY}` },
      });

      const newImages = response.data.results;

      if (newImages.length === 0 && page === 1) {
        toast.error('No images found for this query.');
      }

      setImages((prev) => [...prev, ...newImages]);
      setHasMore(newImages.length > 0);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images.');
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

  useEffect(() => {
    if (!hasMore && images.length > 0 && !loading) {
      toast.success('You have viewed all images for this query!');
    }
  }, [hasMore, images, loading]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {hasMore && !loading && <LoadMoreBtn onClick={loadMore} />}
      {modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
