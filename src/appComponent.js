import { withRouter } from 'react-router-dom';
import Header from './components/header/index';
import Main from './components/main/index';
import { Pages } from './pages/Pages';


class AppComp extends Component {
  render() {
    const ConnectedHeader = withRouter(({ history }) => (
      <Header
        history={history}
      />
    ));

    return (
      <>
        <ConnectedHeader />
        <Main>
          <Pages />
        </Main>
      </>
    );
  }
}

export default AppComp;
