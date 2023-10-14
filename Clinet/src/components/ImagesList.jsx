import { Card,  Grid,  IconButton,  TextField,  Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';


function ImagesList(props) {
    const {id, imgData, setImgData, handleEdit} = props;
    
    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`http://localhost:8000/getimages/${id}`);
            const data = await resp.json();
            console.log("get images data",data);
            setImgData(data)
        }
        fetchData()
    }, []);  //imgData
    
    // console.log("imageData",imgData.length);
    
    const deletehandle = async (e) => {
        e.preventDefault()
        const imageID = e.target[0].value
        console.log("imageID :", imageID);
        const response = await fetch(`http://localhost:8000/deleteimg/${imageID}`, {
          method: 'DELETE',
        })
        // console.log("deleteimg res:", response);
        const deleteimg = await response.json();
        // console.log("image deleted :", deleteimg);
        Swal.fire({
          title: 'Image Deleted',
          text: 'Your Image has been deleted successfully!',
          icon: 'success',
          timer: 2000 // time in milliseconds
        });
      }
   
    
    return (
    <Grid container spacing={0.9}>
      {imgData.length === 0 ? <Typography ></Typography> : imgData.map((img) => 
            <Grid item xs={12} sm={6} md={3} key={img._id}>
                <Card style={{ width: 200, margin:15, padding:15 }}>
                    <div>     
                            <form onSubmit={deletehandle}> 
                                <TextField type='hidden' value={img._id} name='imageid' ></TextField>
                                <span>
                                    <IconButton onClick={() => handleEdit({editid:img._id, title: img.title, path: img.path })}>
                                        <EditIcon style={{ position: "absolute", left: 150 }} />
                                    </IconButton>
                                    <IconButton type='submit' >
                                        <DeleteIcon  style={{position:"absolute", left: 165}}  />
                                    </IconButton>
                                </span>    
                            </form>
                            <Typography level="title-lg" variant="h5" style={{marginBottom: 5}}>{img.title}</Typography>
                    </div>
                        <img
                        src={img.path}
                        alt=""
                        />
                </Card>
            </Grid>   
      ) }
    </Grid>
  )
}

export default ImagesList
