import axios from "axios";

import {baseURL} from "../url_config/urls";

const apiService = axios.create({baseURL})

export {apiService}