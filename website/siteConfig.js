
// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.


const siteConfig = {
  title: 'Graphback', // Title for your website.
  tagline: 'Production ready GraphQL API for your client and server applications',
  url: 'https://graphback.dev', // Your website URL
  baseUrl: '/', // Base URL for your project */
  cname: 'graphback.dev',

  // Used for publishing and more
  projectName: 'graphback',
  organizationName: 'aerogear',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'gettingstarted', label: 'Documentation'},
    {blog: true, label: 'Blog'},
  ],

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#3F51B5',
    secondaryColor: '#303F9F',
  },


  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Graphback Contributors`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js',
  ],

  stylesheets: ['/css/code-block-buttons.css'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/aerogear/graphback',
};

module.exports = siteConfig;
