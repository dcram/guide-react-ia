const {themes: prismThemes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Guide React UI pour IA/Data',
  tagline: 'Créer des interfaces d\'annotation et de visualisation avec l\'aide de l\'IA',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://dcram.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/guide-react-ia/',

  // GitHub pages deployment config.
  organizationName: 'dcram',
  projectName: 'guide-react-ia',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Docs at the root
        },
        blog: false, // Disable blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Guide React UI',
        logo: {
          alt: 'Guide React UI Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/dcram/guide-react-ia',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Fondamentaux',
                to: '/fundamentals/section-1-rappels-react',
              },
            ],
          },
          {
            title: 'Ressources',
            items: [
              {
                label: 'React Documentation',
                href: 'https://react.dev',
              },
              {
                label: 'FastAPI',
                href: 'https://fastapi.tiangolo.com/',
              },
              {
                label: 'Recharts',
                href: 'https://recharts.org/',
              },
              {
                label: 'TanStack Table',
                href: 'https://tanstack.com/table/latest',
              },
            ],
          },
          {
            title: 'Plus',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/dcram/guide-react-ia',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Guide React UI pour IA/Data. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'jsx', 'javascript'],
      },
    }),

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

module.exports = config;
