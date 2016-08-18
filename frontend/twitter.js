const FollowToggle = require('./follow_toggle.js');
const UserSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
const InfiniteTweets = require('./infinite_tweets.js');


$(() => {
  $('button.follow-toggle').each((idx, el) => {
    let toggle = new FollowToggle($(el));
  });

  $('nav.users-search').each((idx, el) => {
    let search = new UserSearch($(el));
  });

  $('form.tweet-compose').each((idx, el) => {
    let tweetCompose = new TweetCompose($(el));
  });

  $('div.infinite-tweets').each((idx, el) => {
    let infiniteTweets = new InfiniteTweets($(el));
  });
});
