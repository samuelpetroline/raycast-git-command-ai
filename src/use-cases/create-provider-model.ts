import { ChatOpenAI } from "@langchain/openai";
import { Provider } from "../types";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatAnthropic } from "@langchain/anthropic";

const models = {
  [Provider.OPENAI]: "gpt-4o-mini",
  [Provider.ANTHROPIC]: "claude-3-5-sonnet-latest",
  [Provider.GEMINI]: "gemini-2.0-flash",
};

export function createProviderModel(provider: Provider, apiKey: string) {
  const model = models[provider];

  switch (provider) {
    case Provider.OPENAI:
      return new ChatOpenAI({
        apiKey,
        model,
      });

    case Provider.ANTHROPIC:
      return new ChatAnthropic({
        apiKey,
        model,
      });

    case Provider.GEMINI:
      return new ChatGoogleGenerativeAI({
        apiKey,
        model,
      });

    default:
      throw new Error(`Provider ${provider} not supported`);
  }
}
