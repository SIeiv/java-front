const endpoints = {
    AUTH: {
        LOGIN: "http://localhost:8080/auth/signin",
        REGISTER: "http://localhost:8080/auth/signup",
        LOGOUT: "http://localhost:8080/auth/logout",
    },
    PROFILE: {
        GET_PROFILE: "http://localhost:8080/api/secured/get-info",
        PUT_AVATAR: "http://localhost:8080/api/user/update-picture",
        GET_PICTURE: "http://localhost:8080/api/user/get-picture"
    },
    TIMETABLE: {
        GET_TIMETABLES: "http://localhost:8080/api/timetable/load",
    }

}

export default endpoints;