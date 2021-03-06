import React, { Component } from 'react'
import { withStyles } from '@mui/styles';
import {Container, Card, CardContent, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material'
import {connect} from 'react-redux'
import {loginUser} from '../actions/authAction'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
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

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email:"",
            password:"",
            errors:{},
            show_pass:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onShowPass = this.onShowPass.bind(this)
    }

    // redirect to dashboard if user isAuth
    componentDidMount() {
        if(this.props.auth.isAuth){
            this.props.history.push('/dashboard')
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const user = {
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginUser(user, this.props.history)
    }

    onShowPass(e){
        this.setState({show_pass: !this.state.show_pass})
    }
    
    render() {
        const {classes} = this.props;
        const {errors}  = this.props.error;
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
                        helperText={errors.email ? errors.email : ""}
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
                        label="Password" 
                        helperText={errors.password ? errors.password : ""}
                        name="password"
                        type={this.state.show_pass ? "text" : "password"}
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
                        <FormControlLabel value={this.state.show_pass} onChange={this.onShowPass} control={<Checkbox 
                            className={classes.field}
                        />} label="Show password"/>    
                    </FormGroup>
                    <FormGroup>
                            <Typography variant="caption">Don't have an account? <Link to="/signup">Sign Up</Link> </Typography>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" variant="contained" color="primary">Log In</Button>
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
    error:state.error,
    auth:state.auth
})

export default connect(mapStateToProps, {loginUser}) (withStyles(useStyles)(withRouter(Login)));