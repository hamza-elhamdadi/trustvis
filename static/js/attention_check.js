/******************************************************************************/
/*                       BUILD THE ATTENTION CHECK PAGE                       */
/******************************************************************************/
function attention_check(labels){
    $('#main_holder').empty()

    let attention_colors = ['Red', 'Blue', 'Green', 'Orange', 'Brown']
    let text_list = labels.attention.split('\n'),
        text_card = generate_card()
    
    text_list.forEach(function(d){
        text_card
            .append(generate_p(d))
    })

    let answers_div = generate_div('options', 'ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3')

    let answers_container = generate_div('', 'container mt-sm-5 pl-sm-5 pt-2')

    let answers = generate_div('', 'question ml-sm-5 pl-sm-5 pt-2')

    attention_colors.forEach(function(d){
        answers.append(
            $('<label>', {
                class: 'options',
                html: d 
            })
                .append(
                    $('<input>', {
                        type: 'radio',
                        name: 'color_answer',
                        value: d
                    })
                )
                .append(
                    $('<span>', {
                        class: 'checkmark'
                    })
                )
        )
    })

    text_card.append(answers_container.append(answers.append(answers_div)))

    //text_card.append(generate_textbox('attention_check').css('width', '50%').css('align-self', 'center').css('margin-bottom', '20px'))

    $('#main_holder').append(generate_div('', 'row justify-content-left text-left')
        .append(text_card)
        .append(generate_button('Proceed', function(){ 

            let answer_radios = $('input[type=radio]')
            let attcheck = null

            answer_radios.each(function(){
                if($(this).prop('checked')) attcheck = $(this).val()
            })

            console.log(attcheck)
            
            if(attcheck != 'Green'){
                $('#main_holder').empty()
                $('#main_holder').append(generate_row().append(generate_card().append(generate_p(labels['disqualification']))))

                responses['disqualified'] = true

                var xhr = new XMLHttpRequest();
                var url = "save-data";
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        console.log(json);
                    }
                };
                var data = JSON.stringify(responses);
                xhr.send(data);
            }
            else create_header(labels)
                /*create_comparisons(labels, random_integer(0,7), [
                    {filter: 'blur(1px)', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0, title: 'Blur'},
                    {filter: '', opacity: 0.5, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0, title: 'Transparency'},
                    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: true, scale: 1, overlap: 0, title: 'Outline'},
                    {filter: '', opacity: 1, grid_lines: true, num_lines: 20, outline: false, scale: 1, overlap: 0, title: 'Grid Lines'},
                    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 0.5, overlap: 0, title: 'Scale'},
                    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 20, title: 'Overlap'},
                    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0, title: 'Control'}
                ], [
                    `r1c${(user_num%7)+1}`, 
                    `r1c${((user_num+1)%7)+1}`, 
                    `r1c${((user_num+2)%7)+1}`, 
                    `r1c${((user_num+3)%7)+1}`, 
                    `r1c${((user_num+4)%7)+1}`, 
                    `r1c${((user_num+5)%7)+1}`,
                    `r1c${((user_num+6)%7)+1}`
                ], 0)*/
            
        }))
    )

}