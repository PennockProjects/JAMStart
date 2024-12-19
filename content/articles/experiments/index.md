---
title: Experiments
description: Using my blog to validate a prototype, concept, or code.
topic: General
format: List
---

{{ description }}

## PDF Viewer 
The [DGT SDS home page](/articles/experiments/pdfviewer/dgt) for this experiment

### Notes
- [Clorox SDS](/experiments/dgt/sds/clorox) and [Sharpie SDS](/experiments/dgt/sds/sharpie) uses [Vue PDF Viewer](https://www.vue-pdf-viewer.dev/)
  - This should work on Browser, Android, and Apple
- [WD-40 SDS](/experiments/dgt/sds/wd40) uses Browser Embed PDF Viewer
  - This didn't seem to work on my Android Chrome
- [Riviera Apartment](/articles/experiments/pdfviewer/orgs/riviera) has a hard coded QR code
  - I'm unhappy with ~~qrcodecreator.com~~ - the original QR code I generated expired after a a week and they wanted me to upgrade
  - Instead, I used the [bitly.com](https://bitly.com/) and they had 3 free QR non-expiring codes per month, perfect for an experimenter like me.
- [MSDS Digital](https://msdsdigital.com/){:target="_blank"} is a general website that provides SDS services for poster printing and e-book binders for a fee.
  - It doesn't use QR Codes
  - It claims you have to have a printed binder per job site per osha
- [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) has a 'pdfViewerEnabled' flag enabled
