import client from "../client";

export default function ongoing() {
  return client.get("/ongoing").then((response) => response.data);
}
