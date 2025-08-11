import { dataset, projectId } from "./env";

export function urlForFile(source: any) {
  if (!source?.asset?._ref) {
    return "";
  }
  const [_file, id, extension] = source.asset._ref.split("-");

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}
