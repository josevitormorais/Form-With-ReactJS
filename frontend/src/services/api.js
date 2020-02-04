import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333"
});

/** dentro do services api, quando temos varios post e put dentro da aplicação
 * temos a seguinte opção para diminuir a repetição de codigo dentro do componente
 * criamos um novo metodo para o axios - recebe os seguintes paramertos  (url, id, data, config = {})
 *
 */
api.postOrPut = (url, id, data, config = {}) => {
  const method = id ? "put" : "post";

  const apiUrl = id ? `${url}/${id}` : url;

  return api[method](apiUrl, data, config);
};
export default api;
