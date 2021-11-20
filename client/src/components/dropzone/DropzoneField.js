import React, { Component } from 'react'
import {Container, Typography, TextField, Card, CardContent, Button} from "@mui/material"
import { withStyles } from '@mui/styles';
import {BsImage} from 'react-icons/bs'
import axios from 'axios'

const useStyles = theme => ({
    cardRoot : {
        background:'transparent',
        textAlign:'center',
        width:'auto',
        display:'flex',
        flexDirection:'column',
        color:'#fff',
        alignItems: 'center',
    }
})
class DropzoneField extends Component {
    constructor() {
        super()
        this.state = {
            image:null,
            errors:{}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleEmptyImage = this.handleEmptyImage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) {
        const file = e.target.files[0];        
        this.setState({image:file});
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append("avatar", this.state.image, this.state.image.name);


        axios.post('/api/myprofile/avatar', formData)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    
    handleEmptyImage() {
        this.setState({...this.state,
            preview:"",
            image:""
        })
    }
      render() {
         const {classes} = this.props;
        return (
            <div>
                <Container>
                    <Card className={classes.cardRoot}>
                        <CardContent>
                            <Typography variant="h4">Upload Image</Typography>
                            <hr />
                                <BsImage size={50} />
                                    <form onSubmit={this.onSubmit}  encType="multipart/form-data">
                                        <Typography variant="subtitle1">Select image in your gallery</Typography>
                                        <TextField name="image" type="file" className={classes.textField} variant="standard" InputProps={{
                                        disableUnderline: true,
                                    }}  onChange={this.handleChange} />
                                        {
                                        this.state.image ?  (
                                                <div>
                                                    <img width="250" height="250" src={URL.createObjectURL(this.state.image)} alt="hello" />
                                                    <Button variant="contained" color="error" onClick={this.handleEmptyImage}>Clear</Button>
                                                    <Button type="submit" variant="contained" color="primary">Save</Button> 
                                                </div>

                                        ) : ""
                                        } 
                                </form>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default (withStyles(useStyles)(DropzoneField));
