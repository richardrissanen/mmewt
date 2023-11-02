# MMEWT: Mutable Mobile Events Web Template

## Proposal
* Audience
  * Small Festivals, Conferences, Unconferences, and events with limited budgets
* Problem
  * Current solutions are expensive, over-engineered, resource intensive, lack incentive for the user, and sometimes all of the above
* Solution
  * Deliver a stripped down solution that only offers the most relevant features (index of events, favorites, events currently happening)
* Tech
  * Leverage VanillaJS, RequireJS, and static JSON to create a fast SPA as a MVP

## Event Model

**Required**

* id: number
* title: string
* description: string
* start_date: string ("Thu Jan 03 1985 11:11:11 GMT-0400")
* end_date: string ("Thu Jan 03 1985 11:11:11 GMT-0400")
* location: string (name)

**Optional**

* host: string (author / band / moderator / name / speaker / sponsor)
* feature: string (author / band / moderator / name / speaker / sponsor)

## Breakdown

### Modules
* App

### Components
* Navigation
* Event
  * Header
  * Detail
  * Description
  * _Transforms_
    * Fav
    * Now

### Services
* Data
* Local Storage

### Pipe
* Truncate
