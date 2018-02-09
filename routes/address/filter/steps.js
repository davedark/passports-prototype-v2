module.exports = {
    '/':{
      fields: ['application-for'],
      next: '/apply-uk',
      backLink: '../startpage'
    },
    '/apply-uk':{
      fields: ['apply-uk', 'application-country'],
      controller: require('../../../controllers/go-overseas'),
      backLink: './',
      next: '/first-uk', /* if Yes is selected */
      nextAlt: 'what-do-you-want-to-do-overseas', /* if they are from Germany/France */
      nextAltAlt:'what-do-you-want-to-do-overseas',/* if they are from Afganistan */
      nextAltAltAlt:'what-do-you-want-to-do-overseas', /* if they are from Spain - first hidden as renewal */
      nextAltAltAltAlt:'../overseas-not-available' /* if they are from Syria - not available */
    },
    '/first-uk': {
        backLink: './',
        fields: ['passport-before'],
        next: '/lost-stolen'
    },
    '/lost-stolen': {
        fields: ['lost-stolen'],
        next: '/dob'
    },
    '/what-do-you-want-to-do': {
        fields: ['what-to-do'],
        backLink: './',
        next: '/dob'
    },
    '/lost': {
    },
    '/application-method': {
    },
    '/what-do-you-want-to-do-overseas': {
        controller: require('../../../controllers/go-overseas'),
        fields: ['what-to-do-overseas'],
        backLink: './',
        next: '/dob',
        nextAlt: 'dob-overseas', /* if they are from Germany/France */
        nextAltAlt: 'dob-overseas', /* if they are from Afganistan */
        nextAltAltAlt: '../overseas-first' /* if they are from Spain - first hidden as renewal */
    },
    '/dob-overseas': {
      fields: ['age-day', 'age-year', 'age-month'],
      controller: require('../../../controllers/go-overseas'),
      backLink: './',
      next: '/../filter', /* if they are from the UK */
      nextAlt: '../overseas', /* if they are from Germany/France */
      nextAltAlt:'../overseas-not-eligible', /* if they are from Afganistan */
    },
    '/dob': {
      fields: ['16-or-older'],
      controller: require('../../../controllers/go-overseas'),
      backLink: './lost-stolen',
      next: '/passport-expiry', /* if they are from the UK */
      forks: [{
        target: '/dob-below-16',
        condition: {
          field: '16-or-older',
          value: false
        }
      }],
    },
    '/dob-below-16': {
      fields: ['age-day', 'age-year', 'age-month'],
      backLink: './dob',
      next: '/passport-expiry'
    },
    '/passport-expiry': {
      fields: ['issue-day', 'issue-year', 'issue-month'],
      backLink: '../filter/dob',
      next: '/passport-damaged'
    },
    '/passport-damaged': {
      fields: ['passport-damaged'],
      backLink: './',
      next: '/uncancelled' /* if No is selected */
    },
    '/uncancelled': {
      controller: require('../../../controllers/go-overseas'),
      fields: ['uncancelled'],
      backLink: './passport-damaged',
      next: '/../intro',
      nextAlt: '../overseas',
      forks: [{
        target: '/relationship-applicant',
        condition: function(req, res) {
          return req.session['hmpo-wizard-common']['application-for'] == false;
        }
      }],
    },
    '/relationship-applicant': {
      fields: ['relationship-applicant'],
      backLink: './uncancelled',
      next: '/../intro',
      forks: [{
        target: '/parental-responsibility',
        condition: function(req, res) {
          return req.session['hmpo-wizard-common']['16-or-older'] == false;
        }
      }],
    },
    '/parental-responsibility': {
      fields: ['parental-responsibility'],
      backLink: './relationship-applicant',
      next: '/../intro',
      forks: [{
        target: '/parental-responsibility-no',
        condition: {
          field: 'parental-responsibility',
          value: false
        }
      }],
    },
    '/parental-responsibility-no': {
      backLink: './parental-responsibility'
    },
    '/third-party-name': {
      fields: ['third-party-first-name', 'third-party-last-name'],
      backLink: './parental-responsibility',
      next: '/../intro'
    }
};