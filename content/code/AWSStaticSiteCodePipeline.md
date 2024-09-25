---
title: CI/CD Nuxt Static Site GitHub to AWS S3
description: Creating AWS infrastructure and pipeline to automatic deploy a GitHub Nuxt 3 Static Rendered site to an S3 bucket with a fully qualified custom DNS 
topic: Ops
isToc: true
createAuthor: John Pennock
createDate: 2023-09-13
image: /images/GitHubAWSCodePipeline.png
imageAlt: GitHub logo + AWS CodePipeline Logo
---

::FigureCaption
![GitHub logo + AWS CodePipeline Logo](/images/GitHubAWSCodePipeline.png)

#caption
CI/CD for a Nuxt 3 Static Site in GitHub to AWS S3 and Route 53
::

To CI/CD a Nuxt static site from a GitHub repository to AWS infrasture, create and configure the following AWS infrastructure.

1. AWS Route 53 Custom Domain
2. AWS S3 bucket configured for Static Site Hosting
3. AWS Route 53 Hosted Zone
4. AWS CodePipeline - Git Sync, AWS CodeBuild, Deploy to S3 Bucket

### Resources
The following videos illustrate many of the steps used here:
- [Amazon S3 - Static Website Hosting with Custom Domain and TLS by Bryan Krausen](https://www.youtube.com/watch?v=X9cdkqBgLbs)
- [AWS CodePipeline CI/CD by DevSpot](https://www.youtube.com/watch?v=jZrfiPW58k8&ab_channel=DevSpot)
- [Amazon Route 53 Basics Tutorial | Domain Registration, A Records, CNAME Records, Aliases, Subdomains by Tiny Technical Tutorials](https://www.youtube.com/watch?v=JRZiQFVWpi8&ab_channel=TinyTechnicalTutorials)

## Custom Domain
Create, transfer, or attach nameservers to your custom domain in AWS Route 53.

## AWS S3 Bucket for Static Site

### S3 Bucket Name
You must name the S3 Bucket exactly the same as your custom Domain name, i.e. for 'pennocks.net' custom domain, create a bucket named `pennocks.net`. Otherwise, your endpoint will not be visible as an alias for the Route 53 record

### S3 Bucket Permissions

#### Block all public access

S3 Bucket Permissions `Block all public access` should be set to Off

#### Bucket Policy
Add a bucket policy for object access, replace `{{BucketName}}` with your bucket name.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::{{BucketName}}/*"
        }
    ]
}
```
### S3 Bucket Properties

| Property | State |
|----------|-------|
| Static website hosting | Enable |
| Hosting type | Host a static website |
| Index document | index.html |
| Error document - optional | 404.html |

## AWS Route53 Hosted Zone
Create a Hosted Zone in Route53, use the name of the custom domain and make sure it is public

### Create Domain Root ANAME record

In your Hosted Zone choose 'Create record' for your root

| Field | State |
|-------|-------|
| Record name |  (leave blank for root) |
| Record type | A - Routes traffic to AWS resource |
| Route traffic to endpoint | Alias to S3 website endpoint |
| Route traffic to region | (choose your region) |
| Enter S3 endpoint | (pick your endpoint, should be in dropdown list if your  S3 bucket name matches domain name) |

### Create a redirect for subdomain `www`

In your Hosted Zone choose 'Create record' for your root

| Field | State |
|-------|-------|
| Record name | 'www' |
| Record type | A - Routes traffic to AWS resource |
| Route traffic to endpoint | Alias to another record in this hosted zone |
| Route traffic to Choose record | (pick your root domain) |

## AWS CodePipeline

The AWS CodePipeline will perform three tasks.
1) Attach and watch a GitHub repo branch for changes
2) Initiate AWS Codebuild and generate your Nuxt 3 Static Site
3) Copy the built Nuxt Static Site into your S3 site bucket


Creating a pipeline

- Create a unique name for the pipeline
- Choose Queued
- Leave the pipeline role

Next

### GitHub Git Sync

Choose a stage source 

| Field | State |
|-------|-------|
| Source Provider | 'GitHub (version 2)' |
| Connection | Use existing or choose 'Connect to GitHub' |
| Repository name | (pick your repo) |
| Default branch | (pick your branch) |
| Output artifact format | CodePipeline default |
| Trigger - Trigger type | No filter (launches on push) |

Next 

### CodeBuild
Build - Optional

Build provider → AWS codeBuild

| Field | State |
|-------|-------|
| Build Provider | 'AWS CodeBuild' |
| Region | (pick your region) |
| Input artifacts | SourceArtifact (from the GitHub sync above) |
| Project Name | (pick your project name or choose 'Create Project') |
| Environment variables | (leave blank or add) |
| Build type | Single build |

#### Create Build Projects

| Field | State |
|-------|-------|
| Project name | (pick a project name) |
| Source 1 - Primary | Source provider - AWS CodePipeline |
| Environment Provisioning model | On-demand |
| Environment image | Managed image |
| Environment Compute | EC2 |
| Operating system | Amazon Linux |
| Runtime(s) | Standard |
| Image | 'aws/codebuild/amazonlinux2-x86_64-standard:5.0' |
| Image Version | Always use the latest image for this runtime version |
| Buildspec Build specifications | Use a buildspec file |
| Buildspec name | (leave blank or `buildspec.yml`) |

### buildspec.yml

Add the following [buildspec.yml](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html) file to your repo and this will be in the instruction to build the Nuxt static site as well as inidcating where the built files will exist after build.

```yml
version: 0.2

phases:
  install:
    commands:
      - npm install
  build:
    commands:
      - npm run generate
artifacts:
  files:
    - '**/*'
  base-directory: 'dist'
```


### Deploy to S3 Bucket

The third stage deploys the built files to the S3 website bucket

| Field | State |
|-------|-------|
| Deploy provider | 'Amazon S3' |
| Region | (pick your Region, same as build) |
| Input artifacts | 'BuildArtifact' |
| Bucket | (pick your bucket) |
| Extract file before deploy | enabled |

### Verify

Your code pipeline should run with all three steps being successful.
