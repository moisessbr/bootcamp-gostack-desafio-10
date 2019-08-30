export function meetupSubscribeRequest(id, navigation) {
  return {
    type: '@subscribe/SUBSCRIBE_REQUEST',
    payload: { id, navigation },
  };
}

export function meetupSubscribeSuccess() {
  return {
    type: '@subscribe/SUBSCRIBE_SUCCESS',
  };
}

export function meetupCancelSubscribeRequest(id, navigation) {
  return {
    type: '@subscribe/CANCEL_SUBSCRIBE_REQUEST',
    payload: { id, navigation },
  };
}

export function meetupCancelSubscribeSuccess() {
  return {
    type: '@subscribe/CANCEL_SUBSCRIBE_SUCCESS',
  };
}

export function subscribeFailure() {
  return {
    type: '@subscribe/SUBSCRIBE_FAILURE',
  };
}

export function subscribesUpdate(subs) {
  return {
    type: '@subscribe/SUBSCRIBES_UPDATE',
    payload: { subs },
  };
}
