import React from 'react';
import { Navbar, Form, Button } from 'react-bootstrap';
import { logoutAction } from '../actions/userActions';
import { connect } from 'react-redux';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    doLogout = () => {
        this.props.logout();
    }
    render() {
        return (<header>
            <Navbar  variant="dark" bg="dark">
                <Navbar.Brand href="#">Language Translator
                 {this.props.currentUser.isLogin == true ?
                        <span> Welecom {this.props.currentUser.userName}</span>
                        : null}
                    {this.props.currentUser.isLogin == true ?
                        <Button style={{ marginLeft: 10 }} variant="link" onClick={this.doLogout}>Logout</Button>
                        : null}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
        </header>);
    }

}


const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logoutAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)