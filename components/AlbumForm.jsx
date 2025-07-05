import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
function AlbumForm({handleSubmit,setShowForm,newAlbumData,handleFormChange}) {
  return (
  <form onSubmit={handleSubmit}  className='album-form-inner bg-light'>
<div className='form-detail-handler'>
  <h2 className=' text-secondary'>New Album</h2>
  <button className='btn text-dark' onClick={()=>setShowForm(false)}><IoCloseSharp/></button>
  </div>
  <label className='text-secondary'> Album's name :</label>
<input type='text' name="name" value={newAlbumData.name} className='form-control' onChange={handleFormChange} placeholder='Album Name'/>
<br/>
 <label className='text-secondary'>Album's description: </label>
<textarea className='form-control' name="description" value={newAlbumData.description} onChange={handleFormChange} placeholder='Write a small description for your album...'></textarea>
<button className='button-create-album my-3' type='submit'>Add Album</button>
</form>
  )
}

export default AlbumForm