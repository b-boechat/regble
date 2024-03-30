function update_input(updated, to_update) {
    to_update.val(updated.val())
}

function force_numbers(textbox) {
    let val = textbox.val()
    val = val.replace(/^0+|[^\d]/g, '');
    textbox.val(val);
}

function round_value(textbox) {
    let val = textbox.val()
    val = Math.min(val, 255)
    val = Math.round(val / 5) * 5
    textbox.val(val)
}


function synchronize_ranges() {

    /* Imported code from https://stackoverflow.com/questions/69490604/html-input-range-type-becomes-un-usable-by-drag-action-if-highlighted-in-chrome */
    const stop = function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    };
    
    document.querySelectorAll('input[type="range"]').forEach((input) => { 
        input.draggable = true;
        input.addEventListener('dragstart', stop);
    });



    let rgb_ranges = $('input[type="range"]')
    let rgb_textboxes = $('.range-textbox')

    for (let i = 0; i < 3; ++i) {
        rgb_textboxes.eq(i).on('input', function() {force_numbers(rgb_textboxes.eq(i))})
        rgb_textboxes.eq(i).on('change', function() {round_value(rgb_textboxes.eq(i))})

        rgb_ranges.eq(i).on('input', function() {update_input(rgb_ranges.eq(i), rgb_textboxes.eq(i))} )
        rgb_textboxes.eq(i).on('input', function() {update_input(rgb_textboxes.eq(i), rgb_ranges.eq(i))} )
    }
}

$(document).ready(function() {
    synchronize_ranges()
})
