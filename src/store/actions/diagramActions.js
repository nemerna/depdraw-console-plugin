import * as api from '../../services/api';

// Action Types
export const FETCH_DIAGRAMS_SUCCESS = 'FETCH_DIAGRAMS_SUCCESS';
export const ADD_DIAGRAM_SUCCESS = 'ADD_DIAGRAM_SUCCESS';
export const DELETE_DIAGRAM_SUCCESS = 'DELETE_DIAGRAM_SUCCESS';

// Action Creators
export const fetchDiagrams = () => {
  return async (dispatch) => {
    try {
      const diagrams = await api.fetchDiagrams();
      dispatch({ type: FETCH_DIAGRAMS_SUCCESS, payload: diagrams });
    } catch (error) {
      // Handle error
    }
  };
};

export const addDiagram = (diagramName) => {
  return async (dispatch) => {
    try {
      const newDiagram = await api.createDiagram(diagramName);
      dispatch({ type: ADD_DIAGRAM_SUCCESS, payload: newDiagram });
    } catch (error) {
      // Handle error
    }
  };
};

export const deleteDiagram = (diagramUuid) => {
  return async (dispatch) => {
    try {
      const isDeleted = await api.deleteDiagram(diagramUuid);
      if (isDeleted) {
        dispatch({ type: DELETE_DIAGRAM_SUCCESS, payload: diagramUuid });
      } else {
        // Handle deletion failure
      }
    } catch (error) {
      // Handle error
    }
  };
};
