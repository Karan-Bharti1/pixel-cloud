import React, {useEffect,useState} from 'react'
import Header from '../../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findImageData } from '../reduxSlice/imageSlice'
import { FaRegCommentDots } from "react-icons/fa"
import { MdEdit, MdDeleteOutline,MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from 'react-router-dom'
import { getCommentsData, postCommentData } from '../reduxSlice/commentSlice'
function ViewImage() {
  const dispatch=useDispatch()
  const state=useSelector(state=>state.images)
  const commentState=useSelector(state=>state.comments)
  const [viewComments,setViewComments]=useState(false)
  const [viewDetails,setViewDetails]=useState(false)
  const {imageId}=useParams()
  const [comment,setComment]=useState({imageId:imageId,text:""})
     const navigate=useNavigate()
      useEffect(()=>{
        const data=localStorage.getItem('user-info')
        
      if(!data){
        navigate("/login")
      }
   },[navigate])
   
 
   useEffect(()=>{
dispatch(findImageData({id:imageId}))
dispatch(getCommentsData({id:imageId}))
   },[dispatch,imageId])
const image = state.images.find(img => img?._id === imageId)
  const handleCommentChange=(event)=>{
setComment({...comment,text:event.target.value})
  }
  const handleCommentSubmit=()=>{
    dispatch(postCommentData({data:comment}))
    setTimeout(()=>{
 setComment({...comment,text:""})
    },1000)
   
  }
 console.log(image)
  return (
   <div className='container mt-3'>
    <Header/>
    <main>
        {state.images.length>0 &&<div>
          <div className='btn-align-img'>
            <div>
            <Link className='add-img-btn' to={`/album/${image?.albumId}`}><IoMdArrowRoundBack/></Link>
            </div>
            <div>
            <button className='add-img-btn' onClick={()=>setViewComments(!viewComments)}><FaRegCommentDots/></button>
            <button className='add-img-btn' onClick={()=>setViewDetails(!viewDetails)}><CgDetailsMore/></button>
            <button className='add-img-btn'><MdEdit/></button>
            </div>
          </div>
          <img src={image?.imageUrl} className='viewImage'/>
          <br/><br/>
{viewDetails && (  <div className="w-75 mx-auto  text-white p-4 rounded-3 shadow-sm mt-3">
    <h4 className="fw-bold mb-4">Image Details</h4>
    <ul className="list-unstyled">
      <li className='text-secondary'>Name: {image?.name}</li>
      <li className='text-secondary'>Size: {(image?.size / 1024).toFixed(2)} KB</li>
      <li className='text-secondary'>Liked: {image?.isFavorite ? 'Yes' : 'No'}</li>
      <li className='text-secondary'>Tags: {image?.tags?.length > 0 ? image.tags.join(', ') : 'None'}</li>
      <li className='text-secondary'>Uploaded at: {new Date(image?.uploadedAt).toLocaleString()}</li>
      <li className='text-secondary'>Updated at: {new Date(image?.updatedAt).toLocaleString()}</li>
    </ul>
  </div>)}
       {viewComments && (
  <div className="mt-5 w-75 mx-auto">
    {/* Add Comment Box */}
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
        <button className="btn btn-primary px-4 py-2 rounded-pill fw-semibold" onClick={handleCommentSubmit}>
          + Comment
        </button>
      </div>
    </div>

    <hr className="text-secondary" />

    <div className="mb-3">
      <h5 className="text-light fw-semibold mb-3">Comments</h5>
       {commentState.comments?.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {commentState.comments.map((comment, index) => (
            <div key={index} className="bg-dark text-white p-3 rounded-3 shadow-sm">
              <p className="mb-1">{comment?.text}</p>
              <small className="text-secondary">
          Posted at: {new Date(comment?.updatedAt).toLocaleString()}
        </small>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center fs-4 fw-bolder">No Comments Found.</p>
      )} 
    </div>
  </div>
  
)}


        <br/><br/>
        </div>}
        
    </main>
   </div>
  )
}

export default ViewImage;