/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Fondamentaux',
      items: [
        'fundamentals/section-1-rappels-react',
        'fundamentals/section-2-setup-vite',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Intégration API',
      items: ['api-integration/section-3-fastapi'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Interfaces Spécialisées',
      items: [
        'interfaces/section-4-annotation',
        'interfaces/section-5-tables',
        'interfaces/section-6-dashboard',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Avancé',
      items: [
        'advanced/section-7-best-practices',
        'advanced/section-8-claude-workflow',
      ],
      collapsed: false,
    },
    'conclusion',
  ],
};

module.exports = sidebars;
