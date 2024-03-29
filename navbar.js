function is_dark_mode() {
    theme = $('html').attr('data-bs-theme')
    return theme === 'dark'
}

function toggle_dark_mode() {
    if (is_dark_mode()) {
        set_light_mode()
    }
    else {
        set_dark_mode()
    }
}

function toggle_language() {
    const lang = $('html').attr('lang')
    $('html [lang="pt"], html [lang="en"]').addClass('fade-in')
    switch (lang) {
        case 'en':
            $('html').attr('lang', 'pt')
            break;
        case 'pt':
            $('html').attr('lang', 'en')
            break;
        default:
            console.log('Invalid language.')
    }
}

function set_light_mode() {
    console.log("Setting light mode.")
    $('html').attr('data-bs-theme', 'light')
    $('body').removeClass('dark-mode')
    $('body').addClass('light-mode')
    $('#light-mode-toggler-button > i').removeClass('bi-brightness-high')
    $('#light-mode-toggler-button > i').addClass('bi-moon-stars')
}

function set_dark_mode() {
    console.log("Setting dark mode.")
    $('html').attr('data-bs-theme', 'dark')
    $('body').removeClass('light-mode')
    $('body').addClass('dark-mode')
    $('#light-mode-toggler-button > i').removeClass('bi-moon-stars')
    $('#light-mode-toggler-button > i').addClass('bi-brightness-high')
}



$('#light-mode-toggler-button').click(function() {toggle_dark_mode()})
$('#lang-button').click(function() {toggle_language()})