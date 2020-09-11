import http from "./index"

const index = (period) => {
  return http.get(`/transaction?period=${period}`)
}

const details = (id) => {
  return http.get(`/transaction/${id}`)
}

const store = (data) => {
  return http.post("/transaction", data)
}

const update = (id, data) => {
  return http.put(`/transaction/${id}`, data)
}

const destroy = (id) => {
  return http.delete(`/transaction/${id}`)
}

const findByDescription = (id, period, description) => {
  return http.get(
    `/transaction/${id}/findByDescription?period=${period}&description=${description}`
  )
}

export default {
  index,
  details,
  store,
  update,
  destroy,
  findByDescription,
}
