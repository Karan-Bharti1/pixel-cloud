import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
function AlbumForm({handleSubmit,setShowForm,newAlbumData,handleFormChange}) {
  return (
  <form onSubmit={handleSubmit}  className='album-form-inner bg-light'>
<div className='form-detail-handler'>
  <h2 className=' text-secondary'>Your New Album</h2>
  <button className='btn btn-danger' onClick={()=>setShowForm(false)}><IoCloseSharp/></button>
  </div>
  <label className='text-secondary'>Your Album's name :</label>
<input type='text' name="name" value={newAlbumData.name} className='form-control' onChange={handleFormChange} placeholder='Album Name'/>
<br/>
 <label className='text-secondary'>Your Album's description: </label>
<textarea className='form-control' name="description" value={newAlbumData.description} onChange={handleFormChange} placeholder='Album Description'></textarea>
<button className='button-create-album my-3' type='submit'>Submit Details</button>
</form>
  )
}

export default AlbumForm