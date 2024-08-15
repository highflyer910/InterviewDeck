import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function parseFlashcards(text) {
  const lines = text.split('\n');
  const flashcards = [];
  let currentCard = {};

  for (const line of lines) {
    if (line.startsWith('Question:')) {
      if (currentCard.question) {
        flashcards.push(currentCard);
        currentCard = {};
      }
      currentCard.question = line.replace('Question:', '').trim();
    } else if (line.startsWith('Answer:')) {
      currentCard.answer = line.replace('Answer:', '').trim();
    }
  }

  if (currentCard.question) {
    flashcards.push(currentCard);
  }

  return flashcards;
}

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "";
    const flashcards = parseFlashcards(responseContent);

    return new Response(JSON.stringify({ flashcards }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Failed to generate flashcards" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}