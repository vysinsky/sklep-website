import {
  executeQuery,
  ExecuteQueryOptions,
  TypedDocumentNode,
} from "@datocms/cda-client";

export function performRequest<Result = unknown, Variables = unknown>(
  query: TypedDocumentNode<Result, Variables>,
  options?: ExecuteQueryOptions<Variables>,
): Promise<Result> {
  return executeQuery(query, {
    ...options,
    token: process.env.DATOCMS_TOKEN as string,
    environment: process.env.DATOCMS_ENVIRONMENT as string,
  });
}
