import React, { Component } from 'react'
import {Container, Card, CardContent, Typography, Button, TextField} from '@mui/material'
import {FormContainer, FormGroup} from '../styles/loginStyled'
class Login extends Component {
    render() {
        return (
            <Container> 
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography>Sign up</Typography>
                <FormContainer>
                   <form>
                    <FormGroup>
                        <TextField 
                        id="standard-basic" 
                        label="Name" 
                        name="name"
                        type="text"
                        variant="standard" />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                        id="standard-basic" 
                        label="Email" 
                        name="email"
                        type="email"
                        variant="standard" />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                        id="standard-basic" 
                        label="Password" 
                        name="password"
                        type="password"
                        variant="standard" />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                        id="standard-basic" 
                        label="Confirm Password" 
                        name="confirm_password"
                        type="password"
                        variant="standard" />
                    </FormGroup>
                    <FormGroup>
                        <Typography variant="caption">Show password</Typography>    
                    </FormGroup>
                    <FormGroup>
                        <Button variant="contained" color="primary">Signup</Button>
                    </FormGroup>
                    </form> 
                </FormContainer>
                </CardContent>
              </Card> 
            </Container>
        )
    }
}

export default Login;