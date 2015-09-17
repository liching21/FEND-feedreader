/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/** To ensure that the test does not begin until the DOM is ready*/
$(function() {

    /** Test suite for the RSS Feeds */
    describe('RSS Feeds', function() {

        //tests to make sure that the allFeeds variable has been defined and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Write a test that loops through each feed in the allFeeds object and ensures it
        // has a URL defined and that the URL is not empty.
        it('url is defined and not empty', function(){

            var i = 0;
            allFeeds.forEach(function(){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                expect(allFeeds[i].url).toContain("http://");
                i++;
            });
        });

        // test that loops through each feed in the allFeeds object and ensures it has a name defined
        // and that the name is not empty.
        it('name is defined and is not empty', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function(){

        // This test ensures the menu element is hidden by default
        it('by default it is hidden', function(){
            expect($('body').hasClass()).toBe(false);
        });

        // This test ensure that the menu changes visibility when the menu icon is clicked
        it('changes visibility when the menu icon is clicked', function(){

            //The menu should display when it is clicked
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //The menu should be hidden when it is clicked again
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        // This test ensures when the loadFeed function is called and completes its work, there is at least
        // a single .entry element within the .feed container.
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('loadFeed function is called, and there is at least a single entry', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){


        var firstFeed,secondFeed;

        //update the feeds
        beforeEach(function(done){

            // empty the feeds contents to clear any previous feed load
            $('.feed').empty();

            // first call back
            loadFeed(1, function(){
                firstFeed = $('.header-title').text();

                // second call
                loadFeed(2, function(){
                    secondFeed = $('.header-title').text();
                    done();
                });
            });

        });

        // Write a test that ensures when a new feed is loaded
        // by the loadFeed function that the content actually changes.
        it('is loaded the content changes', function(){
            expect(firstFeed).not.toBe(secondFeed);
        });

        // revert to the first feed after testing
        afterEach(function(done){
            loadFeed(0, done);
        });
    });

    /* A new test suite named "Add New Feeds" */
    describe('New Feeds', function(){

        // declare the source of the RSS Feed
        var name = 'ABC';
        var url = 'http://www.abc.net.au/news/feed/51120/rss.xml';
        var newIndex;

        //Write a test that allows the user to add a new feed
        it('Addition', function(){

            // call the method to add the new Feed allFeeds
            // Create a method to add the Feed at the end of the array
            addFeed(name, url);
            newIndex = allFeeds.length - 1;
            expect(allFeeds[newIndex].name).toBeDefined();
            expect(name).toBe(allFeeds[newIndex].name);
        });

        //Test that the new feed is displaying correctly on the menu
        it('Showing in the menu', function(){

            // call the method to add the new Feed allFeeds
            addFeed(name, url);
            newIndex = allFeeds.length - 1;

            //compare name to the value of last menu options
            var lastMenuOption = $('.feed-list li a').last().text();
            expect(name).toBe(lastMenuOption);
        });

        // revert to the first feed after testing
        afterEach(function(){
            // Delete the last feed that was entered revert to original state
            deleteLastFeed();
        });
    });

    /* This is a suite called 'Delete the Feed' */
    describe('The Feeds', function(){

        var name = 'ABC';
        var url = 'http://www.abc.net.au/news/feed/51120/rss.xml';

        // First the new feed is added
        beforeEach(function(){

            // add the feed to the end of the array
            addFeed(name, url);
            newIndex = allFeeds.length - 1;
        });

        // This will test if the feed is successfully deleted
        it('are removed', function(){

            // Delete the last feed that is in the allFeeds array
            deleteLastFeed();
            expect(allFeeds[newIndex].name).toBeNull(); //since it is removed
        });
    });

}());
