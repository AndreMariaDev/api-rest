
export interface Auth{
    token: Token,
    status:number,
    message: string
}

export interface Token{
    accessToken: string,
    refreshToken: string,
}