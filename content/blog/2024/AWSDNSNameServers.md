---
title: Route 53 Name Servers DNS Issues
description: Some troubleshooting for resolving a Route53 custom domain issue with a AWS Certificate Manager 'Validation Timed Out'
topic: Ops
isToc: true
version: 1.0
createDate: 2024-09-24 
createAuthor: John Pennock
image: '/images/2024/AWSCertificateIssued.jpg'
imageAlt: An AWS Certificate successfully issued
---


## TLDR

There are two locations to add the AWS DNS Name Servers
1) Route53 - HostedZone - NS Record
2) Route53 - Registered Domains - Details - Name Servers

Use [MX Toolbox Super Tool](https://mxtoolbox.com/DnsLookup.aspx) for quick checking of whether your Name Servers are working.

## Troubleshooting

Below are some troubleshooting steps I took and some learnings I made when I encountered DNS issues when deploying my static site generated blog site (this site) to an S3 bucket and using a Route 53 custom domain. I had followed several YouTube guides, including ones from AWS, on how to connect a custom domain to my S3 bucket site.  I was at the stage where my site was publicly hosted and accessible via the direct S3 public link but was not accessible at my custom domain name.

### The problem

::figure-caption
![Route 53 Hosted Zone with NS (NameServer) record](/images/2024/Route53HostedZoneNameServers.jpg)
#caption
All looks good from the Route 53 Hosted Zone Dashboard
::

In my hosted zone for custom domain everything looked correct.
- I had a `A record` to my S3 bucket alias.
- I had a `Name Server (NS) record` with all the AWS name servers in it
- Running the `Test record` button said my site was 'OK'.  

However, when I typed the custom domain in my browser, nothing came up.

### Troubleshooting - using 'http:'

The first thing I tried was to use `http://{CustomDomain}` My thinking is perhaps my browser was automatically tacking `https:` to the front and because at this stage I didn't have Certificate issued yet, that was what was causing a lack of resolution.  But this troubleshooting step didn't reveal the issue yet.  It still wouldn't resolve.

### Troubleshooting - adding a Certificate
Still operating under the false impression that my problem was a security issue, I decided to add a Certificate via the AWS Certificate Manager to my domain.  When requesting a certificate, you are presented with two options for validation
1. Use DNS
2. Use Email

#### Using DNS Validation

I picked 'Use DNS' because it was the recommended default and I figured that with my custom domain being hosted in AWS the validation would be trivial.  I waited.  and waited..  and waited... 72 hours later, I received the dreaded 'Validation Timed Out'.  

### Learning - Create Cert Records

In trying to troubleshoot my troubleshooting step of creating a certificate where my 'Validation Timed Out', I thought a bit more about the two options - 'Use DNS' or 'Use Email'.  While I was fairly certain I could use the Email validation, it would mask the problem. What wasn't clear to me is how 'Use DNS' worked. I thought that it was just going to make sure my AWS account owned the Custom Domain. What really is happening is that it attempts reach  your Custom Domain CNAME record of the same number as the certificate. Only then are you 'validated'. This should take minutes not days or hours.

Fortunately, there is a 'button' in the certificate details page for creating the matching CNAME records in your custom domain hosted Zone. It *should* have been documented somewhere that you are *required* to do this in order for validation to succeed.  Remember to push the button!

However, the root problem remained unaddressed.  And after creating the certificate CNAME record in my custom domain hosted zone, it still showed 'Pending'. Not wanting to wait another 72 hours for it to timeout, I decided to take my 3rd troubleshooting step.

### Troubleshooting - Using External DNS tools
As my new certificate was still 'pending' I finally realized that my custom domain could not be reached publicly, at all.

I used [MX Toolbox Super Tool](https://mxtoolbox.com/DnsLookup.aspx) to validate public access and sure enough, my custom domain was not in any of the internet name servers.

I probably should have started with this troubleshooting step.

## Root Problem
Next, I doubled checked my hosted zone NS record. I had assumed that was all I needed. I validated the AWS name servers there were official and real. With a couple of Stack Overflow queries I found a reference to the registered domain needed the name servers in addition to the NS record.

::figure-caption
![Route 53 Dashboard showing Registered Domain option](/images/2024/Route53RegisteredDomainsChoice.jpg)
#caption
Registered Domain option vs. Hosted Zone
::

When I looked at my registered custom domain, it had already had two name servers assigned but I didn't recognize them - ns67.domaincontrol.com and ns68.domaincontrol.com. I used the MX toolbox to examine them, and it turns out that they are GoDaddy name servers! Finally, the root problem was found. I had originally registered the custom domain at GoDaddy and transferred it to AWS. The GoDaddy Name Servers came along for the ride. If I had registered the domain using AWS those name servers would have been correct to start with.

## Solution

So I just added my four AWS name servers from the hosted zone NS record to my registered domain name servers.
::figure-caption
![Route 53 Registered Domain Name Servers](/images/2024/Route53RegisteredDomainsNameServer.jpg)
#caption
Registered Domain needs AWS Name Servers!
::

### Learning - Update Registered Domain

::MonkInset{size = 'lg' float = 'right'}
![An AWS Certificate successfully issued](/images/2024/AWSCertificateIssued.jpg)
::

And a few minutes later I could see my site in the browser and miraculously also the certificate I created was finally issued.


## Unresolved Learning
I still don't know why my hosted zone and my registered domain have duplicate name servers.  What's the point of the hosted zone NS record?