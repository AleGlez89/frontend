/** Example file/folder data. */
export const files = [
  {
    name: 'GreenPowerMonitor',
    type: 'folder',
    src: '',
    children: [
      {
        name: 'Documents',
        type: 'folder',
        src: '',
        children: [
          {
            name: 'Importants',
            type: 'folder',
            src: '',
            children: [
              // tslint:disable-next-line: max-line-length
              { name: 'The Panel.pdf', type: 'file', src: '../../../assets/folder/Information/Document/Business_Strategy.pdf' },
              { name: 'The New Computer.pdf', type: 'file', src: '../../../assets/folder/Information/Document/DELL_Laptop.pdf' },
            ]
          },
          { name: 'Other_Folder', type: 'folder', src: '' }
        ]
      }
    ]
  }

];
