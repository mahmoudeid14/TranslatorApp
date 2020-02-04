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
            <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="#home">Language Translator
                 {this.props.currentUser.isLogin == true ?
                        <span> Welecom {this.props.currentUser.userName}</span>
                        : null}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline>
                        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                        {this.props.currentUser.isLogin == true ?
                            <Button variant="outline-success" onClick={this.doLogout}>Logout</Button>
                            : null}
                    </Form>
                </Navbar.Collapse>
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