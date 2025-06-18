import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import { baseURL } from '../url';
import { MdEdit } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImagesByAlbumId, getImagesAlbum, uploadImage } from '../reduxSlice/imageSlice';
import { MdDeleteOutline } from "react-icons/md";
import { deleteAlbumData } from '../reduxSlice/albumSlice';
function ViewAlbum() {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [fileData, setFileData] = useState(null);
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [imgForm, setImageForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
const [deleteAlbumModal,setDeleteAlbumModal]=useState(false)
const navigate=useNavigate()
  const { status,images,   error } = useSelector((state) => state.images);
  const { data, loading } = useFetch(`${baseURL}/albums/album/${albumId}`);
useEffect(()=>{
dispatch(getImagesAlbum(albumId))
},[albumId,dispatch])
  const tagOptions = [
    { value: 'nature', label: 'Nature' },
    { value: 'sunset', label: 'Sunset' },
    { value: 'city', label: 'City' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'beach', label: 'Beach' },
  ];

  const handleTagChange = (selected) => setTags(selected || []);

  const handleFileUpdate = (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, JPEG, PNG, or GIF images are allowed.');
        fileInputRef.current.value = '';
        setFileData(null);
        return;
      }
      if (file.size > maxSize) {
        alert('File size must be less than 5MB.');
        fileInputRef.current.value = '';
        setFileData(null);
        return;
      }
      setFileData(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileData) {
      alert('Please upload a valid image.');
      return;
    }

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
    fileInputRef.current.value = ''; // reset file input

    setTimeout(() => {
      setSuccessMessage('');
      setImageForm(false);
    }, 2000);
  };
console.log(images)

const handleAlbumDelete=()=>{
  dispatch(deleteImagesByAlbumId(albumId))
  dispatch(deleteAlbumData(albumId))
  navigate("/dashboard")
}
  return (
    <div className='container mt-3'>
      <Header />
      <main className='container mt-3'>
        <div className='view-album-head'>
          <Link to="/dashboard" className="button-create-album text-decoration-none">
            Back to Dashboard
          </Link>
        </div>

        {!loading && (
          <>
            <div className='img-btn-placeholder mt-3'>
              <h1 className='mt-4'>
                {data.name} <button className='add-img-btn'><MdEdit /></button>
              </h1>
              <div>
                <button className='add-img-btn'><FaShareNodes /></button>
                <button onClick={() => setImageForm(!imgForm)} className='add-img-btn'><BiSolidImageAdd /></button>
                <button className='add-img-btn' onClick={()=>setDeleteAlbumModal(true)}><MdDeleteOutline/></button>
              </div>
            </div>

            {data.description?.length > 0 && (
              <h4 className='text-center mt-3'>{data.description}</h4>
            )}
        <div className="container mt-4">
  <div className="row">
    {images && images.map(i => (
      <div key={i._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <img
          src={i.imageUrl}
          alt=""
          className="img-fluid rounded shadow-sm"
          style={{ height: '200px', width: '100%', objectFit: 'cover' }}
        />
      </div>
    ))}
  </div>
</div>
{deleteAlbumModal && (
  <div className="modal d-block album-form" tabIndex="-1" role="dialog" >
    <div className="modal-dialog modal-dialog-centered album-form-inner" role="document">
      <div className="modal-content shadow-lg rounded">
     
        <div className="modal-body bg-light">
          <p className="text-dark fs-5 mb-2 no-shadow">Are you sure you want to permanently delete this album?</p>
          <p className="text-muted small mb-0 no-shadow">
            <strong>Note:</strong> All images in this album will also be deleted.
          </p>
        </div>
        <div className="modal-footer bg-light">
          <button className="btn btn-danger" onClick={handleAlbumDelete} >Yes, Delete</button>
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

                  {status === 'loading' && <p className=" no-shadow text-info">Uploading...</p>}
                  {status === 'succeeded' && <p className="no-shadow text-success">{successMessage}</p>}
                  {status === 'failed' && <p className=" no-shadow text-danger">Error: {error}</p>}

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
