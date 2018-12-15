import { mergeReducers, createReducer } from '../utils/redux';
import data from '../../../_router/postData';

const initialState = {
  currentPost: 1,
  isOpen: false,
  posts: data,
};

const toggleReducer = createReducer('Toggle', (state) => {
  return {
    ...state,
    isOpen: !state.isOpen,
  };
});

const postReducer = createReducer('Post', (state, action) => {
  return {
    ...state,
    isOpen: true,
    currentPost: parseInt(action.payload, 10),
  };
});

export default mergeReducers([
  postReducer,
  toggleReducer,
], initialState);
