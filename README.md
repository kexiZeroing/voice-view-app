# Voice View App

Inspired by the tutorial ["Build and Deploy an ElevenLab Clone"](https://www.youtube.com/watch?v=e_MO-Rcz_MA), this project extracts and simplifies its frontend into a minimal app. It’s designed as a learning example for [TanStack Form](https://tanstack.com/form/latest), demonstrating how to compose a form with basic inputs such as text fields, selects, and sliders. It also shows how to play and visualize audio using [Wavesurfer.js](https://wavesurfer.xyz/).

The project is built as a simple Next.js application. The AI and TTS parts are not included here—if you want to integrate them, you can refer to [Chatterbox TTS](https://modal.com/docs/examples/chatterbox_tts).

## TanStack Form

A Form instance is an object that represents an individual form and provides methods and properties for working with the form. You create a Form instance using the `useForm` hook provided by the form options. The hook accepts an object with an `onSubmit` function, which is called when the form is submitted.

```ts
interface User {
  firstName: string
  lastName: string
  hobbies: Array<string>
}
const defaultUser: User = { firstName: '', lastName: '', hobbies: [] }

const form = useForm({
  defaultValues: defaultUser,
  onSubmit: async ({ value }) => {
    // Do something with form data
    console.log(value)
  },
})
```

A Field represents a single form input element, such as a text input or a checkbox. Fields are created using the `form.Field` component provided by the Form instance. The component accepts a `name` prop, which should match a key in the form's default values. It also accepts a `children` prop, which is a render prop function that takes a `field` object as its argument.

```tsx
<form.Field
  name="firstName"
  children={(field) => (
    <>
      <input
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </>
  )}
/>
```

Each field has its own state, which includes its current value, validation status, error messages, and other metadata. You can access a field's state using the `field.state` property. The Field API is an object passed to the render prop function when creating a field. It provides methods for working with the field's state.

```tsx
const {
  value,
  meta: { errors, isValidating },
} = field.state

<input
  value={field.state.value}
  onBlur={field.handleBlur}
  onChange={(e) => field.handleChange(e.target.value)}
/>
```

If you would like to access reactive values, you will need to subscribe to them using one of two methods: `useStore` or the `form.Subscribe` component. The `useStore` hook is perfect when you need to access form values within the logic of your component. Note that `useStore` will cause a whole component re-render whenever the value subscribed to changes.

The `form.Subscribe` component is best suited when you need to react to something within the UI of your component. For example, showing or hiding UI based on the value of a form field. Anytime the value subscribed to changes, only the `form.Subscribe` component re-renders.

```tsx
const firstName = useStore(form.store, (state) => state.values.firstName)
//...
<form.Subscribe
  selector={(state) => [state.canSubmit, state.isSubmitting]}
  children={([canSubmit, isSubmitting]) => (
    <button type="submit" disabled={!canSubmit}>
      {isSubmitting ? '...' : 'Submit'}
    </button>
  )}
/>
```

The most powerful way to compose forms is to create custom form hooks. At it's most basic, `createFormHook` is a function that takes a `fieldContext` and `formContext` and returns a `useAppForm` hook. Once this scaffolding is in place, you can start adding custom field and form components to your form hook.

- `useAppForm` is used to create a form instance. Instantiates a new form with its own state, validation, and submission logic.
- `useTypedAppFormContext` is used to consume an existing form instance. It reads a form that was already created higher up in the tree.

```ts
import { createFormHookContexts, createFormHook } from '@tanstack/react-form'

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
})

function App() {
  const form = useAppForm({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
    },
  })

  return <form.Field /> // ...
}
```
