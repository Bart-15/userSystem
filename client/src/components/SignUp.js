import React, { Component } from 'react'
import { withStyles } from '@mui/styles';
import {Container, Card, CardContent, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material'
import {FormContainer, FormGroup, CardContainer} from '../styles/loginStyled'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { withRouter } from "react-router";
import {createNewUser} from '../actions/authAction'
import PropTypes from 'prop-types'



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
            },
            
        },
        '& p':{
            color:'#333',
          },
    },
    
    input : {
        color:'#fff'
    }
    
})

class SignUp extends Component {
    constructor() {
            super() 
            this.state = {
                name:"",
                email:"",
                password:"",
                confirm_password:"",
                errors:{}
            }

            this.onChange = this.onChange.bind(this)
            this.onSubmit = this.onSubmit.bind(this)
            this.onShowPass = this.onShowPass.bind(this)
        }

        // redirect to dashboard if user isAuth
        componentDidMount() {
            if(this.props.auth.isAuth){
                this.props.history.push('/dashboard')
            }
        }

        // onChange
        onChange(e) {
            this.setState({[e.target.name]: e.target.value})
        }

        
        onSubmit(e) {
            e.preventDefault()
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
                show_pass:false
            }

            this.props.createNewUser(newUser, this.props.history)
        }
        
        onShowPass(){
            this.setState({show_pass: !this.state.show_pass})
        }
    render() {
        const {classes} = this.props;
        const {errors} = this.props.error;
        return (
            <Container>
             <CardContainer>
              <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography variant="h3" align="center">Sign up</Typography>
                <FormContainer>
                   <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <TextField                       
                        helperText={errors.name ? errors.name : ""} 
                        label="Name" 
                        name="name"
                        onChange={this.onChange}
                        value={this.state.name}
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
                        helperText={errors.email ? errors.email : ""}   
                        label="Email" 
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
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
                        helperText={errors.password ? errors.password : ""}   
                        label="Password" 
                        name="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        type={this.state.show_pass ? "text" : "password"}
                        variant="outlined"
                        className={classes.field}
                        InputLabelProps={{
                            style: { color: '#fff' },
                          }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                        helperText={errors.confirm_password ? errors.confirm_password : ""}   
                        label="Confirm Password" 
                        name="confirm_password"
                        onChange={this.onChange}
                        value={this.state.confirm_password}
                        type={this.state.show_pass ? "text" : "password"}
                        variant="outlined"
                        className={classes.field}
                        InputLabelProps={{
                            style: { color: '#fff' },
                          }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel value={this.state.show_pass} onChange={this.onShowPass} control={<Checkbox  className={classes.field}
                        /> }  label="Show Password"/>    
                    </FormGroup>
                    <FormGroup>
                            <Typography variant="caption">Already have account? <Link to="/">Login</Link> </Typography>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" variant="contained" color="primary">Signup</Button>
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

const mapStateToProps = (state) => ({
    auth:state.auth,
    error:state.error
})

SignUp.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {createNewUser}) ((withStyles(useStyles)(withRouter(SignUp))));