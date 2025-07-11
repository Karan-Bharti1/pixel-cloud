import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImage,
  recycleBinImages,
  softDelete,
} from "../reduxSlice/imageSlice";
import { VscDebugRestart } from "react-icons/vsc";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { MdDelete } from "react-icons/md";

function Bin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { images,status,error } = useSelector((state) => state.images);
  const [lightboxIndex, setLightboxIndex] = useState(null);
   const data = localStorage.getItem("user-info");
   const userData=JSON.parse(data)
  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (!data) {
      navigate("/login");
      return;
    }

    const userId = JSON.parse(data).id;
    dispatch(recycleBinImages({ id: userId,token:JSON.parse(data).token }));
  }, [dispatch, navigate]);
  const handlePermanentDelete = (id) => {
    dispatch(deleteImage({ id,token:userData.token }));
  };
  const handleRestoreImage = (id) => {
    dispatch(softDelete({ id,token:userData.token, updatedData: { isDeleted: false } }));
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

        <h2 className="text-center text-secondary mb-4">Recycle Bin</h2>
        {/* Error State */}
{(status === "failed" || status === "error") && (
  <div className="text-center mt-5">
    <p className="text-danger fs-4 fw-semibold">Something went wrong!</p>
    <p className="text-secondary">{error || "Failed to load deleted images."}</p>
  </div>
)}



{/* Success with Images */}
{ images.length > 0 && (
  <div className="row">
    {images.map((i, index) => (
      <div
        key={i._id}
        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <div className="position-relative">
          <img
            src={i.imageUrl}
            alt={i.name}
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
              onClick={() => handleRestoreImage(i._id)}
            >
              <VscDebugRestart />
            </button>
            <button
              className="mx-2 btn btn-secondary btn-sm"
              onClick={() => handlePermanentDelete(i._id)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

{/* Success but no images */}
{status === "succeeded" && images.length === 0 && (
  <div className="text-center mt-5">
    <p className="text-secondary fs-4 fw-semibold">No deleted images.</p>
    <p className="text-secondary">Deleted images will appear here.</p>
  </div>
)}


        {/* Lightbox Viewer */}
        {lightboxIndex !== null && (
          <Lightbox
            images={images.map((img) => ({
              url: img.imageUrl,
              title: img.name || "Untitled",
            }))}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </main>
    </div>
  );
}

export default Bin;
