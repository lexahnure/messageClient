import { NavLink } from 'react-router-dom';
import './navigation.scss';

const Navigation = (props) => {
  const { list } = props;

  return (
    <nav className="navigation">
      <ul>
        {
          list.map(item => (
            <li key={item}>
              <NavLink to={`/${item.toLowerCase()}`} activeClassName="active">
                {item.split('/')[1] || item}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Navigation;
