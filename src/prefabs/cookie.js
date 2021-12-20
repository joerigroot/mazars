(() => ({
  name: 'Cookie',
  icon: 'ContainerIcon',
  category: 'LAYOUT',
  structure: [
    {
      name: 'Cookie',
      options: [
        {
          type: 'TEXT',
          label: 'Analytics Hostname',
          key: 'hostname',
          value: '',
        },
        {
          type: 'TEXT',
          label: 'Google Tag',
          key: 'googleTag',
          value: '',
        },
      ],
      descendants: [],
    },
  ],
}))();