import http from "../http/http-common";

const getAll = () => {
  return http.get("/api/blogs");
}

export default { getAll }