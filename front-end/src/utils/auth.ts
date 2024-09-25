
const authNEndpoint = import.meta.env.AUTHENTICATION_URL

const startAuthentication: (username: string, password: string) => { isCorrect: boolean, authZInfo: string }
    = async (username, password) => {
        const fetched = await fetch(authNEndpoint, {
            method: "POST",
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        const result = fetched.json()
        return result
    }
const addAuthorizationInfo = () => {

}

export {startAuthentication,
    addAuthorizationInfo
}