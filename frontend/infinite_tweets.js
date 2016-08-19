class InfiniteTweets {
  constructor($el) {
    this.$el = $el;
    $(".fetch-more").click(event => this.fetchTweets(event));
    $('#feed').on('insert-tweet', (event, tweet) => { this.insertTweets([tweet], true); });

    this.maxCreatedAt = null;
    this.fetchTweets();
  }

  fetchTweets(){
    const self = this;
    let maxDate = this.maxCreatedAt ? `max_created_at=${this.maxCreatedAt}` : null;


    $.ajax({
      url: "/feed",
      type: "GET",
      data: maxDate,
      dataType: "json",
      success(data){
        if(data.length > 0){
          self.insertTweets(data);
          self.maxCreatedAt = data.slice(-1)[0].created_at;
        } else {
          $(".fetch-more").remove();
          self.$el.append("<p>There are no more tweets.</p>");
        }
      }
    });
  }

  insertTweets(tweets, newlyCreated = false){
    let $tweetShowTemplate = $(".tweet-feed").html();
    const something = _.template($tweetShowTemplate);
    if(newlyCreated){
      $('#feed').prepend(something({tweets: tweets}));
    } else {
      $('#feed').append(something({tweets: tweets}));
    }
  }
}



module.exports = InfiniteTweets;
