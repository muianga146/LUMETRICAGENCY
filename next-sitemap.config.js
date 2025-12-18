/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lumetricagency.vercel.app/',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Otimiza para sites menores/médios
  exclude: ['/server-sitemap.xml'], // Caso tenha sitemaps dinâmicos no futuro
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin', '/api'], // Protege áreas sensíveis
      },
    ],
    additionalSitemaps: [
      // 'https://lumetricagency.vercel.app/server-sitemap.xml',
    ],
  },
  // Opcional: Melhora a prioridade de páginas principais
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}