import React, { Component } from 'react'
import {Container, Button, Typography, CardActions} from '@mui/material'
import noImage from '../../img/avatar.png'
import {CardContainer} from '../../styles/loginStyled'
import {logoutUser, deleteAccount, loadProfile} from '../../actions/authAction'
import {Image, ImageContainer, Overlay, Text} from '../../styles/dashStyled'
import {RiImageEditLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
class Dashboard extends Component {

    componentDidMount(){
        this.props.loadProfile();
    }
    render() {
        const {profile} = this.props.profile;
        let content;

        if(profile === null){
            content =(
                <Typography>NO content</Typography>
            )
        } else {
            content = (
                <CardContainer>
                <ImageContainer>
                    <Image src={profile.avatar ?`data:image/jpeg;base64,${profile.avatar}` : noImage} />
                    <Overlay>
                        <Text>
                            <Link style={{color:"#fff"}} to="/update-avatar">
                             <RiImageEditLine />
                            </Link>
                        </Text>
                    </Overlay>
                </ImageContainer>
                    <Typography align="center" variant="h5">Welcome back, {`${profile.name}`}</Typography>
                <CardActions>
                    <Button onClick={this.props.logoutUser} variant="contained" color="primary">Logout</Button>
                    <Button onClick={this.props.deleteAccount.bind(this)} variant="contained" color="error">Delete my account</Button>
                </CardActions>
            </CardContainer>
            )
        }
        return (
            <Container>
               {content}
            </Container>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    profile:state.profile
})

export default connect(mapStateToProps, {logoutUser, deleteAccount, loadProfile}) (Dashboard);