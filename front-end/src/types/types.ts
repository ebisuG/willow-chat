interface authInfo {
    username: string
    isAuth: boolean
    authProof?: string
}

interface authContext {
    user: authInfo|null,
    login: (data:authInfo) => Promise<void>,
    logout: () => void
}

export type { authInfo, authContext }