import client from "../client";

export default function detail(id) {
  return client.get(`/detail/${id}`).then((response) => response.data);
}
