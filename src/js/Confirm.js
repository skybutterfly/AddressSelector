import React from "react";
import Immutable from 'immutable';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import * as addressActions from "./actions/ItemActions";

export default class Confirm extends React.PureComponent {

  static propTypes = {
      years: React.PropTypes.string,
      months: React.PropTypes.string,
      selectedAddress: React.PropTypes.string,
      disabled: React.PropTypes.bool
  };

  state = {
      show: false
  };

  toggle = () => {
      this.setState({ show: !this.state.show })
  };

  handleSaved = () => {
      const { months, years, selectedAddress } = this.props;
      const address = selectedAddress.split(',');
      const line1 = address[0].concat(', ', address[1]);
      const line2 = address[2].concat(', ', address[3]);
      addressActions.createItem(Math.floor((Math.random() * 1000) + 1), months, years, line1, line2);
      this.toggle();
  };

  render(){
      const { years, months, disabled, selectedAddress } = this.props;
      const bsline1 = "Confirm and continue";
      const ModalHeader = "Add a new address to the list";
      const ModalFooterBtn = "Close";

      return(
        <div>
          <Button className='confirm' bsSize="small" disabled={ disabled } onClick={ !disabled ? this.toggle : null }>
              { bsline1 }
          </Button>

          <Modal show={ this.state.show } onHide={ close }>

            <Modal.Header className='modal-style'>
              <h2>{ ModalHeader }</h2>
            </Modal.Header>

            <Modal.Body className='modal-style'>

              <p>Please confirm the following details.</p>

              <h4>Duration:</h4>
              <p>{ years } and { months }</p>

              <h4>Address:</h4>
              <p>{ selectedAddress }</p>

            </Modal.Body>

            <Modal.Footer className='button-style'>
              <Button onClick={ this.toggle }>{ ModalFooterBtn }</Button>
              <Button className='save' bsStyle="primary" onClick={ this.handleSaved }>Save</Button>
            </Modal.Footer>

          </Modal>
        </div>
      );
    }
}
