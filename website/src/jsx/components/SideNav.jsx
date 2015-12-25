export default function SideNav(props) {
  return (
    <div id={ `${props.sideNavID}` } className='uk-offcanvas'>
      <div className='uk-offcanvas-bar uk-offcanvas-bar-flip'></div>
    </div>
  );
}
