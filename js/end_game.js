function check_equality(first_values, second_values) {
    return (first_values.red === second_values.red && 
        first_values.green === second_values.green && 
        first_values.blue === second_values.blue)
}


function check_game_status(last_guess, correct_values) {
    if (check_equality(last_guess, correct_values)) {
        return "victory" 
    }
    if (no_more_guesses()) {
        return "defeat" 
    }
    return "ongoing"
}

function change_guess_button_to_info() {
    $('#guess-button #guess-text').addClass('dont-display')
    $('#guess-button #show-results-text').removeClass('dont-display')
}

function process_end_game(result, guesses, show_modal) {
    change_guess_button_to_info()
    update_end_game_modal(result, guesses, show_modal)
}


function update_end_game_modal(result, guesses, show) {
    switch (result) {
        case "victory":
            $('.modal-num-attempts').text(guesses.length)
            if (guesses.length === 1) {
                $('.modal-attempts-plural').addClass('dont-display')
            }
            $('#end-game-modal').removeClass('defeat-modal')
            $('#end-game-modal').addClass('victory-modal')
            break
        case "defeat":
            $('#end-game-modal').removeClass('victory-modal')
            $('#end-game-modal').addClass('defeat-modal')
            break
        default:
            console.log("Invalid result.")
    }
    if (show) {
        show_end_game_modal()
    }
}

function show_end_game_modal() {
    $('#end-game-modal').modal('show')
}

function get_game_state() {
    let guesses = get_past_guesses()
    let correct_values = read_correct_values()
    let result
    if (guesses.length === 0) {
        result = "ongoing"
    }
    else {
        result = check_game_status(guesses.slice(-1)[0], correct_values)
    }
    return {result: result, guesses: guesses, correct_values: correct_values}
}

function update_game(state, show_modal = true) {
    switch (state.result) {
        case "victory":
        case "defeat":
            process_end_game(state.result, state.guesses, show_modal)
            break
        default:
            return
    }
}