function check_victory(input_values, box_values) {
    return (input_values.red === box_values.red && 
        input_values.green === box_values.green && 
        input_values.blue === box_values.blue)
}


function check_game_status(last_guess, box_values) {
    if (check_victory(last_guess, box_values)) {
        return "victory" 
    }
    if (no_more_guesses()) {
        return "defeat" 
    }
    return "ongoing"
}

function process_end_game(result, guesses, show_modal) {
    update_end_game_modal(result, guesses, show_modal)
    disable_guess_button()
}


function update_end_game_modal(result, guesses, show) {
    switch (result) {
        case "victory":
            $('.modal-num-attempts').text(guesses.length)
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
    let box_values = read_box_values()
    let result
    if (guesses.length === 0) {
        result = "ongoing"
    }
    else {
        result = check_game_status(guesses.slice(-1)[0], box_values)
    }
    return {result: result, guesses: guesses, box_values: box_values}
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