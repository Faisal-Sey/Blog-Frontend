import Axios from "axios";
import { BACKEND_DOMAIN } from "../utils/systemSettings.js";


export class BaseService {
    get = (url) => {
		return Axios({
			url: `${BACKEND_DOMAIN}/${url}`,
			method: "GET",
			withCredentials: true,
		});
	};

    post = (url, model) => {
		return Axios({
			url: `${BACKEND_DOMAIN}/${url}`,
			method: "POST",
			data: model,
			withCredentials: true,
		});
	}

	postForm = (url, model) => {
		return Axios({
			url: `${BACKEND_DOMAIN}/${url}`,
			method: "POST",
			data: model,
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			withCredentials: true,
		});
	}

	delete = (url, model) => {
		return Axios({
			url: `${BACKEND_DOMAIN}/${url}`,
			method: "DELETE",
			data: model,
			withCredentials: true,
		});
	}
}