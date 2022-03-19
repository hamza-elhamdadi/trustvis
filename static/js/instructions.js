/******************************************************************************/
/*                         BUILD AN INSTRUCTION PAGE                          */
/******************************************************************************/
function create_page(labels, index, num_descriptions){
    console.log(`index: ${index}`)

    $('#main_holder').empty()

    let description_card = generate_card()
    for(paragraph of labels[`description${index}`].split('\n'))
        description_card.append(generate_p(paragraph))

    

    let row = generate_row('text-left')

    row.append(description_card)

    if(index == 1) {
        row.append(generate_button('Next Page', function(){ 
            index = Math.min(index+1, num_descriptions) 

            if(index == num_descriptions){
                create_header(labels, num_descriptions)
            }
            else create_page(labels, index, num_descriptions) 
        }))
    }
    else{
        row.append(
                generate_column()
                    .append(
                        generate_row()
                            .append(generate_button('Back', function(){ 
                                index = Math.min(index-1, num_descriptions) 
                                create_page(labels, index, num_descriptions)  
                            }))
                    )
            )
            .append(
                generate_column()
                    .append(
                        generate_row()
                            .append(generate_button('Next Page', function(){ 
                                index = Math.min(index+1, num_descriptions) 
                                if(index == num_descriptions){
                                    create_header(labels, index, num_descriptions)
                                }
                                else create_page(labels, index, num_descriptions) 
                            }))
                    )
            )
    }

    $('#main_holder').append(row)
}