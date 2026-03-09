"use client";

import { useStore } from "@tanstack/react-form";
import { systemVoiceMetadata } from "../../../../data/metadata";
import { VOICE_CATEGORY_LABELS } from "../../../../data/voice-categories";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";

const voices = Object.entries(systemVoiceMetadata).map(([name, meta]) => ({
  id: name,
  name,
  category: meta.category,
  description: meta.description,
  language: meta.language,
}));

export function VoiceSelector() {
  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useStore(form.store, (s) => s.values.voiceId);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  const selectedVoice = voices.find((v) => v.id === voiceId) ?? voices[0];

  return (
    <Field>
      <FieldLabel>Voice style</FieldLabel>
      <Select
        value={voiceId}
        onValueChange={(v) => form.setFieldValue("voiceId", v)}
        disabled={isSubmitting}
      >
        <SelectTrigger className="w-full h-auto gap-1 rounded-lg bg-white px-2 py-1">
          <SelectValue>
            {selectedVoice && (
              <>
                <VoiceAvatar
                  seed={selectedVoice.id}
                  name={selectedVoice.name}
                />
                <span className="truncate text-sm font-medium tracking-tight">
                  {selectedVoice.name} -{" "}
                  {VOICE_CATEGORY_LABELS[selectedVoice.category]}
                </span>
              </>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Built-in Voices</SelectLabel>
            {voices.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                <VoiceAvatar seed={v.id} name={v.name} />
                <span className="truncate text-sm font-medium">
                  {v.name} - {VOICE_CATEGORY_LABELS[v.category]}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}