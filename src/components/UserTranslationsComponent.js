import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import Languages from '../helpers/languages.json';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

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
                    <Column field="sourceLanguage.Name" title="Source Language" />
                    <Column field="inputText" title="input Text" />
                    <Column field="targetLanguage.Name" title="Target Language" />
                    <Column field="outputText" title="Translation" />
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
export default connect(mapStateToProps)(UserTranslationsComponent)