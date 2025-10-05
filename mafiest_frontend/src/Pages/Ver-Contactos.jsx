import { useState, useEffect } from 'react'
import Menu from '../components/Menu'
import contactService from '../services/contacts'
import './ver-contacts.css'

const VerContacts = ({ user }) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Validar que solo los administradores puedan ver esta página
  if (user?.Rol !== 'administrador') {
    return (
      <div className="contacts-container">
        <Menu user={user} />
        <div className="error-message">No tienes permisos para ver esta página</div>
      </div>
    )
  }

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        const contactsList = await contactService.getAll()
        setContacts(contactsList)
        setError(null)
      } catch (err) {
        console.error('Error al obtener contactos:', err)
        setError('No se pudieron cargar los contactos. Por favor, intente más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  if (loading) {
    return (
      <div className="contacts-container">
        <Menu user={user} />
        <div className="loading">Cargando contactos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="contacts-container">
        <Menu user={user} />
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="contacts-container">
      <Menu user={user} />
      <h2>Lista de Contactos</h2>
      
      {contacts.length === 0 ? (
        <p className="no-contacts">No hay contactos registrados</p>
      ) : (
        <div className="contacts-grid">
          {contacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <h3>{contact.nombre}</h3>
              <div className="contact-info">
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Nombre:</strong> {contact.name}</p>
                <p><strong>Contraseña:</strong>{contact.number}</p>
                <p><strong>Mensaje:</strong>{contact.comments}</p>
                <p className="mensaje">{contact.mensaje}</p>
                <p><strong>Fecha:</strong> {new Date(contact.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VerContacts
