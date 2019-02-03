import './home.scss';

const Home = ({ history }) => {

  const onRead = () => {
    history.push('/login');
  };

  return (
    <div className="card successReg">
      <h2>Hi there</h2>
      <p>You haven't logged yet</p>
      <button type="button" onClick={onRead}>Go to Login</button>
    </div>
  );
};

export default Home;
