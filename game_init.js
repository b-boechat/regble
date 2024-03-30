function number_to_fixed_len_str(number, len) {
    return ('0'.repeat(len - 1) + number).slice(-len)
}

const arrival_date_global = new Date()

function get_daily_seed(date) {
    const year_str = number_to_fixed_len_str(date.getFullYear(), 4)
    const month_str = number_to_fixed_len_str(date.getMonth() + 1, 2)
    const day_str = number_to_fixed_len_str(date.getDate(), 2)
    return parseInt(year_str + month_str + day_str)
}


function scale_rgb_value(float_value) {
    return 5 * Math.floor(float_value * (51 + 1))
}

function generate_rgb_values(rng) {
    const red = scale_rgb_value(rng())
    const green = scale_rgb_value(rng())
    const blue = scale_rgb_value(rng())
    return {red: red, green: green, blue: blue}
}

function color_box(red, green, blue) {
    $('#main-box').css('background-color', 'rgb(' + red + ', ' + green + ', ' + blue + ')')
}

function update_modal_correct_colors(red, green, blue) {
    $('#correct-red-modal').text(red)
    $('#correct-green-modal').text(green)
    $('#correct-blue-modal').text(blue)
}

function initialize_game() {
    const seed = get_daily_seed(arrival_date_global)
    let rng = get_rng(seed)
    let {red, green, blue} = generate_rgb_values(rng)
    color_box(red, green, blue)
    update_modal_correct_colors(red, green, blue)
}


$(document).ready(function() {
    initialize_game()
    lang = load_language_cookie()
    set_language(lang)
    mode = load_mode_cookie()
    set_mode(mode)
})