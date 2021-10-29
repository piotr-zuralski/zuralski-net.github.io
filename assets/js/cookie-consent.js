// (function() {
    jQuery(document).ready(function () {
        let COOKIE_NAME = 'cookie-notice-accepted';
        let cookieNoticeElement = jQuery('#cookie-notice');
        let cookieNoticeButton = jQuery('#cookie-notice-accept');

        if (Cookies.get(COOKIE_NAME) !== '1') {
            cookieNoticeElement.show();
        }
    
        cookieNoticeButton.on('click', function(event) {
            event.preventDefault();
            Cookies.set(COOKIE_NAME, '1', { expires: 30, path: '/' });
            cookieNoticeElement.hide();
        });
    });
// })();
