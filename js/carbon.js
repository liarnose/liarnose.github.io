(function() {
  (function($) {
    var setFancybox;
    if (performFancybox) {
      setFancybox = function() {
        return $('.article-content img').each(function() {
          var image, imageLink;
          image = $(this);
          imageLink = image.parent('a');
          if (imageLink.size() < 1) {
            imageLink = image.wrap('<a href="' + this.getAttribute('src') + '"></a>').parent('a');
          }
          return imageLink.fancybox();
        });
      };
    } else {
      setFancybox = function() {};
    }
    return $(document).on('click', '.comments-switch-duoshuo', function() {
      var comments, el;
      comments = $('#duoshuo_thread');
      if (comments.has('div').length > 0) {
        comments.toggle('fast');
        return;
      }
      el = document.createElement('div');
      el.setAttribute('data-thread-key', $(this).attr('key'));
      el.setAttribute('data-url', $(this).attr('url'));
      el.setAttribute('data-author-key', $(this).attr('duoshuo'));
      DUOSHUO.EmbedThread(el);
      return comments.append(el).hide().fadeIn('');
    }).on('click', '.extra-switch', function() {
      return $('.extra').toggle('fast');
    }).pjax('a', '#content', {
      fragment: '#content',
      timeout: 10000
    }).on('pjax:send', function() {
      return $('#content').fadeTo(0, 0);
    }).on('pjax:complete', function() {
      $('#content').fadeTo('fast', 1);
      setFancybox();
      ga('set', 'location', window.location.href);
      return ga('sent', 'pageview');
    }).ready(function() {
      return setFancybox();
    });
  })(jQuery);

}).call(this);
