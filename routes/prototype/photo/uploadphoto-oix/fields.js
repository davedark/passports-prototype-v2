module.exports = {
  'oix-override': {
    legend: {
      value: 'Do you want to use this photo?',
      className: 'visuallyhidden'
    },
    options: [
      {value: 'Yes'},
      {value: 'No'}
    ],
    validate: [
      'required',
      {
        type: 'equal',
        arguments: ['Yes'],
        redirect: '/../choose-photo-method'
      }
    ]
  },
  'oix-override-reason': {
    legend: {
      value: 'Do you want to use this photo?',
      className: 'visuallyhidden'
    },
    dependent: {
      field: 'oix-override',
      value: 'Yes'
    },
    validate: 'required'
  },
  'override': {
    legend: {
      value: 'Do you want to use this photo?',
      className: 'visuallyhidden'
    },
    options: [
      {value: 'Yes', label: 'Yes, I do'},
      {value: 'No', label: 'No, I dont'}
    ],
    validate: [
      'required',
      {
        type:'equal',
        arguments:['No','No'],
        redirect:'/../choose-photo-method'
      },
      {
        type:'equal',
        arguments:['No','Yes'],
        redirect:'/../question-expression'
      }
    ]
  },

  'plain-expression': {
    legend: {
      value: 'Do you have a plain expression?',
      className: 'visuallyhidden'
    },
    options: [
      {value: 'Yes', label: 'Yes, I have a plain expression'},
      {value: 'No', label: 'No, I have a slight smile or frown'}
    ],
    validate: [
      'required',
      {
        type:'equal',
        arguments:['No','No'],
        redirect:'/shadows-face'
      },
      {
        type:'equal',
        arguments:['No','Yes'],
        redirect:'/you-need-another-photo'
      }
    ]
  },
  'shadows-face': {
    legend: {
      value: 'Are there any shadows on your face or in the background?',
      className: 'visuallyhidden'
    },
    options: [
      {value: 'Yes', label: 'My photo looks ok – there are no shadows'},
      {value: 'No', label: 'There’s a shadow on my face or background'}
    ],
    validate: [
      'required',
      {
        type:'equal',
        arguments:['No','No'],
        redirect:'/final-checks'
      },
      {
        type:'equal',
        arguments:['No','Yes'],
        redirect:'/you-need-another-photo'
      }
    ]
  }

};