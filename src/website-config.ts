export type WebsiteConfig = {
  title: string;
  description: string;
  coverImage?: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  siteUrl: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
  rss?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
};

const config: WebsiteConfig = {
  title: 'Scott Giminiani',
  description: 'Full-Stack Software Engineer',
  coverImage: 'img/blog-cover.png',
  logo: 'img/scott-logo.png',
  lang: 'en',
  siteUrl: 'http://www.giminiani.com',
  github: 'https://github.com/ScottG489',
  linkedin: 'https://www.linkedin.com/in/scott-giminiani/',
  twitter: 'https://twitter.com/scottg489',
  facebook: 'https://www.facebook.com/scott.giminiani',
  email: 'mailto:scottg489@gmail.com',
  rss: '/rss.xml',
  showSubscribe: false,
  mailchimpAction: 'https://twitter.us19.list-manage.com/subscribe/post?u=a89b6987ac248c81b0b7f3a0f&amp;id=7d777b7d75',
  mailchimpName: 'b_a89b6987ac248c81b0b7f3a0f_7d777b7d75',
  mailchimpEmailFieldName: 'MERGE0',
  googleSiteVerification: 'GoogleCode',
  footer: 'Theme based on ',
};

export default config;
