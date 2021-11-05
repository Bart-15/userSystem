import React, { Component } from 'react'
import { withStyles } from '@mui/styles';
import {Container, Card, CardContent, Typography, Button, TextField} from '@mui/material'
import {FormContainer, FormGroup, CardContainer} from '../styles/loginStyled'

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

class SignUp extends Component {
    
    render() {
        const {classes} = this.props;
        return (
            <Container>
             <CardContainer>

              <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography variant="h3" align="center">Sign up</Typography>
                <FormContainer>
                   <form>
                    <FormGroup>
                        <TextField 
                        label="Name" 
                        name="name"
                        type="text"
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
                        label="Email" 
                        name="email"
                        type="email"
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
                        className={classes.field}
                        InputLabelProps={{
                            style: { color: '#fff' },
                          }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                        id="standard-basic" 
                        label="Confirm Password" 
                        name="confirm_password"
                        type="password"
                        variant="outlined"
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
                        <Button variant="contained" color="primary">Signup</Button>
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

export default (withStyles(useStyles)(SignUp));