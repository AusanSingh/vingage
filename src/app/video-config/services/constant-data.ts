export const MENU_LIST = [
  {
    name: 'Text',
    icon: 'icon-text',
    children: [
      {
        name: 'Heading 1',
        icon: '',
        tag: 'h1',
        config: {
          font_size: '18px',
          pos: {
            x: 100,
            y: 100,
          },
          color: '#000',
          start_time: 0,
          end_time: 10,
          text: 'Sample'
        }
      },
      {
        name: 'Heading 2',
        icon: '',
        tag: 'h2',
        config: {
          font_size: '18px',
          pos: {
            x: 100,
            y: 150,
          },
          color: '#000',
          start_time: 0,
          end_time: 10
        }
      },
    ],
    id: 'text',
  },
  {
    name: 'Button',
    icon: 'icon-button',
    children: [
      {
        name: 'Add Button',
        icon: '',
        tag: 'button',
        config: {
          font_size: '18px',
          pos: {
            x: 100,
            y: 200,
          },
          color: '#000',
          start_time: 0,
          end_time: 10
        }
      }
    ],
  },
];