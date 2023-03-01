import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "8ovl0w9g",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
});
