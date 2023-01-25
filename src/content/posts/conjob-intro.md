---
layout: post
title: Introducing ConJob
image: img/docker_sysbox.png
date: 2022-06-10T01:12:19Z
draft: false
excerpt: A simple web service to run containers as jobs or serverless functions
tags:
  - Docker
  - Java
  - CI
---

## What is ConJob?

[ConJob](https://github.com/ScottG489/conjob) is a service for running "job" containers, with a focus on [CI](https://en.wikipedia.org/wiki/Continuous_integration)
use cases.

For a container to be considered a job, it should have 3 defining properties:
- it's ephemeral (exits of its own accord in a reasonable amount of time)
- it accepts input
- it returns any stdout and stderr output to the caller

The idea is that you can run these job images easily in any environment, with ConJob or just with Docker,
and reproduce the same results.

## What problem does it solve?

An important aspect missing from nearly all CI offerings is **local reproducibility**: builds pass on your
local machine but fail in CI. This is challenging to debug and makes it slow to iterate on changes.

The first time I can remember being frustrated with a CI job was the first time I encountered a failing one.
Like many others, we used [Jenkins](https://en.wikipedia.org/wiki/Jenkins_(software)) at my company.
The jobs were defined by a script typed into a text area in the Jenkins GUI, and the environment was a number of [special
snowflake](https://martinfowler.com/bliki/SnowflakeServer.html) servers we had provisioned manually.

More times than I can remember there would be a failure on CI that we couldn't reproduce locally. Attempts to get the build green
usually involved making some code changes, pushing them, then seeing if it had the desired effect.

The spiral into insanity would usually look like this:
1. Carefully analyze the problem, write up some elegant code, craft a [nicely written commit message](https://cbea.ms/git-commit/),
   and push.
2. [Doesn't work]
3. Do everything the same except faster and less elegant.
...

24. Throw shit at the wall, then run my finely tuned one-liner to "iterate" on my newest idea:
    
    `git commit --no-verify -a -m 'HAAAAAAAAANDS' && git push --force --no-verify`

Although things with CI have gotten better recently with code based configuration (usually YAML files),
this hasn't solved the problem of local reproducibility. Those YAML files can only be consumed by the remote CI service.

There are some tools like [act](https://github.com/nektos/act) for [GitHub Actions](https://docs.github.com/en/actions)
which attempt to replicate what's happening on CI when you push your code, but there's no substitute for
the real thing. In fact, the first time I tried to use `act` to replicate a CI issue it was unable to do so.

***Since I started using ConJob as the CI server for all my projects, I have yet to find an issue I cannot
replicate on my local machine.***

## The solution
ConJob provides as thin of a layer as possible on top of Docker. You tell it what image to run,
optionally provide input to the job, then it returns to you any output. This also allows it to be used in a "serverless"
capacity (with the understanding that there will be the usual overhead of starting a container for each request). 

If you must, you could say it's "Docker as a service", but please don't :)

To reproduce a CI build failure locally, you'd simply run the same image with the same inputs.

## Using ConJob
Getting started with ConJob is easy. Since those using ConJob are likely to be avid users of Docker, the best way to
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
curl --data 'foobar' 'localhost:8080/job/run?image=scottg489/echo-job:latest'
```
More info can be found in [the project's README](https://github.com/ScottG489/conjob/blob/master/README.md#build-and-run-from-source)
on how to build and run from source.

### A note on serverless
Since ConJob can run any image and return the resulting output, it also has the possibility to be used as a serverless backend.
This use case is probably best saved for requests that are asynchronous or slow enough so that the overhead of spinning
up a container won't be noticeable.

If you're curious what this would look like, check out my other project [metadiff-ui](https://github.com/ScottG489/metadiff-ui)
(which is, of course, also built with ConJob) and hosted at [metadiff.com](https://metadiff.com) as a proof of concept of
using ConJob in this way, albeit maybe not the best use case.

## A little extra
As avid Docker users, you'd probably like to use it inside your jobs, particularly if you're using it for CI.
To support this, ConJob allows you to specify a different [container runtime](https://github.com/opencontainers/runtime-spec).
This will be the [runtime](https://docs.docker.com/engine/reference/commandline/run/#options) that the containers (jobs)
being run by ConJob are started with:
```shell
docker run -it \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e CONTAINER_RUNTIME=sysbox_runc \
  scottg489/conjob
```
The [Sysbox](https://github.com/nestybox/sysbox) runtime is perfect for running Docker-in-Docker and is really the
underlying technology that made this project feasible. *Note that you'll need to have the [Sysbox runtime installed](https://github.com/nestybox/sysbox#installation)
for this to work.*

There are plenty of other configuration options as well such as auth, job limits, and container registry login for using
a container registry other than [Docker Hub](https://hub.docker.com/) (e.g. [GitHub Container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)).
For a full list of all configuration options see the [default-config.yml](https://github.com/ScottG489/conjob/blob/master/default-config.yml)
file.

## Wrapping up
So that's ConJob! There's a lot more going on under the surface such as caching between runs and support for secrets.
Future plans include adding per-job configuration and a UI.
So let me know in the comments if you'd be interested in a deeper dive.
I'm also looking for any kind of feedback, ideas, or problems you run into while trying it yourself.

---

For the time being, you can try ConJob with nothing more than an internet connection:

https://try.conjob.io/job/run?image=library/hello-world:latest

Just change the `image` query param to an image that can be run as a job (i.e. exits on its own).
Also see the `curl` examples above for providing input to your job.

Be aware that there are some job limitations (duration, etc.) at the moment.
