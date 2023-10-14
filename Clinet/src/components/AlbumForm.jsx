import React from 'react'
import { TextField, Button } from '@material-ui/core';

function AlbumForm(props) {
    const {handleAlbumSubmit, handleAlbumForm} = props;
    const [albumName, setAlbumName] = React.useState("");
    const handleClear = () => {
        setAlbumName("")
    }

  return (
    <>
        <h1 style={{display: "flex", justifyContent: "center" }}>Creat an album</h1>
        <form onSubmit={handleAlbumSubmit} style={{marginTop: 20, marginBottom:50, display: "flex", justifyContent: "center" }} >
            <TextField
                label="Album Name"
                name="album"
                value={albumName}
                onChange={(e) => {setAlbumName(e.target.value); handleAlbumForm(e)}}
                placeholder="Add Album Name..."
            />
            <Button style={{margin: "2px"}}  variant='contained' onClick={handleClear} color='danger'>
                Clear
            </Button>
            <Button style={{margin: "2px"}} type="submit" variant="contained" color="primary">
                Create
            </Button>
        </form>
    </>
  )
}

export default AlbumForm
