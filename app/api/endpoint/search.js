import client from "../client";

export default function search(query) {
  return client
    .get("/search/1", {
      params: {
        s: query,
      },
    })
    .then((response) => response.data);
}
