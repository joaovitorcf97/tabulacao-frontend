import axios from "axios";

const api = axios.create({
  baseURL: 'http://apitabula.clinicadias.com',
});

export { api };

