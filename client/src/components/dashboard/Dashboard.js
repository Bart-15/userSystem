import React, { Component } from 'react'
import {Container, Button, Typography} from '@mui/material'
import {CardContainer} from '../../styles/loginStyled'
import {logoutUser, deleteAccount} from '../../actions/authAction'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
class Dashboard extends Component {
    render() {
        const {user} = this.props.auth;
        
        return (
            <Container>
                <CardContainer>
                    <Typography variant="h5">Welcome Back, {`${user.name}`}</Typography>
                    <Button onClick={this.props.logoutUser} variant="contained" color="primary">Logout</Button>
                    <Button onClick={this.props.deleteAccount.bind(this)} variant="contained" color="secondary">Delete my account</Button>
                </CardContainer>
            </Container>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser, deleteAccount}) (Dashboard);