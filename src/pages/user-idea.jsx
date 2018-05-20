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


const IdeaHeader = (props) => {
    return <div className="idea__header">
        <div className="idea__header__title">
            My Ideas
        </div>
        <div className="idea__header__action">
            <Icon color="primary" onClick={props.add}>
                add_circle
            </Icon>
        </div>
    </div>;
};

const IdeaBodyEmpty = () => {
    return <div className="idea__container">
        Got Ideas?
    </div>
};

const IdeaRowEdit = ({values, onSave, onUpdate, onInputChange, toggleEdit}) => {
    const submitHandler = (evt) => {
        // TODO: pass id
        evt.preventDefault();
        if (values.isSave === false) {
            onSave(values, values.id);
        } else {
            onUpdate(values, values.id);
        }

        toggleEdit();
    };

    return <React.Fragment>
        <form className="idea__container__ideas__row">
            <input type="text" name="content" value={values.content} onChange={(evt) => onInputChange(evt, values.id)}/>
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


    return <React.Fragment>
        <div>{values.content} </div>
        <div>{values.impact} </div>
        <div>{values.ease} </div>
        <div>{values.confidence} </div>
        <div>{values.average_score}</div>
        <div>
            <Icon color="primary" onClick={toggleEdit}>
                edit
            </Icon>
            <Icon color="primary" onClick={() => onDelete(values.id)}>
                delete
            </Icon>
        </div>
    </React.Fragment>;
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
        return <li className="idea__container__ideas__row">
            {this.state.edit ? <IdeaRowEdit {...this.props} toggleEdit={this.toggleEdit}/>
                : <IdeaRowView {...this.props} toggleEdit={this.toggleEdit}/>}
        </li>;
    }
}

const IdeaBody = ({ideas, update, save, inputChange, deleteIdea}) => {
    const getTable = () => {
        ideas = ideas.map((val) => <IdeaRow values={val} key={val.id} onSave={save}
                                            onUpdate={update} onDelete={deleteIdea}
                                            onInputChange={inputChange}/>);

        ideas.unshift(<li className="idea__container__ideas__header">
            <div><b>Avg</b></div>
            <div><b>Confidence</b></div>
            <div><b>Ease</b></div>
            <div><b>Impact</b></div>
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
        deleteIdea: (id) => {
            dispatch(delIdea(null, id));
        },
        inputChange: (evt, id) => {
            const {name, value} = evt.target;
            dispatch(inputChange({id, name, value}));
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