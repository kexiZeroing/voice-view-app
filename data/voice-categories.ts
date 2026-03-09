export const VOICE_CATEGORY_LABELS = {
  AUDIOBOOK: "Audiobook",
  CONVERSATIONAL: "Conversational",
  CUSTOMER_SERVICE: "Customer Service",
  GENERAL: "General",
  NARRATIVE: "Narrative",
  CHARACTERS: "Characters",
  MEDITATION: "Meditation",
  MOTIVATIONAL: "Motivational",
  PODCAST: "Podcast",
  ADVERTISING: "Advertising",
  VOICEOVER: "Voiceover",
  CORPORATE: "Corporate",
} as const;

export const VOICE_CATEGORIES = Object.keys(VOICE_CATEGORY_LABELS) as Array<keyof typeof VOICE_CATEGORY_LABELS>;