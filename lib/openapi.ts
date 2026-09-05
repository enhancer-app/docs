import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: ['openapi/enhancer-api.json', 'openapi/emotes-api.json'],
});
