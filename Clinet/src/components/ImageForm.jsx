import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react'

function ImageForm(props) {
    const {handleItemSubmit, handleImageForm, imageForm, setImageForm, id, handleClear} = props;
  return (
    <div>
        <form onSubmit={handleItemSubmit} style={{marginTop: 20, marginBottom:50 }}>
                    <Typography variant="h4" align="center">
                        Add Image to first
                    </Typography>
                    <Typography align='center'>
                        <TextField
                            type='hidden'
                            name="albumId"
                            value={imageForm.albumId=id}
                        />
                        <TextField
                            label="Title"
                            name="title"
                            value={imageForm.title}
                            onChange={(e) => {setImageForm({albumId: id, title: e.target.value, path: ""}); handleImageForm(e)}}
                            placeholder="Title"
                            style={{ width: 300 }}
                        />
                    </Typography>
                    <Typography align='center'>
                        <TextField
                            label="Path"
                            name="path"
                            value={imageForm.path}
                            onChange={(e) => {setImageForm({ path: e.target.value}); handleImageForm(e)}}
                            placeholder="Path"
                            style={{ width: 300 }}
                        />
                    </Typography>
                    <Typography align='center' style={{marginTop: 20}}>
                        <Button style={{margin: "2px"}} onClick={handleClear} variant='contained'  color='danger'>Clear</Button>
                        <Button style={{margin: "2px"}} variant='contained' type='submit' color="primary">Add Image</Button>
                    </Typography>
                </form>
    </div>
  )
}

export default ImageForm
