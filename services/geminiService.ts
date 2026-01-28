
import { GoogleGenAI, Type } from "@google/genai";

// Following the @google/genai guidelines, we create a fresh instance of GoogleGenAI 
// inside each service function right before the API call to ensure use of the most up-to-date API key.

export const performMeetingPrep = async (meetingTitle: string, participants: string[], company: string) => {
  // Always use a fresh instance right before making an API call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Perform research for a meeting with ${company}. 
  Title: ${meetingTitle}. 
  Participants: ${participants.join(', ')}.
  
  Provide a structured executive briefing in JSON format including:
  1. Participant Intelligence (roles, background, recent public info)
  2. Company Context (recent news, industry trends, competitor moves)
  3. Strategic Talking Points
  4. Questions to Ask
  5. Risks & Opportunities.
  
  Be professional, high-level, and insightful for an Accenture Managing Director.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          participants: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                role: { type: Type.STRING },
                insight: { type: Type.STRING }
              },
              required: ['name', 'role', 'insight']
            }
          },
          companyContext: {
            type: Type.OBJECT,
            properties: {
              news: { type: Type.ARRAY, items: { type: Type.STRING } },
              trends: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['news', 'trends']
          },
          talkingPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          questions: { type: Type.ARRAY, items: { type: Type.STRING } },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['participants', 'companyContext', 'talkingPoints', 'questions', 'risks']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const performClientIntel = async (companyName: string) => {
  // Create a new GoogleGenAI instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Summarize current business intelligence for ${companyName} for an executive advisor.
  Include recent news from the last 7 days, leadership changes, industry position, and specific opportunities for consulting services.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};

export const analyzeMeetingTranscript = async (transcript: string) => {
  // Create a new GoogleGenAI instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Analyze the following meeting transcript and extract:
  1. Key Decisions
  2. Action Items (with owner and priority)
  3. Suggested Follow-up Email Draft.
  
  Transcript: ${transcript}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          decisions: { type: Type.ARRAY, items: { type: Type.STRING } },
          actions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                task: { type: Type.STRING },
                owner: { type: Type.STRING },
                priority: { type: Type.STRING }
              },
              required: ['task', 'owner', 'priority']
            }
          },
          emailDraft: { type: Type.STRING }
        },
        required: ['decisions', 'actions', 'emailDraft']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
