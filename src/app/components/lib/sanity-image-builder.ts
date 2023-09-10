import ImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = ImageUrlBuilder(client);
export const makeImgUrl = (srcUrl: any): any => {
  return builder.image(srcUrl);
};