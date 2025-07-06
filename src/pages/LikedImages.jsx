import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getLikedImages, updateImageData } from '../reduxSlice/imageSlice';
import { BiSolidLike } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { IoMdArrowRoundBack } from "react-icons/io";

// Lightbox
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';

function LikedImages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { images, loading, error } = useSelector((state) => state.images);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    if (!data) {
      navigate("/login");
      return;
    }
    const ownerId = JSON.parse(data).id;
    dispatch(getLikedImages({ ownerId }));
  }, [dispatch, navigate]);

  const handleImageLike = (id, isFavorite) => {
    const data = localStorage.getItem('user-info');
    const updatedData = { isFavorite: !isFavorite };
    const ownerId = JSON.parse(data).id;

    dispatch(updateImageData({ id, updatedData })).then(() => {
      dispatch(getLikedImages({ ownerId }));
    });
  };

  return (
    <div className='container mt-3'>
      <Header />

      <main className='container mt-4'>

        {/* Back Arrow Button */}
        <div className='d-flex align-items-center justify-content-start mb-3'>
          <Link to="/dashboard" className="add-img-btn text-decoration-none">
            <IoMdArrowRoundBack />
          </Link>
        </div>

        {/* Heading */}
        <h2 className='text-center text-secondary mb-4'>Your Liked Images</h2>

        {/* Image Grid */}
        <div className="row">
          {images && images.length > 0 ? (
            images.map((i, index) => (
              <div key={i._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="position-relative">
                  {/* Image */}
                  <img
                    src={i.imageUrl}
                    alt={i.name}
                    className="img-fluid rounded shadow-sm w-100"
                    onClick={() => setLightboxIndex(index)}
                    style={{
                      height: '250px',
                      objectFit: 'cover',
                      cursor: 'zoom-in'
                    }}
                  />

                  {/* Like/Unlike Button */}
                  <div className="position-absolute top-0 end-0 m-2">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleImageLike(i._id, i.isFavorite)}
                    >
                      {i.isFavorite ? <BiSolidLike /> : <SlLike />}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5">
              <p className="text-secondary fs-4 fw-semibold">No liked images found.</p>
              <p className="text-secondary">You can like images from albums to see them here.</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <Lightbox
            images={images.map(img => ({
              url: img.imageUrl,
              title: img.name || 'Untitled'
            }))}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}

      </main>
    </div>
  );
}

export default LikedImages;
