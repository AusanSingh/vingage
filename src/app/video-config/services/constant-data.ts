export const MENU_LIST = [
  {
    name: 'Text',
    icon: 'text',
    type: 'text',
    children: [
      {
        name: 'Heading',
        icon: '',
        tag: 'h1',
        type: 'text',
        config: {
          font_size: 16,
          pos: {
            x: 100,
            y: 100,
          },
          color: '#fff',
          start_time: 0,
          end_time: 10,
          text: 'Heading'
        }
      },
      {
        name: 'Subheading',
        icon: '',
        tag: 'h2',
        type: 'text',
        config: {
          font_size: 14,
          pos: {
            x: 100,
            y: 150,
          },
          color: '#fff',
          start_time: 0,
          end_time: 10,
          text: 'Subheading'
        }
      },
      {
        name: 'Body',
        icon: '',
        tag: 'p',
        type: 'text',
        config: {
          font_size: 12,
          pos: {
            x: 100,
            y: 150,
          },
          color: '#fff',
          start_time: 0,
          end_time: 10,
          text: 'Body'
        }
      },
      {
        name: 'Paragraph',
        icon: '',
        tag: 'p',
        type: 'text',
        config: {
          font_size: 12,
          pos: {
            x: 100,
            y: 150,
          },
          color: '#fff',
          start_time: 0,
          end_time: 10,
          text: 'Paragraph'
        }
      },
    ],
  },
  {
    name: 'Button',
    icon: 'button',
    type: 'button',
    children: [
      {
        name: 'CTA',
        icon: '',
        tag: 'button',
        type: 'button',
        config: {
          font_size: 16,
          pos: {
            x: 100,
            y: 100,
          },
          color: '#fff',
          start_time: 0,
          end_time: 10,
          text: 'Button'
        }
      }
    ],
  },
  {
    name: 'Media',
    icon: 'media',
    type: 'media',
    children: [
    ],
  },
];