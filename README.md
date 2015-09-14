# UdaciFeeds

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.

## How to run the code

To run the code, please visit the link below:

http://www.lichingyew.com/FEND-feedreader


## Additional Testing Suites

### Test that a new feed can be added to the allFeeds array

It compares the name defined in the test to the name in the last element of the allFeeds array

- Test that the new feed is displayed on the menu

It compares the the name defined in the test to the name showned in the <a> tag of the menu list item.

- Test that the last feed listed can be deleted

First an item is added to the allFeeds array, then it is removed.
Once it is removed the name of the previous last element of the array should be null.



