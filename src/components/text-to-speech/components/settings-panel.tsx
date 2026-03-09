import { ttsFormOptions } from "@/components/text-to-speech/components/text-to-speech-form";
import { sliders } from "@/components/text-to-speech/sliders";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { VoiceSelector } from "./voice-selector";

export function SettingsPanel() {
  const form = useTypedAppFormContext(ttsFormOptions);

  return (
    <div className="flex w-105 min-h-0 flex-col border-l">
      <div className="border-b border-dashed p-4">
        <VoiceSelector />
      </div>
      <div className="p-4 flex-1">
        <FieldGroup className="gap-8">
          {sliders.map((slider) => (
            <form.Field key={slider.id} name={slider.id}>
              {(field) => (
                <Field>
                  <FieldLabel>{slider.label}</FieldLabel>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {slider.leftLabel}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {slider.rightLabel}
                    </span>
                  </div>
                  <Slider
                    value={[field.state.value]}
                    onValueChange={(value) => field.handleChange(value[0])}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                  />
                </Field>
              )}
            </form.Field>
          ))}
        </FieldGroup>
      </div>
    </div>
   );
};