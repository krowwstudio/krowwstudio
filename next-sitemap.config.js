/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://krowwstudio.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  additionalPaths: async () => [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/about", changefreq: "monthly", priority: 0.8 },
    { loc: "/services", changefreq: "monthly", priority: 0.9 },
    { loc: "/portfolio", changefreq: "weekly", priority: 0.8 },
    { loc: "/contact", changefreq: "monthly", priority: 0.7 },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
