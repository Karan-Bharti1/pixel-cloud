import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findImageData } from "../reduxSlice/imageSlice";
import { getCommentsData, postCommentData } from "../reduxSlice/commentSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";

function PublicViewImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { imageId } = useParams();

  const { images, status, error } = useSelector(state => state.images);
  const { comments } = useSelector(state => state.comments);

  const image = images.find(img => img?._id === imageId);

  const [viewDetails, setViewDetails] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [comment, setComment] = useState({ imageId: imageId, text: "", userName: "" });

  useEffect(() => {
    const userdata = localStorage.getItem("user-info");
    if (!userdata) return navigate("/login");

    const userData = JSON.parse(userdata);
    setComment(prev => ({ ...prev, userName: userData.name }));

    dispatch(findImageData({ id: imageId, token: userData.token }));
    dispatch(getCommentsData({ id: imageId, token: userData.token }));
  }, [dispatch, imageId, navigate]);

  const handleCommentChange = (e) => {
    setComment(prev => ({ ...prev, text: e.target.value }));
  };

  const handleCommentSubmit = () => {
    const userdata = JSON.parse(localStorage.getItem("user-info"));
    dispatch(postCommentData({ data: comment, token: userdata.token }));
    setTimeout(() => {
      setComment(prev => ({ ...prev, text: "" }));
    }, 1000);
  };

  if (status === "failed" || status === "error") {
    return (
      <div className="container mt-5 text-center text-light">
        <Header />
        <h4 className="text-danger fw-bold">Error loading image</h4>
        <p className="text-muted">{error || "Please try again later."}</p>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <Header />
      <main>
        {images.length > 0 && (
          <>
            <div className="btn-align-img">
              <div>
                <Link className="add-img-btn" to={`/view/${image?.albumId}`}>
                  <IoMdArrowRoundBack />
                </Link>
              </div>
              <div>
                <button className="add-img-btn" onClick={() => setViewComments(!viewComments)}>
                  <FaRegCommentDots />
                </button>
                <button className="add-img-btn" onClick={() => setViewDetails(!viewDetails)}>
                  <CgDetailsMore />
                </button>
              </div>
            </div>

            <img src={image?.imageUrl} className="viewImage" alt="Image" />
            <br />
            <br />

            {viewDetails && (
              <div className="w-75 mx-auto text-white p-4 rounded-3 shadow-sm mt-3">
                <h4 className="fw-bold mb-4">Image Details</h4>
                <ul className="list-unstyled">
                  <li className="text-secondary">Name: {image?.name}</li>
                  <li className="text-secondary">
                    Size: {(image?.size / 1024).toFixed(2)} KB
                  </li>
                  <li className="text-secondary">
                    Liked: {image?.isFavorite ? "Yes" : "No"}
                  </li>
                  <li className="text-secondary">
                    Tags: {image?.tags?.length ? image.tags.join(", ") : "None"}
                  </li>
                  <li className="text-secondary">
                    Uploaded: {new Date(image?.uploadedAt).toLocaleString()}
                  </li>
                  <li className="text-secondary">
                    Updated: {new Date(image?.updatedAt).toLocaleString()}
                  </li>
                </ul>
              </div>
            )}

            {viewComments && (
              <div className="mt-5 w-75 mx-auto">
                <div className="mb-4">
                  <h4 className="text-light fw-bold mb-3">Add Comment</h4>
                  <textarea
                    onChange={handleCommentChange}
                    className="form-control bg-dark text-white border-0 rounded-3 p-3"
                    placeholder="Write your thoughts..."
                    rows="4"
                    value={comment.text}
                  ></textarea>
                  <div className="text-end mt-2">
                    <button
                      className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                      onClick={handleCommentSubmit}
                    >
                      + Comment
                    </button>
                  </div>
                </div>

                <hr className="text-secondary" />

                <div className="my-3">
                  <h5 className="text-light fw-semibold mb-3">Comments</h5>
                  {comments?.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                      {comments.map((comment, index) => (
                        <div
                          key={index}
                          className="bg-dark text-white p-3 rounded-3 shadow-sm d-flex justify-content-between align-items-start"
                        >
                          <div>
                            <p className="mb-1">{comment?.text}</p>
                          </div>
                          <div>
                            <small className="text-secondary d-block">
                              Posted by: <strong>{comment?.userName}</strong>
                            </small>
                            <small className="text-secondary">
                              at: {new Date(comment?.updatedAt).toLocaleString()}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-secondary text-center fs-4 fw-bolder">
                      No Comments Found.
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default PublicViewImage;
