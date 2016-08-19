const FollowToggle = require('./follow_toggle.js');
const UserSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
const InfiniteTweets = require('./infinite_tweets.js');


$(() => {
  $('button.follow-toggle').each((idx, el) => {
    let toggle = new FollowToggle($(el));
  });

  new UserSearch($('nav.users-search'));
  new TweetCompose($('form.tweet-compose'));
  new InfiniteTweets($('div.infinite-tweets'));
});
