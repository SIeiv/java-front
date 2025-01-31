const endpoints = {
    AUTH: {
        LOGIN: "http://localhost:8080/auth/signin",
        REGISTER: "http://localhost:8080/auth/signup",
        LOGOUT: "http://localhost:8080/auth/logout",
    },
    PROFILE: {
        GET_PROFILE: "http://localhost:8080/api/secured/get-info",
        PUT_AVATAR: "http://localhost:8080/api/user/update-picture",
        GET_PICTURE: "http://localhost:8080/api/user/get-picture",
        CURRENT_USER: "http://localhost:8080/api/user/current-user",

        GET_ALL_USERS: "http://localhost:8080/api/admin/users",
        UPDATE_USER: "http://localhost:8080/api/admin/update-user",
        DELETE_USER: "http://localhost:8080/api/admin/delete-user",
        ADD_USER: "http://localhost:8080/api/admin/add-user",

        GET_FAVOURITES: "http://localhost:8080/api/user/get-favourites",
        ADD_FAVOURITE: "http://localhost:8080/api/user/add-favourite",
        DELETE_FAVOURITE: "http://localhost:8080/api/user/delete-favourite",
    },
    TIMETABLE: {
        GET_TIMETABLES: "http://localhost:8080/api/timetable/load",
        GET_VIEWS: "http://localhost:8080/api/views/get-views-count",
        ADD_TIMETABLE: "http://localhost:8080/api/timetable/upload",
        DELETE_TIMETABLE: "http://localhost:8080/api/timetable/delete",
        UPDATE_TIMETABLE: "http://localhost:8080/api/timetable/update",
    }

}

export default endpoints;