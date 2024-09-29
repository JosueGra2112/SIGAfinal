import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loginim from '../IMG/userv.png';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';

const Login = () => {
  const [cargo, setCargo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('registroExitoso') === 'true') {
      setRegistroExitoso(true);
    }
  }, [location.search]);

  const showNotification = (message, type = 'error') => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleLogin = () => {
    if (!cargo || !username || !password) {
      setFormError('Todos los campos deben estar llenos.');
      showNotification('Todos los campos deben estar llenos.');
      return;
    }
    setFormError(null);
    setErrorLogin(false);
    fetch('https://sigaemail.host8b.me/logeo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cargo, username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const fullName = `${data.data[0].nombre} ${data.data[0].ap_paterno} ${data.data[0].ap_materno}`;
          localStorage.setItem('user', JSON.stringify(fullName));
          localStorage.setItem('idUser', data.data[0].iduser);

          if (cargo === 'Administrador') {
            navigate('/SesionAdmin');
          } else if (cargo === 'Administrativo') {
            navigate('/SesionAdmi');
          } else if (cargo === 'Docente') {
            navigate('/SesionD');
          } else if (cargo === 'Secretario') {
            navigate('/SesionS');
          } else if (cargo === 'Directivos') {
            navigate('/SesionDic');
          } else {
            setErrorLogin(false);
            showNotification('Autenticación exitosa');
          }
        } else {
          setErrorLogin(true);
          if (data.message === 'Su cuenta aún no está activada. Por favor, póngase en contacto con el administrador para activar su cuenta.') {
            showNotification('ERROR. Por favor, póngase en contacto con el administrador para activar su cuenta.');
          } else {
            showNotification('Error de autenticación. Por favor, verifica tus credenciales.');
          }
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud de autenticación:', error);
        showNotification('Error al realizar la solicitud de autenticación.');
      });
  };

  return (
    <div>
      <Header />
      <Breadcrumbs />
      <br />
      <div className="container mt-5">
        <center>
          {registroExitoso && (
            <div className="alert alert-success" role="alert">Bienvenido</div>
          )}
        </center>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <img src={Loginim} alt="Loginim" className="img-fluid mb-3 mx-auto d-block" style={{ maxWidth: '100px' }} />
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="cargo">Seleccionar Cargo</label>
                    <select
                      id="cargo"
                      className="form-control"
                      value={cargo}
                      onChange={(e) => setCargo(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Directivos">Directivos</option>
                      <option value="Administrativo">Administrativo</option>
                      <option value="Docente">Docente</option>
                      <option value="Secretario">Secretario</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>

            
                  <button type="button" className="btn btn-warning btn-block" onClick={handleLogin}>
                    Acceder
                  </button>
                </form>

                <p className="text-center mt-3">
                  <Link to="/Registro" className="nav-linkLog">¿No tienes cuenta? Registrarse</Link>
                </p>
                <p className="text-center">
                  <Link to="/ValidarUsuario" className="nav-linkLog">¿Olvidaste tu contraseña?</Link>
                </p>
                <p className="text-center">
                  <Link to="/Rest" className="nav-linkLog">Restaurar por correo electrónico</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
