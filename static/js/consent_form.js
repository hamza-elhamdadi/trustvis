/******************************************************************************/
/*                             BUILD CONSENT FORM                             */
/******************************************************************************/
function create_consent_form(labels){
    $('#main_holder').empty()

    $('#main_holder').append(
        generate_row('text-left')
            .append(generate_column(6, 'text-center', 'pdf_viewer'))
            .append(generate_button('I agree', function(){ 
                let curr_elapsed_time = Date.now()-running_time
                times.push({
                    page_name: 'Consent Form',
                    time_val: curr_elapsed_time
                })
                responses['ms-time-consent-form'] = curr_elapsed_time
                responses['time-consent-form'] = hms(curr_elapsed_time)
                running_time = Date.now()
                get_id(labels)
            }))
    )

    PDFObject.embed("/static/data/consent-form.pdf", "#pdf_viewer", {height: '780px'})
}