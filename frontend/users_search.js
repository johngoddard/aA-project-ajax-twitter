const FollowToggle = require('./follow_toggle.js');

class UserSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find(".search-input");
    this.$ul = $el.find(".users");
    const self = this;
    this.$input.keyup((event) => {self.handleInput(event);});
  }

  handleInput(){
    const self = this;
    $.ajax({
      url: `/users/search`,
      type: "GET",
      data: self.$input.serialize(),
      dataType: "json",
      success(data){
        self.renderResults(data);
      }
    });
  }

  renderResults(data){
    this.$ul.empty();
    data.forEach(user => {
      let $li = $('<li>').text(user.username);
      let $button = $('<button>')
            .addClass('follow-toggle')
            .data('user-info', {'id': user.id, 'followState': user.followed ? "followed" : "unfollowed"});
      $li.append($button);

      new FollowToggle($button);
      this.$ul.append($li);
    });
  }
}

module.exports = UserSearch;
