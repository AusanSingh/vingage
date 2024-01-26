export const MENU_LIST = [
  {
    name: 'Text',
    icon: 'icon-text',
    children: [
      {
        name: 'Heading 1',
        icon: '',
        tag: 'h1',
        type: 'text',
        config: {
          font_size: 14,
          pos: {
            x: 100,
            y: 100,
          },
          color: '#fff',
          start_time: 0,
          end_time: 10,
          text: 'Heading 1'
        }
      },
      {
        name: 'Heading 2',
        icon: '',
        tag: 'h2',
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
          text: 'Heading 2'
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
        type: 'button',
        config: {
          font_size: 12,
          pos: {
            x: 100,
            y: 200,
          },
          color: '#fff',
          start_time: 0,
          end_time: 10,
          text: 'Button'
        }
      }
    ],
  },
];