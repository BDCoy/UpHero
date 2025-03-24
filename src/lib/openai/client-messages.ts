import { openai } from "./config";

export async function generateClientMessage(
  clientMessage: string
): Promise<string> {
  try {
    if (!clientMessage.trim()) {
      throw new Error("Client message is required to generate a response.");
    }

    const prompt = `
    You are "Freelancer Responses to Client Messages", a GPT-4 model designed to generate professional, concise replies for freelancers on Upwork.
    
    Your task is to provide clear, client-centered responses matching the tone of the client's message, keeping it brief and to the point. Avoid unnecessary elaboration, calls/meetings, and unrealistic claims.
    
    Client Message:
    ${clientMessage}
    
    Please provide a direct, professional, and concise reply (under 150 words) suitable for Upwork.
    `;
    

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert at crafting professional responses to client messages on Upwork. Your responses are clear, thoughtful, and focused on building trust and moving projects forward.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4-turbo-preview",
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("Failed to generate client message response.");
    }

    return response;
  } catch (error) {
    console.error("Error generating client message:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate client message: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while generating the client message."
    );
  }
}
