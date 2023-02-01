import axios from 'axios'


const LOGIN_REST_API_URL = 'http://localhost:8080/api/login'

class LoginService {
    
    login(email, password) {
        return axios.post(LOGIN_REST_API_URL,
            JSON.stringify({ email, password })
            ).then(response => {
            let header = response.headers["authorization"]
            window.localStorage.setItem("authorization", header)
            return true
        })
        .catch(error => {
            window.localStorage.removeItem("authorization")
            return false
        })
    }

    logout() {
        window.localStorage.removeItem("authorization")
    }

    isLoggedIn() {
        return window.localStorage.getItem("authorization") !== null
    }
}

export default new LoginService();
