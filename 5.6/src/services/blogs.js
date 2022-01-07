import http from "../http/http-common";

class blog {
  getBlogs() {
    return http.get("/api/blogs");
  }

  saveBlog(data) {
    return http.post("/api/blogs/", data);
  }
}

export default new blog();