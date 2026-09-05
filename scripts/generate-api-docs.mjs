import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

const schemas = [
  {
    input: 'openapi/enhancer-api.json',
    output: 'content/docs/api',
  },
  {
    input: 'openapi/emotes-api.json',
    output: 'content/docs/emotes-api',
  },
];

for (const schema of schemas) {
  await generateFiles({
    input: createOpenAPI({ input: [schema.input] }),
    output: schema.output,
    per: 'operation',
    groupBy: 'tag',
  });
}
