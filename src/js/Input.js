import React from "react";
import Immutable from 'immutable';

export default class Input extends React.PureComponent {

    static propTypes = {
        inputValue: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        inputValue: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            inputValue: props.inputValue
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            inputValue: nextProps.inputValue
        });
    }

    handleinputValue = (el) => {
        const text = el.target.value;
        this.props.onChange(text);
    };

    render() {
        return (
            <input value={ this.state.inputValue } onChange={ this.handleinputValue } className='edit-input' />
        );
    }
}
