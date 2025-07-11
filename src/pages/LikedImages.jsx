import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getLikedImages, updateImageData } from "../reduxSlice/imageSlice";
import { BiSolidLike } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { IoMdArrowRoundBack } from "react-icons/io";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

function LikedImages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { images, status, error } = useSelector((state) => state.images);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (!data) {
      navigate("/login");
      return;
    }
    const userData = JSON.parse(data);
    const ownerId = userData?.id;
    dispatch(getLikedImages({ ownerId, token: userData?.token }));
  }, [dispatch, navigate]);

  const handleImageLike = (id, isFavorite) => {
    const data = localStorage.getItem("user-info");
    const updatedData = { isFavorite: !isFavorite };
    const userData = JSON.parse(data);
    dispatch(updateImageData({ id, updatedData, token: userData.token }));
  };

  return (
    <div className="container mt-3">
      <Header />

      <main className="container mt-4">
        <div className="d-flex align-items-center justify-content-start mb-3">
          <Link to="/dashboard" className="add-img-btn text-decoration-none">
            <IoMdArrowRoundBack />
          </Link>
        </div>

        <h2 className="text-center text-secondary mb-4">Your Liked Images</h2>

        {(status === "failed" || status === "error") && (
          <div className="text-center mt-5">
            <p className="text-danger fs-4 fw-semibold">Something went wrong!</p>
            <p className="text-secondary">{error || "Failed to load liked images."}</p>
          </div>
        )}

        {status === "succeeded" && images?.length > 0 && (
          <div className="row">
            {images?.map((i, index) => (
              <div key={i._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="position-relative">
                  <img
                    src={i?.imageUrl}
                    alt={i?.name}
                    className="img-fluid rounded shadow-sm w-100"
                    onClick={() => setLightboxIndex(index)}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      cursor: "zoom-in",
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleImageLike(i._id, i.isFavorite)}
                    >
                      {i?.isFavorite ? <BiSolidLike /> : <SlLike />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "succeeded" && images?.length === 0 && (
          <div className="text-center mt-5">
            <p className="text-secondary fs-4 fw-semibold">No liked images found.</p>
            <p className="text-secondary">You can like images from albums to see them here.</p>
          </div>
        )}

        {lightboxIndex !== null && (
         <Lightbox
  open={lightboxIndex !== null}
  close={() => setLightboxIndex(null)}
  slides={images?.map((img) => ({
    src: img?.imageUrl,
    width: 1200,
    height: 800,
  }))}
  index={lightboxIndex}
  plugins={[Zoom]}
/>

        )}
      </main>
    </div>
  );
}

export default LikedImages;
