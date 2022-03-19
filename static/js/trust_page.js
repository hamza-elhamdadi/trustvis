/******************************************************************************/
/*                            BUILD THE TRUST PAGE                            */
/******************************************************************************/
function create_trust_page(labels){
    $('#left_holder').empty()
    $('#main_holder').empty()

    create_visualizations(labels)

    let trust_list_1 = generate_datalist('t1'), trust_list_2 = generate_datalist('t2')
    let radio_labels = ['A Little Trustworthy', 'Slightly Trustworthy', 'Somewhat Trustworthy', 'Neither Trustworthy Nor Untrustworthy', 'Moderately Trustworthy', 'Very Trustworthy', 'To A Large Extent Trustworthy']
    let radio_labels_simplified = [...Array(7).keys()].map(d => d+1)

    let ticks = generate_div('ticks', 'ticks'), ticks2 = generate_div('ticks2', 'ticks')

    for(let i = 0; i < radio_labels.length; i++)
    {
        trust_list_1.append(generate_option(i, radio_labels_simplified[i]))
        trust_list_2.append(generate_option(i, radio_labels_simplified[i]))

        ticks.append(generate_checkspan('tick'))
        ticks2.append(generate_checkspan('tick'))
    }

    let trust_slider_1 = generate_ticked_slider(labels['perc1'], 't1', 0, function(){
        let this_val = parseInt($(this).val(),10)
        $('#t1_value').html(`Your Answer: <b>${this_val+1} - ${radio_labels[this_val]}</b>`)
        
        responses[(tokens_page_randomization[user_num%8][2] == 'right') ? 'trust-default': 'trust-camouflaged'] = radio_labels[this_val]
    })

    let trust_slider_2 = generate_ticked_slider(labels['perc2'], 't2', 0, function(){
        let this_val = parseInt($(this).val(),10)
        $('#t2_value').html(`Your Answer: <b>${this_val+1} - ${radio_labels[this_val]}</b>`)
        responses[(tokens_page_randomization[user_num%8][2] == 'right') ? 'trust-camouflaged': 'trust-default'] = radio_labels[this_val]
    })

    $('#main_holder').append(generate_row()
        .append(generate_row()
            .append(generate_column('6 full-width')
                .append(generate_p(labels[(labels[tokens_page_randomization[user_num%8][0][0]] == 'r1') ? 'trust1' : 'trust2']))
                .append(generate_p(`Your Answer: <b>&lt;drag the slider below&gt;</b>`, 'normal', 't1_value'))
                .append(trust_slider_1)
                .append(ticks)
                .append(trust_list_1)
            )
            .append(generate_column('6 full-width')
                .append(generate_p(labels[(labels[tokens_page_randomization[user_num%8][0][0]] == 'r1') ? 'trust2' : 'trust1']))
                .append(generate_p(`Your Answer: <b>&lt;drag the slider below&gt;</b>`, 'normal', 't2_value'))
                .append(trust_slider_2)
                .append(ticks2)
                .append(trust_list_2)
            )
        ))
        .append(generate_row()
            .append(generate_button('Submit', function(){
            if(!('trust-camouflaged' in responses && 'trust-default' in responses)){
                alert('Please answer both questions.')
            }
            else{
                let curr_elapsed_time = Date.now()-running_time
                times.push({
                    page_name: 'Trust Page',
                    time_val: curr_elapsed_time
                })
                running_time = Date.now()
            
                responses['ms-time-trust-page'] = curr_elapsed_time
                responses['time-trust-page'] = hms(curr_elapsed_time)
                
                create_comparisons(labels, random_integer(0,6), [
                    {filter: 'blur(1px)', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0, title: 'Blur'},
                    {filter: '', opacity: 0.5, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0, title: 'Transparency'},
                    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: true, scale: 1, overlap: 0, title: 'Outline'},
                    {filter: '', opacity: 1, grid_lines: true, num_lines: 20, outline: false, scale: 1, overlap: 0, title: 'Grid Lines'},
                    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 0.5, overlap: 0, title: 'Scale'},
                    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 20, title: 'Overlap'}
                ], [
                    `r1c${(user_num%6)+1}`, 
                    `r1c${((user_num+1)%6)+1}`, 
                    `r1c${((user_num+2)%6)+1}`, 
                    `r1c${((user_num+3)%6)+1}`, 
                    `r1c${((user_num+4)%6)+1}`, 
                    `r1c${((user_num+5)%6)+1}`
                ], 0)
            }
        })))
}