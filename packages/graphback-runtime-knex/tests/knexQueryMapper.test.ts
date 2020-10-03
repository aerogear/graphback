/* eslint-disable max-lines */
import { QueryFilter } from "@graphback/core"
import * as Knex from 'knex';
import { createKnexQueryMapper, CRUDKnexQueryMapper } from "../src/knexQueryMapper"

describe('knexQueryMapper', () => {
  let queryBuilder: CRUDKnexQueryMapper;
  let db: Knex;
  beforeAll(() => {
    db = Knex({
      client: 'sqlite3',
      connection: ':memory:',
      useNullAsDefault: true
    });

    queryBuilder = createKnexQueryMapper(db);
  });

  test('select *', () => {
    expect(queryBuilder.buildQuery(undefined).toQuery()).toEqual("select *")
    expect(queryBuilder.buildQuery({}).toQuery()).toEqual("select *")
  });

  test('where name = ?', () => {
    const filter: QueryFilter = {
      name: {
        eq: 'Enda'
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` = 'Enda')")
  });

  test('where name is null', () => {
    const filter: QueryFilter = {
      name: {
        // eslint-disable-next-line no-null/no-null
        eq: null
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` is null)")
  })

  test('where name is not null', () => {
    const filter: QueryFilter = {
      name: {
        // eslint-disable-next-line no-null/no-null
        ne: null
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` is not null)")
  })

  test('where name <> ?', () => {
    const filter: QueryFilter = {
      name: {
        ne: 'Enda'
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` <> 'Enda')")
  });

  test('where age < ?', () => {
    const filter: QueryFilter = {
      age: {
        lt: 25
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`age` < 25)")
  });

  test('where age <= ?', () => {
    const filter: QueryFilter = {
      age: {
        le: 25
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`age` <= 25)")
  });

  test('where age > ?', () => {
    const filter: QueryFilter = {
      age: {
        gt: 25
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`age` > 25)")
  });

  test('where age >= ?', () => {
    const filter: QueryFilter = {
      age: {
        ge: 25
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`age` >= 25)")
  });

  test('where name = ? and id = ?', () => {
    const filter: QueryFilter = {
      name: {
        eq: 'Enda'
      },
      surname: {
        eq: 'Stevens'
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` = 'Enda' and `surname` = 'Stevens')")
  });

  test('where age in [...]', () => {
    const filter: QueryFilter = {
      age: {
        in: [26, 30, 45]
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual('select * where (`age` in (26, 30, 45))');
  });

  test('where age between [...]', () => {
    const filter: QueryFilter = {
      age: {
        between: [26, 30]
      }
    }

    expect(queryBuilder.buildQuery(filter).toQuery()).toEqual('select * where (`age` between 26 and 30)');
  });

  describe('and', () => {
    test("select * where (`name` = ?) and (`surname` = ?)", () => {
      const filter: QueryFilter = {
        and: [
          {
            name: {
              eq: 'Jerry'
            }
          },
          {
            surname: {
              eq: 'Seinfeld'
            }
          }
        ]
      };

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where ((`name` = 'Jerry') and (`surname` = 'Seinfeld'))")
    });

    test("select * where (`name` = 'Jerry') and ((`profession` = ?) and ((`surname` = ?) or (`surname` = ?)))", () => {
      const filter: QueryFilter = {
        name: {
          eq: 'Jerry'
        },
        and: [
          {
            profession: {
              eq: 'Actor'
            },
            or: [
              {
                surname: {
                  eq: 'Seinfeld'
                }
              },
              {
                surname: {
                  eq: 'Stiller'
                }
              }
            ]
          }
        ]
      };

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` = 'Jerry') and ((`profession` = 'Actor') and ((`surname` = 'Seinfeld') or (`surname` = 'Stiller')))")
    })
  })

  describe('not', () => {
    test('where not name = ?', () => {
      const filter: QueryFilter = {
        not: {
          name: {
            eq: 'Enda'
          }
        }
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (not (`name` = 'Enda'))")
    });
  })

  describe('or', () => {
    test('where select * from name = ? or name = ?', () => {
      const filter: QueryFilter = {
        or: [
          {
            name: {
              eq: 'Enda'
            },
          },
          {
            name: {
              eq: 'Matthew'
            }
          }
        ]
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where ((`name` = 'Enda') or (`name` = 'Matthew'))")
    })

    test('where select * from name = ? or (name = ? and surname = ?)', () => {
      const filter: QueryFilter = {
        or: [
          {
            name: {
              eq: 'Enda'
            },
          },
          {
            name: {
              eq: 'Lewis'
            },
            surname: {
              eq: 'Conlon'
            }
          }
        ]
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where ((`name` = 'Enda') or (`name` = 'Lewis' and `surname` = 'Conlon'))")
    });

    test('where select * from users where name = ? and (lname = ? or lname = ?)', () => {
      const filter: QueryFilter = {
        name: {
          eq: 'James'
        },
        or: [
          {
            surname: {
              eq: 'McMorrow'
            }
          },
          {
            surname: {
              eq: 'McLean'
            }
          }
        ]
      };

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` = 'James') and ((`surname` = 'McMorrow') or (`surname` = 'McLean'))");
    });

    test('where name = ? and (surname = ? or (surname = ? and id = ?))', () => {
      const filter: QueryFilter = {
        name: {
          eq: 'Sarah'
        },
        or: [
          {
            surname: {
              eq: 'Smith'
            }
          },
          {
            surname: {
              eq: 'Simone'
            },
            id: {
              eq: 1
            }
          }
        ]
      };

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` = 'Sarah') and ((`surname` = 'Smith') or (`surname` = 'Simone' and `id` = 1))")
    })

    test('where name = ? and ((id > ? or id < ?) or (id > ? and lname = ?))', () => {
      const filter: QueryFilter = {
        name: {
          eq: 'Jimi'
        },
        or: [
          {
            id: {
              gt: 99
            }
          },
          {
            id: {
              lt: 49
            }
          },
          {
            id: {
              gt: 2000,
              lt: 2500
            },
            surname: {
              eq: 'Hendrix'
            }
          }
        ]
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (`name` = 'Jimi') and ((`id` > 99) or (`id` < 49) or (`id` > 2000 and `id` < 2500 and `surname` = 'Hendrix'))")
    })

    test('where ((id > ? or id < ?) and (id > ? or id > ?))', () => {
      const filter: QueryFilter = {
        or: [
          {
            or: [
              {
                id: {
                  gt: 99
                }
              },
              {
                id: {
                  lt: 49
                }
              }
            ]
          },
          {
            or: [
              {
                id: {
                  gt: 2000,
                  lt: 2500
                },
                surname: {
                  eq: 'Hendrix'
                }
              }
            ]
          }
        ]
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where (((`id` > 99) or (`id` < 49)) and ((`id` > 2000 and `id` < 2500 and `surname` = 'Hendrix')))")
    });

    describe('not', () => {
      test('where (not (id = 5 or not id = 2)', () => {
        const filter: QueryFilter = {
          not: {
            or: [
              {
                id: {
                  eq: 5
                }
              },
              {
                id: {
                  eq: 2
                }
              }
            ]
          }
        }

        expect(queryBuilder.buildQuery(filter).toQuery()).toEqual("select * where ((not (`id` = 5) or not (`id` = 2)))")
      });
    })
  });

  describe('nested root conditions', () => {
    test('or > not', () => {
      const filter: QueryFilter = {
        or: [
          {
            a: {
              in: [1, 11]
            }
          },
          {
            not: {
              a: {
                eq: 2
              }
            }
          }
        ]
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual('select * where ((`a` in (1, 11)) or (not (`a` = 2)))')
    })

    test('not > or', () => {
      const filter: QueryFilter = {
        not: {
          or: [
            {
              a: {
                eq: 1
              }
            },
            {
              a: {
                eq: 2
              }
            }
          ]
        }
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual('select * where ((not (`a` = 1) or not (`a` = 2)))')
    })

    test('not > and', () => {
      const filter: QueryFilter = {
        not: {
          and: [
            {
              a: {
                eq: 1
              }
            },
            {
              a: {
                eq: 2
              }
            }
          ]
        }
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual('select * where ((not (`a` = 1) and not (`a` = 2)))')
    })

    test('and > or', () => {
      const filter: QueryFilter = {
        and: [
          {
            c: {
              eq: 1
            }
          },
          {
            or: [
              {
                a: {
                  eq: 1
                }
              },
              {
                a: {
                  eq: 2
                }
              }
            ]
          }
        ]
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual('select * where ((`c` = 1) and ((`a` = 1) or (`a` = 2)))')
    })

    test('and > not', () => {
      const filter: QueryFilter = {
        and: [
          {
            a: {
              eq: 1
            }
          },
          {
            not: {
              a: {
                eq: 2
              }
            }
          }
        ]
      }

      expect(queryBuilder.buildQuery(filter).toQuery()).toEqual('select * where ((`a` = 1) and (not (`a` = 2)))')
    })
  })
});