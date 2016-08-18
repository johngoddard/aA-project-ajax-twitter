class TweetCompose {
  constructor($el) {
    this.$el = $el;
    $el.submit(event => {this.submit(event);});
    this.$inputs = $(":input");

    $("textarea").keyup((event) => this.updateChars());

    $('.add-mentioned-user').click(event => this.addMentionedUser(event));


  }

  addMentionedUser(event){
    event.preventDefault();
    let selectorHTML = $('.mention-script').html();
    $('.mentioned-users').append(selectorHTML);

    $(".select-div").on("click", "a", event2 => {
      event2.preventDefault();
      $(event2.delegateTarget).remove();
    });
  }

  clearInput(){
    $("textarea").val('');
    $('select option:eq(0)').prop('selected', true);
    $('.mentioned-users').empty();
    this.updateChars();
  }

  updateChars(){
    let charsLeft = (140 - $('textarea').val().length);
    $('.chars-left').text(`You have ${charsLeft} characters remaining`);
  }
  handleSuccess(data){
    this.clearInput();

    this.$inputs.each((idx, el) => {
      $(el).removeProp('disabled');
    });

    let selector = this.$el.data('tweets-ul');//instead fire "custom event"
    $(selector).trigger("insert-tweet", [data]);
  }

  submit(event){
    event.preventDefault();
    let formData = this.$el.serialize();
    let self = this;

    this.$inputs.each((idx, el) => {
      $(el).prop('disabled', true);
    });

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: formData,
      dataType: 'json',
      success: function(data){ self.handleSuccess(data); },
      error(data){
        self.$inputs.each((idx, el) => {
          $(el).removeProp('disabled');
        });
      }
    });
  }
}

module.exports = TweetCompose;
