const typeMap = {
  bigIncrements: 'bigInteger',
  increments: 'integer'
};

export default function(colType: string) {
  const knexType = typeMap[colType];

  return knexType || colType;
}
