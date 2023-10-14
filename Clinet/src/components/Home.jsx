import React from 'react'
import AlbumsList from './AlbumsList';
import Swal from 'sweetalert2';

function Home() {
  const [albumForm, setalbumForm] = React.useState({});
  const [album, setAlbum] = React.useState([]);
  
  const handleAlbumForm = (e) => {
    setalbumForm({
      ...albumForm,
      [e.target.name] : e.target.value,
    })
  };

  
// For add album in Node
  const handleAlbumSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:8000/addalbum", {
      method: 'POST',
      body: JSON.stringify(albumForm),
      headers: {
        'Content-Type':'application/json'
      }
    })
    console.log("fontend res:", response);
    const albumdata = await response.json();
    console.log("album data in handle submit :", albumdata);
    Swal.fire({
      title: 'Album Created',
      text: 'Your Album has been created successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000 // time in milliseconds
    });
  }

  const getAlbums = async () =>{
    const response = await fetch("http://localhost:8000/getalbums", {
      method: 'GET',
    })
    const albumgetdata = await response.json();
    setAlbum(albumgetdata);
  }

  React.useEffect(()=> {
    getAlbums();
  }, []) //album


  return (
    <div>
      <AlbumsList handleAlbumSubmit={handleAlbumSubmit} handleAlbumForm={handleAlbumForm}  album={album} />
    </div>
  )
}

export default Home
