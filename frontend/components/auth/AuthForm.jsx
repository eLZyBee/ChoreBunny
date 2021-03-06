var React = require("react"),
  UserActions = require("../../actions/UserActions"),
  SessionStore = require("../../stores/SessionStore"),
  UserStore = require("../../stores/UserStore"),
  SignupForm = require("./SignupForm"),
  LoginForm = require("./LoginForm");

var AuthForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return({ form: "choose", errors: null });
  },
  _loginChange: function () {
    if (SessionStore.currentUser()){
      this.context.router.push("home")
    }
  },
  _handleErrors: function () {
    var self = this;
    this.errors = UserStore.errors();
    if (!(this.errors === undefined)) {
      $("#alert").addClass("js-alert");
      $("input").addClass("input-alert");
      $("label").addClass("label-alert");
      this.setState({errors: this.errors.join(". ")});
      setTimeout(function() {
        $("#alert").removeClass("js-alert");
        $("input").removeClass("input-alert");
        $("label").removeClass("label-alert");
        self.setState({errors: null});
      }, 8000);
    }
  },
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._loginChange);
    this.errorListener = UserStore.addListener(this._handleErrors);
  },
  componentWillUnmount: function () {
    this.sessionListener.remove();
    this.errorListener.remove();
  },
  chooseLogin: function () {
    this.setState({form: "login"});
  },
  chooseSignup: function () {
    this.setState({form: "signup"});
  },
  goBack: function () {
    this.setState({form: "choose"});
  },
  chooseForm: function () {
    return (
      <div>
        <div className="oauth">
          <a className="fb" href="/auth/facebook">Facebook</a><br/>
          <a className="google" href="/auth/google_oauth2">Google</a>
        </div>
        <p>or</p>
        <p>Log in or sign up with email</p>
        <div className="auth-regular">
          <button onClick={this.chooseLogin}>Log in</button>
          <button onClick={this.chooseSignup}>Sign up</button>
        </div>
      </div>
    )
  },
  guestLogin: function (e) {
    e.preventDefault();
    UserActions.guestLogin();
  },
  render: function () {
    var form = this.state.form;

    if (form === "choose") {
      form = this.chooseForm();
    } else if (form === "login") {
      form = <LoginForm goBack={this.goBack}/>;
    } else if (form === "signup") {
      form = <SignupForm goBack={this.goBack}/>;
    }

    return (
      <div className="background">
        <div id="alert">{this.state.errors}</div>
        <div className="auth-form">
          <img src={logoUrl}/>
          {form}
          <p>Don't have or want an account? Log in as
            <button onClick={this.guestLogin}>Guest</button>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = AuthForm;
