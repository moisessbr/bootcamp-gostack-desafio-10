import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  subscriptions: [],
};

export default function subscribe(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscribe/SUBSCRIBE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@subscribe/SUBSCRIBES_UPDATE': {
        draft.subscriptions = action.payload.subs;
        break;
      }
      case '@subscribe/SUBSCRIBE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@subscribe/CANCEL_SUBSCRIBE_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@subscribe/CANCEL_SUBSCRIBE_SUCCESS': {
        draft.loading = true;
        break;
      }
      case '@subscribe/SUBSCRIBE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
