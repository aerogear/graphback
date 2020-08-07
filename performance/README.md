Benchmark RSS, Startup time, Latency, Throughput and CPU usage of a GraphQL APIs.

# Usage

```
npm install
npm start
```

Follow the instruction and chose one, two or more [benchmarks](./benchmarks) you want to run and compare.

Once the run is complete, results will be generated in the `results` directory and a nice statistics table will be displayed.

## Which one is fast ?

Run the below command to compare which server is fast.

```shell
yarn compare
```

## Statistics table

Run the below command to generate statistics table which can be used to visualise detailed data.

```shell
yarn compare:stats
```

# Troubleshoot

The benchmark will launch server on port `29128`, this is closed once each test is finished. 
In situation where this port remain occupied, launch the following command to free the port for other usage.

```shell
kill $(lsof -t -i:29128)
```

# TODO

- [x] Add other server e.g fastify, hapi and see how they fare.
- [ ] Add more statistics details e.g 99th percentile, median etc in the descriptive table
- [ ] Benchmark create
- [ ] Benchmark delete
- [ ] Benchmark update
- [ ] Benchmark relationships
- [ ] Add real databases e.g sqlite, postgres, mongo and see how they fare vs one another
