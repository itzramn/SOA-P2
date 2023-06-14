const Auth = () => {
    return (
      <div>
        <div className="input-form-content row full">
          <div className="column full">
            <label for="exampleFormControlInput1" class="form-label">
              Correo
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              //value={newAsset.description}
              //onChange={(e) => handleEditNewAsset("description", e.target.value)}
            />
          </div>
        </div>
        <div className="input-form-content row full">
          <div className="column full">
            <label for="inputPassword5" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword5"
              class="form-control"
              placeholder="Escribe tu contraseña"
              aria-labelledby="passwordHelpBlock"
              //value={newAsset.description}
              //onChange={(e) => handleEditNewAsset("description", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Auth;