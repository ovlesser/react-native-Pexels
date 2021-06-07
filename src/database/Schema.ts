import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'photos',
      columns: [
        {name: 'photo_id', type: 'number'},
        {name: 'width', type: 'number', isOptional: true},
        {name: 'height', type: 'number', isOptional: true},
        {name: 'url', type: 'string', isOptional: true},
        {name: 'photographer', type: 'string', isOptional: true},
        {name: 'photographer_url', type: 'string', isOptional: true},
        {name: 'photographer_id', type: 'number', isOptional: true},
        {name: 'avg_color', type: 'string', isOptional: true},
        {name: 'src', type: 'string', isOptional: true},
        {name: 'liked', type: 'boolean', isOptional: true},
        {name: 'keyword', type: 'string', isOptional: true},
      ],
    }),
  ],
});
