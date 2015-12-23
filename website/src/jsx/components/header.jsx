import 'header.less';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className='header-main'>
        <nav className='uk-navbar uk-navbar-attached'>
          <a href='/' className='uk-navbar-brand'>Oishii</a>
          <ul className='uk-navbar-nav uk-hidden-small'>
            <li className='uk-active'><a href='/'>Home</a></li>
            <li><a href='#'>Scoreboard</a></li>
            <li><a href='#'>FAQ</a></li>
          </ul>
          <div className='uk-navbar-flip'>
            <ul className='uk-navbar-nav uk-hidden-small'>
              <li><a href='#'>Login</a></li>
              <li><a href='#'>Register</a></li>
            </ul>
            <a
              href={ `#${this.props.sideNavID}` }
              className='uk-navbar-toggle uk-visible-small'
              data-uk-offcanvas
            ></a>
          </div>
        </nav>
      </header>
    );
  }
}
