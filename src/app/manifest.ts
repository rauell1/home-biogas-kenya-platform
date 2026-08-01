import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Home Biogas Kenya",
    short_name: "HomeBiogas",
    description: "Renewable energy and organic-waste systems for homes, farms, institutions and commercial facilities in Kenya.",
    start_url: "/en",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#121412",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
