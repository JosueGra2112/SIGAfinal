import React, { useState, useEffect } from 'react';
import '../css/tblacceso.css'; // Importa el archivo CSS

const Expedientes = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realiza una solicitud al servicio web controluser.php para obtener los datos de usuarios
    //fetch('http://localhost/WebServices/controluser.php')
    fetch('https://sigaemail.host8b.me/controluser.php')

    
      .then(response => response.json())
      .then(data => {
        console.log('Datos de usuarios:', data);
        // Actualiza el estado de los usuarios con el campo 'act' convertido a booleano
        const updatedUsers = data.map(user => ({ ...user, act: user.act == '1' }));
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error al obtener los datos de usuarios:', error));
  }, []);

  const handleToggleActivation = async (user) => {
    try {
      const updatedAct = user.act == '1' ? '0' : '1'; // Nuevo estado de activación
      console.log('Datos de solicitud:', { user: user.user, act: updatedAct }); // Agregar este registro de depuración para verificar los datos enviados
      //const response = await fetch('http://localhost/WebServices/ActEstadoUser.php', {
        const response = await fetch('https://sigaemail.host8b.me/ActEstadoUser.php', {
        


        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user.user, act: updatedAct }),
      });
  
      console.log('Respuesta de servidor:', response); // Agrega esta línea para ver la respuesta del servidor
  
      if (!response.ok) {
        console.error('Error en la solicitud:', response.status);
        console.log('Respuesta del servidor:', await response.text()); // Agrega esta línea para examinar la respuesta del servidor
        throw new Error('Error al actualizar el estado del usuario');
      }

      // Actualizar el estado local de los usuarios después de la actualización exitosa
      setUsers(prevUsers => prevUsers.map(u => {
        if (u.user === user.user) {
          return { ...u, act: updatedAct };
        }
        return u;
      }));
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Cargo</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Políticas</th>
            <th>Acceso</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user}>
              <td>{user.user}</td>
              <td>{user.nombre}</td>
              <td>{user.ap_paterno}</td>
              <td>{user.ap_materno}</td>
              <td>{user.cargo}</td>
              <td>{user.telefono}</td>
              <td>{user.email}</td>
              <td>{user.politicas}</td>
              <td>

                {/* Interruptor para activar/desactivar */}
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.act == '1'}
                    onChange={() => handleToggleActivation(user)}
                  />
                  <span className="slider round"></span>
                </label>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expedientes;
