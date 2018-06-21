module.exports = {
    '/': {
        fields: [
            'apply-uk',
            'application-country'
        ],
        controller: require('../../../controllers/init'), // Initialise
        // controller: require('../../../controllers/go-overseas'),
        backLink: './',
        next: '/who-for',
        /* if Yes is selected */
        nextAlt: 'what-do-you-want-to-do-overseas',
        /* if they are from Germany/France */
        nextAltAlt: 'what-do-you-want-to-do-overseas',
        /* if they are from Afganistan */
        nextAltAltAlt: 'what-do-you-want-to-do-overseas',
        /* if they are from Spain - first hidden as renewal */
        nextAltAltAltAlt: '../overseas-not-available' /* if they are from Syria - not available */
    },
    '/who-for':{
      fields: ['application-for'],
      next: '/first-uk',
      backLink: './'
    },
    '/first-uk': {
        backLink: './',
        fields: [
            'passport-before'
        ],
        next: '/lost-stolen',
        forks: [{
            target: '/dob',
            condition: {
                field: 'passport-before',
                value: false
            }
        }]
    },
    '/lost-stolen': {
        fields: [
            'lost-stolen'
        ],
        next: '/passport-colour',
        forks: [{
            target: '/dob',
            condition: {
                field: 'lost-stolen',
                value: false
            }
        }]
    },
    '/passport-colour': {
        backLink: './',
        fields: [
            'passport-colour'
        ],
        next: '/naturalisation-registration-details',
        forks: [{
            target: '/lost',
            condition: {
                field: 'passport-colour',
                value: 'red'
            }
        }]
    },
    '/naturalisation-registration-details': {
        controller: require('../../../controllers/naturalisation-registration-details'),
        fields: [
            'naturalisation-registration-certificate'
        ],
        next: '/dual-national'
    },
    '/what-do-you-want-to-do': {
        fields: [
            'what-to-do'
        ],
        backLink: './',
        next: '/dob'
    },
    '/lost': {},
    '/application-method': {},
    '/what-do-you-want-to-do-overseas': {
        controller: require('../../../controllers/go-overseas'),
        fields: [
            'what-to-do-overseas'
        ],
        backLink: './',
        next: '/dob',
        nextAlt: 'dob-overseas',
        /* if they are from Germany/France */
        nextAltAlt: 'dob-overseas',
        /* if they are from Afganistan */
        nextAltAltAlt: '../overseas-first' /* if they are from Spain - first hidden as renewal */
    },
    '/dob-overseas': {
        fields: [
            'age-day',
            'age-year',
            'age-month'
        ],
        controller: require('../../../controllers/go-overseas'),
        backLink: './',
        next: '/../filter',
        /* if they are from the UK */
        nextAlt: '../overseas',
        /* if they are from Germany/France */
        nextAltAlt: '../overseas-not-eligible',
        /* if they are from Afganistan */
    },
    '/dob': {
        fields: [
            'age-day',
            'age-year',
            'age-month'
        ],
        controller: require('../../../controllers/go-overseas'),
        backLink: './lost-stolen',
        next: '/passport-expiry',
        forks: [
            {
                target: '/naturalisation-registration-details',
                condition: function (req, res) {
                    // TODO: Add conditional logic for OVER 16
                    return req.session['hmpo-wizard-common']['passport-before'] == false; // If they have NOT had UK passport before
                }
            }
        ]
    },
    '/dob-below-16': {
        fields: [
            'age-day',
            'age-year',
            'age-month'
        ],
        backLink: './dob',
        next: '/passport-expiry',
        forks: [{
            target: '/../intro',
            condition: function (req, res) {
                return req.session['hmpo-wizard-common']['passport-before'] == false; // If they are BELOW 16 + NOT had UK passport before
            }
        }]
    },
    '/passport-expiry': {
        fields: [
            'issue-day',
            'issue-month',
            'issue-year'
        ],
        backLink: '../filter/dob',
        next: '/naturalisation-registration-details',
        forks: [{ // If they are NOT a UK Hidden FTA
            target: '/dual-national',
            condition: function (req, res) { // Logic below is to deal with 2-digit and 4-digit input of year and make it work, because any years input as 02–18 is unlikely to mean 1902–1918 but 2002–present
                return req.session['hmpo-wizard-common']['issue-year'] >= 2002 // If their passport's date of issue is > 2002 (2002—present) ||
                    req.session['hmpo-wizard-common']['issue-year'] >= 02 && req.session['hmpo-wizard-common']['issue-year'] <= 18; // If their passport's date of issue is >= 2002 (2002–2018)
            }
        }]
    },
    '/passport-damaged': {
        fields: [
            'passport-damaged'
        ],
        backLink: './',
        next: '/../intro' // If their passport is NOT damaged
    },
    '/dual-national': {
      controller: require('../../../controllers/go-overseas'),
      fields: ['dual-nationality'],
      backLink: './passport-damaged',
      next: '/summary',
      nextAlt: '../overseas',
      forks: [{
        target: '/relationship-applicant',
        condition: function(req, res) {
          return req.session['hmpo-wizard-common']['application-for'] == false;
        }
      }],
    },
    '/relationship-applicant': {
      fields: ['relationship-applicant', 'other-why-apply'],
      backLink: './dual-national',
      next: '/third-party-name',
      controller: require('../../../controllers/social-worker')
    },
    '/third-party-name': {
      fields: ['third-party-first-name', 'third-party-last-name'],
      backLink: './relationship-applicant',
      controller: require('../../../controllers/parental-responsibility')
    },
    '/parental-responsibility': {
      fields: ['parental-responsibility'],
      backLink: './relationship-applicant',
      next: '/summary'
    },
    '/summary': {
      next: '/../intro'
    }

};