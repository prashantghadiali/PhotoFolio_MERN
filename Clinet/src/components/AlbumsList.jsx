import React from 'react'
import AlbumForm from './AlbumForm'
import Button from '@mui/material/Button';
import { Container, Grid, Typography } from '@material-ui/core';
import './AlbumList.css'
import { Link } from 'react-router-dom';

function AlbumsList(props) {
    const {handleAlbumSubmit, handleAlbumForm, album} = props;
    console.log(handleAlbumSubmit, handleAlbumForm);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
        {/* album form */}
        <div>
            {isOpen && <AlbumForm  handleAlbumSubmit={handleAlbumSubmit} handleAlbumForm={handleAlbumForm} />}
        </div>
        <Container>
        {/* album List Button */}
            <Grid container className='albumList'>
                <Grid item >
                    <Typography variant="h2" align="left">
                        Your albums
                    </Typography>
                </Grid>
                <Grid item >
                    <Button  onClick={handleClick} align="right">
                    {isOpen ? <Button variant="outlined" color="error" size="small">
                                                Cancel
                                        </Button> : <div>
                                                        <Button variant="contained" size="small">
                                                            Add Album
                                                        </Button>
                                                    </div> }
                    </Button>
                </Grid>
            </Grid>    
            {/* Button Ends */}
            <Grid container spacing={3}>
                    {album.map((item)=> {
                                return(
                                    <Link to={`/albumItem/${item._id}`}>
                                        <Grid item key={item._id} className='listItem' >
                                            <img src="/images/photos.png"   alt="example" />
                                            <div className='paraDiv'>
                                                <p>{item.album}</p>
                                            </div>
                                        </Grid>
                                    </Link>
                                )
                            })}
            </Grid>
        </Container>
    </>
  )
}

export default AlbumsList
