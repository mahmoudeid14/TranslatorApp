import React from 'react';
import { Button } from 'react-bootstrap';
import { saveAction, createDictionary } from '../actions/userActions'
import { connect } from 'react-redux';
import { DropDownList, ComboBox } from '@progress/kendo-react-dropdowns';
import { googleTranslate } from "../utils/googleTranslate";
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';


class TranslatorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            languageCodes: [],
            sourceLanguage: { "language": "en", "name": 'English' },
            targetLanguage: { "language": "ar", "name": 'Arabic' },
            inputText: "",
            outputText: "",
            dictionary: { Id: 1, Name: 'default' },
            newDictionary: "",
            visible: false
        };
        this.toggleDialog = this.toggleDialog.bind(this);
    }
    componentDidMount() {
        googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
            getLanguageCodes(languageCodes);
        });

        const getLanguageCodes = languageCodes => {
            this.setState({ languageCodes });
        };
    }

    handleSourceLanguage = (e) => {
        this.setState({ sourceLanguage: e.value });
    }
    handleInputText = (e) => {
        this.translate(e.target.value);
        this.setState({ inputText: e.target.value });


    }
    handleTargetLanguage = (e) => {
        if (this.state.inputText) {
            this.translate(this.state.inputText, e.value.language);
        }
        this.setState({ targetLanguage: e.value });
    }

    handleOutputText = (e) => {
        this.setState({ outputText: e.target.value });
    }
    handleDictionary = (e) => {
        this.setState({ dictionary: e.target.value });
    }
    handleNewDictionary = (e) => {
        this.setState({ newDictionary: e.target.value });
    }


    translate = (inputText, languageChanged) => {
        //let { sourceLanguage, targetLanguage, inputText } = this.state;
        let sourceLanguage = this.state.sourceLanguage.language;
        let targetLanguage = languageChanged != null ? languageChanged : this.state.targetLanguage.language;
        googleTranslate.translate(inputText, sourceLanguage, targetLanguage, function (err, translation) {
            setTranslation(translation.translatedText);
        });

        const setTranslation = translatedText => {
            this.setState({ outputText: translatedText });
        };
    }


    saveTranslate = () => {
        this.props.save(this.state.sourceLanguage, this.state.targetLanguage, this.state.inputText, this.state.outputText, this.state.dictionary);
    }

    toggleDialog() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        return (

            <div className="mt-2">
                <div className="row">
                    <div className="col-sm-5 ">
                        <div className="row mt-2">
                            <ComboBox style={{ width: '100%' }}
                                data={this.state.languageCodes}
                                dataItemKey="language"
                                textField="name"
                                onChange={this.handleSourceLanguage}
                                filterable={true}
                                value={this.state.sourceLanguage}
                            />
                        </div>
                        <div className="row mt-2">
                            <textarea onChange={this.handleInputText} value={this.state.inputText}
                                placeholder="Enter text" style={{ width: '100%', height: 200 }} />
                        </div>
                    </div>
                    <div className="col-sm-2 "></div>
                    <div className="col-sm-5 ">
                        <div className="row mt-2">
                            <ComboBox style={{ width: '100%' }}
                                data={this.state.languageCodes}
                                dataItemKey="language"
                                textField="name"
                                onChange={this.handleTargetLanguage}
                                filterable={true}
                                value={this.state.targetLanguage}
                            />
                        </div>
                        <div className="row mt-2">
                            <textarea onChange={this.handleOutputText} value={this.state.outputText}
                                placeholder="Translation" style={{ width: '100%', height: 200 }} />
                        </div>
                    </div>

                </div>

                <div className="row mt-5">
                    <div className="col-sm-2 ">
                        <span>Dictionary</span>
                    </div>
                    <div className="col-sm-3 ">
                        <DropDownList style={{ width: '100%' }}
                            data={this.props.currentUser.dictionaries}
                            dataItemKey="Id"
                            textField="Name"
                            onChange={this.handleDictionary}
                            value={this.state.dictionary}
                        />
                    </div>
                    <div className="col-sm-1 ">
                        <Button variant="outline-primary" onClick={this.toggleDialog}>Create</Button>

                    </div>
                    <div className="col-sm-1 "></div>
                    <div className="col-sm-5 ">
                        <Button variant="outline-success" onClick={this.saveTranslate}>Save Translation</Button>
                    </div>

                </div>
                <div className="row ">
                    {this.state.visible && <Dialog title={"Create New Dictionary"} onClose={this.toggleDialog}>
                        <p style={{ margin: "25px", textAlign: "center" }}>
                            <input onChange={this.handleNewDictionary} value={this.state.newDictionary}
                                placeholder="Enter Dictionary Name" />

                        </p>
                        <DialogActionsBar>
                            <button className="k-button" onClick={(this.toggleDialog)}>Cancel</button>
                            <button className="k-button" onClick={() => {
                                this.props.createDic(this.state.newDictionary);
                                this.setState({ newDictionary: "" });
                                this.toggleDialog();
                            }}>Create</button>
                        </DialogActionsBar>
                    </Dialog>}
                </div>
            </div>
        );

    }


}


const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (sourceLanguage, targetLanguage, inputText, outputText, dictionary) => {
            if (inputText && outputText) {
                dispatch(saveAction(sourceLanguage, targetLanguage, inputText, outputText, dictionary));
            }
        },
        createDic: (newDic) => {
            if (newDic) {
                dispatch(createDictionary(newDic));
            }

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorComponent)