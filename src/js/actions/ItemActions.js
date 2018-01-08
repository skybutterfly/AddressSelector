import dispatcher from '../dispatcher';

export function createItem(id, months, years, line1, line2) {
    dispatcher.dispatch({
      type: 'CREATE_ITEM',
      id,
      months,
      years,
      line1,
      line2
    });
}

export function editItem(id, months, years, line1, line2) {
    dispatcher.dispatch({
      type: 'EDIT_ITEM',
      id,
      months,
      years,
      line1,
      line2
    });
}

export function removeItem(id, months, years, line1, line2) {
    dispatcher.dispatch({
      type: 'REMOVE_ITEM',
      id,
      months,
      years,
      line1,
      line2
    });
}
