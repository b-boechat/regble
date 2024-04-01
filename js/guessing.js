function read_input_values() {
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

function read_correct_values() {
    return {
        red: parseInt($('#correct-red-modal').text()),
        green: parseInt($('#correct-green-modal').text()),
        blue: parseInt($('#correct-blue-modal').text())
    }
}

function read_box_values() {
    let main_box = $('#main-box')
    color = rgb_string_to_values(main_box.css('background-color'))
    return {
        red: parseInt(color.red),
        green: parseInt(color.green),
        blue: parseInt(color.blue)
    }
}

function no_more_guesses() {
    if ($('.dont-display-row').length === 0) {
        return true
    }
    return false
}

function get_past_guesses() {
    let past_guesses = []
    let num_guesses_rows = $('.guess-row:not(.dont-display-row)').length
    for (let i = 0; i < num_guesses_rows; ++i) {
        past_guesses.push(
            {
                "red": parseInt($('.guess-row:not(.dont-display-row) .red-guess').eq(i).text()),
                "green": parseInt($('.guess-row:not(.dont-display-row) .green-guess').eq(i).text()),
                "blue": parseInt($('.guess-row:not(.dont-display-row) .blue-guess').eq(i).text()),
            }
        )
    }
    return past_guesses
}

function show_end_game_modal(type) {
    switch (type) {
        case 'victory':
            $('#victory-modal').modal('show')
            break;
        case 'defeat':
            $('#defeat-modal').modal('show')
            break;
        default:
            console.log("Invalid end game type.")
    }
}

function process_icon(color_name, guessed_value, correct_value) {
    let check_icon_query = '.dont-display-row .' + color_name + '-guess .bi-check-lg'
    let fire_icon_query = '.dont-display-row .' + color_name + '-guess .bi-fire'

    if (guessed_value === correct_value) {
        return
    }
    if (Math.abs(guessed_value - correct_value) < 15){
        $(fire_icon_query).eq(0).removeClass('dont-display-icon')
    }
    if (guessed_value > correct_value) {
        $(check_icon_query).eq(0).addClass('bi-arrow-down').removeClass('bi-check-lg')
    }
    else {
        $(check_icon_query).eq(0).addClass('bi-arrow-up').removeClass('bi-check-lg')
    }
}

function process_all_icons(input_values, correct_values) {
    process_icon("red", input_values.red, correct_values.red)
    process_icon("green", input_values.green, correct_values.green)
    process_icon("blue", input_values.blue, correct_values.blue)
}

function update_guess_table(input_values, correct_values, fade_in = true) {

    $('.dont-display-table').removeClass('dont-display-table')

    if (get_game_state().result !== 'ongoing') {
        return
    }

    $('.dont-display-row .red-guess .rgb-value').eq(0).text(input_values.red)
    $('.dont-display-row .green-guess .rgb-value').eq(0).text(input_values.green)
    $('.dont-display-row .blue-guess .rgb-value').eq(0).text(input_values.blue)

    process_all_icons(input_values, correct_values)

    if (fade_in) {
        $('.dont-display-row').eq(0).addClass('fade-in')
    }
    
    $('.dont-display-row').eq(0).removeClass('dont-display-row')
}

function make_guess(input_values) {
    let box_values = read_box_values()
    let correct_values = read_correct_values()

    if (!check_equality(correct_values, box_values)) {
        $('#color-change-warning-modal').modal('show')
        return
    }

    update_guess_table(input_values, correct_values)

    let state = get_game_state()
    update_game(state)
    save_game_state_cookie(state)
}


$('#guess-button').click(function() {make_guess(read_input_values()) } )