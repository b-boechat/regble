function save_persistent_cookie(key, value) {
    Cookies.set(key, value)
}

function load_cookie(key, default_value) {
    let val = Cookies.get(key)
    if (typeof val === 'undefined') {
        val = default_value
    }
    return val
}

function delete_cookie(key) {
    Cookies.remove(key)
}

function load_language_cookie() {
    return load_cookie('lang', 'en')
}

function load_mode_cookie() {
    return load_cookie('mode', 'dark')
}


function save_game_state_cookie(state) {
    let state_str = JSON.stringify(state)
    Cookies.set('state', state_str)
}

function load_game_state_cookie() {
    let state_str = Cookies.get('state')
    if (typeof state_str === undefined) {
        return get_game_state()
    }
    return JSON.parse(state_str)
}