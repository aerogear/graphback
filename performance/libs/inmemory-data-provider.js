class InMemoryDataProvider {
  constructor() {
    this.counter = -1;
    this.storage = {};
  }

  create(data, context) {
    data.id = ++this.counter;
    this.storage[data.id] = data;
    return data;
  }

  update(data, context) {
    const id = "" + data.id;
    const oldData = this.storage[id];
    if (!oldData) {
      throw Error("No data");
    }
    const newData = {
      ...oldData,
      ...data,
    };
    this.storage[id] = newData;
    return newData;
  }

  delete(data, context) {
    const id = "" + data.id;

    const oldData = this.storage[id];

    if (!oldData) {
      throw Error("No data");
    }

    const newData = {
      ...oldData,
      ...data,
    };

    this.storage[id] = undefined;
    --this.counter;
    return newData;
  }

  findOne(args, context) {
    const id = "" + args.id;

    const data = this.storage[id];

    if (!data) {
      throw Error("No data");
    }

    return data;
  }

  findBy(filter, context, page, orderBy) {
    return Object.values(this.storage);
  }

  count(filter) {
    return this.counter;
  }

  batchRead(relationField, ids, filter, context) {
    const values = [];
    for (const value of Object.values(this.storage)) {
      if (ids.includes(value[relationField])) {
        values.push(value);
      }
    }

    return values;
  }
}

module.exports = InMemoryDataProvider;
