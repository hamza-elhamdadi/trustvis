/******************************************************************************/
/*                                  PAGE ELEMENTS                             */
/******************************************************************************/
function generate_row(text_align='text-center'){
    return $('<div>', {
        class: 'row justify-content-center '+text_align
    })
}

function generate_column(divide=6, text_align='text-center', id=''){
    return $('<div>', {
        class: `col-${divide} justify-content-center ${text_align}`,
        id: id
    })
        //.css('border-left', '1px solid black')
}

function generate_div(id, divclass='') {
    return $('<div>', { id: id, class: divclass })
}

function generate_card(color='bg-light', text='text-secondary'){
    return $('<div>', { class: `card ${color} ${text}` })
}

function generate_card_body(){
    return $('<div>', { class: 'card-body' })
}

function generate_svg_container(padding='big-padding'){
    return $('<div>', { class: `svg-container ${padding}`})
}

function generate_pdf_reader(filename){
    return $('<object>', {
        data: filename,
        type: 'application/pdf',
        width: 300,
        height: 200
    })
}

function generate_ul(ul_class='likert'){
    return $('<ul>', { class: `list-inline ${ul_class}` })
}

function generate_li(){
    return $('<li>')
}

function generate_label(text='', refer=null, label_class='', id=null){
    return $('<label>', {html: text, class: label_class, for: refer, id: id})
}

/******************************************************************************/
/*                                   JS ELEMENTS                              */
/******************************************************************************/
function generate_svg(id, params=null){
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.id = id

    if(params){
        svg.setAttribute('width', params.width)
        svg.setAttribute('height', params.height)
    }

    return svg
}

function generate_slider(id, min, max, value, changeFunction){
    return $('<div>', { class: 'slider-div' })
        .append(
            $('<input>', {
                type: 'range',
                id: id,
                min: min,
                max: max,
                value: value,
                change: changeFunction
            })
        )
}

function generate_ticked_slider(id, datalist, value, changeFunction, maxval=6){
    return $('<div>', { class: 'slider-div' })
        .append(
            $('<input>', {
                type: 'range',
                id: id,
                value: value,
                list: datalist,
                min: 0,
                max: maxval
                
            }).on('input', changeFunction)
        )
}

function generate_datalist(id){
    return $('<datalist>', { id: id })
}

function generate_option(value, label=''){
    return $('<option>', {
        value: value,
        label: label
    })
}

function generate_radio(name, value, is_checked, id=null){
    return $('<input>', {
        type: 'radio',
        name: name,
        value: value,
        id: id
    }).prop('checked', is_checked)
}

function generate_textbox(id, text=''){
    return $('<input>', {
        type: 'text',
        id: id,
        value: text
    })
}

function generate_checkbox(id, change){
    return $('<input>', { 
        type: 'checkbox', 
        id: id, 
        change: change
    })
}

function generate_checkspan(spanclass='slider round', htmltext=''){
    return $('<span>', {class: spanclass, html: htmltext})
}

function generate_button(text, clickFunction, id=''){
    return $('<button>', {
        class: 'btn btn-outline-secondary',
        click: clickFunction,
        html: text,
        id: id
    })
}

function generate_img(src, alt='', img_class='literacy_img'){
    return $('<img>', {
        src: src,
        alt: alt,
        class: img_class
    })
}

/******************************************************************************/
/*                                  TEXT ELEMENTS                             */
/******************************************************************************/
function generate_h4(text){
    return $('<h4>', {
        html: text
    })
}

function generate_p(text, style='normal', id=null, p_class='standard_p'){
    return $('<p>', {
        class: p_class,
        html: text,
        id: id
    }).css('font-style', style)
}

function generate_a(text, url){
    return $('<a />', {
        href: url,
        html: text
    }).css('font-size', '18pt')
}