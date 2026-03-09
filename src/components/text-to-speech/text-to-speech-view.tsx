"use client";

import { SettingsPanel } from "@/components/text-to-speech/components/settings-panel";
import { TextInputPanel } from "@/components/text-to-speech/components/text-input-panel";
import {
  TextToSpeechForm,
  defaultTTSValues,
  type TTSFormValues,
} from "@/components/text-to-speech/components/text-to-speech-form";
import { VoicePreviewPanel } from "@/components/text-to-speech/components/voice-preview-panel";
import { VoicePreviewPlaceholder } from "@/components/text-to-speech/components/voice-preview-placeholder";
import { useState } from "react";

export function TextToSpeechView({
  initialValues,
}: {
  initialValues?: Partial<TTSFormValues>;
}) {
  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
  };

  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  return (
    <div className="flex min-h-svh flex-col">
      <TextToSpeechForm
        defaultValues={defaultValues}
        onAudioReady={setAudioUrl}
      >
        <div className="flex min-h-0 flex-1 flex-row">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            {audioUrl ? (
              <VoicePreviewPanel audioUrl={audioUrl} />
            ) : (
              <VoicePreviewPlaceholder />
            )}
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </div>
  );
}
