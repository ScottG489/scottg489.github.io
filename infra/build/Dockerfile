FROM ubuntu:20.04

RUN apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  git \
  npm \
  awscli \
  jq \
  curl \
  unzip \
  # Required for Cypress
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
   && apt-get clean \
   && rm -rf /var/lib/apt/lists/*

ARG TERRAFORM_VERSION=0.12.26
RUN curl https://releases.hashicorp.com/terraform/$TERRAFORM_VERSION/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -o /tmp/terraform.zip && \
  unzip -d /usr/local/bin /tmp/terraform.zip && \
  rm /tmp/terraform.zip


RUN useradd -m -u 1000 -s /usr/bin/bash build-user
USER build-user

ARG NODE_VERSION=16.13.1
ENV NODE_VERSION $NODE_VERSION
ENV NVM_DIR /home/build-user/.nvm

# Install nvm with node and npm
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
RUN . $NVM_DIR/nvm.sh \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN mkdir /home/build-user/.ssh
COPY known_hosts /home/build-user/.ssh/known_hosts

RUN mkdir /home/build-user/.aws
COPY config /home/build-user/.aws/config

COPY gitconfig /home/build-user/.gitconfig

RUN mkdir -p /home/build-user/build
COPY run.sh /home/build-user/build/run.sh
COPY run-test.sh /home/build-user/build/run-test.sh
COPY build_functions.sh /home/build-user/build/build_functions.sh

WORKDIR /home/build-user/build
ENTRYPOINT ["./run.sh"]
