import client from "../client";

export default function video(id) {
  return client.get(`/video/${id}`).then((response) => response.data);
}
