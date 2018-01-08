import React from "react";
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import * as ItemActions from "./actions/ItemActions";

import Input from "./Input";

export default class EditAdd extends React.PureComponent {

    static propTypes = {
        item: ImmutablePropTypes.map,
    };

    constructor(props) {
      super(props);
        this.state = {
          line1: props.item.get('line1'),
          line2: props.item.get('line2'),
          show: false
      };
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        line1: nextProps.item.get('line1'),
        line2: nextProps.item.get('line2')
       });
    }

    toggle = () => {
        this.setState({ show: !this.state.show })
    };

    changeline1 = (text) => {
      this.setState({ line1: text });
    };

    changeline2 = (text) => {
      this.setState({ line2: text });
    };

    handleChange = () => {
        const { item } = this.props;
        const { line1, line2 } = this.state;
        ItemActions.editItem(item.get('id'), item.get('months'), item.get('years'), line1, line2);
        this.toggle();
    };

    handleRemove = () => {
        const { item } = this.props;
        const { line1, line2 } = this.state;
        ItemActions.removeItem(item.get('id'), item.get('months'), item.get('years'), line1, line2);
    }

    render(){
        const { line1, line2, show } = this.state;
        const bsline1 = "Edit";
        const bsline2 = "Remove";
        const ModalHeader = "Change selected address";
        const ModalFooterBtn = "Cancel";

        return(
            <div className='icons'>
                <div>
                    <i class="fa fa-pencil" aria-hidden="true" onClick={ this.toggle }></i>
                    <i class="fa fa-times" aria-hidden="true" onClick={ this.handleRemove }></i>
                </div>
                <Modal show={ show } onHide={ close }>

                <Modal.Header className='modal-style'>
                    <h2>{ ModalHeader }</h2>
                </Modal.Header>

                <Modal.Body className='modal-style'>
                    <h4>Edit Address Line 1:</h4>
                    <Input onChange={ this.changeline1 }
                            inputValue={ line1 }  />
                    <h4>Edit Address Line 2:</h4>
                    <Input onChange={ this.changeline2 }
                            inputValue={ line2 } />
                </Modal.Body>

                <Modal.Footer className='button-style'>
                    <Button onClick={ this.toggle }>{ ModalFooterBtn }</Button>
                    <Button className='save' bsStyle="primary" onClick={ this.handleChange }>Save</Button>
                </Modal.Footer>
              </Modal>
          </div>

          );
    }
}
