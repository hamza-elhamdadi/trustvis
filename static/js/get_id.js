/******************************************************************************/
/*                            BUILD THE GETID PAGE                            */
/******************************************************************************/
function get_id(labels){
    $('#main_holder').empty()

    let card = generate_card()
        .append(generate_p(labels['prolific_id'], 'italic'))
        .append(generate_textbox('prolific').css('width', '50%').css('align-self', 'center').css('margin-bottom', '20px'))
    
    $('#main_holder').append(generate_row()
        .append(card)
        .append(generate_button('Proceed', function(){
            let prolid = $('#prolific').val()
            d3.json(`is-id-unique?id=${prolid}`)
                .then(function(unique){
                    if(prolid == ''){
                        alert('Please enter your Prolific ID')
                    }
                    else if(!unique){
                        alert('Someone with that Prolific ID has already completed this survey.')
                    }
                    else{
                        let curr_elapsed_time = Date.now()-running_time
                        times.push({
                            page_name: 'Prolific ID',
                            time_val: curr_elapsed_time
                        })
                        responses['ms-time-id-page'] = curr_elapsed_time
                        responses['time-id-page'] = hms(curr_elapsed_time)
                        running_time = Date.now()
        
                        responses['prolific-id'] = prolid
        
                        
                        d3.json('user-number').then(function(num_use_data){
                            user_num = num_use_data['user_num']
                            responses['user-num'] = user_num
                            console.log(`User Number: ${user_num}`)
                            console.log('Conditions Value: ' + Math.floor(user_num%48/8))
        
                            attention_check(labels)
                        })             
                    }
                })
            
        }))
    )

}