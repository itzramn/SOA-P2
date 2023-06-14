/* eslint-disable jsx-a11y/anchor-is-valid */
const Header = () => {
  return (
    <div clasName="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" style={{paddingLeft:"30px"}}>
          Itzdi
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="empleados">
                Empleados 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="activos">
                Activos
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
