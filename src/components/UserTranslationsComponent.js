import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import Languages from '../helpers/languages.json';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { deleteTranslation } from '../actions/userActions';

class UserTranslationsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = { skip: 0, take: 10 }

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    render() {
        return (<div className="row mb-4 mt-5">
            <div className="col-sm-12 grid-margin">
                <Grid data={this.props.currentUser.translations.slice(this.state.skip, this.state.take + this.state.skip)}
                    skip={this.state.skip}
                    take={this.state.take}
                    total={this.props.currentUser.translations.length}
                    pageable={true}
                    onPageChange={this.pageChange}>
                    <Column field="Id" title="Id" width="50"/>
                    <Column field="dictionary.Name" title="Dictionary" />
                    <Column field="sourceLanguage.name" title="Source Language" />
                    <Column field="inputText" title="Input Text" />
                    <Column field="targetLanguage.name" title="Target Language" />
                    <Column field="outputText" title="Translation" />
                    <Column field="outputText" title=" " 
                        cell={(row) => (

                            <td>
                                <Button variant="outline-secondary" onClick={() => {
                                   // this.props.play(row.dataItem.targetLanguage,row.dataItem.outputText);
                                }} >Play</Button>
                            </td>
                        )} />
                    <Column field="Id" title=" " 
                        cell={(row) => (

                            <td>
                                <Button variant="outline-danger" onClick={() => {
                                    this.props.delete(row.dataItem.Id);
                                }} >Delete</Button>
                            </td>
                        )} />
                </Grid>
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
        delete: (Id) => {
            dispatch(deleteTranslation(Id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTranslationsComponent)