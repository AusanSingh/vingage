export const MENU_LIST = [
    {
      name: 'Text',
      icon: 'icon-text',
      children: [
        {
          name: 'Heading 1',
          icon: '',
          id: 'h_1',
          config: {
            font_size: '18px',
            left: '100px',
            top: '10px',
            color: '#000',
            start_time: 0,
            end_time: 10,
            text:'Sample'
          }
        },
        {
          name: 'Heading 2',
          icon: '',
          id: 'h_2',
          config: {
            font_size: '18px',
            left: '100px',
            top: '10px',
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
      id: 'button',
      children: [
        {
          name: 'Add Button',
          icon: '',
          id: 'add_button',
          config: {
            font_size: '18px',
            left: '100px',
            top: '10px',
            color: '#000',
            start_time: 0,
            end_time: 10
          }
        }
      ],
    },
  ];