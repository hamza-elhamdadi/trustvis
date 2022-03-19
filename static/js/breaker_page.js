/******************************************************************************/
/*                         BUILD AN INSTRUCTION PAGE                          */
/******************************************************************************/
function create_break(labels){
    $('#main_holder').empty()

    let description_card = generate_card()
    for(paragraph of labels['before_literacy'].split('\n'))
        description_card.append(generate_p(paragraph))


    $('#main_holder').append(
        generate_row('text-left')
            .append(description_card)
            .append(generate_button('Next Page', function(){ 
                let curr_elapsed_time = Date.now()-running_time
                times.push({
                    page_name: 'Break Page',
                    time_val: curr_elapsed_time
                })
                responses[`ms-time-break-page`] = curr_elapsed_time
                responses[`time-break-page`] = hms(curr_elapsed_time)
                running_time = Date.now()
                
                create_literacy_test(labels, 0) 
                //create_demographics_questionnaire(labels)
            }))
    )
}