import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { loginAction } from '../actions/userActions';
import { connect } from 'react-redux';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '' };
    }
    doLogin = () => {
        if (!this.state.userName) {
            alert('Please Enter User Name');
            return;
        }
        this.props.login(this.state.userName);
        //alert(this.state.userName);
    }
    handleChange = (e) => {
        this.setState({ userName: e.target.value });
    }
    render() {
        return (<div className="row mt-5">
            <div className="col-sm-12 grid-margin">
                <div className="card h-100">
                    <h4 className="card-header">Login</h4>
                    <div className="card-body">
                        <Form inline>
                            <FormControl type="text" placeholder="User Name" className="mr-sm-2"
                                onChange={this.handleChange} />
                            <Button variant="outline-success" onClick={this.doLogin}>Login</Button>
                        </Form>

                    </div>
                </div>
            </div>
        </div>);
    }

}


const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (userName) => {
            dispatch(loginAction(userName))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)