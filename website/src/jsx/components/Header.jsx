import 'Header.less';

export default class Header extends React.Component {
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
              className='uk-navbar-toggle uk-visible-small'
              onClick={ this.props.showSideNav }
            ></a>
          </div>
        </nav>
      </header>
    );
  }
}
