import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loginim from '../IMG/Login.png';
import ReCAPTCHA from "react-google-recaptcha";
import politicasPDF from './PDF/Politicas_de_privacidad.pdf';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';

const Registro = () => {
  const navigate = useNavigate();

  const [politicasAceptadas, setPoliticasAceptadas] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [user, setUser] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [captchaCompletado, setCaptchaCompletado] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [preguntasSecretas, setPreguntasSecretas] = useState([]);
  const captcha = useRef(null);

  useEffect(() => {
    fetch('https://sigaemail.host8b.me/preguntas.php')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPreguntasSecretas(data.preguntas);
        } else {
          console.error('Error al obtener preguntas secretas:', data.message);
        }
      })
      .catch(error => {
        console.error('Error al obtener preguntas secretas:', error);
      });
  }, []);

  const onChange = () => {
    if (captcha.current && captcha.current.getValue()) {
      setCaptchaCompletado(true);
    }
  };

  const handleRegistro = () => {
    if (validarFormulario()) {
      const userData = {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        cargo,
        telefono,
        correo,
        user,
        contrasena,
        preguntaSecreta,
        respuestaSecreta,
        aceptoPoliticas: 'ACEPTO',
      };

      fetch('https://sigaemail.host8b.me/registro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Registro exitoso') {
            setRegistroExitoso(true);
            setTimeout(() => {
              alert('Registro exitoso. Por favor, inicie sesión.');
              navigate(`/Login?registroExitoso=true`);
            }, 2000);
          } else {
            setAlertMessage(data.message);
            setShowAlert(true);
          }
        })
        .catch(error => {
          setAlertMessage('Error al realizar la solicitud al servidor.');
          setShowAlert(true);
        });
    }
  };

  const validarFormulario = () => {
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !cargo || !telefono || !correo || !user || !contrasena || !confirmarContrasena || !preguntaSecreta || !respuestaSecreta) {
      setAlertMessage('Todos los campos son obligatorios');
      setShowAlert(true);
      return false;
    }

    if (!captchaCompletado) {
      setAlertMessage('Por favor, complete el captcha');
      setShowAlert(true);
      return false;
    }

    if (contrasena !== confirmarContrasena) {
      setAlertMessage('Las contraseñas no coinciden');
      setShowAlert(true);
      return false;
    }

    if (!politicasAceptadas) {
      setAlertMessage('Por favor, acepta las políticas del sitio web.');
      setShowAlert(true);
      return false;
    }

    return true;
  };

  return (
    <div>
      <Header />
      <Breadcrumbs />
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          {alertMessage}
        </div>
      )}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <center><h2>Registro</h2></center>
                <img src={Loginim} alt="Loginim" className="img-fluid mb-4 mx-auto d-block" style={{ maxWidth: '100px' }} />

                <form>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                    <input type="text" className="form-control" id="apellidoPaterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="apellidoMaterno">Apellido Materno</label>
                    <input type="text" className="form-control" id="apellidoMaterno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="correo">Correo Electrónico</label>
                    <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cargo">Cargo</label>
                    <select id="cargo" className="form-control" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                      <option value="">Seleccione un cargo</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Directivos">Directivos</option>
                      <option value="Docente">Docente</option>
                      <option value="Administrativo">Administrativo</option>
                      <option value="Secretario">Secretario</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="user">Usuario</label>
                    <input type="text" className="form-control" id="user" value={user} onChange={(e) => setUser(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <div className="input-group">
                      <input type={mostrarContrasena ? "text" : "password"} className="form-control" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                      <div className="input-group-append">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setMostrarContrasena(!mostrarContrasena)}>
                          <i className={`bi bi-eye${mostrarContrasena ? '-slash' : ''}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
                    <input type={mostrarContrasena ? 'text' : 'password'} className="form-control" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="preguntaSecreta">Pregunta Secreta</label>
                    <select id="preguntaSecreta" className="form-control" value={preguntaSecreta} onChange={(e) => setPreguntaSecreta(e.target.value)}>
                      <option value="">Seleccione una pregunta</option>
                      {preguntasSecretas.map(pregunta => (
                        <option key={pregunta.idpregunta} value={pregunta.idpregunta}>{pregunta.pregunta}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="respuestaSecreta">Respuesta Secreta</label>
                    <input type="text" className="form-control" id="respuestaSecreta" value={respuestaSecreta} onChange={(e) => setRespuestaSecreta(e.target.value)} />
                  </div>

                  <div className="form-group form-check text-center">
  <input
    type="checkbox"
    className="form-check-input"
    id="aceptoPoliticas"
    required
    onChange={(e) => setPoliticasAceptadas(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="aceptoPoliticas">
    Acepto las <a href={politicasPDF} target="_blank" rel="noopener noreferrer" className="politicas-link">políticas de privacidad</a>
  </label>
</div>

<ReCAPTCHA
  ref={captcha}
  sitekey="6LdhvmwpAAAAAJYW5MoEkVuJEXq9VljgAzzXa4Tp"
  onChange={onChange}
/>

<br />
<button type="button" className="btn btn-primary btn-block" onClick={handleRegistro}>
  Registrarse
</button>

<p className="text-center mt-3">
  <Link 
    to="/Login" 
    className="text-dark"  // Clase de Bootstrap para color fijo
  >
    ¿Ya tienes cuenta? Inicia sesión
  </Link>
</p>

                </form>

                {registroExitoso && <div className="alert alert-success mt-3">Registro exitoso. Redirigiendo...</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          {alertMessage}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Registro;
