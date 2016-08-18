class InfiniteTweets {
  constructor($el) {
    this.$el = $el;
    $(".fetch-more").click(event => this.fetchTweets(event));
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

  insertTweets(tweets){
    tweets.forEach(tweet => {
      let content = [tweet.user.username, tweet.content, tweet.created_at].join(" -- ");
      let $li = $('<li>').text(content);//Add full content
      $li.data(tweet);
      $('#feed').append($li);
    });
  }

}



module.exports = InfiniteTweets;
