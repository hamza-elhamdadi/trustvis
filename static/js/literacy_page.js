/******************************************************************************/
/*                            BUILD LITERACY TEST                             */
/******************************************************************************/
function create_literacy_test(labels, index){
    $('#main_holder').empty()
    let card = generate_card(), answer, img, answer_labels
        images = ['static/images/Q2.png', 'static/images/Q5.png', 'static/images/Q4.png', 'static/images/Q6.png']

    card
        .append(generate_h4(`Question ${index+1} of 4`))
        .append(generate_p(labels[`literacy${index+1}_top`], 'italic'))
        .append(generate_img(images[index], 'cancer pie chart', (index % 2 == 1) ? 'literacy_img2' : 'literacy_img').css('align-self', 'center'))
        .append(generate_p(labels[`literacy${index+1}_bottom`], 'italic'))

    if(index % 2 == 0){
        answer = generate_datalist('percentages')
        for(let i = 0; i <= 10; i++) answer.append(generate_option(`${i*10}`, (index == 0) ? `${i*10}%` : i*10))

        card
            .append(generate_p('Your Answer: <b>&lt;drag the slider below&gt;</b>', 'normal', 'lit'))
            .append(generate_ticked_slider('literacy_test', 'percentages', 0, function(){
                $('#lit').html((index == 0) ? `Your Answer: <b>${$(this).val()}%</b>` : `Your Answer: <b>${$(this).val()}</b>`)
                responses[`literacy-question-${index+1}`] = (index == 0) ? `${$(this).val()}%` : $(this).val()
            }, 100))
            .append(answer)
    }
    else{
        answer = generate_ul()
        
        if(index == 1) answer_labels = ['Corsicol', 'Hertinol', 'They are equal', 'Can\'t say']
        else answer_labels = ['Apsoriatin', 'Nopsorian', 'They are equal', 'Can\'t say']

        for(let i = 0; i < answer_labels.length; i++)
            answer.append(generate_li()
                .append(generate_radio('literacy_test', i, false))
                .append(generate_label(answer_labels[i]))
            )
        
        card.append(answer)
    }

    $('#main_holder').append(generate_row('text-center')
        .append(card)
        .append(generate_button('Next Page', function(){
            let response

            if(index % 2 == 0){
                response = responses[`literacy-question-${index+1}`]
            }
            else{
                radios = $('input[name="literacy_test"]')
                radios.each(function(){
                    if ($(this).prop('checked')) response = $(this).val()
                })
            }

            if(response == null) alert('Please provide an answer to the question.')
            else{
                let curr_elapsed_time = Date.now()-running_time
                times.push({
                    page_name: `Literacy Question ${index+1}`,
                    time_val: curr_elapsed_time
                })
                running_time = Date.now()
                responses[`ms-time-literacy-question-${index+1}`] = curr_elapsed_time
                responses[`time-literacy-question-${index+1}`] = hms(curr_elapsed_time)

                responses[`literacy-question-${index+1}`] = (index % 2 == 0) ? response + '%' : answer_labels[parseInt(response, 10)]

                if(index < 3) create_literacy_test(labels, ++index)
                else create_demographics_questionnaire(labels)
            }
        }))
    )
    
}