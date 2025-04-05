import createImageUrlBuilder from "@sanity/image-url"
import { client } from "./client"

const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source: any) => {
  if (!source?.asset?._ref) {
    return null
  }

  return imageBuilder.image(source)
}

