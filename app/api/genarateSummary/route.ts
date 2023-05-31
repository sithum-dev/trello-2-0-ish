import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome to the user always as Mr. Sithum imarsha and say welcome to the Todo App! Limit the responce to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data:${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;

  console.log("data: ", data);
  console.log(data.choices[0].message);

  return NextResponse.json(data.choices[0].message);
}
