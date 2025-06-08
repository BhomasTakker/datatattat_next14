# Datatattat

## Overview

Datatattat is a content aggregator and broadcastor. The intention is to give users the ability to collate and organise news into collections of associated and related content. The user is free to create content pages under their username.

##

# Content

Currently we have an associated server that is collating news sources - articles, video, audio - from publically accessible rss feeds. Chron jobs are used to check certain feeds every 15 minutes. This data is then stored in a mongo db and an api has been created in order to provide the ability to search and organise the articles.

##

# CMS

There is edit functionality available to logged in members that they can use to create and organise their content. A user can create a page and the twitter/og card required to post a 'card' link to this page on social media, blog sites etc.

##

## Tech Stack

React, TypeScript, Nextjs 15

Hosted on Vercel - Free Instance

styling - css modules with sass

testing - Jest, Playwright

MongoDB cloud Atlas DB with Mongoose

Upstash Redis DB for caching

AWS EC2 free tier instance to host the 'cms'

Forms - react-hook-form

Next Auth

Dependabot

Github Actions

## some libs and dependecies

video-js for the video player

sonner for toast notifications

cheerio for extracting html

rss-parser for loading rss feeds

react-icons, react-intersection-observer

## CI

Fairly minimal implementation of unit tests and Playwrights e2es

Vercel creates a production build so any linting/typescript errors get flagged here.

Branching strategy is really just a 'github flow' approach. Team of 1 working generally on one thing at a time - this is the simplest easiest approach to take.

## Architecture

No main approach as the site is perhaps surprisingly very simple and uses the next framework etc.

We use factory methods to determine what data is used and what components are rendered.

These factory methods allow us to scale data providers and frontend componets rapidly and safely.

## Edit

The edit pages/functionality uses recursion to load a factory component that renders an input or an input collection. A 'branching' config file can be passed in to the form component to build the available inputs/options. This form is dynamic and can grow according to a users choices.

## Next Steps

### CMS

The 'CMS' needs a lot of work. Currently providers, cron schedule, and organised feeds etc are hard coded in 'configs' which should be stored in a db so they can be updated and edited without need for deployment.

This would all require a UI, authentication, and proper hosting etc.

Rough idea at this time would be to seperate the 'edit' pages - or the whole member area of datatattat into a separate cms.

### Testing

Unit tests were largely created with AI (copilot) for speed and convenience. Currently with around an 85% coverage. One area that needs to be looked more closely at is edit & user inputs. We need to make sure we are testing against any malicious intent and erroneous behaviour.

#### Mock Database

Currently we are testing against a dev database hosted by Cloud Atlas - although this works it is a little problematic in that we are relying on an external service. We need to create a mock database so we can load expected and reliable data to test against.

#### Visual Regression

For Content testing we should be looking at adding some visual regression testing via Playwright snapshots. Potentially to be done after a mock db has been created.

#### Edit testing

Currently a major flaw is that we aren't performing any testing of one of the main and most complicated areas of the site - edit forms. Currently logging in is with a Github or Google account - I am unsure of how to allow a Playwright user agent to log in at this time. At the moment I cannot think of an adequate way of achieving this.

## Content

### Social Media

Many social media companies allow posts, channels, threads, etc to be embeddable on third party sites by using the oembed protocol. Some providers will be added as available front end components.

### Data

As it's name suggests datatattat isn't supposed to be entirely news/article focussed. The intention is to add tables, graphs, maps, xlsx sheets, etc, as available frontend components.

The overarching difficulty and concern of this is data - we need the ability to bring in public data from a wide variety of sources and apply it to frontend components for data visualization.

We would need to provide the ability to map, sort, group, and filter data dynamically. I have attempted this previously with RXJS as part of a POC

#

#

#

#

# Random notes

#

# Testing

## Roles https://www.w3.org/TR/html-aria/#docconformance

## Mock Components src\components\header\client-header.test.tsx

## Mock Functions src\components\header\client-header.test.tsx

## use waitFor to load components with state - src\components\header\client-header.test.tsx

## Mock function AND update mock return src\components\header\client-header.test.tsx

## Render async component work around src\components\header\navigation-header.test.tsx from https://stackoverflow.com/questions/75729282/testing-an-async-server-component-with-jest-in-next-13

`const { container } = render(await NavigationHeader());`

## Test null component render

`const { container } = render(<SubHeaders headersArray={[]} />); expect(container).toBeEmptyDOMElement();`
