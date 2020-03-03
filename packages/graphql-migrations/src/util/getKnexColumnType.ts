const knexColumnTypeMap = {
  bigIncrements: 'bigInteger',
  increments: 'integer'
};

// eslint-disable-next-line import/no-default-export
export default function(colType: string) {
  const knexType = knexColumnTypeMap[colType];

  return knexType || colType;
}
