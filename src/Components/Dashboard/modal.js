import React from 'react';
import Modal from 'react-modal';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '500px',
        height: '500px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    input: {

    }
};



// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

function AddTaskPopUp(props) {
    const { modalIsOpen, openModal, handleChange, handleSubmit, values,handleUpdate,errors } = props;
    return (
        <div style={{}}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={openModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <h2 >{values.isAdded? "Update":"Add"} Task</h2>

              
                    <Grid container xs={12} justifyContent='flex-start' spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                label='Title'
                                name='title'
                                type="text"
                                value={values.title}
                                error={errors.title}
                                fullWidth
                                style={{marginTop:10}}
                                onChange={(e) => handleChange(e)}
                                id="outlined-basic"
                                variant="outlined" />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Assignee'
                                name='assignee'
                                type="text"
                                fullWidth
                                error={errors.assignee}
                                style={{marginTop:10}}
                                value={values.assignee}
                                onChange={(e) => handleChange(e)}
                                id="outlined-basic"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                   
                    <Grid container xs={12} justifyContent='flex-start' spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                label="Deadline"
                                name='deadline'
                                type="date"
                                defaultValue={new Date()}
                                fullWidth
                                style={{marginTop:10}}
                                value={values.deadline}
                                error={errors.deadline}
                                onChange={(e) => handleChange(e)}
                                id="outlined-basic"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth style={{marginTop:10}}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    name='status'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.status}
                                    error={errors.status}
                                    label="Status"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <MenuItem value={"Todo"}>Todo</MenuItem>
                                    <MenuItem value={"running"}>Running</MenuItem>
                                    <MenuItem value={"Done"}>Done</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                  
                    <Grid container xs={12}>
                        <Grid item xs={6}>
                           <Button onClick={values.isAdded?handleUpdate:handleSubmit} style={{marginTop:10}} color='primary' variant="contained">{values.isAdded?"Update":"Add"} Task</Button>
                        </Grid>
                    </Grid>
            </Modal>

        </div>
    );
}

export default AddTaskPopUp;