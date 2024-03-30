function save_persistent_cookie(key, value) {
    Cookies.set(key, value)
}

function save_daily_cookie(key, value) {
    Cookies.set(key, value, {expires: 1 })
}

function load_cookie(key, default_value) {
    let val = Cookies.get(key)
    if (typeof val === 'undefined') {
        val = default_value
    }
    return val
}

function remove_cookie(key) {
    Cookies.remove(key)
}

function load_language_cookie() {
    return load_cookie('lang', 'en')
}

function load_mode_cookie() {
    return load_cookie('mode', 'dark')
}

function load_seed_cookie() {
    return load_cookie('seed', '0')
}

function save_game_state_cookie(state) {
    let state_str = JSON.stringify(state)
    save_daily_cookie('state', state_str)
}

function load_game_state_cookie() {
    let state_str = Cookies.get('state')
    
    if (typeof state_str === 'undefined') {
        return undefined
    }
    return JSON.parse(state_str)
}

function restore_preferences_from_cookies() {
    lang = load_language_cookie()
    set_language(lang)
    mode = load_mode_cookie()
    set_mode(mode)
}

function restore_game_state_from_cookie(current_seed) {

    saved_seed = load_seed_cookie()

    if (saved_seed !== current_seed) {
        remove_cookie('state')
        save_daily_cookie('seed', current_seed)
        return
    }
    saved_state = load_game_state_cookie()

    if (typeof saved_state === 'undefined') {
        return
    }

    force_game_state(saved_state)
}

function force_game_state(state) {
    for (let i = 0; i < state.guesses.length; ++i) {
        update_guess_table(state.guesses[i], state.box_values, false)
    }
    update_game(state, false)
}

function remove_all_cookies() {
    Object.keys(Cookies.get()).forEach(function(cookieName) {
            Cookies.remove(cookieName);
        });
}