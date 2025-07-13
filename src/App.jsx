import { IoMdArrowRoundBack } from "react-icons/io";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsData, postAlbumData } from "./reduxSlice/albumSlice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import AlbumForm from "../components/AlbumForm";
import LikedImagesBanner from "../components/LikedImageBanner";
function App() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.albums);
  const data = localStorage.getItem("user-info");
  const id = JSON.parse(data).id;
  const token = JSON.parse(data).token;
  const [newAlbumData, setNewAlbumData] = useState({
    ownerId: id,
    name: "",
    description: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("user-info");

    if (!data) {
      navigate("/login");
    }
    const userData = JSON.parse(data);
    setUserInfo(userData);
    dispatch(fetchAlbumsData({ id: userData.id, token: userData.token }));
  }, [dispatch, navigate]);
  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setNewAlbumData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(newAlbumData);
  const handleFormClick = () => {
    setShowForm(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postAlbumData({ data: newAlbumData, token: token }));
    setShowForm(false);
  };
  return (
    <>
      <div className="container mt-3">
        <Header />
        <main className="container">
         {state.status === "loading" && (
  <div className="row">
    {[1, 2, 3, 4].map((_, index) => (
      <div className="col-md-3 col-sm-6 mb-4" key={index}>
        <div
          className="card shadow-lg rounded-4 p-4"
          style={{
            height: "200px",
            background: "#1e1e1e",
            border: "none",
          }}
        >
          <div className="d-flex justify-content-end mb-4">
            <div
              className="placeholder-glow rounded-circle"
              style={{
                height: "32px",
                width: "32px",
                backgroundColor: "#2c2c2c",
              }}
            ></div>
          </div>
          <div className="mt-auto">
            <p className="placeholder-glow">
              <span
                className="placeholder col-7 bg-secondary"
                style={{ height: "20px", display: "block", borderRadius: "5px" }}
              ></span>
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

          {state.status != "loading" && state.albums.length === 0 && (
            <>
              <div className="container text-light my-5">
                <h2 className="text-center mb-5">Why Create Albums?</h2>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="p-4 bg-dark rounded-4 shadow-lg h-100 border border-primary">
                      <h5 className="text-center">Stay Organized</h5>
                      <p className="text-center mt-3">
                        Group your photos into albums to easily access and
                        manage your memories.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-4 bg-dark rounded-4 shadow-lg h-100 border border-success">
                      <h5 className="text-center">Cloud Secure</h5>
                      <p className="text-center mt-3">
                        Your albums are backed up safely in the cloud —
                        accessible anytime, anywhere.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-4 bg-dark rounded-4 shadow-lg h-100 border border-warning">
                      <h5 className="text-center">Easy Sharing</h5>
                      <p className="text-center mt-3">
                        Share your albums with one click — no more sending
                        photos one by one.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-center mt-4">
                Create new Album and organize your memories.
              </h2>
              <br />
              <div className="text-center">
                <button
                  onClick={handleFormClick}
                  className="button-create-album "
                >
                  + Create Album
                </button>
              </div>
            </>
          )}
          {state.status === "failed"||state.status==="error" && (
  <div className="alert alert-danger text-center mt-5">
    <h5 className="text-secondary">An Error Occured While  loading albums</h5>
 
  </div>
)}
          {state.status != "loading" && state.albums?.length > 0 && (
            <>
              <div className="img-btn-placeholder mt-3">
                <Link to="/home" className="add-img-btn text-decoration-none">
                  <IoMdArrowRoundBack />
                </Link>
                <Link className="add-img-btn text-decoration-none" to="/bin">
                  <RiDeleteBin6Fill />
                </Link>
              </div>

              <LikedImagesBanner />
              <div className="head-container">
                <h1 className="mt-3 text-secondary">My Albums</h1>
                <button
                  className="button-create-album"
                  onClick={() => setShowForm(true)}
                >
                  + Create New Album
                </button>
              </div>
              <br />
              <br />
              <div className="row">
                {state.albums?.map((album) => (
                  <div key={album?._id} className="col-md-3 col-sm-6 mb-4">
                    <Link
                      className="text-decoration-none"
                      to={`/album/${album?._id}`}
                    >
                      <div
                        className="card album-card shadow-lg rounded-4 p-4 text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #2b2b2b, #1c1c1c)",
                          height: "200px",
                          position: "relative",
                          border: "none",
                        }}
                      >
                        <div className="album-icon text-end">
                          <BiSolidPhotoAlbum
                            className="text-white-50"
                            size={32}
                          />
                        </div>

                        <div className="mt-auto">
                          <h5 className="fw-bold text-secondary">
                            {album?.name}
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
          {showForm && (
            <div className="album-form">
              <AlbumForm
                handleFormChange={handleFormChange}
                setShowForm={setShowForm}
                handleSubmit={handleSubmit}
                newAlbumData={newAlbumData}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
