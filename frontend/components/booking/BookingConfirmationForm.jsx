var React = require('react');

var BookingConfirmationForm = React.createClass({
  render: function () {
    return (
      <form onSubmit={this.props.nextStage} className="booking-details">
        <h1> Are these details correct? </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <input type="submit" value="Confirm"/>
      </form>
    );
  }
});

module.exports = BookingConfirmationForm;
