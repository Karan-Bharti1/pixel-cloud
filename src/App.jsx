
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumsData } from './reduxSlice/albumSlice'
import CarouselCard from '../components/Carousel'
function App() {
const navigate=useNavigate()

  const [userInfo,setUserInfo]=useState(null)
const dispatch=useDispatch()
const state=useSelector(state=>state.albums)
  useEffect(()=>{
    const data=localStorage.getItem('user-info')
    
  if(!data){
    navigate("/login")
  }
    const userData=JSON.parse(data)
    setUserInfo(userData)
    dispatch(fetchAlbumsData(userData.id))
   
  },[dispatch,navigate])

console.log(state)
  return (
    <>
       <div className='container mt-3'>
    <Header />
  <main className='container'>
    {state.status==="loading" && (<div className='text-center'>
 <div className="spinner-grow text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
 <div className="spinner-grow text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
 <div className="spinner-grow text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
    </div>)}
{state.status!="loading" && state.albums.length===0&&(
  <>
  {/* <CarouselCard/> */}
  
 
<div className="container text-light my-5">
  <h2 className="text-center mb-5">Why Create Albums?</h2>
  <div className="row g-4">
    <div className="col-md-4">
      <div className="p-4 bg-dark rounded-4 shadow-lg h-100 border border-primary">
        <h5 className="text-center">Stay Organized</h5>
        <p className="text-center mt-3">Group your photos into albums to easily access and manage your memories.</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="p-4 bg-dark rounded-4 shadow-lg h-100 border border-success">
        <h5 className="text-center">Cloud Secure</h5>
        <p className="text-center mt-3">Your albums are backed up safely in the cloud — accessible anytime, anywhere.</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="p-4 bg-dark rounded-4 shadow-lg h-100 border border-warning">
        <h5 className="text-center">Easy Sharing</h5>
        <p className="text-center mt-3">Share your albums with one click — no more sending photos one by one.</p>
      </div>
    </div>
  </div>
</div>


  
  <h2 className='text-center mt-4'>Create new Album and organize your memories.</h2>
  <br/>
  <div className='text-center'>
     <button className="button-create-album ">+ Create Album</button>
  </div>
  </>
)}
{state.status!="loading"&& state.albums.length>0 &&(<>
<div  className='head-container'>
  <h1 className='mt-3'>My Albums</h1>
  <button className="button-create-album">+ Create New Album</button>
</div>
<br/><br/>
<div className='row'>
  {state.albums.map((album) => (
  <div key={album._id} className="col-md-3 col-sm-6 mb-4">
    <Link className='text-decoration-none'>
 
<div
  className="card-ablum d-flex flex-column justify-content-between shadow-lg rounded-4 p-4 text-white" style={{height:"200px"}}
>
  <div className="mb-auto"> </div>

  <div className="mt-auto">
    <h5 className="fw-semibold mb-1 ">{album.name}</h5>
  
  </div>
</div>


   
    </Link>
  </div>
))}


</div>
</>)}



      </main>

    </div>
    </>
  )
}

export default App
