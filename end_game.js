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
    return undefined
}

function process_end_game(result, guesses, box_values) {

    show_end_game_modal_OVERWITE(result, guesses, box_values)
    disable_guess_button()

}


function show_end_game_modal_OVERWITE(result, guesses, box_values) {
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
    $('#end-game-modal').modal('show')
}

function update_game() {
    let guesses = get_past_guesses()
    let box_values = read_box_values()

    if (guesses.length === 0) {
        return
    }

    result = check_game_status(guesses.slice(-1)[0], box_values)

    switch (result) {
        case "victory":
        case "defeat":
            process_end_game(result, guesses, box_values)
            break
        default:
            return
    }
}