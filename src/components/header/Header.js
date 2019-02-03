import { Link, NavLink } from 'react-router-dom';
import Navigation from '../navigation/index';
import './header.scss';

const Header = ({ history }) => {
  const userID = window.localStorage.getItem('userID');
  const onLogoutHandler = () => {
    event.preventDefault();
    window.localStorage.clear();
    history.push('/home');
  };

  const list = userID ? [`${userID}/Messages`] : ['Home', 'Login'];

  return (
    <header className="header">
      <strong>
        <NavLink to="/home" activeClassName="">Logo</NavLink>
      </strong>
      <Navigation list={list} />
      <div className="user-box">
        {
          userID && (
            <button type="button" onClick={onLogoutHandler}>Logout</button>
          )
        }
      </div>
    </header>
  );
};

export default Header;
