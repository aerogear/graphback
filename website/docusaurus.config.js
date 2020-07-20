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
      theme: require('prism-react-renderer/themes/dracula'),
      // darkTheme: require('prism-react-renderer/themes/dracula'),
      defaultLanguage: 'typescript',
    },
    navbar: {
      title: 'Graphback',
      logo: {
        alt: 'Graphback Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/next/introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
          items: [
            {
              label: '0.14.x',
              to: 'docs/introduction',
            },
            { label: '0.12.x', to: 'docs/0.12.x/gettingstarted' },
            { label: '0.11.x', to: 'docs/0.11.x/gettingstarted' },
            { label: '0.10.x', to: 'docs/0.10.x/gettingstarted' },
            { label: '0.9.x', to: 'docs/0.9.x/gettingstarted' },
            {
              label: 'Master/Unreleased',
              to: 'docs/next/introduction',
            },
          ],
        },
        {
          to: 'versions',
          label: `v0.14.x`,
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
              to: 'docs/introduction',
            },
            {
              label: 'Getting started',
              to: 'docs/getting-started/create-new-app',
            },
            {
              label: 'CRUD',
              to: 'docs/crud/overview',
            },
            {
              label: 'Plugins',
              to: 'docs/plugins/overview',
            },
            {
              label: 'Reference',
              to: 'docs/commands',
            },
            {
              label: 'Releases',
              to: 'docs/releases',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/aerogear/graphback',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/mJ7j84m',
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
          editUrl: 'https://github.com/aerogear/graphback/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
