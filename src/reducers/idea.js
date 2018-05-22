import {
    ADD_IDEA,
    FETCH_IDEA_SUCCESS,
    FETCH_IDEA_FAILURE,
    SAVE_IDEA_STARTING,
    SAVE_IDEA_SUCCESS,
    SAVE_IDEA_FAILURE,
    INPUT_CHANGE_IDEA,
    DELETE_IDEA_FAILURE,
    DELETE_IDEA_SUCCESS,
} from '../actions/idea';

const getDefaultIdea = () => {
    return {
        id: parseInt(Math.random() * 1000),
        content: '',
        impact: 10,
        ease: 10,
        confidence: 10,
        average_score: 10,
        isSave: false
    }
}

const defaultState = {
    ideas: [],
};

const calculateAvg = (obj) => {
    let avg = (parseInt(obj.impact) + parseInt(obj.ease) + parseInt(obj.confidence)) / 3;
    return parseFloat(avg.toFixed(2));
};

const sortOrder = (a, b) => a.average_score < b.average_score;

const idea = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_IDEA:
            const ideas = state.ideas.slice();
            ideas.push(getDefaultIdea());
            return {
                ...state, ideas
            };
        case SAVE_IDEA_SUCCESS:
            var {id, payload} = action;
            var newIdeas = state.ideas.map((idea) => {
                if (idea.id === id) {
                    payload.average_score = calculateAvg(payload);
                    return payload;
                } else {
                    return idea;
                }
            }).sort(sortOrder);
            return {...state, ideas: newIdeas};
        case FETCH_IDEA_SUCCESS:
            return {
                ...state, ideas: action.payload.map((idea) => {
                  idea.average_score = calculateAvg(idea);
                  return idea;
                }).sort(sortOrder)
            };
        case FETCH_IDEA_FAILURE:
            return {...defaultState};
        case DELETE_IDEA_SUCCESS:
            return {
                ...state,
                ideas: state.ideas.filter((idea) => idea.id !== action.id)
            };
        case INPUT_CHANGE_IDEA:
            var {id, name, value} = action.payload;
            var newIdeas = state.ideas.map((idea) => {
                if (idea.id === id) {
                    let obj = Object.assign({}, idea);
                    obj[name] = value;
                    obj.average_score = calculateAvg(obj);
                    return obj;
                } else {
                    return idea;
                }
            });
            return {...state, ideas:newIdeas };
        default:
            return state;
    }
};

export default idea;