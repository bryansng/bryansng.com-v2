import { observable } from 'mobx';

const makeSEOConfig = () => {
  const s = observable({
    get standardMeta() {
      return [
        {
          name: "robots",
          content: "index, follow, noarchive",
        },
        {
          charSet: "utf-8",
        },
        {
          name: "description",
          content:
            "Bryan Sng is a Software Engineer based in Dublin, Ireland who specializes in building exceptional websites, web applications, software applications, and loves utilizing his VSCode shortcuts.",
        },
        {
          property: "image",
          content:
            "https://v2.bryansng.com/static/media/me-500x500.9f8c7eb1.png",
        },
        {
          name: "keywords",
          content: "bryan,sng,software,engineer"
        },
      ];
    },
    get socialsMeta() {
      const facebook = [
        {
          property: "og:title",
          content: "Bryan Sng | Software Engineer",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:description",
          content: "Bryan Sng is a Software Engineer based in Dublin, Ireland who specializes in building exceptional websites, web applications, software applications, and loves utilizing his VSCode shortcuts.",
        },
        {
          property: "og:locale",
          content: "en_US",
        },
        {
          property: "og:site_name",
          content: "Bryan Sng",
        },
        {
          property: "og:url",
          content: "https://v2.bryansng.com/",
        },
        {
          property: "og:image",
          content:
            "https://v2.bryansng.com/static/media/me-500x500.9f8c7eb1.png",
        },
        {
          property: "og:image",
          content: "https://v2.bryansng.com/static/media/logo-bs.7740c5a9.png",
        },
        {
          property: "og:image:alt",
          content: "Bryan Sng | Software Engineer",
        },
      ];
      return [...facebook];
    },
  });

  return s;
};

const SEOConfig = makeSEOConfig();

export default SEOConfig;
