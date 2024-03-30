function save_persistent_cookie(key, value) {
    Cookies.set(key, value)
}

function load_persistent_cookie(key, default_value) {
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
    return load_persistent_cookie('lang', 'en')
}

function load_mode_cookie() {
    return load_persistent_cookie('mode', 'dark')
}