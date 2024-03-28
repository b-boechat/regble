function read_rgb_values() {
    let rgb_textboxes = $('.range-textbox')
    return {
        red: parseInt(rgb_textboxes.eq(0).val()), 
        green: parseInt(rgb_textboxes.eq(1).val()), 
        blue: parseInt(rgb_textboxes.eq(2).val()), 
    }
}

function rgb_string_to_values(str){ /* https://stackoverflow.com/questions/34980574/how-to-extract-color-values-from-rgb-string-in-javascript */
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/)
    return match ? {
      red: parseInt(match[1]),
      green: parseInt(match[2]),
      blue: parseInt(match[3])
    } : {}
}

function read_box_values() {
    let main_box = $('#main-box')
    color = rgb_string_to_values(main_box.css('background-color'))
    return {
        box_red: parseInt(color.red),
        box_green: parseInt(color.green),
        box_blue: parseInt(color.blue)
    }
}

function no_more_guesses() {
    if ($('.dont-display-row').length === 0) {
        return true
    }
    return false
}

function disable_button() {
    $('#guess-button').prop('disabled', true)
}

function show_end_game_modal(type) {
    switch (type) {
        case 'victory':
            console.log("Victory!")
            $('#victory-modal').modal('show')
            break;
        case 'defeat':
            console.log("Defeat!")
            $('#defeat-modal').modal('show')
            break;
        default:
            console.log("Invalid end game type.")
    }
}

function process_icon(color_name, guessed_value, box_value) {
    check_icon_query = '.dont-display-row .' + color_name + '-guess .bi-check-lg'
    fire_icon_query = '.dont-display-row .' + color_name + '-guess .bi-fire'

    if (guessed_value === box_value) {
        return
    }
    if (Math.abs(guessed_value - box_value) < 15){
        $(fire_icon_query).eq(0).removeClass('dont-display-icon')
    }
    if (guessed_value > box_value) {
        $(check_icon_query).eq(0).addClass('bi-arrow-down').removeClass('bi-check-lg')
    }
    else {
        $(check_icon_query).eq(0).addClass('bi-arrow-up').removeClass('bi-check-lg')
    }
}

function check_victory(red, green, blue, box_red, box_green, box_blue) {
    return (red === box_red && green === box_green && blue === box_blue)
}

function update_guess_table(red, green, blue, box_red, box_green, box_blue) {

    $('.dont-display-table').removeClass('dont-display-table')

    if (no_more_guesses()) {
        console.log("Can't guess anymore.")
    }
    else {
        $('.dont-display-row .red-guess .rgb-value').eq(0).text(red)
        $('.dont-display-row .green-guess .rgb-value').eq(0).text(green)
        $('.dont-display-row .blue-guess .rgb-value').eq(0).text(blue)

        process_icon("red", red, box_red)
        process_icon("green", green, box_green)
        process_icon("blue", blue, box_blue)

        $('.dont-display-row').eq(0).addClass('fade-in-table-row')
        $('.dont-display-row').eq(0).removeClass('dont-display-row')
    }
}

function make_guess() {
    let {red, green, blue} = read_rgb_values()
    let {box_red, box_green, box_blue} = read_box_values()
    update_guess_table(red, green, blue, box_red, box_green, box_blue)

    if (check_victory(red, green, blue, box_red, box_green, box_blue)) {
        show_end_game_modal('victory')
        disable_button()
    }
    else if (no_more_guesses()) {
        show_end_game_modal('defeat')
        disable_button()
    }
}


$('#guess-button').click(function() {make_guess()})