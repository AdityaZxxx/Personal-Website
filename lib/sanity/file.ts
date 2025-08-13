import { dataset, projectId } from "./env";

interface SanityFileSource {
  asset?: {
    _ref?: string;
  };
}

export function urlForFile(source: SanityFileSource): string {
  const ref = source?.asset?._ref;
  if (!ref) return "";

  const parts = ref.split("-");
  if (parts.length < 3 || parts[0] !== "file") return "";

  const [, id, extension] = parts;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}
