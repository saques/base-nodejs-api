# Base NodeJS API REST project template

Use this project as a template when you need to create a new backend platform.

## How to copy

First thing is to create a repository on the hosting of your choice.

Once the repository is created you can follow these commands:

```
git clone https://github.com/saques/base-nodejs-api YOUR_FOLDER_NAME
cd YOUR_FOLDER_NAME
git remove set-url origin YOUR_REPO_URL
git add . -A
git commit -am "Initial commit"
git push origin master
```

## Setup

There are a couple of things you will need to setup after cloning the repo:

- [ ] Set signature header value at `src/utils/middlewares/signatureHeader.ts`
- [ ] Set the `serverless.yml` configuration file. You will need to set up the following properties:
  - [ ] `service`
  - [ ] `provider.role`
  - [ ] `provider.iamRoleStatements` (optional)
  - [ ] `provider.vpc` (optional)
  - [ ] `package.exclude` to include `node_modules/aws-sdk/**` (optional)
