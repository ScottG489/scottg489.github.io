---
layout: post
title: Introducing ConJob
image: img/docker.png
date: 2022-06-10T01:12:19Z
draft: true
excerpt: A service for running containers as jobs
tags:
  - Docker
  - Java
  - CI
---

### What is it?

[ConJob](https://github.com/ScottG489/conjob) is a service for running containers as jobs, with a focus on CI use cases.

### What problem does it solve?

I found a very important aspect missing from nearly all CI offerings: **local reproducibility**.

The first time I can remember being frustrated with a CI job was at my second job, but my first where I
encountered CI. Like many others, my first experience with CI was with [Jenkins](https://en.wikipedia.org/wiki/Jenkins_(software)).
The job was a script typed into a text area, and the environment was a number of special snowflake servers
we had provisioned manually.

More times than I can remember there would be a failure on CI that we couldn't reproduce locally or there was
something we wanted to add or change about the configuration. This usually involved making some code changes,
pushing them, then seeing if it had the desired effect.

The spiral into insanity would usually look like this:
1. Carefully analyze the problem, write up some elegant code, craft a [nicely written commit message](https://cbea.ms/git-commit/),
   and push.
2. Doesn't work
3. Do everything the same except faster and less elegant
...

24. Throw shit at the wall, then run my finely tuned one-liner to "iterate" on my newest idea:
    
    `git commit --no-verify -a -m 'HAAAAAAAAANDS' && git push --force --no-verify`

Although things with CI have gotten better recently with code based configuration (usually YAML files),
this hasn't solved the problem of local reproducibility. Those YAML files can only be consumed by the remote
CI service. There are some tools like [act](https://github.com/nektos/act) for [GitHub Actions](https://docs.github.com/en/actions)
which attempt to replicate what's happening on CI when you push your code, but there's no substitute for
the real thing. In fact, the first time I tried to use `act` to replicate a CI issue it was unable to do so.

Since I started using ConJob as the CI server for all my projects, I have yet to find an issue I cannot
replicate on my local machine.

### The solution
ConJob provides as thin of a layer as possible on top of docker. You tell it what image to run,
optionally provide parameters, then it returns to you any output. This also allows it to be used in a "serverless"
capacity with the understanding that there will be the usual overhead of starting a container for each request. 
If you must, you could say it's "docker as a service".

### How do you use it?
Getting starting with ConJob is easy. Since those using ConJob are likely to be avid users of docker, the best way to
run ConJob is:
```shell
docker run -it \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  scottg489/conjob
```
Then make a request to run a job:
```shell
curl 'localhost:8080/job/run?image=library/hello-world:latest'
```
Or try making a request with input:
```shell
curl -X POST --data 'foobar' 'localhost:8080/job/run?image=scottg489/echo-job:latest'
```
