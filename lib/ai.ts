// Lazy-initialize the model using dynamic imports so SDKs are
// never loaded during Next.js build-time page data collection.

let _model: any = null;

export async function getGoogleModel() {
  if (!_model) {
    if (process.env.GROQ_API_KEY) {
      const { createGroq } = await import('@ai-sdk/groq');
      const groq = createGroq({
        apiKey: process.env.GROQ_API_KEY,
      });
      _model = groq('llama-3.3-70b-versatile');
    } else if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      const { google } = await import('@ai-sdk/google');
      _model = google('gemini-3.5-flash');
    } else {
      throw new Error('Neither GROQ_API_KEY nor GOOGLE_GENERATIVE_AI_API_KEY is defined');
    }
  }
  return _model;
}
