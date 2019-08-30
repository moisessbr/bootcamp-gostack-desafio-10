export function meetupDeleteRequest(id) {
  return {
    type: '@meetup/MEETUP_DELETE_REQUEST',
    payload: { id },
  };
}

export function meetupDeleteSuccess() {
  return {
    type: '@meetup/MEETUP_DELETE_SUCCESS',
  };
}

export function meetupDeleteFailure() {
  return {
    type: '@meetup/MEETUP_DELETE_FAILURE',
  };
}

export function meetupEditRequest(data, id) {
  return {
    type: '@meetup/MEETUP_EDIT_REQUEST',
    payload: { data },
    id,
  };
}

export function meetupEditSuccess() {
  return {
    type: '@meetup/MEETUP_EDIT_SUCCESS',
  };
}

export function meetupCreateRequest(data) {
  return {
    type: '@meetup/MEETUP_CREATE_REQUEST',
    payload: { data },
  };
}

export function meetupCreateSuccess() {
  return {
    type: '@meetup/MEETUP_CREATE_SUCCESS',
  };
}

export function meetupEditCreateFailure() {
  return {
    type: '@meetup/MEETUP_EDIT_CREATE_FAILURE',
  };
}
