import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from '@material-ui/core/Icon';
import {refreshToken, fetchUserDetails} from '../actions/auth';
import {
    fetchIdeas,
    addIdea,
    saveIdea,
    inputChange,
    updateIdea,
    delIdea
} from '../actions/idea';
import {
    notifyError
} from '../actions/global';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '../components/dialog'
import Bulb from '../static/bulb.png';

const IdeaHeader = (props) => {
    return <React.Fragment>
        <div className="idea__header">
            <div className="idea__header__title">
                My Ideas
            </div>
            <div className="idea__header__action">
                <Icon color="primary" onClick={props.add} style={{fontSize: 56}}>
                    add_circle
                </Icon>
            </div>
        </div>
        <Divider light/>
    </React.Fragment>;
};

const IdeaBodyEmpty = () => {
    return <div className="idea__container">
        <img src={Bulb} className="container__ideas__got-idea"/>
        <div>Got Ideas?</div>
    </div>
};

const IdeaRowEdit = ({values, onSave, onUpdate, onInputChange, toggleEdit, invalidContent}) => {
    const submitHandler = (evt) => {
        evt.preventDefault();
        if (!values.content) {
            return invalidContent('Please enter the content');
        }
        if (values.isSave === false) {
            onSave(values, values.id);
        } else {
            onUpdate(values, values.id);
        }

        toggleEdit();
    };

    return <React.Fragment>
        <form className="idea__container__ideas__row">
            <TextField type="text" className="idea__container__ideas__header__content" name="content"
                       value={values.content} onChange={(evt) => onInputChange(evt, values.id)}/>
            <input min="1" max="10" type="number" name="impact" value={values.impact}
                   onChange={(evt) => onInputChange(evt, values.id)}/>
            <input min="1" max="10" type="number" name="ease" value={values.ease}
                   onChange={(evt) => onInputChange(evt, values.id)}/>
            <input min="1" max="10" type="number" name="confidence" value={values.confidence}
                   onChange={(evt) => onInputChange(evt, values.id)}/>
            <div>{values.average_score}</div>
            <div>
                <Icon color="primary" onClick={submitHandler}>
                    done
                </Icon>
                <Icon color="primary" onClick={toggleEdit}>
                    highlight_off
                </Icon>
            </div>
        </form>
    </React.Fragment>;
}

const IdeaRowView = ({values, toggleEdit, onDelete}) => {


    return <div className="idea__container__ideas__row">
        <div className="idea__container__ideas__header__content">{values.content} </div>
        <div>{values.impact} </div>
        <div>{values.ease} </div>
        <div>{values.confidence} </div>
        <div>{values.average_score}</div>
        <div>
            <Icon color="primary" onClick={toggleEdit}>
                edit
            </Icon>
            <Dialog onDelete={onDelete} values={values}/>
        </div>


        </div>;
}

class IdeaRow extends Component {
    constructor() {
        super();
        this.state = {
            edit: false
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        const edit = this.state.edit;
        this.setState({edit: !edit});
    }

    render() {
        return <li>
            {this.state.edit ? <IdeaRowEdit {...this.props} toggleEdit={this.toggleEdit}/>
                : <IdeaRowView {...this.props} toggleEdit={this.toggleEdit}/>}
        </li>;
    }
}

const IdeaBody = ({ideas, update, save, inputChange, deleteIdea, setError}) => {
    const getTable = () => {
        ideas = ideas.map((val, index) => <IdeaRow values={val} key={val.id}
                                                   invalidContent={setError}
                                                   onSave={save}
                                                   onUpdate={update} onDelete={deleteIdea}
                                                   onInputChange={inputChange}/>);

        ideas.unshift(<li key="-1">
            <div className="idea__container__ideas__header">
                <div className="idea__container__ideas__header__content"></div>
                <div><b>Impact</b></div>
                <div><b>Ease</b></div>
                <div><b>Confidence</b></div>
                <div><b>Avg</b></div>
                <div></div>
            </div>
        </li>);

        return ideas;
    }

    return <div className="idea__container">
        <ul className="idea__container__ideas">
            {ideas.length ? getTable() : <IdeaBodyEmpty/>}
        </ul>
    </div>;
};

const mapStateToPropsBody = (state) => {
    return {
        ideas: state.idea.ideas
    };
};

const mapDispatchToPropsBody = (dispatch) => {
    return {
        save: (data, id) => {
            dispatch(saveIdea(data, id));
        },
        update: (data, id) => {
            dispatch(updateIdea(data, id));
        },
        deleteIdea: (data, id) => {
            dispatch(delIdea(data, id));
        },
        inputChange: (evt, id) => {
            const {name, value} = evt.target;
            dispatch(inputChange({id, name, value}));
        },
        setError: (msg) => {
            dispatch(notifyError(msg))
        }
    };
};

const IdeaBodyContainer = connect(mapStateToPropsBody, mapDispatchToPropsBody)(IdeaBody);


const Idea = (props) => {
    props.fetchDetails();
    props.fetchIdeasForUser();
    setInterval(props.refToken, 540000);

    return <React.Fragment>
        <IdeaHeader add={props.addIdeaForUser}/>
        <IdeaBodyContainer/>
    </React.Fragment>;
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        refToken: () => dispatch(refreshToken()),
        fetchDetails: () => dispatch(fetchUserDetails()),
        fetchIdeasForUser: () => dispatch(fetchIdeas()),
        addIdeaForUser: () => dispatch(addIdea())
    };
};

const IdeaContainer = connect(mapStateToProps, mapDispatchToProps)(Idea);

export default IdeaContainer;