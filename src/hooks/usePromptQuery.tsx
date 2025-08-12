import { PROMPT_SYSTEM_MESSAGE } from "../const";
import { Config } from "../types";
import { createProviderModel } from "../use-cases/create-provider-model";
import { usePromise } from "@raycast/utils";

export function usePromptQuery({ query, config }: { query: string; config?: Config }) {
  const { isLoading, data, error } = usePromise(
    async (query: string, config?: Config) => {
      if (!config) {
        throw new Error("No API key found");
      }

      const model = createProviderModel(config.provider, config.apiKey);
      const response = await model.invoke([
        {
          role: "system",
          content: PROMPT_SYSTEM_MESSAGE,
        },
        {
          role: "user",
          content: query,
        },
      ]);

      return response.content.toString();
    },
    [query, config],
  );

  return {
    data,
    isLoading,
    error,
  };
}
