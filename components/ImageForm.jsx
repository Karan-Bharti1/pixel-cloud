import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import Select from 'react-select';

function ImageForm({handleSubmit,setImageForm,handleFileUpdate,fileInputRef,setName,tags,tagOptions,handleTagChange,successMessage,error,status,name,postForm}) {
  return (
     <div className='album-form'>
                <form className='album-form-inner bg-light' onSubmit={handleSubmit}>
                  <div className='form-detail-handler'>
                    <h2 className='text-secondary'>{postForm?"Upload Image":"Edit Image"}</h2>
                    <button type="button" className='btn' onClick={() => setImageForm(false)}>
                      <IoCloseSharp />
                    </button>
                  </div>

                 {postForm && <input
                    type='file'
                    className='form-control mt-2'
                    accept='.jpg,.jpeg,.png,.gif'
                    onChange={handleFileUpdate}
                    ref={fileInputRef}
                    required
                  />}
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
               { postForm &&  <p className='text-secondary no-shadow'>
                    <strong>Note:</strong> Only <code>.jpg</code>, <code>.jpeg</code>, <code>.png</code>, and <code>.gif</code> images are allowed. Max file size: <strong>5MB</strong>.
                  </p>}

                  {status === 'loading' && <p className="no-shadow text-info">Uploading...</p>}
                  {status === 'succeeded' && <p className="no-shadow text-success">{successMessage}</p>}
                  {status === 'failed' && <p className="no-shadow text-danger">Error: {error}</p>}

                  <button type='submit' className='button-create-album mt-2'>{postForm?"Upload Image":"Update Changes"}</button>
                </form>
              </div>
  )
}

export default ImageForm