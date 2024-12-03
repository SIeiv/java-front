const endpoints = {
    AUTH: {
        LOGIN: "http://localhost:8080/auth/signin",
        REGISTER: "http://localhost:8080/auth/signup",
        PROFILE: "http://localhost:8080/api/secured/get-info",
        PUT_AVATAR: "http://localhost:8080/api/user/update-picture",
        GET_PICTURE: "http://localhost:8080/api/user/get-picture"
    }
}

export default endpoints;