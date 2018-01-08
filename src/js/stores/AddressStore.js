import { EventEmitter } from 'events';
import Immutable, { Map, List } from 'immutable';
import dispatcher from '../dispatcher';

class AddressStore extends EventEmitter {

    constructor() {
        super();
        this.items = new List();
    }

    getAll() {
        return this.items;
    }

    createItem(id, months, years, line1, line2) {
        this.items = this.items.push(
          new Map({
            id,
            months,
            years,
            line1,
            line2
          })
        );
        this.emit('change');
    }

    editItem(id, months, years, line1, line2) {
        this.items = this.items.map((obj, key) => {
           if (obj.get('id') === id) {
             obj = obj.set('months', months).set('years', years).set('line1', line1).set('line2', line2);
           }
          return obj;
        });
        this.emit('change');
    }

    removeItem(id){
        this.items = this.items.filter((obj, key) =>
          obj.get('id') !== id
        );
        this.emit('change');
    }

    handleActions = (action) => {
        switch (action.type) {
          case 'CREATE_ITEM': {
            this.createItem(action.id, action.months, action.years, action.line1, action.line2);
            break;
          }
          case 'EDIT_ITEM': {
            this.editItem(action.id, action.months, action.years, action.line1, action.line2);
            break;
          }
          case 'REMOVE_ITEM': {
            this.removeItem(action.id, action.months, action.years, action.line1, action.line2);
            break;
          }
        }
    }
}

const store = new AddressStore;

dispatcher.register(store.handleActions.bind(store));
window.dispatcher = dispatcher;

export default store;
