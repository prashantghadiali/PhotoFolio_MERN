import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import ImageForm from './ImageForm';
import Swal from 'sweetalert2';
import ImagesList from './ImagesList';
import UpdateImageForm from './UpdateImageForm';

function AlbumItem() {
  // states declaration
    const [itemData, setItemData] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [imgData, setImgData] = React.useState([]);
    const [imageForm, setImageForm] = React.useState({editid: "", albumId: "" ,title : "", path : ""});
    const [edit, setEdit] = React.useState({editid: "",title: "", path: ""});

    const handleClear = () => {
        setImageForm({title : "", path : ""});
        setEdit({title : "", path : ""});   // for edit form
    }
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log("frontend", id);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`http://localhost:8000/albumItem/${id}`);
            const data = await resp.json();
            setItemData(data)
        }
        fetchData()
      },[]); //itemData

    //   If there is no item show Loader
    if (!itemData) {
        return <div style={{display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "90vh"}}>
                    <Spinner radius={120} color={"#1976d2ff"} stroke={10} visible={true}  />
                </div>;
    }

    // For Going Previous Page
    function handleBackClick() {
        navigate(-1);
    }

   // for toggle form 
    const handleItemClick = () => {
        setIsOpen(!isOpen);
    };

    // on change handle form
    const handleImageForm = (e) => {
        setImageForm({
          ...imageForm,
          [e.target.name] : e.target.value,
        })
        // console.log("on change done");
      };

    // on submit form for image url  with title
    const handleItemSubmit = async (e) => {
        e.preventDefault();
        console.log("frontend form :", imageForm);
        const response = await fetch(`http://localhost:8000/addimage`, {
          method: 'POST',
          body: JSON.stringify(imageForm),
          headers: {
            'Content-Type':'application/json'
          },
        })
        setImageForm({albumId: "", title: "", path: ""})
        // console.log("fontend res:", response);
        const imagedata = await response.json();
        console.log("image data in handle submit :", imagedata);
        Swal.fire({
            title: 'Image Submitted',
            text: 'Your Image has been added successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000 // time in milliseconds
          });
      }

    // toggle edit form
    const handleEditClick = () => {
      setIsEditOpen(!isEditOpen);
    };

    //   for edit the image field
    function handleEdit(data) {
      console.log("edit clicked", data);
      setEdit(data);
      console.log("handle edit data", edit);
      handleEditClick()
    }

    //for edit submit patch request
    const handleEditSubmit = async (e) =>{
      e.preventDefault();
      console.log("handle submit edit", edit);
      const updatedresponse = await fetch(`http://localhost:8000/edit`, {
          method: 'PATCH',
          body: JSON.stringify(edit),
          headers: {
            'Content-Type':'application/json'
          },
        });
      const updateimagedata = await updatedresponse.json();
      console.log("image data in handle edit submit :", updateimagedata);
      setEdit({editid: "", title: "", path: ""})
      handleEditClick()  // toggle update form
      Swal.fire({
        title: 'Image Data Updated',
        text: 'Your Image has been updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000 // time in milliseconds
      });
    }

  return (
    <div>
        <Grid container justifyContent='space-between' style={{marginTop: 16}}>
                <Grid item onClick={handleBackClick} style={{marginLeft: 20}}>
                    <ArrowBack />
                </Grid>
                <Grid item >
                    {imgData.length === 0 ?
                    <Typography variant="h5" align="left">
                        No Images Has been Shown
                    </Typography>
                    : 
                    <Typography>
                        {itemData.album}'s Data
                    </Typography>
                    }
                </Grid>
                <Grid item >
                    <Button onClick={handleItemClick} align="right" style={{marginRight:20}}>
                    {isOpen ? <Button variant="outlined" color="error" size="small">
                                                Cancel
                                        </Button> : <div>
                                                        <Button variant="contained" size="small">
                                                            Add Image
                                                        </Button>
                                                    </div> }
                    </Button>
                </Grid>
            </Grid>    
            {/* add image form and update image form with toggle */}
            {isOpen &&  <ImageForm handleItemSubmit={handleItemSubmit} handleImageForm={handleImageForm} imageForm={imageForm} setImageForm={setImageForm} id={id} handleClear={handleClear} />}
            {isEditOpen && <UpdateImageForm handleEditSubmit={handleEditSubmit} edit={edit} setEdit={setEdit} handleClear={handleClear} />}
            <ImagesList id={id} imgData={imgData} setImgData={setImgData} isOpen={isOpen} setIsOpen={setIsOpen} handleItemClick={handleItemClick} handleEdit={handleEdit} />
    </div>
  )
}

export default AlbumItem
