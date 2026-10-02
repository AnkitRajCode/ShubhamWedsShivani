# Wedding Website

Live site: https://codnelle.github.io/Ranthambore/

## Change names, dates, or venue

Edit the `WEDDING_DATA` object in [`assets/site-data.js`](assets/site-data.js). The homepage and event pages read their couple names, wedding dates, RSVP deadline, venue, and countdown from this one file. Dates use the `YYYY-MM-DD` format.

For example, update `bride`, `groom`, `dates.dayOne`, `dates.dayTwo`, or `dates.rsvpBy`, then reload the website. The countdown starts at the time set by `dates.countdownTime` on `dates.dayOne` (India time).

To preview on your computer, open `index.html` in a browser. The shared JavaScript config does not require a local web server.