import {
  SET_POST,
  FETCH_POST,
  SET_SHORT_CONTENT,
  SET_FULL_CONTENT,
  SET_COMMENT_COUNT,
  RESET_PAGE,
  RESET_POST,
  RESET_LOADING,
  NEXT_PAGE,
  SET_LOADING,
  SET_COMMENT,
  SET_COMMENTS,
  SET_PAGE,
  SHOW_COMMENTS,
  TOGGLE_COMMENTS,
  TOGGLE_SHOW_COMMENTS,
  SET_DELETE_MODAL_VISIBILITY,
  SET_EDIT_POST_MODAL_VISIBILITY,
  SET_LIKE,
} from "../actions/postActions";
import { DELETE_MODAL_HIDE } from "../actions/feedActions";

export const postState = {
  status: SET_POST,
  _id: 0,
  likes: [],
  types: [],
  title: "",
  content: "",
  fullContent: "",
  partialContent: "",
  expireAt: null,
  objective: "",
  visibility: "",
  author: {},
  createdAt: "",
  updatedAt: "",
  comments: [],
  commentsCount: 0,
  totalCommentCount: 0,
  postLength: 0,
  deleteModalVisibility: DELETE_MODAL_HIDE,
  editPostModalVisibility: false,
  showComments: true,
  isLoading: false,
  loadMoreComments: true,
  page: 1,
};

export const postReducer = (state = postState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        status: FETCH_POST,
        isLoading: true,
      };
    case SET_DELETE_MODAL_VISIBILITY:
      return {
        ...state,
        status: SET_DELETE_MODAL_VISIBILITY,
        deleteModalVisibility: action.visibility,
      };
    case SET_EDIT_POST_MODAL_VISIBILITY:
      return {
        ...state,
        status: SET_EDIT_POST_MODAL_VISIBILITY,
        editPostModalVisibility: action.visibility,
      };
    case SET_POST:
      return {
        ...state,
        status: SET_POST,
        ...action.post,
        content: action.content,
        editPostModalVisibility: false,
        isLoading: false,
      };
    case RESET_POST:
      return {
        ...state,
        status: RESET_POST,
        ...action.post,
        content: state.content,
        isLoading: false,
      };
    case SET_SHORT_CONTENT:
      return {
        ...state,
        status: SET_SHORT_CONTENT,
        partialContent: action.content,
      };
    case SET_FULL_CONTENT:
      return {
        ...state,
        status: SET_FULL_CONTENT,
        postLength: action.length,
        fullContent: action.content,
      };
    case SET_COMMENT_COUNT:
      return { ...state, totalCommentCount: action.numComments };
    case NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case RESET_PAGE:
      return { ...state, page: state.page - 1 };
    case SET_PAGE:
      return { ...state, page: action.page };
    case RESET_LOADING:
      return { ...state, isLoading: false };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading || true,
        loadMore: action.loadMore || false,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
        commentsCount: action.numComments,
      };
    case SET_COMMENT:
      state.comments = state.comments.map((comment) => {
        if (comment._id === action.commentId) {
          return { ...action.comment };
        } else {
          return comment;
        }
      });
      return {
        ...state,
        comments: state.comments,
      };
    case TOGGLE_COMMENTS:
      return {
        ...state,
        loadMoreComments: !state.loadMoreComments,
      };
    case TOGGLE_SHOW_COMMENTS:
      return {
        ...state,
        showComments: !state.showComments,
      };
    case SHOW_COMMENTS:
      return {
        ...state,
        comments: state.comments,
        commentsCount: state.commentsCount,
        showComments: true,
        loadMoreComments: true,
      };
    case SET_LIKE:
      const { payload } = action;
      return {
        ...state,
        liked: !!!state.liked,
        likesCount: payload.count,
      };
    default:
      return state;
  }
};
