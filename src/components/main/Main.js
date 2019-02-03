import './main.scss';

const Main = ({ children }) => (
  <main className="wrapper">
    <div className="main">
      {children}
    </div>
  </main>
);

export default Main;
