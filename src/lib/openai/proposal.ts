import { openai } from "./config";

export async function generateProposal(
  fullName: string,
  profileDescription: string,
  jobDescription: string,
  clientQuestions: string[],
  tone: string
): Promise<any> {
  try {
    if (
      !fullName.trim() ||
      !profileDescription.trim() ||
      !jobDescription.trim()
    ) {
      throw new Error("All required fields must be filled out.");
    }

    const getToneDescription = (tone: string) => {
      switch (tone) {
        case "casual":
          return "Write in a friendly and approachable manner while maintaining professionalism.";
        case "confident":
          return "Show authority and expertise while keeping the tone engaging and approachable.";
        case "enthusiastic":
          return "Show genuine excitement and passion for the project, focusing on the client success.";
        case "professional":
          return "Maintain a polished, business-appropriate tone while still being personable.";
        default:
          return "Use a formal business tone that highlights your professionalism and reliability.";
      }
    };

    const prompt = `
You are "Winning Proposal GPT" – a proposal-writing expert for Upwork. Your mission is to create fast, effective, and high-converting proposals tailored to each client. You value clarity, brevity, and customization. Use lists (with "-") wherever possible to increase scannability.

## INPUTS
- Full Name: ${fullName}
- Profile Summary: ${profileDescription}
- Job Description: ${jobDescription}
- Client Questions:
${clientQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
- Preferred Tone: ${tone} – ${getToneDescription(tone)}

## INSTRUCTIONS
- Begin with 'Hey' or 'Hello' + the client's name;
- Align user skills directly with job needs;
- Share 1–2 quick examples from past work;
- Optionally include other relevant achievements;
- Use bulleted list to explain work approach;
- End with call-to-action + a short list of tailored questions.

## TEMPLATE – Cover Letter (Customize Per Job)
> Introduction 
> Hi [Client Name]!  
> Thanks for the detailed job description – it immediately stood out. With my background in [insert profession], I’m confident I can deliver exactly what you're looking for.  
>  
> Relevant Experience 
> On Upwork, I've completed many similar projects with 5⭐ ratings.  
> - Project 1: [short description]  
> - Project 2: [short description]  
>  
> Credibility Snapshot   
> - [Key qualification or certification]  
> - [Metric or notable result from past project]  
> - [Industry/Tool expertise]  
>  
> My Process 
> - Review & clarify requirements  
> - Begin with quick win / milestone  
> - Provide progress updates  
> - Deliver final work with revisions  
>  
> Let’s Connect 
> I’m available today for a quick 10-minute intro call at [insert times].  
> Let me know if another time works better for you!  
>  
> Questions to cover on the call:
> - [Question 1]  
> - [Question 2]  
> - [Question 3]  
>  
> Looking forward to learning more!  
>  
> Best regards,  
> ${fullName}

## OUTPUT FORMAT
Return JSON:

{
  "coverLetter": "string – final version using template above, personalized and tone-matched",
  ${clientQuestions.length > 0 ? `
  "questionResponses": [
    {
      "question": "string",
      "answer": "string – confident, clear, helpful"
    }
  ],` : ""}
}

## STYLE GUIDE
- Adapt tone to match: ${tone}
- Always be concise, confident, and value-driven
- Avoid clichés or filler lines
- Focus on client outcomes and why you're the right fit
`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a successful freelancer with a track record of writing winning proposals. Write in a natural, human voice that builds genuine connections with clients.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      temperature: 0.7, // Slightly higher temperature for more natural language
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("Failed to generate proposal.");
    }

    return JSON.parse(response);
  } catch (error) {
    console.error("Error generating proposal:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate proposal: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while generating the proposal."
    );
  }
}
