---
title: "Self-Hosting Images: My Journey to Immich"
description: "From Apple Photos to Google Photos to Lightroom Cloud and finally to self-hosted Immich - my journey finding the right photo management solution"
pubDate: 2024-12-10
author: "Dan"
featured: false
tags: ["self-hosting", "photography", "immich", "photo management"]
---

![Luke Hand](/images/blog/luke-hand.jpg)

I joined started digital photography very early, maybe too early and should have looked more into film for a while.  My earliest photos that I still have are from 2000 taken on a [Fuji FinePix 2400 Zoom](https://www.dpreview.com/products/fujifilm/compacts/fuji_finepix2400z).

The way I hosted these changed quite a bit over the years, I think it went something like this:
1. Self hosted using my [own photo album script](https://github.com/dcardamo/palbum)) and serving from a linux desktop attached to my cable modem.
2. Flickr or something like that I vaguely remember
3. Smugmug - This was great but I remember it had few features compared to Google Photos and seemed to cater towards photographers who would sell photos (e.g. Wedding)
4. Google Photos
5. Apple Photos
6. Lightroom Cloud
7. Self Hosting and Immich

I'm going to cover from Google Photos to today, the benefits and tradeoffs with each.

I think my requirements changed over the years too as I was looking for ways to create a library that my family could add to, that I could backup myself, have new fancy features like search, etc.

## Google Photos

I switched to Google Photos from Smugmug because it had lots of great shiny features such as face searching, automatic memories, etc.  Coming from Smugmug it looked like the pace of development was incredible.

When I started using Google Photos I was still able to own a copy of my files.  Google Drive mirrored your Photos so it was really easy for me to see all the plain image files and folders and create backups.   Google over the years removed this and locked you in to just Photos and stopped making it easy to get an original file with metadata back.

In hindsight, when Google made that change I should have switched away then rather than let them do vendor lockin as they were intending.

### Google Photos Vendor Lock

If you use Google Photos you should know that they make it very hard to leave and get back your content in its original format.

1. There is no API to get original quality images back
2. Google Drive access was removed so you can't get the original files back
3. Your only option is Google Takeout.  Its for technical people only who will suffer through it to make something work.  Original quality files are shared without any organization (albums etc), and all metadata that was in those images in a standard format (IPTC, EXIF) is removed.  Instead they give you proprietary json files that you need to write programs for to merge the data back together.   Honestly, you're likely to make some mistakes and not get back your content in its original format.

I used Google Takeout and it took about 4 days to download my data, and then weeks to re-organize into albums.

If you use Google Photos you will likely find it really hard to migrate off.  Maybe there are better scripts out there these days to generate a useable copy better than when I was doing this.  One I recently noticed is [immich-go](https://github.com/simulot/immich-go).

I don't think I'll be able to trust Google again with any of my data.

## Apple Photos

From there I went to Apple Photos and iCloud Photo Library.
What I liked about Apple Photos is that while they do tie you into their applications, they make it easy and accessible to get your original files back with the metadata intact.   You can even easily pull out images in albums like you had before.   For this simple reason, I think iCloud Photo Library is a much bettter place for photos than Google Photos.

I liked how Apple Photos on iOS or Mac let you do some simple image editing and how it was easy to share my library with Heather so we could both contribute photos.

My main reason for switching was that it was too simple.  As I got more into photography I wanted more editing capabilities and also I was eyeing cameras that Apple didn't support but Lightroom did.  Apple eventually supported the Nikon Z8 but it did take some time and didn't support all its RAW formats.

Migrating off of Apple Photos was easy and I didn't lose any images or metadata along they way.  It did take me a long time because I put more effort into categorizing and organizing.


## Adobe Lightroom Cloud

Adobe Lightroom is one of the best image editing and cataloging softwares for photographers.  Most photographers use this and its easier to find information on how to do certain things with it.  Its masking is fantastic and came out much before anything on Apple Photos did.

Making a backup of Lightroom Cloud is pretty straight forward if you use Lightroom Classic to sync with it.  From there you get files and folders on your hard drive and can easily back that up in any way you see fit (including multiple backups!).

The only thing I didn't like about this is that it wasn't easy to share photos with others.   I had to create shared albums and send a link to people and it would be read only.  I wanted it to be easy for Heather to add photos too.  Or for her to be able to browse and search all our photos.  Initially I solved this by giving her my email and password to Adobe so she could log in.  But its a more complex experience than I was looking for and then still didn't make it easy to share with anyone else.

## Immich and Self Hosting

Before this I had choosen a single solution that would do all my concerns:  Storage/Backup, Editing, Sharing.  Every one of these previous solutions sucked at at least one of these concerns.  And because they are ecosystems from some of the biggest tech companies they lock in so its hard to peice together better solutions.   I'd rank from worst to best: Google Photos (worst), Apple Photos, Adobe Lightroom Cloud (best).

Looking at it from this lens, I decided to piece together my own solution, self-host and handle each concern with the best tools and without any vendor lock so I can easily change my mind in the future.

### Storage

I decided that simple files and folders is the only way to go.  It works everywhere, backing up is a simple endeavour and I can easily do multiple backups.

Today my files are stored on a mac mini which uses [Arq](https://www.arqbackup.com/) to do daily backups to 3 drives and I take at least one drive to a different location for offsite.

My files are also stored on my laptop.  I use [Filen](https://filen.io/) to synchronize and backup to a cloud in real-time.  Filen is great because it can synchronize a real copy of files, not just a streamed drive.  And its end-to-end encrypted so that my files are just for me, not for AI data harvesting.  And since my mac mini and my phone/tablets also have filen they can get a copy of the images too.

### Editing

I'm currently using mostly Lightroom Classic for my photo editing.  Sometimes I use DXO Pure Raw to process the image to improve noise as it has produced the best results compared to other tools I've used.   I also used to use Capture One, but it doesn't support Hasselblad so I switched back to Lightroom.  Because my photos and videos are just files, I'm free to pick up any tool that is able to work on simple files.  I'm not vendor locked and love that.

### Sharing

I'm currently using [Immich](https://immich.app/) and am really happy with it.  Its very similar to Google Photos UX and supports sharing links to anyone, even if they don't have an account.  I can search for faces or other keywords and find matching images.

All of this is hosted on my mac mini and no data is sent to the cloud.

Unlike Lightroom Cloud, I can share with as many people as I like and they can browse all the albums as they like using the web or mobile apps.

I'm looking forward to HDR support in Immich which I know is being worked on.

## Conclusion

In conclusion, I think I've spent a lot of time on hosting my images and my requirements have evolved, as have the solutions available.

I'm really happy that my data is just files and folders that I can manage into the future and I can adapt as I like without big-tech creating vendor lock for their benefit.

My images are important to me.  Some art my creative art, but most are my family's memories which matter a great deal.
