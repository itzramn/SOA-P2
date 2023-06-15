import React, { useState } from 'react';
import '../styles/modal.css';
import { ValidateEmployee } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
   const [user, setUser] = useState({
      email: '',
      password: '',
   });

   const navigate = useNavigate();

   const handleKeys = (field, value) => {
      setUser(prevUser => ({
         ...prevUser,
         [field]: value,
      }));
   };

   const handleAuth = async user => {
      const isValidUser = await ValidateEmployee(user);
      if (!isValidUser) {
         return alert('Credenciales incorrectas');
      }
      navigate('empleados');
      //falta el redireccionameinto
   };

   return (
      <div className="auth-container">
         <div className="container" style={{ width: '30rem' }}>
            <h3>Inicia sesión</h3>
            <div style={{height: "10px"}}/>
            <div className="input-form-content row full">
               <div className="column full">
                  <label className="form-label">Correo</label>
                  <input
                     type="email"
                     className="form-control"
                     placeholder="name@example.com"
                     value={user.email}
                     onChange={e => handleKeys('email', e.target.value)}
                  />
               </div>
            </div>
            <div style={{height: "10px"}}/>
            <div className="input-form-content row full">
               <div className="column full">
                  <label className="form-label">Contraseña</label>
                  <input
                     type="password"
                     className="form-control"
                     placeholder="Escribe tu contraseña"
                     aria-labelledby="passwordHelpBlock"
                     value={user.password}
                     onChange={e => handleKeys('password', e.target.value)}
                  />
               </div>
            </div>
            <div style={{height: "10px"}}/>
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
