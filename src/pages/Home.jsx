import React from 'react'
import Header from '../../components/Header'
import CarouselCard from '../../components/Carousel'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='container mt-3'>
    <Header/>
    <main >
        <CarouselCard/>
<h2 className='text-center mt-4'>To get started, click here.</h2>
<div className='text-center my-3'>
<Link className='button-create-album text-decoration-none' to="/dashboard">Move to Dashboard</Link>
</div>
<div className="row text-center my-5">
  <div className="col-md-4">
  
    <h5 className="mt-3">Upload Instantly</h5>
    <p>Save your memories safely in the cloud.</p>
  </div>
  <div className="col-md-4">

    <h5 className="mt-3">Organize Albums</h5>
    <p>Create custom albums with names and covers.</p>
  </div>
  <div className="col-md-4">
 
    <h5 className="mt-3">Share Easily</h5>
    <p>Send albums to friends and family with one click.</p>
  </div>
</div>
<h2 className="text-center mt-5">Get Started in 4 Easy Steps</h2>
<div className="row justify-content-center my-4">
  <div className="col-md-3 mb-4">
    <div className="card shadow p-3 rounded-4 h-100 text-center">
      <div className="number bg-primary text-white" >1</div>
      <h5 className="fw-bold">Go to Dashboard</h5>
      <p>Access your main area where all albums are managed.</p>
    </div>
  </div>
  <div className="col-md-3 mb-4">
    <div className="card shadow p-3 rounded-4 h-100 text-center">
      <div className="number bg-primary text-white" >2</div>
      <h5 className="fw-bold">Create Album</h5>
      <p>Click on the “Create Album” button to start a new one.</p>
    </div>
  </div>
  <div className="col-md-3 mb-4">
    <div className="card shadow p-3 rounded-4 h-100 text-center">
      <div className="number bg-primary text-white" >3</div>
      <h5 className="fw-bold">Select Album</h5>
      <p>Choose the album where you want to upload your images.</p>
    </div>
  </div>
  <div className="col-md-3 mb-4">
    <div className="card shadow p-3 rounded-4 h-100 text-center">
      <div className="number bg-primary text-white" >4</div>
      <h5 className="fw-bold">Upload Image</h5>
      <p>Select images from your device and upload them to your album.</p>
    </div>
  </div>
</div>

    </main>
    </div>
  )
}

export default Home