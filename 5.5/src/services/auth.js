import http from "../http/http-common";

class auth {
    login(data) {
        return http.post("/api/login", data);
    }

    Register(data) {
        return http.post("/api/users/", data);
    }
}

export default new auth();