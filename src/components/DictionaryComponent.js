import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { deleteTranslation } from '../actions/userActions';

class DictionaryComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (<div className="row mb-4 mt-5">
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
        // delete: (Id) => {
        //     dispatch(deleteTranslation(Id))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DictionaryComponent)