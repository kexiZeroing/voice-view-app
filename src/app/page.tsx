import { TextToSpeechView } from "@/components/text-to-speech/text-to-speech-view";

export default async function TextToSpeechPage({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; }>;
}) {
  const { text } = await searchParams;

  return (
    <TextToSpeechView initialValues={{ text }} />
  );
};