/******************************************************************************/
/*                           BUILD THE FAREWELL PAGE                          */
/******************************************************************************/
function create_farewell(labels){
    $('#main_holder').empty()
    let total_elapsed_time = Date.now()-time_start
    times.push({
        page_name: 'Total',
        time_val: total_elapsed_time
    })
    responses['ms-time-total'] = total_elapsed_time
    responses['time-total'] = hms(total_elapsed_time)

    responses['disqualified'] = false

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

    $('#main_holder').append(generate_row()
        .append(generate_card()
            .append(generate_p(labels.farewell))
            .append(generate_a(labels.redirect_text, labels.redirect_link))
        )
    )
}