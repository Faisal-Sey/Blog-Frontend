import { BaseService } from './baseService';

class authService extends BaseService {
    register = model => {
        return this.post(
            "auth/register/", 
            model, 
            false
        );
    }

    login = model => {
        return this.post(
            "auth/login/",
            model,
            false
        )
    }

    logout = model => {
        return this.post(
            "auth/logout/",
            model,
            false
        )
    }

    refreshToken = model => {
        return this.post(
            "auth/tokens/refresh/",
            model,
            false
        )
    }

    checkAuth = () => {
        return this.get(
            "auth/check_auth/",
            false
        )
    }

    googleConnect = model => {
        return this.post(
            "auth/google/connect/",
            model,
            false
        )
    }

    googleRegister = model => {
        return this.post(
            "auth/activate/user/",
            model,
            false
        )
    }

    twitterRegister = model => {
        return this.post(
            "auth/twitter/activate/",
            model,
            false
        )
    }

    updateInfo = model => {
        return this.postForm(
            "auth/update-info/",
            model,
            false
        )
    }

}

export default new authService();