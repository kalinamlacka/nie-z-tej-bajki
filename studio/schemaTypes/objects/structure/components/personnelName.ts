import { defineField, defineType } from "sanity";

export const personnelName = defineType({
  name: 'personnelName',
  title: 'Dane Członka Kadry',
  type: 'object',
  fields: [
    defineField({
        name: "name",
        title: "Imię oraz tytuł",
        type: "string",
        description: "Imię, nazwisko i tytuł (np. 'dr Jan Kowalski')",
        validation: (rule) => rule.required().error('Imię i tytuł są wymagane'),
    }),
    defineField({
        name: "description",
        title: "Opis",
        type: "string",
        description: "Krótki opis stanowiska lub funkcji",
        validation: (rule) => rule.required().error('Opis jest wymagany'),
    }),
  ]
})
