import { openai } from './config';

export async function generateProposal(
  fullName: string,
  profileDescription: string,
  jobDescription: string,
  clientQuestions: string[],
  tone: string
): Promise<any> {
  try {
    if (!fullName.trim() || !profileDescription.trim() || !jobDescription.trim()) {
      throw new Error("All required fields must be filled out.");
    }

    const getToneDescription = (tone: string) => {
      switch (tone) {
        case 'casual':
          return 'Write in a friendly and approachable manner while maintaining professionalism.';
        case 'confident':
          return 'Show authority and expertise while keeping the tone engaging and approachable.';
        case 'enthusiastic':
          return 'Show genuine excitement and passion for the project, focusing on the client success.';
        case 'professional':
          return 'Maintain a polished, business-appropriate tone while still being personable.';
        default:
          return 'Use a formal business tone that highlights your professionalism and reliability.';
      }
    };

    const prompt = `
    You are a highly successful freelancer with a proven track record of winning projects on Upwork. Your task is to create a persuasive and detailed proposal that will help you stand out. The proposal should have a clear project plan with timelines and milestones, reflecting your expertise and aligning with the client's expectations.

    ### About Me:
    - Name: ${fullName}
    - Background: ${profileDescription}

    ### Job Opportunity:
    ${jobDescription}

    ### Client Questions:
    ${clientQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

    ### Tone Preference: ${tone}
    ${getToneDescription(tone)}

    ### Writing Guidelines:
    1. Write as if you're engaging in a personal conversation with the client, focusing on building trust.
    2. Avoid generic or overly formal language. Be clear, concise, and confident.
    3. Align your experience with the specific needs of the project and provide examples of past successes.
    4. Focus on how your approach will solve the client's problem and deliver the results they're looking for.
    5. Break down your process and timelines into clear, actionable steps so the client can visualize how you will handle the project.

    ### Output Format:
    Return a JSON object with the following structure:
    {
      "coverLetter": "string (main proposal text, conversational, client-focused, and clear about your approach to the project)",
      "questionResponses": [
        {
          "question": "string (original question)",
          "answer": "string (authentic and clear response to the question)"
        }
      ],
      "suggestedRate": {
        "min": number,
        "max": number,
        "rationale": "string (justifying your rate based on the project complexity and your expertise)"
      },
      "estimatedDuration": {
        "value": number,
        "unit": "string (days/weeks/months)",
        "rationale": "string (clear explanation of why the timeline fits the project scope, possibly broken into stages)"
      },
      "projectPlan": {
        "phase1": {
          "tasks": ["task1", "task2", "task3"],
          "duration": "string (days/weeks)",
          "milestone": "string (clear goal to be achieved at the end of this phase)"
        },
        "phase2": {
          "tasks": ["task1", "task2", "task3"],
          "duration": "string (days/weeks)",
          "milestone": "string (clear goal to be achieved at the end of this phase)"
        },
        "phase3": {
          "tasks": ["task1", "task2", "task3"],
          "duration": "string (days/weeks)",
          "milestone": "string (clear goal to be achieved at the end of this phase)"
        },
        "finalPhase": {
          "tasks": ["task1", "task2", "task3"],
          "duration": "string (days/weeks)",
          "milestone": "string (final delivery, including feedback and final tweaks)"
        }
      },
      "keyPoints": ["string (important points like experience with relevant tech, problem-solving skills, etc.)"]
    }

    Ensure the proposal clearly shows the steps involved, the milestones to be achieved, and a well-structured timeline that keeps the client informed and confident in your ability to deliver. Focus on delivering results while maintaining open and clear communication throughout.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a successful freelancer with a track record of writing winning proposals. Write in a natural, human voice that builds genuine connections with clients."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      temperature: 0.7 // Slightly higher temperature for more natural language
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
    throw new Error("An unexpected error occurred while generating the proposal.");
  }
}