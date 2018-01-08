require('../scss/main.scss');
require('font-awesome-sass-loader');
require('../fonts/font-brown-bold/brown.scss');
require('../fonts/font-brown-light/brown.scss');
require('../fonts/font-brown-regular/brown.scss');

import React from "react";
import ReactDOM from "react-dom";
import Immutable from 'immutable';

import Store from './stores/AddressStore';
import EditAdd from "./EditAdd";
import AddressDropdown from './AddressDropdown';

export default class App extends React.PureComponent {

    constructor() {
      super();
      this.state = {
          items: Store.getAll()
      };
    }

    componentWillMount(){
      Store.on('change', () => {
          this.setState({
              items: Store.getAll(),
        });
      });
    }

    render() {
      const { items } = this.state;
      const itemComponents = items.map((item, key) => {
          return <div className='items address-container' key={ key } >
                    <li>
                      <ul> { item.get('line1') } </ul>
                      <ul> { item.get('line2') } </ul>
                      <ul className='duration'> { item.get('years') } and { item.get('months') }</ul>
                    </li>
                    <EditAdd item={ item } />
                </div>;
    });

    return (
        <div>
            <h1 className='intro-component'><strong>octopus</strong>labs</h1>

            <h1>Home address</h1>
            <p className='heading'>Please enter the directors home address for the last 3 years.</p>

            <AddressDropdown />
            <div>
                { itemComponents }
            </div>
        </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<App/>, app);
