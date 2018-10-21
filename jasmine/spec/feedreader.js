/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    // Test suite "RSS feeds"
    describe('RSS Feeds', () => {
      // Tests to make sure the allFeeds variable is defined
      // and is not empty.
      it('are defined and not empty', () => {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      // Tests each feed in the allFeeds object
      // and ensures it has a URL defined
      // and that the URL is not empty.
      it('has url defined and not empty', () => {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });

      // Tests each feed in the allFeeds object
      // and ensures it has a name defined
      // and that the name is not empty.
      it('has a name defined and not empty', () => {
        allFeeds.forEach(feedName => {
          expect(feedName.name).toBeDefined();
          expect(feedName.name.length).not.toBe(0);
        });
      });
    });

    // Test suite "The menu"
    describe('The menu', () => {
      const body = document.querySelector('body');
      const menuIcon = document.querySelector('.menu-icon-link');

      // Tests the menu element is hidden by default.
      it('is hidden by default', () => {
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });

      // Tests that the menu toggles visibility
      // when the menu icon is clicked.
      it('toggles visibility when clicked', () => {
        menuIcon.click();
        expect(body.classList.contains('menu-hidden')).toBe(false);
        menuIcon.click();
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });
    });

    // Test suite "Initial Entries"
    describe('Initial Entries', () => {
      // Test that There should be at least one feed loaded at all times
      beforeEach(done => {
        loadFeed(0, done);
      });
      it('has at least one entry in feed', () => {
        const feedEntry = document.querySelector('.entry');
        expect(feedEntry).not.toBe(null);
      });
    });

    // Test suite  "New Feed Selection"
    describe('New Feed Selection', () => {
      // Tests that a new feed content actually changes.
      let firstFeed;
      let secondFeed;

      beforeEach(done => {
        loadFeed(0, () => {
          firstFeed = document.querySelectorAll('.entry')[0].innerText;
          loadFeed(1, () => {
            secondFeed = document.querySelectorAll('.entry')[1].innerText;
            done();
          });
        });
      });
      it('shows a different feed', () => {
        const isFeedDifferent = firstFeed === secondFeed;
        expect(isFeedDifferent).toBe(false);
      });
    });
  })()
);
