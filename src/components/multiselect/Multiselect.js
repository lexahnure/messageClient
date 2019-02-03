import './multiselect.scss';

const ClickOutHandler = require('react-onclickout');

class Multiselect extends Component {
  state = {
    isOpen: false,
    originOptions: [],
    selected: [],
    filtered: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { users } = nextProps;
    if (users !== prevState.originOptions) {
      return { originOptions: users, filtered: users };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { handler } = this.props;
    const { selected } = this.state;
    if (prevState.selected !== selected) {
      handler(selected);
    }
  }

  changeHandler = (event) => {
    const { originOptions } = this.state;

    const filtered = originOptions.filter(({ name }) => {
      if (event.target.value !== '') {
        return name.toLowerCase().includes(event.target.value.toLowerCase());
      }
      return { filtered: originOptions };
    });
    return this.setState({ filtered });
  }

  clickSelect = (el) => {
    const { selected } = this.state;
    const newArr = [...selected, el];
    this.setState({ selected: newArr });
  }

  clickDeselect = (el) => {
    const { selected } = this.state;
    const newArr = selected.filter(elem => elem !== el);
    this.setState({ selected: newArr });
  }

  show = () => {
    this.setState({ isOpen: true });
  }

  onClickOut = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { selected, filtered, isOpen } = this.state;
    const withoutSelected = filtered.filter(el => !selected.includes(el));


    return (
      <ClickOutHandler onClickOut={this.onClickOut}>
        <div className="multiselect">
          <div className="field">
            <div className="select-box">
              {selected && selected.map((el, index) => {
                return (
                  <span key={index} className="selected">
                    <span className="remover" onClick={() => this.clickDeselect(el)}>x</span>
                    {el.name}
                  </span>
                );
              })}
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="select user"
                ref={el => this.input = el}
                onChange={this.changeHandler}
                onClick={this.show}
              />
            </div>
          </div>
          <div className="expandable">
            {
              isOpen && (
              <ul className="list">
                {
                  withoutSelected.map((el, index) => {
                    return (
                      <li className="list-item" key={index} onClick={() => this.clickSelect(el)}>
                        {el.name}
                      </li>
                    );
                  })
                }
              </ul>
              )
            }
          </div>
        </div>
      </ClickOutHandler>
    );
  }
}

export default Multiselect;
