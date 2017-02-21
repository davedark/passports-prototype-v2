module.exports = {
    '/':{
      fields: ['issuing-authority', 'issue-year', 'issue-month'],
      backLink: '/../prototype_170331/filter-common/dob-overseas',
      next: '/passport-damaged'
    },
    '/passport-damaged': {
      fields: ['passport-damaged'],
        backLink: './',
        next: '/uncancelled' /* if No is selected */
    },
    '/uncancelled': {
        fields: ['uncancelled', 'dual-national-country'],
        backLink: './passport-damaged',
        next: '/british-citizen'
    },
    '/british-citizen': {
        fields: ['british-citizen'],
        backLink: './uncancelled',
        next: '/try-service' /* if Yes is selected */
    },
    '/have-to-send': {
      backLink: './about-your-passport',
      next: '/../intro/what-you-need-overseas'
    },
    '/prove-your-identity': {
      backLink: './about-your-passport',
      next: '/../intro/what-you-need-overseas'
    },
    '/try-service': {
        fields: ['try-service'],
        backLink: './british-citizen',
        next: '/give-contact-details' /* if yes is selected */
    },
    '/give-contact-details': {
        fields: ['name','lastname','email','application-country-code', 'mobile', 'help'],
        backLink: './try-service',
        next: '/../intro/before-you-continue-overseas' /* if yes is selected */
    }
};