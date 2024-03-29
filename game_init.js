function number_to_fixed_len_str(number, len) {
    return ('0'.repeat(len - 1) + number).slice(-len)
}

function get_daily_seed() {
    const date = new Date()
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

function initialize_game() {
    const seed = get_daily_seed()
    let rng = get_rng(seed)
    let {red, green, blue} = generate_rgb_values(rng)
    color_box(red, green, blue)
}


$(document).ready(function() {
    initialize_game()
})