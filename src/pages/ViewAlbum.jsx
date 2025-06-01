import React from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'

function ViewAlbum() {
    const {albumId}=useParams()
    console.log(albumId)
  return (<div className='container mt-3'>
    <Header/>
    <main className='container mt-3'>

    </main>
</div>
  )
}

export default ViewAlbum