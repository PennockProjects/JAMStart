---
title: CI/CD GitHub AWS S3 Site Custom Domain
description: Creating AWS infrastructure and pipeline to automatic deploy a GitHub Nuxt 3 Static Rendered site to an S3 bucket with a fully qualified custom DNS 
topic: CICD
isToc: true
createAuthor: John Pennock
createDate: 2023-09-13
image: /images/GitHubAWSCodePipeline.jpg
imageAlt: GitHub logo and AWS CodePipeline Logos
---

::FigureCaption
![GitHub logo + AWS CodePipeline Logo](/images/GitHubAWSCodePipeline.jpg)

#caption
CI/CD for a Static Site in GitHub to AWS S3 and Route 53
::

A CI/CD pipeline that will automatically build and deploy a Nuxt static site from a push to a GitHub repository, build the site, and deploy to AWS infrastructure for a custom domain, requires the following steps.

1. Custom Domain
2. AWS S3 bucket configured for Static Site Hosting
3. AWS CodePipeline - Git Sync, AWS CodeBuild, Deploy to S3 Bucket
4. AWS Route 53 hosted zone
    - Non-certificate (http warning)
    - CloudFront with certificate (https)
5. AWS CloudFront Distribution
6. AWS Certificate for https


### Resources
The following videos illustrate many of the steps used here:
- [Amazon S3 - Static Website Hosting with Custom Domain and TLS by Bryan Krausen](https://www.youtube.com/watch?v=X9cdkqBgLbs)
- [AWS CodePipeline CI/CD by DevSpot](https://www.youtube.com/watch?v=jZrfiPW58k8&ab_channel=DevSpot)
- [Amazon Route 53 Basics Tutorial | Domain Registration, A Records, CNAME Records, Aliases, Subdomains by Tiny Technical Tutorials](https://www.youtube.com/watch?v=JRZiQFVWpi8&ab_channel=TinyTechnicalTutorials)

## Custom Domain
Create, transfer, or attach nameservers to your custom domain in AWS Route 53.
Yes, do this first.

## AWS S3 Bucket for Static Site

### S3 Bucket Name
You must name the S3 Bucket exactly the same as your custom Domain name, i.e. for 'pennockprojects.com' custom domain, create a bucket named `pennockprojects.com`. Otherwise, your endpoint will not be visible as an alias for the Route 53 record

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
| Error document - optional | 404.html (or whatever you have) |

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

### Pipeline Git sync

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

### Pipeline CodeBuild
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

### Pipeline buildspec.yml

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


### Pipeline deploy

The third stage deploys the built files to the S3 website bucket

| Field | State |
|-------|-------|
| Deploy provider | 'Amazon S3' |
| Region | (pick your Region, same as build) |
| Input artifacts | 'BuildArtifact' |
| Bucket | (pick your bucket) |
| Extract file before deploy | enabled |

### Verify

Your code pipeline should run, and when all three steps are done you can validate at:
  
  S3 → {static site bucket} → properties → Static website hosting | Bucket website endpoint

## AWS Route53 hosted zone
To use your S3 static site bucket with a custom domain name, you need an AWS Route53 hosted zone.  If you acquired your custom domain through Route53, the hosted zone will be automatically setup. If you transferred your custom domain names into Route53, you may need to create one.

#### Creating Public hosted zone
Creating a hosted zone is simple, double-check that it is 'Public hosted zone'.

#### Default hosted zone
A new hosted zone in Route53, should have two records in it. 

| Record | Type | Value |
|--------|------|-------|
| {custom domain name} | NS | {set of AWS name servers} |
| {custom domain name} | SOA | {single AWS name server} |

You can create a hosted zone without certification or with certification.

## Option A - No-cert
::FigureCaption
![Flow Chart with Route53 and S3 static bucket](/images/blog/Route53_S3.jpg)

#caption
Chart showing how users interact with Route53 and S3 for your site
::

### No-cert ANAME record

In your hosted zone choose 'Create record' for your root

| Field | State |
|-------|-------|
| Record name |  (leave blank for root) |
| Record type | A - Routes traffic to AWS resource |
| Route traffic to endpoint | Alias to S3 website endpoint |
| Route traffic to region | (choose your region) |
| Enter S3 endpoint | (pick your endpoint, should be in dropdown list) (only if your S3 bucket name matches domain name) |

#### Verify
Your hosted zone should now have at least three records in the record set.
1. NS record
2. SOA record
3. ANAME record - Domain to S3

## Option B - Cert

In order to create a certificate for your site, you need a CloudFront distribution and a certificate issued for that distribution.  You will also create a CNAME record that will point your domain name to your CloudFront Distribution.

::FigureCaption
![Flow Chart with Route53 CloudFront and S3 static bucket](/images/blog/ChartRoute53CloudFrontS3.jpg)

#caption
Chart showing how users interact with Route53, CloudFront, Certificate Manager and S3 for your site
::

### Request certificate
To request a new certificate :ticket: use the AWS certificate manager.
- AWS Certificate Manager → Certificates → Request

### Certificate properties
| Field | State |
|-------|-------|
| Certificate type | 'Request a public certificate' |
| Domain names : Fully qualified domain names | {custom domain name} |
| Optional - Domain names : Add another name to this certificate | www.{custom domain name} |
| Validation method | DNS validation |

### CNAME cert records
In order to DNS validate your certificate you need to add one or two CNAME records to your hosted zone.  Conveniently from the certificate request details you can automatically create the records. Choose the 'create CNAME records' button.

:stop_sign: Important - DNS validation *requires* these CNAME records to be created.

Wait until it the certificate is issued.

### AWS CloudFront Distribution

In AWS CloudFront choose 'Create CloudFront Distribution' and change the following

| Field | State |
|-------|-------|
| Origin : Origin domain | {insert your S3 Bucket website endpoint (no 'http://')} |
| Default cache behavior : Viewer protocol policy | Redirect HTTP to HTTPS |
| Settings: Alternate domain name (CNAME) - optional | {custom domain name} |
| Optional - Settings: Alternate domain name (CNAME) - optional | www.{custom domain name} |
| Settings: Custom SSL certificate - optional | {pick your certificate from dropdown} |
| Settings: Price class | Use only North America and Europe |

#### Verify

Your hosted zone should now have at least four or maximum five records in the hosted zone record set.
1. NS record
2. SOA record
3. CNAME record(s) for certificate - 1 or 2 depending on if you included 'www' or not
4. ANAME record - Domain to CloudFront


## ANAME 'www' redirect

Optionally, if you've created your certificate and CloudFront distribution with 'www', you need to create an ANAME 'www' redirect.
In your hosted zone choose 'Create record' for your root

| Field | State |
|-------|-------|
| Record name | 'www' |
| Record type | A - Routes traffic to AWS resource |
| Route traffic to endpoint | Alias to another record in this hosted zone |
| Route traffic to Choose record | (pick your ANAME domain without the 'www') |

#### Verify

After your certificate is issued and the CloudFront distribution is deployed, you can validate that your custom domain opens your static site hosted from S3.


