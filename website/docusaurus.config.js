/* eslint-disable */
const versions = require('./versions.json');

module.exports = {
  title: 'Graphback',
  tagline: 'GraphQL API for your client and server',
  url: 'https://graphback.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'aerogear', // Usually your GitHub org/user name.
  projectName: 'graphback', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      // theme: require('prism-react-renderer/themes/dracula'),
      defaultLanguage: 'javascript',
    },
    navbar: {
      title: 'Graphback',
      logo: {
        alt: 'Graphback Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/gettingstarted',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
          items: [
            {
              label: '0.12.x',
              to: 'docs/gettingstarted',
            },
            ...versions.slice(1).map((version) => ({
              label: version,
              to: `docs/${version}/gettingstarted`,
            })),
            {
              label: 'Master/Unreleased',
              to: 'docs/next/gettingstarted',
            },
          ],
        },
        {
          to: 'versions',
          label: `v0.12.x`,
          position: 'right',
        },
        {
          href: 'https://github.com/aerogear/graphback',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/gettingstarted',
            },
            {
              label: 'Getting started',
              to: 'docs/intro/quickstart',
            },
            {
              label: 'CRUD',
              to: 'docs/crud/crudspec',
            },
            {
              label: 'Plugins',
              to: 'docs/plugins/plugin-intro',
            },
            {
              label: 'Migrations',
              to: 'docs/migrations/openapi',
            },
            {
              label: 'Reference',
              to: 'docs/commands',
            },
            {
              label: 'Releases',
              to: 'docs/releases',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/mJ7j84m',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/aerogear/graphback',
            },
          ],
        },
      ],
      logo: {
        alt: 'AeroGear Logo',
        src: 'img/aerogear.png',
        href: 'https://aerogear.org/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} AeroGear`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl:
            'https://github.com/aerogear/graphback/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
