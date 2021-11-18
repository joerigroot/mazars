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
          key: 'analyticsUrl',
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