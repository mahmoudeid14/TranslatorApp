import React from 'react';
import { Button } from 'react-bootstrap';
import { saveAction } from '../actions/userActions'
import { connect } from 'react-redux';
//import Languages from '../helpers/languages.json';
import Languages, { getUserLanguage } from '../helpers/languages';
import { DropDownList, ComboBox } from '@progress/kendo-react-dropdowns';




class TranslatorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceLanguage: { "Code": "en", "Name": 'English' },
            targetLanguage: { "Code": "ar", "Name": 'Arabic' },
            inputText: "",
            outputText: "",
        };

        //let userLange = getUserLanguage();
    }


    handleSourceLanguage = (e) => {
        this.setState({ sourceLanguage: e.value });
    }
    handleInputText = (e) => {
        this.setState({ inputText: e.target.value });
    }
    handleTargetLanguage = (e) => {
        this.setState({ targetLanguage: e.value });
    }

    handleOutputText = (e) => {
        this.setState({ outputText: e.target.value });
    }

    handleTranslate = () => {
        //translate();
    }
    saveTranslate = () => {
        this.props.save(this.state.sourceLanguage, this.state.targetLanguage, this.state.inputText, this.state.outputText);
    }

    render() {
        return (<div className="row mt-2">
            <div className="col-sm-5 ">
                <div className="row mt-5">

                    <ComboBox style={{ width: '100%' }}
                        data={Languages}
                        dataItemKey="Code"
                        textField="Name"
                        onChange={this.handleSourceLanguage}
                        filterable={true}
                        value={this.state.sourceLanguage}
                    />


                </div>
                <div className="row mt-5">
                    <textarea onChange={this.handleInputText} value={this.state.inputText}
                        placeholder="Enter text" style={{ width: '100%', height: 200 }} />
                </div>
            </div>
            <div className="col-sm-2 "></div>
            <div className="col-sm-5 ">
                <div className="row mt-5">
                    <ComboBox style={{ width: '100%' }}
                        data={Languages}
                        dataItemKey="Code"
                        textField="Name"
                        onChange={this.handleTargetLanguage}
                        filterable={true}
                        value={this.state.targetLanguage}
                    />
                </div>
                <div className="row mt-5">
                    <textarea onChange={this.handleOutputText} value={this.state.outputText}
                        placeholder="Translation" style={{ width: '100%', height: 200 }} />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-sm-5 ">
                    <Button variant="outline-primary" onClick={this.handleTranslate} >Translate</Button>
                </div>
                <div className="col-sm-2 "></div>
                <div className="col-sm-5 ">
                    <Button variant="outline-success" onClick={this.saveTranslate}>Save</Button>
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
        save: (sourceLanguage, targetLanguage, inputText, outputText) => {
            dispatch(saveAction(sourceLanguage, targetLanguage, inputText, outputText))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorComponent)