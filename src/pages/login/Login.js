import { postUser } from '../../services';
import './login.scss';

class Login extends Component {
  state = {
    infoMessage: ''
  }

  onSubmit = () => {
    const { history } = this.props;
    const { elements } = event.target;
    const data = {
      name: elements.name.value
    };

    event.preventDefault();

    postUser(data).then((res) => {
      if (String(res) === 'Success') {
        elements.name.value = '';
        return this.setState({ infoMessage: 'User was created. Retype user name to login' });
      }
      window.localStorage.setItem('userID', res);
      return history.push(`/${res}/messages`);
    });
  };

  render() {
    const { infoMessage } = this.state;

    return (
      <div className="login">
        <h2>Authorization</h2>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Enter name" required name="name" />
          <input type="submit" value="Login" className="accent" />
        </form>
        {
          infoMessage && <p className="infomes">{infoMessage}</p>
        }
      </div>
    );
  }
}

export default Login;
