import React from "react";
import Immutable, { List } from 'immutable';
import { Dropdown, Button } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

import Confirm from "./Confirm";

export default class AddressDropdown extends React.PureComponent {

    constructor() {
      super();
      this.state = {
        show: false,
        value: '',
        addressList: new List(),
        selectYear: 'Select year(s)',
        selectMonth: 'Select month(s)',
        selectAddress: 'Select an address'
      };
    }

    url = () => {
      const accessToken = '5RWCPxdFKUWgjNq069KQjw11532';
      // const accessToken = 'WtTzMVaNfEyrk2w_h9Kvlg11728';
      const postCode = this.state.value;
      if (postCode) {
        return 'https://api.getAddress.io/find/' + postCode +'?api-key=' + accessToken;
      }
      return false;
    };

    getAddresses = () => {
        if (this.url()) {
            fetch(this.url())
                .then(d => d.json())
                .then(d => {
                    this.setState({
                        addressList: d.addresses,
                        selectAddress: 'Select an address'
                })
            })
        }
        return false;
    };

    clearForm=()=>{
        this.setState({value: ''});
    };

    renderAddress = () => {
      const list = [];
      const newAddresses = this.state.addressList.map((item, key) => {
          const fields = item.split(',');
          const line1 = fields[0];
          const line2 = fields[1];
          const town = fields[5];
          const country = fields[6];
          const address = line1.concat(', ', line2, ', ', town, ', ', country);
          return list.push(address);
      });
      return list;
    };

    getValidationState() {
        const length = this.state.value.length;
        if (length > 4) return 'success';
        else if (length > 3) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    _handleSelectedMonth = (eventKey) => {
  	     this.setState({ selectMonth: eventKey });
    }

    _handleSelectedYear = (eventKey) => {
  	     this.setState({ selectYear: eventKey });
    }

    _handleSelectedAddress = (eventKey) => {
  	     this.setState({ selectAddress: eventKey });
    }

    getId = () => {
        return Math.floor((Math.random() * 1000) + 1);
    }

    render(){
      const { selectYear, selectMonth, line1, line2, town, country, selectAddress } = this.state;
      const years = [ '0 Years', '1 Year', '2 Years', '3 Years' ];
      const months = [ '1 Month', '2 Months', '3 Months', '4 Month', '5 Months', '6 Months', '7 Month', '8 Months', '9 Months', '10 Month', '11 Months', '12 Months' ];
      const disabled = (selectAddress === 'Select an address') || (this.state.selectMonth === 'Select month(s)') || (this.state.selectYear === 'Select year(s)') ? true : false;
      const emptyList = !this.state.addressList[0];

      return(
          <div className='section'>
              <p>How long did you stay at your current address?</p>
              <div className='dropdown-container'>
              <Dropdown id={ this.getId() }>
            			<Button className='dropdown-select' bsRole='toggle' bsStyle="info">{ this.state.selectYear }<i class="fa fa-chevron-down" aria-hidden="true"></i></Button>
            			<Dropdown.Menu bsRole='menu'>
                      { years.map((year, key) =>
                        <MenuItem id={ key+1 } key={ key } eventKey={ year } onSelect={this._handleSelectedYear}>{ year }</MenuItem>
                      )}
                  </Dropdown.Menu>
		           </Dropdown>

                  <Dropdown id={ this.getId() }>
                  <Button className='dropdown-select' bsRole='toggle' bsStyle="info">{ this.state.selectMonth }<i class="fa fa-chevron-down" aria-hidden="true"></i></Button>
                    <Dropdown.Menu bsRole='menu'>
                    { months.map((month, key) =>
                      <MenuItem key={ key } eventKey={ month } onSelect={this._handleSelectedMonth}>{ month }</MenuItem>
                    )}
                    </Dropdown.Menu>
                  </Dropdown>
              </div>

              <div className='section'>
                  <p>Your address:</p>
                  <div className='input-container'>
                  <input onChange={this.handleChange} className='search-address' placeholder="Enter a search term" />
                  <i className="fa fa-search" onClick={this.getAddresses} aria-hidden="true"></i>
                  </div>
              </div>

              { !emptyList &&
                  <Dropdown id={ this.getId() }>
                      <Button  className='dropdown-address' bsRole='toggle' bsStyle="info">{ this.state.selectAddress }<i class="fa fa-chevron-down" aria-hidden="true"></i></Button>
                      <Dropdown.Menu bsRole='menu'>
                        { this.renderAddress().map((address, key) =>
                          <MenuItem key={ key } eventKey={ address } href="#someHref" onSelect={this._handleSelectedAddress}>{ address }</MenuItem>
                        )}
                      </Dropdown.Menu>
                  </Dropdown>
              }
              <Confirm
                  years={ this.state.selectYear }
                  months={ this.state.selectMonth }
                  selectedAddress={ this.state.selectAddress }
                  disabled={ disabled }
              />
          </div>

        );
    }
}
