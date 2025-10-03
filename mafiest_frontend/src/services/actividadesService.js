import axios from 'axios'
import { BASE_URL } from './config'

const baseUrl = `${BASE_URL}/actividades`

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const obtenerTodas = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const obtenerMisActividades = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseUrl}/mis-tareas`, config)
  return response.data
}

const crearActividad = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const responderActividad = async (id, preguntaIndex, respuestaIndex) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseUrl}/${id}/responder`, {
    preguntaIndex,
    respuestaIndex
  }, config)
  return response.data
}

export {
  obtenerTodas,
  obtenerMisActividades,
  crearActividad,
  responderActividad,
  setToken
}