/******************************************************************************/
/*                        BUILD VISUALIZATION HEADER                          */
/******************************************************************************/
function create_header(labels){

    $('#main_holder').empty()

    let modal_button = $('<button>', {
        type: 'button',
        class: 'btn btn-outline-secondary',
        'data-bs-toggle': 'modal',
        'data-bs-target': '#instructions_modal',
        html:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>`
    }).css('font-size', '8pt')

    let modal_container = $('<div>', {
        class: 'modal fade',
        id: 'instructions_modal',
        tabindex: -1,
        role: 'dialog',
        'aria-labelledby': 'instructions_modal_title',
        'aria-hidden': false
    })

    let modal_text = $('<div>', { class: 'modal-body'})

    modal_container.append(
        $('<div>', {
            class: 'modal-dialog modal-xl',
            role: 'document'
        }).append(
            $('<div>', {class: 'modal-content'})
                .append(modal_text)
                .append(
                    $('<div>', {class: 'modal-footer'})
                        .append($('<button>', {
                            type: 'button',
                            class: 'btn btn-secondary',
                            'data-bs-toggle': 'modal',
                            html: 'Close'
                        }))
                )
        )
    )
    for(paragraph of labels[`instructions`].split('\n')){
        if(paragraph.startsWith('<u>')) modal_text.append(generate_p(paragraph, 'normal', null, '').css('font-size', '1.4rem'))
        else modal_text.append(generate_p(paragraph, 'normal', null, '').css('font-size', '1.5rem'))
    }
    create_visualizations(labels)
    create_selection_page(labels)

    $('#left_holder').append(generate_row()
        .append(
            generate_column().append(modal_button.css('margin-bottom', '10px'))
        )
    )
    
    $('#main_holder').append(generate_row('text-left').append(modal_container))

    modal_button.click()

    
}

/******************************************************************************/
/*                          BUILD BOTH VISUALIZATIONS                         */
/******************************************************************************/
function create_visualizations(labels){
    $('#main_holder').append(generate_row()
        .append(generate_column()
            .append(generate_card().append(generate_card_body()
                .append(generate_h4(labels[tokens_page_randomization[user_num%8][0][0]]))
                .append(generate_row().append(generate_img((tokens_page_randomization[user_num%8][1][0] == 'r1c1') ? labels['para1'] : labels['para2']).css('height','100%').css('object-fit', 'cover').css('width', '80%')))
                .append(generate_svg_container().append(generate_svg(labels['svg_r1c1'])))
            ))
        )
        .append(generate_column()
            .append(generate_card().append(generate_card_body()
                .append(generate_h4(labels[tokens_page_randomization[user_num%8][0][1]]))
                .append(generate_row().append(generate_img((tokens_page_randomization[user_num%8][1][0] == 'r1c1') ? labels['para2'] : labels['para1']).css('height','100%').css('object-fit', 'cover').css('width', '80%')))
                .append(generate_svg_container().append(generate_svg(labels['svg_r1c2'])))
            ))
        ))
        
    let svg1 = printBackground(labels['svg_r1c1']),
        svg2 = printBackground(labels['svg_r1c2'])

    let params1 = {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0},
        params2 = conditions[Math.floor(user_num%48/8)]

    let correlation_map = {
        'r1c1': 0.5,
        'r1c2': -0.5
    }, company_map = {
        'r1c1': labels['para1'],
        'r1c2': labels['para2']
    }
    
    responses['study-condition'] = conditions[Math.floor(user_num%48/8)].title

    responses['correlation-camouflaged'] = (tokens_page_randomization[user_num%8][2] == 'right') 
        ? correlation_map[tokens_page_randomization[user_num%8][1][1]]
        : correlation_map[tokens_page_randomization[user_num%8][1][0]]
    responses['correlation-default'] = (tokens_page_randomization[user_num%8][2] == 'right') 
        ? correlation_map[tokens_page_randomization[user_num%8][1][0]]
        : correlation_map[tokens_page_randomization[user_num%8][1][1]]

    responses['side-camouflage'] = tokens_page_randomization[user_num%8][2]
    responses['side-default'] = (tokens_page_randomization[user_num%8][2] == 'right') ? 'left' : 'right'
    
    responses['company-camouflage'] = (tokens_page_randomization[user_num%8][2] == 'right') 
        ? labels[tokens_page_randomization[user_num%8][0][1]] 
        : labels[tokens_page_randomization[user_num%8][0][0]]
    responses['company-default'] = (tokens_page_randomization[user_num%8][2] == 'right') 
        ? labels[tokens_page_randomization[user_num%8][0][0] ]
        : labels[tokens_page_randomization[user_num%8][0][1]]

    printScatterPlot(mappings, svg1, main_data[tokens_page_randomization[user_num%8][1][0]],
        (tokens_page_randomization[user_num%8][2] == 'right') ? params1 : params2)
    printScatterPlot(mappings, svg2, main_data[tokens_page_randomization[user_num%8][1][1]], 
        (tokens_page_randomization[user_num%8][2] == 'right') ? params2 : params1)
}

/******************************************************************************/
/*                          BUILD THE SELECTION PAGE                          */
/******************************************************************************/
function create_selection_page(labels){
    if(timed) $('#main_holder').empty()

    let store = function(){
        $(this).data('val', $(this).val())
    }

    let verify = function(){
        let old = $(this).data('val')
        let curr = parseInt($(this).val(), 10)

        if(curr && (curr > 0 && curr <= 100)) {
            $(this).val(curr)

            if($(this).attr('id') == 'tickets1') {
                responses['percent-tickets-default'] = (tokens_page_randomization[user_num%8][2] == 'right') ? curr : 100 - curr
                responses['percent-tickets-camouflaged'] = (tokens_page_randomization[user_num%8][2] == 'right') ? 100 - curr : curr

                $('#tickets2').val(100 - curr)
            }
            else {
                responses['percent-tickets-camouflaged'] = (tokens_page_randomization[user_num%8][2] == 'right') ? curr : 100 - curr
                responses['percent-tickets-default'] = (tokens_page_randomization[user_num%8][2] == 'right') ? 100 - curr : curr

                $('#tickets1').val(100 - curr)
            }

            $(this).data('val', $(this).val())
        }
        else {
            $(this).val(old)
        }
    }

    let instr = generate_row('text-left').css('padding-bottom', '20px')

    labels.instructions2.split('\n').forEach(function(d){
        instr.append(generate_p(d).css('margin-bottom', 0))
    })

    $('#main_holder')
        .append(instr)
        .append(generate_row().css('padding-bottom', '20px')
            .append(generate_column('6 full-width')
                .append(generate_p('I will give ').css('display','inline'))
                .append(
                    generate_textbox('tickets1', null)
                        .on('focusin', store)
                        .on('change', verify)
                        .css('display','inline')
                        .css('width', '50px')
                )
                .append(generate_p(' % of my tickets to ' + labels[tokens_page_randomization[user_num%8][0][0]]).css('display','inline'))
                
            )
            .append(generate_column('6 full-width')
                .append(generate_p('I will give ').css('display','inline'))
                .append(
                    generate_textbox('tickets2', null)
                        .on('focusin', store)
                        .on('change', verify)
                        .css('display','inline')
                        .css('width', '50px')
                )
                .append(generate_p(' % of my tickets to ' + labels[tokens_page_randomization[user_num%8][0][1]]).css('display','inline'))
                
            )
        )
        .append(generate_row().append(generate_button('Submit', function(){
            if(!($('#tickets1').val() && $('#tickets2').val())){
                alert('Please type a percentage in both text boxes.')
            }
            else{
                let curr_elapsed_time = Date.now()-running_time
                times.push({
                    page_name: 'Tokens Page',
                    time_val: curr_elapsed_time
                })
                running_time = Date.now()
                responses['ms-time-tokens-page'] = curr_elapsed_time
                responses['time-tokens-page'] = hms(curr_elapsed_time)
                create_trust_page(labels)
            }
        })))
}