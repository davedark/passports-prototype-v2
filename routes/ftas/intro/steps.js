module.exports = {
    '/': {
        backLink: '/../ftas/filter/uncancelled',
        next: '/what-you-need'
    },
    '/before-you-continue-overseas': {
        backLink: '/../ftas/overseas/give-contact-details',
        next: '/what-you-need-overseas'
    },
    '/what-you-need': {
      backLink: './',
      next: '/photo-retrieved'
    },
    '/you-need-a-photo': {
      backLink: './what-you-need',
      next: '/choose-photo-method'
    },
    '/choose-photo-method': {
      fields: ['choose-photo'],
      next: '/../upload'
    },
    '/photo-retrieved': {
      next: '/../uploadphoto'
    },
    '/get-photo-code': {
      fields: ['photo-code-photo'],
      backLink: './choose-photo-method',
      next: '/retrieving'
    },
    '/retrieving': {
      backLink: './get-photo-code',
    },
    '/fetch-result': {
      controller: require('../../../controllers/fetch-result')
    },
    '/error': {
        backLink: './get-photo-code',
    }
};
