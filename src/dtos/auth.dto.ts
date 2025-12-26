
export type LoginCredantialDto = {
    email : string,
    password : string
}

export type SignupDto = {
    name : string,
    email : string,
    password : string,
}

export type SignupResponseDto = {
    name : string,
    email : string,
    uuid : string
}