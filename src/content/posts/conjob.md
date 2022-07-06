---
layout: post
title: Introducing Conjob
image: img/dropwizard-logo.png
date: 2022-06-10T01:12:19Z
draft: true
excerpt: A service for running containers as jobs
tags:
  - Docker
  - Java
  - CI
---

What is it?
Conjob is a services for running containers as jobs, with a focus on CI use cases.

How do you use it?

What problem does it solve?
I found a very important aspect missing from nearly all CI offerings: **local reproducibility**.

The first time I can remember being frustrated with a CI job was at my second job, but my first where I
encountered CI. As with I'm sure many others, my first experience with CI was with Jenkins.
The job was a script typed into a text area, and the environment was a number of special snowflake servers
we had provisioned manually.

More times than I can remember there would be a failure on CI that we couldn't reproduce locally or there was
something we wanted to add or change about the configuration. This usually involved making some code changes,
pushing them, then seeing if it had the desired effect.

The spiral into insanity would usually look like this:
1. Carefully analyze the problem, write up some neat code, craft a nicely written commit message, and push. (TODO: link to commit message article)
2. Doesn't work
3. Do everything the same except faster and less neat
...

24. Throw shit at the wall then run my finely tuned one-liner to "iterate" on my newest idea:
    
    `git commit --no-verify -a -m 'f' && git push --force --no-verify`

Nearly all CI offerings I've come across have you configure your CI pipelines with yaml files.
