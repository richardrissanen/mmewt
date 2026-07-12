#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data' / 'events.json'
OUT = ROOT / 'index.html'
CSS = 'css/bootstrap.min.css'
SITE_CSS = 'css/site.css'

TEMPLATE_HEAD = f'''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="Mutable Mobile Events Web Template">
    <meta name="author" content="Richard Rissanen">

    <title>MMEWT</title>

      <link rel="stylesheet" href="./{CSS}">
      <link rel="stylesheet" href="./{SITE_CSS}">
      <link href="http://fonts.googleapis.com/css?family=Roboto:100,300,400,700" rel="stylesheet">

  </head>
<body>
  <nav class="navbar navbar-dark bg-dark fixed-top text-center ml-auto mr-auto" >
    <a id="logo" class="navbar-brand" href="index.html">MMEWT</a>
  </nav>

  <main role="main" class="container">

    <ul id="tools" class="list-group">
      <li>
        <a href="#all" id="all" class="tool-link active">All</a>
        <a href="#favorites" id="favorite" class="tool-link">Favorites</a>
        <a href="#up-next" id="up-next" class="tool-link">Up Next</a>
      </li>
    </ul>

    <form id="search-form">
        <input id="search" class="form-control" type="search" placeholder="Search events" aria-label="Search">
    </form>

    <div id="aria-status" class="sr-only" aria-live="polite"></div>

    <ul id="events" class="list-group">
'''

TEMPLATE_TAIL = '''    </ul>

    <p class="text-muted ml-auto mr-auto text-center"><small>MMEWT is open source.<br/>You can find the code <a href="https://github.com/richardrissanen/mmewt">here.</a></small></p>

    <script src="js/vanilla.js"></script>

  </main>
</body>
</html>
'''


def format_time(iso):
    # naive formatting like original dateFormat
    from datetime import datetime
    dt = datetime.fromisoformat(iso)
    hour = dt.hour
    suffix = 'am'
    if hour == 0:
        hour = 12
    elif hour >= 12:
        if hour > 12:
            hour -= 12
        suffix = 'pm'
    minute = dt.minute
    return f"{dt.year}/{dt.month:02d}/{dt.day:02d} at {hour:02d}:{minute:02d}{suffix}"


def create_event_li(e):
    start = e.get('startTime')
    id_ = e.get('id')
    title = e.get('title')
    desc = e.get('description','')
    formatted = format_time(start)
    return f'''      <li id="event{id_}" class="list-group-item event-list" data-start="{start}">
        <details>
          <summary>
            {title}<br/><small class="text-muted">{formatted}</small>
            <button class="favorite-toggle star empty" data-id="{id_}" aria-label="Toggle favorite" aria-pressed="false"></button>
          </summary>
          <p> {desc}</p>
        </details>
      </li>\n'''


def main():
    data = json.loads(DATA.read_text())
    # sort by startTime
    data.sort(key=lambda x: x.get('startTime',''))
    out = TEMPLATE_HEAD
    for e in data:
        out += create_event_li(e)
    out += TEMPLATE_TAIL
    OUT.write_text(out)
    print(f"Wrote {OUT}")

if __name__ == '__main__':
    main()
