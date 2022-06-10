---
layout: post
title: Updating Dropwizard configuration at runtime
image: img/dropwizard-logo.png
date: 2020-11-20T05:32:36Z
draft: false
excerpt: A guide to dynamically updating your configuration at runtime via a Dropwizard task endpoint
tags:
  - Dropwizard
  - Java
  - Guide
---

# An example Dropwizard application demonstrating runtime configuration
Although this feature isn't supported out of the box by dropwizard, you're able to update your configuration at
runtime fairly easy with the tools they give you.

Before I get started, note that this **doesn't persist** the updated config values to the `config.yml`.
However, this would be easy enough to implement yourself simply by writing to the config file from the
application. If anyone would like to write this implementation feel free to
[open a PR](https://github.com/ScottG489/dropwizard-runtime-config-example/pulls) on the example project
I've linked below.

##### An example application can be found at [scottg489/dropwizard-runtime-config-example](https://github.com/ScottG489/dropwizard-runtime-config-example)

## Code
Start off with a minimal config:

[config.yml](https://github.com/ScottG489/dropwizard-runtime-config-example/blob/master/config.yml)
```yaml
myConfigValue: "hello"
```

And it's corresponding [configuration](https://www.dropwizard.io/en/latest/manual/core.html#configuration) file:

[ExampleConfiguration.java](https://github.com/ScottG489/dropwizard-runtime-config-example/blob/master/src/main/java/example/ExampleConfiguration.java)
```java
public class ExampleConfiguration extends Configuration {
    private String myConfigValue;

    public String getMyConfigValue() {
        return myConfigValue;
    }

    public void setMyConfigValue(String value) {
        myConfigValue = value;
    }
}
```

Then create a [task](https://www.dropwizard.io/en/latest/manual/core.html#tasks) which updates the config:

[UpdateConfigTask.java](https://github.com/ScottG489/dropwizard-runtime-config-example/blob/master/src/main/java/example/task/UpdateConfigTask.java)
```java
public class UpdateConfigTask extends Task {
    ExampleConfiguration config;

    public UpdateConfigTask(ExampleConfiguration config) {
        super("updateconfig");
        this.config = config;
    }

    @Override
    public void execute(Map<String, List<String>> parameters, PrintWriter output) {
        config.setMyConfigValue("goodbye");
    }
}
```

Also, for demonstration purposes, create a [resource](https://www.dropwizard.io/en/latest/manual/core.html#man-core-resources) which allows you to get the config value:


[ConfigResource.java](https://github.com/ScottG489/dropwizard-runtime-config-example/blob/master/src/main/java/example/resource/ConfigResource.java)
```java
@Path("/config")
public class ConfigResource {
    private final ExampleConfiguration config;

    public ConfigResource(ExampleConfiguration config) {
        this.config = config;
    }

    @GET
    public Response handleGet() {
        return Response.ok().entity(config.getMyConfigValue()).build();
    }
}
```

Finally, wire everything up in your [application](https://www.dropwizard.io/en/latest/manual/core.html#application):

[ExampleApplication.java](https://github.com/ScottG489/dropwizard-runtime-config-example/blob/master/src/main/java/example/ExampleApplication.java#L19)

```java
public class ExampleApplication extends Application<ExampleConfiguration> {
    public static void main(String[] args) throws Exception {
        new ExampleApplication().run(args);
    }

    @Override
    public String getName() {
        return "dropwizard-runtime-config-example";
    }

    @Override
    public void run(ExampleConfiguration configuration, Environment environment) {
        environment.jersey().register(new ConfigResource(configuration));
        environment.admin().addTask(new UpdateConfigTask(configuration));
    }
}
```

## Usage
Start up the application
```shell
./gradlew clean build install && \
    ./build/install/dropwizard-runtime-config-example/bin/dropwizard-runtime-config-example server config.yml
```

Then verify everything is working as expected:
```shell
$ curl 'http://localhost:8080/config'
hello
$ curl -X POST 'http://localhost:8081/tasks/updateconfig'
$ curl 'http://localhost:8080/config'
goodbye
```

## How it works
This works simply by passing the same reference to the constructor of `ConfigResource.java` and `UpdateConfigTask.java`. If you aren't familiar with the concept see here:
https://stackoverflow.com/questions/40480/is-java-pass-by-reference-or-pass-by-value

The linked classes above are to a project I've created which demonstrates this as a complete solution:

##### [scottg489/dropwizard-runtime-config-example](https://github.com/ScottG489/dropwizard-runtime-config-example)
\
\
\
_Footnote: I haven't verified this works with the [built in configuration](https://www.dropwizard.io/en/latest/manual/configuration.html). However, the dropwizard [Configuration](https://www.dropwizard.io/en/latest/manual/configuration.html) class (which you need to extend for your own configuration) does have various "setters" for the internal configuration._
