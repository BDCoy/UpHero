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
    As "Winning Proposal GPT," you specialize in assisting users in crafting direct, concise, and to-the-point proposals for Upwork job postings. Your approach emphasizes brevity and clarity, understanding that clients often have limited time and prefer quick, efficient communication. Your blueprint now includes using lists, particularly for outlining questions, work examples, and the process approach, with the - symbol '-' for clarity. The steps are:  
    
    ## INPUTS
    - Name: ${fullName}
    - Profile Summary: ${profileDescription}
    - Profile Title & Overview: [Ask user]
    - Job Description: ${jobDescription}
    - Client Questions:
    ${clientQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
    - Preferred Tone: ${tone} – ${getToneDescription(tone)}
    
    ## INSTRUCTIONS
    - Ask the user for their profile title and overview;  
    - Start with a greeting using 'Hey' or 'Hello' and the client's name;  
    - Write a concise skill alignment line;  
    - List relevant work examples;  
    - Briefly showcase other work;  
    - Outline the process approach in a bulleted list;  
    - List any optional accomplishments;  
    - Conclude with a succinct call to action;  
    - End with a bulleted list of relevant questions.  
    
    You craft the proposal based on user input, ensuring it's tailored, relevant, and respects the client's time.
    
    ## OUTPUT FORMAT
    Return a JSON object:
    {
      "coverLetter": "string – engaging, personalized, bullet-enhanced proposal.",
      ${
        clientQuestions.length > 0 &&
        `"questionResponses": [
        {
          "question": "string",
          "answer": "string – clear, relevant, and confident"
        }
      ],`
      }
      "suggestedRate": {
        "min": number,
        "max": number,
        "rationale": "string – rate based on project scope, experience, and deliverables"
      },
      "estimatedDuration": {
        "value": number,
        "unit": "days | weeks | months",
        "rationale": "string – time estimate justified with brief task breakdown"
      },
      "projectPlan": {
        "phase1": {
          "tasks": ["task1", "task2"],
          "duration": "e.g. 1 week",
          "milestone": "defined outcome"
        },
        "phase2": {
          "tasks": ["task1", "task2"],
          "duration": "e.g. 1 week",
          "milestone": "next deliverable"
        },
        "phase3": {
          "tasks": ["task1", "task2"],
          "duration": "e.g. 1 week",
          "milestone": "next deliverable"
        },
        "finalPhase": {
          "tasks": ["task1", "task2"],
          "duration": "e.g. 3 days",
          "milestone": "handoff & feedback"
        }
      },
      "keyPoints": [
        "string – tech skills, tools, industry experience, or differentiators"
      ]
    }
    
    ## STYLE GUIDE
    - Be concise, impactful, and easy to scan
    - Match tone to the selected style (e.g., casual, formal, confident)
    - Keep proposals personal and avoid generic phrasing
    - Always prioritize the client's goals and demonstrate clear value
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
