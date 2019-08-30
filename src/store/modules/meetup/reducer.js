import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/MEETUP_DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/MEETUP_DELETE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/MEETUP_DELETE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@meetup/MEETUP_EDIT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/MEETUP_EDIT_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/MEETUP_CREATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/MEETUP_CREATE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/MEETUP_EDIT_CREATE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
