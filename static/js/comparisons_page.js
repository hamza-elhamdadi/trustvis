/******************************************************************************/
/*                     BUILD THE COMPARISONS PAGE                             */
/******************************************************************************/
function create_comparisons(labels, index, param_array, dataset_array, range_index){
    $('#main_holder').empty()

    let range_indices = [10+(range_index*10), 30+(range_index*10)]

    let question_text = generate_p(`${labels['title_page3']} $${range_indices[0]} and $${range_indices[1]}?`), question2_text = generate_p(labels['effort']).css('padding-top', '20px')

    let percentage_list = generate_datalist('per'),
        effort_list = generate_datalist('eff').css('width', '90%'), effort_labels = ['Very Easy', '', '', 'Medium', '', '', 'Very Hard'],
        effort_list_filled = ['Very Easy', 'Slightly Easy', 'Moderately Easy', 'Medium', 'Slightly Hard', 'Moderately Hard', 'Very Hard']

    let ticks = generate_div('ticks', 'ticks'), ticks2 = generate_div('ticks2', 'ticks')

    for(let i = 0; i <= 10; i++){
        percentage_list.append(generate_option(`${i*10}`, (i % 2 == 0) ? `${i*10}%` : ''))
        ticks.append(generate_checkspan('tick'))
    }
    
    for(let i = 0; i < effort_labels.length; i++){
        effort_list.append(generate_option(i, effort_labels[i]))
        ticks2.append(generate_checkspan('tick'))
    }

    let percentage_slider = generate_ticked_slider(labels['perc1'], 'per', 0, function(){
            let this_val = parseInt($(this).val(),10)
            responses[param_array[index].title.toLowerCase().replace(' ', '-')] = `${this_val}%`
            $('#percentage_value').html(`Your Answer: <b>${this_val}%</b>`)
        }, 100),
        effort_slider = generate_ticked_slider(labels['perc2'], 'eff', 0, function(){
            let this_val = parseInt($(this).val(),10)
            $('#effort_value').html(`Your Answer: <b>${effort_list_filled[this_val]}</b>`)
            responses[param_array[index].title.toLowerCase().replace(' ', '-') + '-effort'] = effort_list_filled[this_val]
        })
    
    $('#main_holder').append(
        generate_row()
            .append(generate_column(6)
                .append(generate_card()
                    .append($('<h2>', {html: `Chart ${8-dataset_array.length} of 7`}).css('margin-top', '10px'))
                    .append(generate_card_body()
                        .append(generate_svg_container().append(generate_svg(labels[`svg_r1c${index+1}`])))
                        .append(generate_button('Save Image', function(){
                            console.log(d3.select(`#${labels[`svg_r1c${index+1}`]}`))
                            saveSVGImage(d3.select(`#${labels[`svg_r1c${index+1}`]}`), `${param_array[index].title}_${dataset_array[index]}`)
                        }))
                    )
                )   
            )
            .append(generate_column('6 full-width').css('padding-top', '10px')                
                    .append(question_text)
                    .append(generate_p('Your Answer: <b>&lt;drag the slider below&gt;</b>', 'normal', 'percentage_value'))
                    .append(percentage_slider)
                    .append(ticks)
                    .append(percentage_list)
                    .append(generate_p(' '))
                    .append(question2_text)
                    .append(generate_p('Your Answer: <b>&lt;drag the slider below&gt;</b>', 'normal', 'effort_value'))
                    .append(effort_slider)
                    .append(ticks2)
                    .append(effort_list)
                
            )
    )

    let clicks = 0

    $('#main_holder').append(generate_row()
        .append(generate_button('Submit', function(){ 
            if(!(param_array[index].title.toLowerCase().replace(' ', '-') in responses && param_array[index].title.toLowerCase().replace(' ', '-') + '-effort' in responses)){
                alert('Please answer both questions.')
            }
            else{
                let curr_elapsed_time = Date.now()-running_time
                times.push({
                    page_name: 'Comparisons ' + (8-dataset_array.length),
                    time_val: curr_elapsed_time
                })
                running_time = Date.now()
                responses[`ms-time-comparisons-${8-dataset_array.length}`] = curr_elapsed_time
                responses[`time-comparisons-${8-dataset_array.length}`] = hms(curr_elapsed_time)

                responses[`comparisons-${8-dataset_array.length}`] = [param_array[index].title, dataset_array[index]]

                responses[`actual-${param_array[index].title.toLowerCase().replace(' ', '-')}`] = 
                    `${(main_data[dataset_array[index]].filter(d => d.x >= range_indices[0] && d.x <= range_indices[1]).length / main_data[dataset_array[index]].length) * 100}%`

                param_array.splice(index, 1)
                dataset_array.splice(index, 1)
                if(param_array.length > 0) 
                    create_comparisons(labels, 
                        random_integer(0, param_array.length), 
                        param_array,
                        dataset_array,
                        ++range_index
                    )
                else create_break(labels)
            }
             
            
        })))

    let svg = printBackground(labels[`svg_r1c${index+1}`])

    
    
    printScatterPlot(mappings, svg, main_data[dataset_array[index]], param_array[index])
    console.log(`dataset: ${dataset_array[index]}\ncondition: ${param_array[index].title}`)
}
