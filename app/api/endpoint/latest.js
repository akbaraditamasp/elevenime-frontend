import client from "../client";

export default function latest(page = 1) {
  return client.get(`/latest/${page}`).then((response) => response.data);
}
