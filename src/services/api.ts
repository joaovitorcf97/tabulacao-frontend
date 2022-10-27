import axios from "axios";

const api = axios.create({
  baseURL: 'https://apitabula.clinicadias.com',
});

export { api };

