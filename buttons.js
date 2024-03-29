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




function days_difference(start_date, end_date) { /* https://stackoverflow.com/questions/542938/how-to-calculate-number-of-days-between-two-dates */
    const milliseconds_per_day = 24 * 60 * 60 * 1000
    return Math.round((end_date - start_date) / milliseconds_per_day)
}

function get_rgble_id() {
    const start_date_midnight = new Date(2024, 3 - 1, 30) /* This date is considered the first RGBle date. */
    
    let today_date_midnight = new Date(arrival_date_global)
    today_date_midnight.setHours(0, 0, 0, 0)

    console.log(start_date_midnight)
    console.log(today_date_midnight)
    id = days_difference(start_date_midnight, today_date_midnight) + 1
    return id
}


function get_max_num_guesses() {
    return $('.guess-row').length
}

function get_comparation_unicode(guess_value, box_value) {
    if (guess_value === box_value) {
        return "\u2705" // Check mark.
    }
    if (guess_value < box_value) {
        return "\u2B06" /* Up arrow */
    }
    return "\u2B07" /* Down arrow */
}

function get_guess_share_text(guess, box_values) {
    return get_comparation_unicode(guess.red, box_values.red) +
        get_comparation_unicode(guess.green, box_values.green) +
        get_comparation_unicode(guess.blue, box_values.blue)
}

function get_result_text() {
    const guesses = get_past_guesses()
    const box_values = read_box_values()

    let used_guesses

    if (check_victory(guesses.slice(-1)[0], box_values)) {
        used_guesses = guesses.length
    }
    else {
        used_guesses = "X"
    }

    let result_text = 'Regble #'+get_rgble_id()+' '+used_guesses+'/'+get_max_num_guesses() + '\n'
    for (let i = 0; i < guesses.length; ++i) {
        result_text = result_text + '\n' + get_guess_share_text(guesses[i], box_values)
    }
    return result_text
}

function copy_results() {

    result_text = get_result_text()
    navigator.clipboard.writeText(result_text)
}



$('#light-mode-toggler-button').click(toggle_dark_mode)
$('#lang-button').click(toggle_language)

$('#result-share-button').click(copy_results)