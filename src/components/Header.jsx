const Header = (props) => {
  return (
    <div clasName="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" style={{paddingLeft:"30px"}}>
          Itzdi
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a className="nav-link" >
                Emplados 
              </a>
            </li>
            <li class="nav-item">
              <a className="nav-link" >
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
