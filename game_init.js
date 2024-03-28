function get_generator(seed) { // splitmix32 -- https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
    return function() {
        seed |= 0;
        seed = seed + 0x9e3779b9 | 0;
        let t = seed ^ seed >>> 16;
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15;
        t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }
}

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

function generate_rgb_values(generator) {
    const red = scale_rgb_value(generator())
    const green = scale_rgb_value(generator())
    const blue = scale_rgb_value(generator())
    return {red: red, green: green, blue: blue}
}

function color_box(red, green, blue) {
    $('#main-box').css('background-color', 'rgb(' + red + ', ' + green + ', ' + blue + ')')
}

function initialize_game() {
    const seed = get_daily_seed()
    let rng = get_generator(seed)
    let {red, green, blue} = generate_rgb_values(rng)
    color_box(red, green, blue)
}


$(document).ready(function() {
    initialize_game()
})