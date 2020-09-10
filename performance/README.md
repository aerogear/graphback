Benchmark RSS, Startup time, Latency, Throughput and CPU usage of a GraphQL APIs.

# Usage

Make sure that the project is already built before running the scripts. 
See the [contributing guide](../CONTRIBUTING.md#build)

## Run in your local machine
```shell
yarn
yarn start
```

Follow the instruction and chose one, two or more [benchmarks](./benchmarks) you want to run and compare.

Once the run is complete, results will be generated in the `results` directory and a nice statistics table will be displayed.

## Run inside docker with limited resources

The script to launch this is located in the project root folder. 

```shell
cd ../
yarn
yarn bench:docker
```

This will constrain the container memory to `256m` and `2` cpu cores. If you are running on Windows or have less than 2 cores, you would need to adapt the command to your environment.

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
