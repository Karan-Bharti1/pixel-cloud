import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MdEdit, MdDeleteOutline,MdDelete } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, deleteImagesByAlbumId, getImagesAlbum, updateImageData, uploadImage } from '../reduxSlice/imageSlice';
import { deleteAlbumData, getSingleAlbumData, updateAlbumData } from '../reduxSlice/albumSlice';
import AlbumForm from '../../components/AlbumForm';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import { BiSolidLike } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { RiInformation2Fill } from "react-icons/ri"
import { IoMdArrowRoundBack } from "react-icons/io";
function ViewAlbum() {
  const userdata = localStorage.getItem('user-info');
  const id = JSON.parse(userdata).id;
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [albumData, setAlbumData] = useState({
    ownerId: id,
    name: "",
    description: ""
  });

  const fileInputRef = useRef(null);
  const [fileData, setFileData] = useState(null);
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [imgForm, setImageForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteAlbumModal, setDeleteAlbumModal] = useState(false);
  const [editAlbumForm, setEditAlbumForm] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const { status, images, error } = useSelector(state => state.images);
  const { albums, status: albumStatus } = useSelector(state => state.albums);
  const data = albums.find(album => album._id === albumId);

  useEffect(() => {
    dispatch(getImagesAlbum(albumId));
    dispatch(getSingleAlbumData({ albumId }));
  }, [albumId, dispatch]);

  useEffect(() => {
    if (data) {
      setAlbumData({
        ownerId: id,
        name: data.name || '',
        description: data.description || ''
      });
    }
  }, [data, id]);

  const tagOptions = [
    { value: 'nature', label: 'Nature' },
    { value: 'sunset', label: 'Sunset' },
    { value: 'city', label: 'City' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'beach', label: 'Beach' },
    {value:'office',label:"Office"}
  ];

  const handleTagChange = (selected) => setTags(selected || []);

  const handleFileUpdate = (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (file) {
      if (!allowedTypes.includes(file.type) || file.size > maxSize) {
        fileInputRef.current.value = '';
        setFileData(null);
        return;
      }
      setFileData(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileData) return;

    const formData = new FormData();
    formData.append('image', fileData);
    formData.append('name', name);
    formData.append('tags', JSON.stringify(tags.map(tag => tag.value)));
    formData.append('albumId', albumId);

    dispatch(uploadImage(formData));
    setTags([]);
    setName('');
    setFileData(null);
    setSuccessMessage("Image Upload Successfully");
    fileInputRef.current.value = '';

    setTimeout(() => {
      setSuccessMessage('');
      setImageForm(false);
    }, 2000);
  };

  const handleAlbumDelete = () => {
    dispatch(deleteImagesByAlbumId(albumId));
    dispatch(deleteAlbumData(albumId));
    navigate("/dashboard");
  };

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setAlbumData(prev => ({ ...prev, [name]: value }));
  };

  const handleAlbumFormSubmit = (event) => {
    event.preventDefault();
    dispatch(updateAlbumData({ id: albumId, albumData })).then(() => {
      dispatch(getSingleAlbumData({ albumId }));
      setEditAlbumForm(false);
    });
  };
  const handleDeleteImage=(id)=>{
dispatch(deleteImage({id}))
  }
const handleImageLike=(id,isFavorite)=>{
const updatedData={isFavorite:!isFavorite}
dispatch(updateImageData({id,updatedData}))
}
  return (
    <div className='container mt-3'>
      <Header />
      <main className='container mt-3'>
        

        {albumStatus !== "loading" && data && (
          <>
            <div className='img-btn-placeholder mt-3'>
              <div >
          <Link to="/dashboard" className="add-img-btn text-decoration-none">
           <IoMdArrowRoundBack/>
          </Link>
        </div>
             
              <div>
                <button className='add-img-btn'><FaShareNodes /></button>
                <button onClick={() => setImageForm(!imgForm)} className='add-img-btn'><BiSolidImageAdd /></button>
                <button className='add-img-btn' onClick={() => setDeleteAlbumModal(true)}><MdDeleteOutline /></button>
              </div>
            </div>
 <h2 className='mt-4 text-center'>
                {data.name} <button className='add-img-btn' onClick={() => setEditAlbumForm(true)}><MdEdit /></button>
              </h2>
            {data.description?.length > 0 && (
              <h4 className='text-center mt-3'>{data.description}</h4>
            )}

            <div className="container mt-4">
             <div className="container mt-4">
  <div className="row">
{images &&images.length>0 ? images.map((i, index) => (
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

      {/* Buttons Group - Top Right Corner */}
      <div className="position-absolute top-0 end-0 m-2 d-flex flex-row align-items-end gap-2">
        {/* Like */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={()=>handleImageLike(i._id,i.isFavorite)}
        >
          {i.isFavorite ?<BiSolidLike/>:< SlLike/>}
        </button>

        {/* Info */}
        <Link
          className="btn btn-secondary btn-sm"
to={`/album/image/${i?._id}`}
        >
          < RiInformation2Fill/>
        </Link>

        {/* Delete */}
        <button
          className="btn btn-secondary btn-sm" onClick={()=>handleDeleteImage(i._id)}
           >
          <MdDelete/>
        </button>
      </div>
    </div>
  </div>
)):( <div className="text-center mt-5">
      <p className="text-secondary fs-4 fw-semibold">
        No images found in this album.
      </p>
      <p className="text-muted">
        Click <BiSolidImageAdd className="mb-1" /> to upload your first image.
      </p>
    </div>)}

  </div>
</div>

            </div>

            {lightboxIndex !== null && (
              <div>
              <Lightbox
                images={images.map(img => ({ url: img.imageUrl, title: img.name }))}
                startIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
              />
              <div>  
  </div>
  </div>
            )}

            {editAlbumForm && (
              <div className='album-form'>
                <AlbumForm
                  setShowForm={setEditAlbumForm}
                  newAlbumData={albumData}
                  handleFormChange={handleFormChange}
                  handleSubmit={handleAlbumFormSubmit}
                />
              </div>
            )}

            {deleteAlbumModal && (
              <div className="modal d-block album-form" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered album-form-inner" role="document">
                  <div className="modal-content shadow-lg rounded">
                    <div className="modal-body bg-light">
                      <p className="text-dark fs-5 mb-2 no-shadow">Are you sure you want to permanently delete this album?</p>
                      <p className="text-muted small mb-0 no-shadow">
                        <strong>Note:</strong> All images in this album will also be deleted.
                      </p>
                    </div>
                    <div className="modal-footer bg-light">
                      <button className="btn btn-danger" onClick={handleAlbumDelete}>Yes, Delete</button>
                      <button className="btn btn-secondary" onClick={() => setDeleteAlbumModal(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {imgForm && (
              <div className='album-form'>
                <form className='album-form-inner bg-light' onSubmit={handleSubmit}>
                  <div className='form-detail-handler'>
                    <h2 className='text-secondary'>Upload Image</h2>
                    <button type="button" className='btn' onClick={() => setImageForm(false)}>
                      <IoCloseSharp />
                    </button>
                  </div>

                  <input
                    type='file'
                    className='form-control mt-2'
                    accept='.jpg,.jpeg,.png,.gif'
                    onChange={handleFileUpdate}
                    ref={fileInputRef}
                    required
                  />
                  <br />
                  <label className='text-secondary'>Image Name :</label>
                  <input
                    type="text"
                    className='form-control'
                    placeholder='Pixel Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <label className='text-secondary mt-3'>Select Tags :</label>
                  <Select
                    isMulti
                    options={tagOptions}
                    value={tags}
                    onChange={handleTagChange}
                    placeholder="Choose tags..."
                    styles={{
                      option: (provided) => ({
                        ...provided,
                        color: 'black',
                        backgroundColor: 'white',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: 'black'
                      }),
                    }}
                  />
                  <br />
                  <p className='text-secondary no-shadow'>
                    <strong>Note:</strong> Only <code>.jpg</code>, <code>.jpeg</code>, <code>.png</code>, and <code>.gif</code> images are allowed. Max file size: <strong>5MB</strong>.
                  </p>

                  {status === 'loading' && <p className="no-shadow text-info">Uploading...</p>}
                  {status === 'succeeded' && <p className="no-shadow text-success">{successMessage}</p>}
                  {status === 'failed' && <p className="no-shadow text-danger">Error: {error}</p>}

                  <button type='submit' className='button-create-album mt-2'>Upload Image</button>
                </form>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ViewAlbum;
