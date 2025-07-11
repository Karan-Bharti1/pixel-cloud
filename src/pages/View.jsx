import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getImagesAlbum } from '../reduxSlice/imageSlice';
import { getSingleAlbumData } from '../reduxSlice/albumSlice';
import ShimmerUIAlbum from '../../components/ShimmerUI1';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { RiInformation2Fill } from "react-icons/ri";
import Header from '../../components/Header';

function View() {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const { images, status, error } = useSelector(state => state.images);
  const { albums, status: albumStatus } = useSelector(state => state.albums);
  const data = albums?.find(album => album?._id === albumId);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('user-info');
    const userData = JSON.parse(userInfo);
    if (userData?.token) {
      dispatch(getImagesAlbum({ albumId, token: userData.token }));
      dispatch(getSingleAlbumData({ albumId, token: userData.token }));
    }
  }, [dispatch, albumId]);

  const visibleImages = images?.filter(img => !img?.isDeleted);

  return (
    <div className='container mt-3'>
      <Header />
      {albumStatus === 'loading' ? (
        <ShimmerUIAlbum />
      ) : albumStatus === 'error' || albumStatus === "failed" ? (
        <div className="text-center mt-5">
          <p className="text-danger fs-4 fw-semibold">Something went wrong!</p>
          <p className="text-secondary">{error || "Album not found"}</p>
        </div>
      ) : (
        <>
          <h2 className='text-center text-secondary mt-4'>{data?.name}</h2>
          {data?.description && (
            <p className='text-center text-secondary'>{data?.description}</p>
          )}

          <div className="row mt-4">
            {status === 'error' || visibleImages?.length === 0 ? (
              <div className="text-center">
                <p className="text-secondary">No images to display.</p>
              </div>
            ) : (
              visibleImages?.map((img, i) => (
                <div key={img?._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="position-relative">
                    <img
                      src={img?.imageUrl}
                      alt={img?.name}
                      className="img-fluid rounded shadow-sm w-100"
                      style={{ height: '250px', objectFit: 'cover', cursor: 'zoom-in' }}
                      onClick={() => setLightboxIndex(i)}
                    />
                    <Link
                      to={`/view/image/${img?._id}`}
                      className="btn btn-secondary btn-sm position-absolute top-0 end-0 m-2"
                      title="View Details"
                    >
                      <RiInformation2Fill />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

         {lightboxIndex !== null && (
  <Lightbox
    open={true}
    close={() => setLightboxIndex(null)}
    index={lightboxIndex}
    slides={images?.filter(i => !i?.isDeleted)?.map(img => ({
      src: img?.imageUrl,
      title: img?.name,
    }))}
   
  />
)}

        </>
      )}
    </div>
  );
}

export default View;
