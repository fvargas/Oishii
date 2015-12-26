export default class SideNav extends React.Component {
  showSideNav() {
    UIkit.offcanvas.show('#side-nav');
  }

  render() {
    return (
      <div id='side-nav' className='uk-offcanvas'>
        <div className='uk-offcanvas-bar uk-offcanvas-bar-flip'></div>
      </div>
    );
  }
}
