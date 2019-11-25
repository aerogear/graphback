module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'GraphQL Migrate',
      description: '⚡ Instantly create or update a SQL database from a GraphQL API schema',
    },
  },
  serviceWorker: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {
    logo: '/logo-small.png',
    repo: 'Akryum/graphql-migrations',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    sidebarDepth: 3,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
        ],
        sidebar: {
          '/guide/': [
            '/guide/',
            '/guide/options',
            '/guide/name-transforms',
            '/guide/cookbook',
            '/guide/scalar-mapping',
            '/guide/plugins',
            '/guide/internal-schema',
            '/guide/cli',
            '/guide/compatibility',
          ],
        },
      },
    },
  },
}
