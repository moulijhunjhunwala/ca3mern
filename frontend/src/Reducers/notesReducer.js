import {
  NOTES_REGISTER_FAIL,
  NOTES_REGISTER_REQUEST,
  NOTES_REGISTER_SUCCESS,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_CREATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_DELETE_FAIL,
} from "../constants/notesConstants";

export const notesReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_REGISTER_REQUEST:
      return { loading: true };
    case NOTES_REGISTER_SUCCESS:
      return { loading: false, notes: action.payload };
    case NOTES_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { loading: true };
    case NOTES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return { loading: true };
    case NOTES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};


export const notesDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case NOTES_DELETE_REQUEST:
            return {loading : true};
        case NOTES_DELETE_SUCCESS:
            return {loading : false, success : true}
        case NOTES_DELETE_FAIL:
            return {loading : false, error : action.payload, success : false}        
        default:
            return state;
    }
};