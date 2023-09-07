import {
  FETCH_DIAGRAMS_SUCCESS,
  ADD_DIAGRAM_SUCCESS,
  DELETE_DIAGRAM_SUCCESS,
} from '../actions/diagramActions';

const initialState = {
  diagrams: [],
};

const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIAGRAMS_SUCCESS:
      return {
        ...state,
        diagrams: action.payload,
      };
    case ADD_DIAGRAM_SUCCESS:
      return {
        ...state,
        diagrams: [...state.diagrams, action.payload],
      };
    case DELETE_DIAGRAM_SUCCESS:
      return {
        ...state,
        diagrams: state.diagrams.filter((diagram) => diagram.uuid !== action.payload),
      };
    default:
      return state;
  }
};

export default diagramReducer;
