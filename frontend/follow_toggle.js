class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userId = $el.data('user-info').id;
    this.followState = $el.data('user-info').followState;

    this.render();
    const toggle = this;

    $el.click(event => { toggle.handleClick(event); });
  }

  render(){
    if(this.followState === 'followed' || this.followState === 'unfollowing'){
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }

    if (this.followState === "following" || this.followState === "unfollowing"){
      this.$el.prop('disabled', true);
    } else {
      this.$el.removeProp('disabled');
    }
  }

  handleClick(event){
    event.preventDefault();
    let self = this;
    if(this.followState === "followed"){
      self.followState = 'unfollowing';
      self.render();

      $.ajax({
        url: `/users/${self.userId}/follow`,
        type: "DELETE",
        dataType: "json",
        success(jsonThing){
          self.followState = "unfollowed";
          self.render();
        }
      });
    } else {
      self.followState = 'following';
      self.render();

      $.ajax({
        url: `/users/${self.userId}/follow`,
        type: "POST",
        dataType: "json",
        success(jsonThing){
          self.followState = "followed";
          self.render();
        }
      });
    }
  }
}

module.exports = FollowToggle;
