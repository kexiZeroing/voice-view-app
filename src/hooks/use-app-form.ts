"use client";

import {
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form";

export const { fieldContext, formContext } = createFormHookContexts();

export const {
  useAppForm,
  useTypedAppFormContext,
} = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});