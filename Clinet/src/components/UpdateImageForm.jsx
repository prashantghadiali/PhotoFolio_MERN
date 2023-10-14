import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react'

function UpdateImageForm(props) {
    const {handleEditSubmit, edit, setEdit, handleClear } = props;
  return (
    <div>
        <form onSubmit={handleEditSubmit} style={{marginTop: 20, marginBottom:50 }}>
                    <Typography variant="h4" align="center">
                        Update Image
                    </Typography>
                    <Typography align='center'>
                        <TextField
                            type='hidden'
                            name="editid"
                            value={edit.editid}
                        />
                        <TextField
                            label="Title"
                            name="title"
                            value={edit.title}
                            onChange={(e) => {setEdit({editid: edit.editid, title: e.target.value, path: edit.path})}}
                            placeholder="Title"
                            style={{ width: 300 }}
                        />
                    </Typography>
                    <Typography align='center'>
                        <TextField
                            label="Path"
                            name="path"
                            value={edit.path}
                            onChange={(e) => {setEdit({editid: edit.editid, title:edit.title, path: e.target.value})}}
                            placeholder="Path"
                            style={{ width: 300 }}
                        />
                    </Typography>
                    <Typography align='center' style={{marginTop: 20}}>
                        <Button style={{margin: "2px"}} onClick={handleClear} variant='contained'  color='danger'>Clear</Button>
                        <Button style={{margin: "2px"}} variant='contained' type='submit' color="primary">Update Image</Button>
                    </Typography>
                </form>      
    </div>
  )
}

export default UpdateImageForm
