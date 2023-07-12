export const config = {
  runtime: "edge",
};

const url = "https://api.openai.com/v1/chat/completions";

function buildResponse(request: Request, body: any) {
  const response = new Response(body);
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://thecareerfinder.app"
  );

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );

  response.headers.set("Content-Type", "application/json");
  // response.headers.set("Content-Type", "text/event-stream");
  response.headers.set("Cache-Control", "no-cache");
  response.headers.set("Connection", "keep-alive");
  // response.headers.set("Content-Encoding", "none");
  return response;
}

export default async function post(request: Request) {
  if (request.method === "OPTIONS") {
    return buildResponse(request, "ok");
  }

  const { messages } = await request.json();

  const body = {
    model: "gpt-3.5-turbo",
    stream: false,
    messages,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  };
  const chatReq = await fetch(url, options);
  // return buildResponse(chatReq.body);
  const response = await chatReq.json();
  return buildResponse(request, JSON.stringify(response));
}
