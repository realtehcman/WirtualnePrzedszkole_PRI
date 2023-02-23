import axios from 'axios'
import LoginService from '../pages/Login/LoginService'

jest.mock('axios')

describe('LoginService', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('login', () => {
        it('should make a post request to the correct API URL with the email and password', async () => {
            axios.post.mockResolvedValue({headers: {'authorization': 'abc'}})
            await LoginService.login('email', 'password')
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/login', JSON.stringify({ email: 'email', password: 'password' }))
        })

        it('should set the authorization token in local storage', async () => {
            window.localStorage.removeItem("authorization")
            axios.post.mockResolvedValue({headers: {'authorization': 'abc'}})
            await LoginService.login('email', 'password')
            expect(window.localStorage.getItem("authorization")).toEqual('abc')
        })

        it('should return true when the login is successful', async () => {
            axios.post.mockResolvedValue({headers: {'authorization': 'abc'}})
            const result = await LoginService.login('email', 'password')
            expect(result).toBe(true)
        })

        it('should remove the authorization token from local storage and return false when the login is unsuccessful', async () => {
            window.localStorage.setItem("authorization", 'abc')
            axios.post.mockRejectedValue({})
            const result = await LoginService.login('email', 'password')
            expect(window.localStorage.getItem("authorization")).toBeNull()
            expect(result).toBe(false)
        })
    })

    describe('logout', () => {
        it('should remove the authorization token from local storage', () => {
            window.localStorage.setItem("authorization", 'abc')
            LoginService.logout()
            expect(window.localStorage.getItem("authorization")).toBeNull()
        })
    })

    describe('isLoggedIn', () => {
        it('should return true when there is an authorization token in local storage', () => {
            window.localStorage.setItem("authorization", 'abc')
            expect(LoginService.isLoggedIn()).toBe(true)
        })

        it('should return false when there is no authorization token in local storage', () => {
            window.localStorage.removeItem("authorization")
            expect(LoginService.isLoggedIn()).toBe(false)
        })
    })
})
