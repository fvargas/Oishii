$(function() {
    $('#login-page-form').submit(loginViaPage);
});

/**
 * Asynchronously login the user via the login page form.
 */
function loginViaPage() {
    var data = {
        username: $('#login_page_username').val(),
        password: $('#login_page_password').val()
    };

    $.ajax({
        url: '/authenticate',
        method: 'POST',
        data: data,
        dataType: 'json',
        success: success
    });

    function success(data) {
        if (data['success']) {
            window.location.replace('/');

            updateNavLinks(data['navHTML'], data['sideNavHTML']);
            $('.button-collapse').sideNav('hide');
        }
        else
            return; // signal login error
    }

    // Necessary to stop event propagation
    return false;
}