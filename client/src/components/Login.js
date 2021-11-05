import React, { Component } from 'react'
import { withStyles } from '@mui/styles';
import {Container, Card, CardContent, Typography, Button, TextField} from '@mui/material'
import {FormContainer, FormGroup, CardContainer} from '../styles/loginStyled'
import axios from 'axios';

const useStyles = theme => ({
    card: {
        background: 'rgba( 71, 186, 92, 0.20 )',
        boxShadow: ' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        color:'#fff',
        position: 'relative',
        width:'400px'
    },

    field : {
        color:'#fff',
        '& .MuiInputBase-root': {
            color: '#fff',
          },
        '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {            // - The <fieldset> inside the Input-root
                borderColor: '#fff',   // - Set the Input border
                
            },
            '&:hover fieldset': {
                borderColor: 'yellow', // - Set the Input border when parent has :hover
                
            },
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
                borderColor: '#FFE77AFF',
                color:'#fff !important',
            }
    
        },
    },

    input : {
        color:'#fff'
    }
   
})

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email:"",
            password:"",
            errors:{}
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const newUser = {
            email:this.state.email,
            password:this.state.password
        }

        axios.post('/api/login', newUser)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }
    
    render() {
        const {classes} = this.props;
        return (
            <Container>
             <CardContainer>

              <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography variant="h3" align="center">Login</Typography>
                <FormContainer>
                   <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <TextField 
                        label="Email" 
                        name="email"
                        type="text"
                        value={this.state.email} 
                        onChange={this.handleChange}
                        variant="outlined"
                        className={classes.field}
                        InputLabelProps={{
                            style: { color: '#fff' },
                          }}
                         />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                        id="standard-basic" 
                        label="Password" 
                        name="password"
                        type="password"
                        variant="outlined"
                        value={this.state.password} 
                        onChange={this.handleChange}
                        className={classes.field}
                        InputLabelProps={{
                            style: { color: '#fff' },
                          }}
                    />
                    </FormGroup>
                    <FormGroup>
                        <Typography variant="caption">Show password</Typography>    
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </FormGroup>
                    </form> 
                </FormContainer>
                </CardContent>
              </Card> 
             </CardContainer>
            </Container>
        )
    }
}

export default (withStyles(useStyles)(Login));