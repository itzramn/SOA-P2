import React, {useState} from "react";
import "../styles/modal.css";
import {ValidateEmployee} from "../api/auth.api";

const Auth = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleKeys = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleAuth = async (user) => {
    await ValidateEmployee(user);
    //falta el redireccionameinto
  };

  return (
    <div className="auth-container">
      <div className="container" style={{width: "30rem"}}>
        <h3>Inicia sesión</h3>
        <div className="input-form-content row full">
          <div className="column full">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={user.email}
              onChange={(e) => handleKeys("email", e.target.value)}
            />
          </div>
        </div>
        <div className="input-form-content row full">
          <div className="column full">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Escribe tu contraseña"
              aria-labelledby="passwordHelpBlock"
              value={user.password}
              onChange={(e) => handleKeys("password", e.target.value)}
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => handleAuth(user)}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Auth;
