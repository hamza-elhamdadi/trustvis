


/******************************************************************************/
/*                         BUILD THE DEMOGRAPHICS PAGE                        */
/******************************************************************************/

function create_demographics_questionnaire(labels){
    $('#main_holder').empty()

    let card1 = generate_card(),
        card2 = generate_card(),
        card3 = generate_card(),
        card4 = generate_card(),
        card5 = generate_card(),
        card6 = generate_card()
        
    card1.append(generate_p(labels['brightness'], 'italic'))
         .append(generate_img('static/images/sharpness.png', 'contrast circle').css('align-self', 'center').css('margin-bottom', '20px'))
    
    card2.append(generate_p(labels['goals'], 'italic'))
         .append(generate_textbox('goals').css('width', '50%').css('align-self', 'center').css('margin-bottom', '20px'))

    card3.append(generate_p(labels['education'], 'italic'))
    card4.append(generate_p(labels['gender'], 'italic'))
    
    card5.append(generate_p(labels['age'], 'italic'))
         .append(generate_textbox('age').css('width', '50%').css('align-self', 'center').css('margin-bottom', '20px'))
    
    card6.append(generate_p(labels['distance'], 'italic'))
         .append(generate_textbox('distance').css('width', '50%').css('align-self', 'center').css('margin-bottom', '20px'))

    let brightness_form = $('<select>', {
        id:'brightness_form'
    }).css('width','50%').css('align-self', 'center').css('margin-bottom', '20px').css('padding','5px')
    
    let units = $('<select>', {
        id:'units'
    }).css('width','50%').css('align-self', 'center').css('margin-bottom', '20px').css('padding','5px')

    let education_form = $('<select>', {
        id:'education_form'
    }).css('width','50%').css('align-self', 'center').css('margin-bottom', '20px').css('padding','5px')

    let gender_form = $('<select>', {
        id:'gender_form',
        change:function(){
            if($(this).val() == 4){
                $('#gender_self_describe').css('display', 'inline-block')
            } 
            else $('#gender_self_describe').css('display', 'none')
        }
    }).css('width','50%').css('align-self', 'center').css('margin-bottom', '20px').css('padding','5px')

    let brightness_labels = [
            'Yes', 
            'No'
        ],
        unit_labels = [
            'inches',
            'centimeters'
        ]
        education_labels = [
            'Less than high school degree',
            'High school graduate (high school diploma or equivalent including GED)',
            'Some college but no degree',
            'Associate degree in college (2-year)',
            'Bachelor\'s degree in college (4-year)',
            'Master\'s degree',
            'Doctoral degree',
            'Professional degree (JD, MD)'
        ],
        gender_labels = [
            'Male',
            'Female',
            'Non-binary',
            'Prefer not to say',
            'Prefer to self-describe'
        ]

    for(let i = -1; i < brightness_labels.length; i++){
        if (i < 0) {
            brightness_form.append($('<option>', {
                html: '-- select an option --'
            }).prop('disabled', true).prop('selected', true).prop('value', true))
        }
        else brightness_form.append($('<option>', {
            value: brightness_labels[i],
            html: brightness_labels[i]
        }))
    }
    
    for(let i = -1; i < unit_labels.length; i++){
        if (i < 0) {
            units.append($('<option>', {
                html: '-- select an option --'
            }).prop('disabled', true).prop('selected', true).prop('value', true))
        }
        else units.append($('<option>', {
            value: unit_labels[i],
            html: unit_labels[i]
        }))
    }

    for(let i = -1; i < education_labels.length; i++){
        if (i < 0) {
            education_form.append($('<option>', {
                html: '-- select an option --'
            }).prop('disabled', true).prop('selected', true).prop('value', true))
        }
        else education_form.append($('<option>', {
            value: i,
            html: education_labels[i]
        }))
    }

    for(let i = -1; i < gender_labels.length; i++){
        if (i < 0) {
            gender_form.append($('<option>', {
                html: '-- select an option --'
            }).prop('disabled', true).prop('selected', true).prop('value', true))
        }
        else gender_form.append($('<option>', {
            value: i,
            html: gender_labels[i]
        }))
    }

    card1.append(brightness_form)
    card3.append(education_form)
    card4.append(gender_form)
         .append(generate_textbox('gender_self_describe').css('display','none').css('width','50%').css('align-self','center'))
    card6.append(units)
    

    $('#main_holder').append(
        generate_row()
            .append(card1)
            .append(card3)
            .append(card4)
            .append(card5)
            .append(card6)
            .append(card2)
            .append(generate_button('Submit', function(){
                let brightness_response = $('#brightness_form').val(),
                    education_response = $('#education_form').val(),
                    gender_response = $('#gender_form').val(),
                    age_response = parseInt($('#age').val(), 10),
                    distance_response = parseFloat($('#distance').val(), 10),
                    units_answer = $('#units').val()
                    goals_response = $('#goals').val()

                if(!brightness_response || !education_response || !gender_response || goals_response == ''){
                    alert('Please answer all questions on this page.')
                }
                else if(!units_answer){
                    alert('Please select a unit of measurement for monitor distance.')
                }
                else if(isNaN(age_response)){
                    alert('Age should be a number.')
                }
                else if(isNaN(distance_response)){
                    alert('Distance from monitor should be a number.')
                }
                else if(gender_response == 4 && $('#gender_self_describe').val() == ''){
                    alert('Please type a short description your gender identity in the textbox next to the "Prefer to self-describe" option.')
                }
                else{
                    let curr_elapsed_time = Date.now()-running_time
                    times.push({
                        page_name: 'Demographics',
                        time_val: curr_elapsed_time
                    })
                    responses['ms-time-demographics'] = curr_elapsed_time
                    responses['time-demographics'] = hms(curr_elapsed_time)
                    running_time = Date.now()

                    responses['contrast-test-response'] = brightness_response
                    responses['education-level'] = education_labels[parseInt(education_response, 10)]
                    if(gender_response == 4){
                        responses['gender'] = $('#gender_self_describe').val()
                    }
                    else responses['gender'] = gender_labels[parseInt(gender_response, 10)]
                    responses['age'] = age_response
                    responses['distance-from-monitor'] = `${distance_response} ${units_answer}`
                    responses['interpretation-of-goals'] = goals_response

                    create_farewell(labels)
                    //console.log(responses)
                }

                
            }))
    )
}