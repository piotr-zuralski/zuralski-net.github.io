(function($) {

    $(document).ready(function () {
        pageLoadEnd = Date.now();
        pageLoadTime = (pageLoadEnd - pageLoadStart);

        dataLayer.push({'pageLoadEnd': pageLoadEnd, 'pageLoadTime': pageLoadTime});
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'event_category': 'User',
                'name': 'pageLoadTime',
                'value': pageLoadTime
            });
            
            gtag('event', 'page_loaded', {
                'event_category': 'User',
                'event_label': 'pageLoadTime',
                'value': pageLoadTime
            });
        }
    });

    $('[data-track]').on('mousedown', function(e) {
          var $this = $(this),
              elementParams = JSON.parse($this.attr('data-track')),
              defaultParams = {
                  params: {
                      'utm_source': window.location.host,
                      'utm_medium': 'link',
                      'utm_campaign': 'link'
                  },
                  options: {
                      'logLink': true,
                      'tagLink': true
                  }
              },
              params = $.extend(true, defaultParams, elementParams),
              param,
              href = this.href,
              url = href;

          if (!e) {
              e = event;
          }

          e.preventDefault();
          if (params.options.logLink) {
              if (typeof gtag !== 'undefined') {
                  
                  gtag('event', 'click_link', {
                      'event_category': 'Outbound Link',
                      'event_label': 'click',
                      eventLabel: href,
                      transport: 'beacon'
                  });
              }
          }

          if (params.options.tagLink) {
              url = url + (url.indexOf('?') ? '?' : '&');

              if (params.params.length !== 0) {
                  for (param in params.params) {
                      url = url + '&' + param + '=' + params.params[param];
                  }
              }

              this.href = url;
              this._target = "_blank";
          }
      });

      window.onbeforeunload = function () {
        visitEnd = Date.now();
        visitTime = (visitEnd - visitStart);

        dataLayer.push({'visitEnd': visitEnd, 'visitTime': visitTime});
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'event_category': 'User',
                'name': 'visitTime',
                'value': visitTime
            });
            
            gtag('event', 'user_quit', {
                'event_category': 'User',
                'event_label': 'visitTime',
                'value': visitTime
            });
        }
    };

  }(jQuery));
