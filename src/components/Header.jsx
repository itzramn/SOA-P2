

const Header = (props) => {
  return (
    <div clasName="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" style={{paddingLeft:"30px"}}>
          Itzdi
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="">
                Emplados 
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
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
