---
title: Email and Newsletter
description: This is the process I followed to create emails and newsletter subscriptions, for my blog platform. Creating email with a custom domain name along with a way to ask readers to signup for updates and newsletter blasts.
topic: Ops
format: How-to
keywords:
  - Email
  - Newsletter
createDate: 2024-11-18
createAuthor: John Pennock
image: /images/TwitterPostWide.jpg
imageAlt: A mouse pointer hovering over a tweet button
---

## Email
To create emails with my custom blog domain, I followed [Victor Oyedeji YouTube video](https://www.youtube.com/watch?v=9_ZVsp21Xyg){:target="_blank"} for creating free custom domain accounts at [Zoho Email](https://zoho.com){:target="_blank"}

#### Host?
The first issue I encountered following the instructions at Zoho for creating a custom domain record is the concept of 'Host'.  When I used AWS Route 53 to create the record there is no slot for 'host'.

::FigureCaption
![Language Conflict on dialogs at Zoho vs AWS Route53 TXT](/images/2024/ZohoAWSTXTRecordQuestion.jpg)

#caption
Comparing the different dialog languages at Zoho vs. AWS Route53 TXT Record
::

Assuming they are the same, I added the '@' as the Record name and added the value.  But then it didn't verify for 15 minutes (I had set TTL to 5min)

