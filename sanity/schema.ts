import { type SchemaTypeDefinition } from 'sanity'
import pets from './products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pets],
};
