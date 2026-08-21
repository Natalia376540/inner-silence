
import { getStore } from "@netlify/blobs";

export default async function (request) {
  const store = getStore("inner-silence");

  if (request.method === "GET") {
    const data = await store.get("content", { type: "json" });

    return new Response(
      JSON.stringify(data || {
        main: {
          issue: "№ 01 · АВГУСТ 2026",
          title: "Жить так, чтобы чувствовать себя живой.",
          description: "",
          intro: "",
          cover: ""
        },
        sections: {},
        articles: []
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  if (request.method === "POST") {
    const data = await request.json();

    await store.setJSON("content", data);

    return new Response(
      JSON.stringify({ ok: true }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  return new Response("Method not allowed", { status: 405 });
}
