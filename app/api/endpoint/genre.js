import client from "../client";

export default function genre(id, page = 1) {
  return client
    .get("/genre/" + id + "/" + page)
    .then((response) => response.data);
}
