'use client';

import { createOpenAPIPage } from 'fumadocs-openapi/ui';
import { createCodeUsageGeneratorRegistry } from 'fumadocs-openapi/requests/generators';
import { curl } from 'fumadocs-openapi/requests/generators/curl';
import { javascript } from 'fumadocs-openapi/requests/generators/javascript';
import { python } from 'fumadocs-openapi/requests/generators/python';

const codeUsages = createCodeUsageGeneratorRegistry();
codeUsages.add('curl', curl);
codeUsages.add('js', javascript);
codeUsages.add('python', python);

interface ResponseField {
  name: string;
  type: string;
  description: string;
}

// Response fields are listed in the spec as `x-fields`, so every page explains its JSON in one table.
function readFields(operation: object): ResponseField[] {
  const fields = (operation as { 'x-fields'?: unknown })['x-fields'];
  return Array.isArray(fields) ? (fields as ResponseField[]) : [];
}

function FieldsTable({ fields }: { fields: ResponseField[] }) {
  return (
    <>
      <h2 id="fields">Fields</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.name}>
              <td>
                <code>{field.name}</code>
              </td>
              <td>
                <code>{field.type}</code>
              </td>
              <td>{field.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export const OpenAPIPage = createOpenAPIPage({
  codeUsages,
  content: {
    // One column: the example gets the full width instead of a 400px side panel.
    renderOperationLayout: (slots, { operation }) => {
      const fields = readFields(operation);
      return (
        <div className="api-operation">
          {slots.header}
          {slots.apiPlayground}
          {slots.description}
          {slots.parameters}
          <h2 id="example">Example</h2>
          {slots.apiExample}
          {fields.length > 0 && <FieldsTable fields={fields} />}
        </div>
      );
    },
  },
});
