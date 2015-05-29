$(function() {
    // Initialize collapse button
    $('.button-collapse').sideNav();

    bindNavButtons();
    bindLoginForm();
    $('#register-form').submit(register);
});

/**
 * Asynchronously register the user.
 */
function register() {
    var data = {
        first_name: $('#id_first_name').val(),
        last_name: $('#id_last_name').val(),
        username: $('#id_username').val(),
        email: $('#id_email').val(),
        password: $('#id_password').val(),
        confirm_password: $('#id_confirm_password').val()
    }

    $.ajax({
        url: '/register',
        method: 'POST',
        data: data,
        dataType: 'json',
        success: success
    });

    function success(data) {
        if ($.isEmptyObject(data)) {
            // signal error in form data
            return;
        } else {
            $('#registration').html(data['welcome']);
            updateNavLinks(data['navHTML'], data['sideNavHTML']);
        }
    }

    // Necessary to stop event propagation
    return false;
}

/**
 * Asynchronously login the user.
 */
function login() {
    var data = {
        username: $('#login_username').val(),
        password: $('#login_password').val()
    }

    $.ajax({
        url: '/authenticate',
        method: 'POST',
        data: data,
        dataType: 'json',
        success: success
    });

    function success(data) {
        if (data['success']) {
            // Redirect if on these pages
            if (window.location.pathname === '/register'
                    || window.location.pathname === '/login')
                window.location.replace('/');

            $('#login').closeModal();
            updateNavLinks(data['navHTML'], data['sideNavHTML']);
            $('.button-collapse').sideNav('hide');
        }
        else
            return; // signal login error
    }

    // Necessary to stop event propagation
    return false;
}

/**
 * Asynchronously logs out the user.
 */
function logout() {
    $.ajax({
        url: '/logout',
        method: 'POST',
        dataType: 'json',
        success: success
    });

    function success(data) {
        updateNavLinks(data['navHTML'], data['sideNavHTML']);

        if ($('#login').length === 0) {
            $('body').append(data['loginModal']);
            bindLoginForm();
        } else {
            $('#login-form')[0].reset();
        }
    }
}

/**
 * Binds event listeners to the navigation buttons.
 */
function bindNavButtons() {
    $('.fullscreen-button').click(function() {
        if (screenfull.enabled)
            screenfull.toggle();
    });

    $('.login-button').click(function() {
        $('#login').openModal();
        $('#login_username').focus();
    });
    
    $('.logout-button').click(logout);
}

/**
 * Bind the event listener for the login form.
 */
function bindLoginForm() {
    $('#login-form').submit(login);
}

/**
 * Refreshes the navigation links to match the user's present authentication
 * state. Usually called after login, logout, or registration.
 */
function updateNavLinks(navHTML, sideNavHTML) {
    $('.nav-links').html(navHTML);
    $('.side-nav-links').html(sideNavHTML);
    bindNavButtons();
}

/*********************************************************
 * BEGIN                                                 *
 * Django functions for using csrftoken in AJAX requests *
 *********************************************************/

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

/*********************************************************
 * END                                                   *
 * Django functions for using csrftoken in AJAX requests *
 *********************************************************/