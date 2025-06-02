import React from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import useFetch from '../utils/useFetch'
import { baseURL } from '../url'
import { Link } from 'react-router-dom'
function ViewAlbum() {
    const {albumId}=useParams()
    console.log(albumId)

    const {data,loading,error}=useFetch(`${baseURL}/albums/album/${albumId}`)
    console.log(data)
  return (<div className='container mt-3'>
    <Header/>
    <main className='container mt-3'>
      <div className='view-album-head'>
        <Link to="/dashboard" className="button-create-album text-decoration-none"> Back to Dashboard</Link>
      </div>
{!loading && <>
<h1 className='text-center mt-4'>{data.name}</h1>
{data.description.length>0 && <>
<h4 className='text-center mt-3'>{data .description}</h4></>}
</>}
    </main>
</div>
  )
}

export default ViewAlbum