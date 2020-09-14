/* eslint-disable max-lines */
import { ObjectId } from 'bson';
import { Scalars, Maybe, QueryFilter, StringInput, IdInput, BooleanInput, IntInput, FloatInput, GraphbackDateTimeInput, GraphbackObjectIdInput } from '../src/runtime/QueryFilter';
import { createInMemoryFilterPredicate } from '../src/runtime/createInMemoryFilterPredicate';

type User = {
  __typename?: 'User';
  id?: Scalars['ID'];
  name?: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
  age?: Scalars['Int'];
  score?: Scalars['Float'];
  createdAt?: Scalars['GraphbackDateTime'];
  objectId?: Scalars['GraphbackObjectID'];
};

export type UserSubscriptionFilter = {
  id?: Maybe<IdInput>;
  name?: Maybe<StringInput>;
  verified?: Maybe<BooleanInput>;
  age?: Maybe<IntInput>;
  score?: Maybe<FloatInput>;
  createdAt?: Maybe<GraphbackDateTimeInput>;
  objectId?: Maybe<GraphbackObjectIdInput>;
  and?: Maybe<UserSubscriptionFilter[]>;
  or?: Maybe<UserSubscriptionFilter[]>;
  not?: Maybe<UserSubscriptionFilter>;
};

describe('createInMemoryFilterPredicate', () => {
  describe('Default scalars', () => {
    describe('ID', () => {
      test('id eq', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          id: {
            eq: 1
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ id: '1' })).toEqual(true);
        expect(filterSubscription({ id: '0' })).toEqual(false);
      });

      test('id ne', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          id: {
            ne: 1
          }
        }

        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ id: '2' })).toEqual(true);
        expect(filterSubscription({ id: '1' })).toEqual(false);
      });

      test('id le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          id: {
            le: 10
          }
        }

        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ id: '9' })).toEqual(true);
        expect(filterSubscription({ id: '10' })).toEqual(true);
      });

      test('id lt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          id: {
            lt: 10
          }
        }

        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ id: '9' })).toEqual(true);
        expect(filterSubscription({ id: '10' })).toEqual(false);
      });

      test('id le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          id: {
            le: 10
          }
        }

        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ id: '9' })).toEqual(true);
        expect(filterSubscription({ id: '10' })).toEqual(true);
      });

      test('id gt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          id: {
            lt: 10
          }
        }

        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ id: '9' })).toEqual(true);
        expect(filterSubscription({ id: '10' })).toEqual(false);
      });

      test('id gt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          id: {
            ge: 10
          }
        }

        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ id: '9' })).toEqual(false);
        expect(filterSubscription({ id: '10' })).toEqual(true);
        expect(filterSubscription({ id: '11' })).toEqual(true);
      });
    });

    describe('String', () => {
      test('name eq', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            eq: 'Homer Simpson'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false)
        expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(false);
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true);
      });

      test('name ne', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            ne: 'Homer Simpson'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(true)
        expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(true);
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(false);
      });

      test('name le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            le: 'Bart Simpson'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false)
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(true);
        expect(filterSubscription({ name: 'Bart Arnold' })).toEqual(true);
        expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(false);
      });

      test('name lt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            lt: 'Bart Simpson'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false)
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(false);
        expect(filterSubscription({ name: 'Apu Nahasapeemapetilon' })).toEqual(true);
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(false);
      });

      test('name gt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            gt: 'Bart Simpson'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false);
        expect(filterSubscription({ name: 'Apu Nahasapeemapetilon' })).toEqual(false);
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(false);
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true);
      });

      test('name ge', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            ge: 'Bart Simpson'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false);
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(true);
        expect(filterSubscription({ name: 'Apu Nahasapeemapetilond' })).toEqual(false);
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true);
      });

      test('name in', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            in: ['Bart Simpson', 'Homer Simpson']
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(true);
        expect(filterSubscription({ name: 'Bumblebee Man' })).toEqual(false);
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true);
      });

      test('name contains', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            contains: 'Bart'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false);
        expect(filterSubscription({ name: 'Bart' })).toEqual(true);
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(true);
        expect(filterSubscription({ name: 'Bartholemew' })).toEqual(true);
        expect(filterSubscription({ name: 'Die Bart Die' })).toEqual(true);
        expect(filterSubscription({ name: 'Simpson Bart' })).toEqual(true);
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(false);
      });

      test('name startsWith', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            startsWith: 'Bart'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false);
        expect(filterSubscription({ name: 'Bart' })).toEqual(true);
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(true);
        expect(filterSubscription({ name: 'BartSimpson' })).toEqual(true);
        expect(filterSubscription({ name: 'Mr. Bart Simpson' })).toEqual(false);
        expect(filterSubscription({ name: 'Simpson Bart' })).toEqual(false);
      });

      test('name endsWith', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          name: {
            endsWith: 'Simpson'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: undefined })).toEqual(false);
        expect(filterSubscription({ name: 'Maggie' })).toEqual(false);
        expect(filterSubscription({ name: 'Lisa Simpson' })).toEqual(true);
        expect(filterSubscription({ name: 'HomerSimpson' })).toEqual(true);
        expect(filterSubscription({ name: 'The Simpsons' })).toEqual(false);
      });
    });

    describe('Boolean', () => {
      test('verified', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          verified: {
            eq: true
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ verified: true })).toEqual(true);
        expect(filterSubscription({ verified: false })).toEqual(false);
      });
    });

    describe('Int', () => {
      test('age eq', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            eq: 38
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: 'Lenny', age: 38 })).toEqual(true)
        expect(filterSubscription({ name: 'Carl', age: 39 })).toEqual(false)
      });

      test('age ne', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            ne: 38
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: 'Lenny', age: 38 })).toEqual(false)
        expect(filterSubscription({ name: 'Carl', age: 39 })).toEqual(true)
      });

      test('age lt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            lt: 8
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: 'Maggie', age: 1 })).toEqual(true)
        expect(filterSubscription({ name: 'Lisa', age: 8 })).toEqual(false)
        expect(filterSubscription({ name: 'Bart', age: 10 })).toEqual(false)
      });

      test('age le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            le: 8
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: 'Maggie', age: 1 })).toEqual(true)
        expect(filterSubscription({ name: 'Lisa', age: 8 })).toEqual(true)
        expect(filterSubscription({ name: 'Bart', age: 10 })).toEqual(false)
      });

      test('age gt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            gt: 8
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: 'Maggie', age: 1 })).toEqual(false)
        expect(filterSubscription({ name: 'Lisa', age: 8 })).toEqual(false)
        expect(filterSubscription({ name: 'Bart', age: 10 })).toEqual(true)
      });

      test('age ge', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            ge: 8
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ name: 'Maggie', age: 1 })).toEqual(false)
        expect(filterSubscription({ name: 'Lisa', age: 8 })).toEqual(true)
        expect(filterSubscription({ name: 'Bart', age: 10 })).toEqual(true)
      });

      test('age in', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            in: [1, 8, 10]
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ age: 1 })).toEqual(true)
        expect(filterSubscription({ age: 10 })).toEqual(true)
        expect(filterSubscription({ age: 11 })).toEqual(false)
      });

      test('age between', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          age: {
            between: [1, 10]
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ age: 0 })).toEqual(false)
        expect(filterSubscription({ age: 1 })).toEqual(true)
        expect(filterSubscription({ age: 8 })).toEqual(true)
        expect(filterSubscription({ age: 10 })).toEqual(true)
        expect(filterSubscription({ age: 11 })).toEqual(false)
      });
    });

    describe('Float', () => {
      test('score eq', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            eq: 90
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(false);
        expect(filterSubscription({ score: 89.99 })).toEqual(false)
        expect(filterSubscription({ score: 90.00 })).toEqual(true)
        expect(filterSubscription({ score: 90.50 })).toEqual(false)
        expect(filterSubscription({ score: 91 })).toEqual(false)
      });

      test('score ne', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            ne: 90
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(true);
        expect(filterSubscription({ score: 89.99 })).toEqual(true)
        expect(filterSubscription({ score: 90.00 })).toEqual(false)
      });

      test('score lt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            lt: 90.01
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(false);
        expect(filterSubscription({ score: 89.99 })).toEqual(true)
        expect(filterSubscription({ score: 90.01 })).toEqual(false)
        expect(filterSubscription({ score: 90.50 })).toEqual(false)
      });

      test('score le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            le: 90.05
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(false);
        expect(filterSubscription({ score: 89.99 })).toEqual(true)
        expect(filterSubscription({ score: 90.00 })).toEqual(true)
        expect(filterSubscription({ score: 90.05 })).toEqual(true)
        expect(filterSubscription({ score: 91.06 })).toEqual(false)
      });

      test('score gt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            gt: 90.50
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(false);
        expect(filterSubscription({ score: 89 })).toEqual(false)
        expect(filterSubscription({ score: 90.50 })).toEqual(false)
        expect(filterSubscription({ score: 90.51 })).toEqual(true)
      });

      test('score ge', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            ge: 90.50
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(false);
        expect(filterSubscription({ score: 89.99 })).toEqual(false)
        expect(filterSubscription({ score: 90.50 })).toEqual(true)
        expect(filterSubscription({ score: 90.51 })).toEqual(true)
      });

      test('score in', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            in: [50, 55, 75, 90, 95]
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(false);
        expect(filterSubscription({ score: 49 })).toEqual(false)
        expect(filterSubscription({ score: 50 })).toEqual(true)
        expect(filterSubscription({ score: 95 })).toEqual(true)
        expect(filterSubscription({ score: 100 })).toEqual(false)
      });

      test('score between', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          score: {
            between: [75, 95]
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ score: undefined })).toEqual(false);
        expect(filterSubscription({ score: 74 })).toEqual(false)
        expect(filterSubscription({ score: 75 })).toEqual(true)
        expect(filterSubscription({ score: 76 })).toEqual(true)
        expect(filterSubscription({ score: 94 })).toEqual(true)
        expect(filterSubscription({ score: 95 })).toEqual(true)
        expect(filterSubscription({ score: 96 })).toEqual(false)
      });
    });
  })

  describe('Graphback scalars', () => {
    describe('GraphbackDateTime', () => {
      test('createdAt eq', () => {

        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            eq: now
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(false);
        expect(filterSubscription({ createdAt: now })).toBe(true);
        expect(filterSubscription({ createdAt: new Date(now.getTime() - 1000 * 60) })).toEqual(false)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 60) })).toEqual(false)
      })

      test('createdAt ne', () => {
        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            ne: now
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(true);
        expect(filterSubscription({ createdAt: now })).toEqual(false);
        expect(filterSubscription({ createdAt: new Date(now.getTime() - 1000 * 60) })).toEqual(true)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 60) })).toEqual(true)
      })

      test('createdAt lt', () => {

        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            lt: now
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(false);
        expect(filterSubscription({ createdAt: now })).toBe(false);
        expect(filterSubscription({ createdAt: new Date(now.getTime() - 1000 * 60) })).toEqual(true)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 60) })).toEqual(false)
      })

      test('createdAt le', () => {

        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            le: now
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(false);
        expect(filterSubscription({ createdAt: now })).toBe(true);
        expect(filterSubscription({ createdAt: new Date(now.getTime() - 1000 * 60) })).toEqual(true)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 60) })).toEqual(false)
      })

      test('createdAt gt', () => {

        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            gt: now
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(false);
        expect(filterSubscription({ createdAt: now })).toBe(false);
        expect(filterSubscription({ createdAt: new Date(now.getTime() - 1000 * 60) })).toEqual(false)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 60) })).toEqual(true)
      })

      test('createdAt ge', () => {
        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            ge: now
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(false);
        expect(filterSubscription({ createdAt: now })).toEqual(true);
        expect(filterSubscription({ createdAt: new Date(now.getTime() - 1000 * 60) })).toEqual(false)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 60) })).toEqual(true)
      })

      test('createdAt in', () => {
        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            in: [now, new Date(now.getTime() - 1000 * 60), new Date(now.getTime() + 1000 * 60)]
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(false);
        expect(filterSubscription({ createdAt: now })).toEqual(true);
        expect(filterSubscription({ createdAt: new Date(now.getDate() - 2000 * 60) })).toEqual(false);
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 60) })).toEqual(true)
        expect(filterSubscription({ createdAt: new Date(now.getDate() + 2000 * 60) })).toEqual(false)
      })

      test('createdAt between', () => {
        const now = new Date()

        const filter: QueryFilter<UserSubscriptionFilter> = {
          createdAt: {
            between: [now, new Date(now.getTime() + 1000 * 600)]
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ createdAt: undefined })).toEqual(false);
        expect(filterSubscription({ createdAt: now })).toEqual(true);
        expect(filterSubscription({ createdAt: new Date(now.getTime() - 1000 * 60) })).toEqual(false)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 600) })).toEqual(true)
        expect(filterSubscription({ createdAt: new Date(now.getTime() + 1000 * 601) })).toEqual(false)
      })
    })

    describe('GraphbackObjectID', () => {
      test('objectId eq', () => {

        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            eq: new ObjectId('5f33fe525ad68ca5954944be')
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34001a967d8ed61dde6e21' })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34001a967d8ed61dde6e21') })).toEqual(false);
      });

      test('objectId string eq', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            eq: '5f33fe525ad68ca5954944be'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34001a967d8ed61dde6e21' })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34001a967d8ed61dde6e21') })).toEqual(false);
      });

      test('objectId ne', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            ne: new ObjectId('5f33fe525ad68ca5954944be')
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34001a967d8ed61dde6e21' })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34001a967d8ed61dde6e21') })).toEqual(true);
      });

      test('objectId string ne', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            ne: '5f33fe525ad68ca5954944be'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34001a967d8ed61dde6e21' })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34001a967d8ed61dde6e21') })).toEqual(true);
      });

      test('objectId le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            le: new ObjectId('5f34032bb0c5675c6287aae1')
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(false);
      });

      test('objectId string le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            le: '5f34032bb0c5675c6287aae1'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(false);
      });

      test('objectId le', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            le: new ObjectId('5f34032bb0c5675c6287aae1')
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(false);
      });

      test('objectId lt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            lt: new ObjectId('5f34032bb0c5675c6287aae1')
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(false);
      });

      test('objectId string lt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            lt: '5f34032bb0c5675c6287aae1'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(false);
      });

      test('objectId gt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            gt: new ObjectId('5f34032bb0c5675c6287aae1')
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(true);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(true);
      });

      test('objectId string gt', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            gt: '5f34032bb0c5675c6287aae1'
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(true);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(false);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(true);
      });

      test('objectId in', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            in: ['5f34032bb0c5675c6287aae1', new ObjectId('5f33fe525ad68ca5954944be')],
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34032bb0c5675c6287aae1') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f34033f6cf30f6f2e6c9da4') })).toEqual(false);
        expect(filterSubscription({ objectId: '5f33fe525ad68ca5954944be' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34032bb0c5675c6287aae1' })).toEqual(true);
        expect(filterSubscription({ objectId: '5f34033f6cf30f6f2e6c9da4' })).toEqual(false);
      });

      test('objectId between', () => {
        const filter: QueryFilter<UserSubscriptionFilter> = {
          objectId: {
            between: ['5f340dafa0a27b6597115911', new ObjectId('5f340dc32fd6f81adb85d9bf')],
          }
        }
        const filterSubscription = createInMemoryFilterPredicate<User>(filter)

        expect(filterSubscription({ objectId: new ObjectId('5f33fe525ad68ca5954944be') })).toEqual(false);
        expect(filterSubscription({ objectId: new ObjectId('5f340dafa0a27b6597115911') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f340dc32fd6f81adb85d9bf') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f340db5385d04649e7f7666') })).toEqual(true);
        expect(filterSubscription({ objectId: new ObjectId('5f340e092f713e77f7804103') })).toEqual(false);
      });
    })
  });

  test('combination filter', () => {
    const filter: QueryFilter<UserSubscriptionFilter> = {
      name: {
        endsWith: 'Simpson'
      },
      age: {
        gt: 10
      },
      verified: {
        eq: true
      }
    }

    const filterSubscription = createInMemoryFilterPredicate<User>(filter)

    expect(filterSubscription({ name: 'Homer Simpson', age: 39, verified: true })).toEqual(true)
    expect(filterSubscription({ name: 'Homer Simpson', age: 38, verified: false })).toEqual(false)
  });

  test('and single', () => {
    const filter: QueryFilter<UserSubscriptionFilter> = {
      name: {
        endsWith: 'Simpson'
      },
      and: [{
        age: {
          gt: 10
        },
        verified: {
          eq: true
        }
      }]
    }

    const filterSubscription = createInMemoryFilterPredicate<User>(filter)
    expect(filterSubscription({ name: 'Homer Simpson', age: 39, verified: true })).toEqual(true)
    expect(filterSubscription({ name: 'Homer Simpson', age: 38, verified: false })).toEqual(false)
  });

  test('and multiple', () => {
    const filter: QueryFilter<UserSubscriptionFilter> = {
      name: {
        endsWith: 'Simpson'
      },
      and: [
        {
          age: {
            gt: 10
          }
        },
        {
          verified: {
            eq: true
          }
        }
      ]
    }

    const filterSubscription = createInMemoryFilterPredicate<User>(filter)
    expect(filterSubscription({ name: 'Homer Simpson', age: 39, verified: true })).toEqual(true)
    expect(filterSubscription({ name: 'Homer Simpson', age: 38, verified: false })).toEqual(false)
  });

  test('not', () => {
    const filter: QueryFilter<UserSubscriptionFilter> = {
      not: {
        name: {
          endsWith: 'Thompson'
        }
      }
    }

    const filterSubscription = createInMemoryFilterPredicate<User>(filter)
    expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true)
    expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(false)
  });

  test('or single', () => {
    const filter: QueryFilter<UserSubscriptionFilter> = {
      name: {
        eq: 'Homer Simpson'
      },
      or: [{
        name: {
          eq: 'Homer Thompson'
        }
      }]
    }

    const filterSubscription = createInMemoryFilterPredicate<User>(filter)
    expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true)
    expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(true)
    expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(false)
  });

  test('or multiple', () => {
    const filter: QueryFilter<UserSubscriptionFilter> = {
      name: {
        eq: 'Homer J Simpson'
      },
      or: [
        {
          name: {
            eq: 'Homer Simpson'
          }
        },
        {
          name: {
            eq: 'Homer Thompson'
          }
        }
      ]
    }

    const filterSubscription = createInMemoryFilterPredicate<User>(filter)
    expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true)
    expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(true)
    expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(false)
  });

  describe('empty or undefined filter', () => {
    describe('empty filter', () => {
      test('should return Predicate that resolves to true', () => {
        const filterSubscription = createInMemoryFilterPredicate<User>({})
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true)
        expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(true)
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(true)
      })
    })

    describe('undefined filter', () => {
      test('should return Predicate that resolves to true', () => {
        const filterSubscription = createInMemoryFilterPredicate<User>(undefined)
        expect(filterSubscription({ name: 'Homer Simpson' })).toEqual(true)
        expect(filterSubscription({ name: 'Homer Thompson' })).toEqual(true)
        expect(filterSubscription({ name: 'Bart Simpson' })).toEqual(true)
      })
    })
  })
});
