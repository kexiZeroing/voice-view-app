"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { useStore } from "@tanstack/react-form";
import { ttsFormOptions } from "./text-to-speech-form";

export function TextInputPanel() {
  const form = useTypedAppFormContext(ttsFormOptions);

  const text = useStore(form.store, (s) => s.values.text);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  const isSubmitDisabled = isSubmitting || text.trim().length === 0;

  return (
    <div className="flex h-full min-h-0 flex-col flex-1">
      <div className="relative min-h-0 flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0"
              maxLength={1000}
              disabled={isSubmitting}
            />
          )}
        </form.Field>
        {/* Bottom fade overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
      </div>
      <div className="shrink-0 p-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <p className="text-xs tracking-tight">
              {text.length.toLocaleString()}
              <span className="text-muted-foreground">
                &nbsp;/&nbsp;1000 characters
              </span>
            </p>
            <Button
              size="sm"
              onClick={() => form.handleSubmit()}
              disabled={isSubmitDisabled}
            >
              {isSubmitting ?  'Generating...': "Generate speech"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};