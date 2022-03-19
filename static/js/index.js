const margin = {
    top: 10,
    bottom: 40,
    left: 45,
    right: 25
}

const tokens_page_randomization = [
    [['r1', 'r2'], ['r1c1', 'r1c2'], 'right'],
    [['r1', 'r2'], ['r1c1', 'r1c2'], 'left'],
    [['r1', 'r2'], ['r1c2', 'r1c1'], 'right'],
    [['r1', 'r2'], ['r1c2', 'r1c1'], 'left'],
    [['r2', 'r1'], ['r1c1', 'r1c2'], 'right'],
    [['r2', 'r1'], ['r1c1', 'r1c2'], 'left'],
    [['r2', 'r1'], ['r1c2', 'r1c1'], 'right'],
    [['r2', 'r1'], ['r1c2', 'r1c1'], 'left']
]


// Chrome 1 - 79

const conditions = [
    {filter: 'blur(1px)', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0, title: 'Blur'},
    {filter: '', opacity: 0.5, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 0, title: 'Transparency'},
    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: true, scale: 1, overlap: 0, title: 'Outline'},
    {filter: '', opacity: 1, grid_lines: true, num_lines: 20, outline: false, scale: 1, overlap: 0, title: 'Grid Lines'},
    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 0.5, overlap: 0, title: 'Scale'},
    {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 20, title: 'Overlap'}
]


var main_data = {}, 
    mappings = {
        x: 'x',
        y: 'y',
        x_label: 'Ticket Price',
        y_label: 'Total Profit (In Thousands of Dollars)'
    },
    timed = false,
    alternate = true,
    datafile_x, datafile_y,
    token_color_1 = '#c29e29', token_color_2 = '#555'
    responses = {}

var user_num

var time_start, time_end, running_time, times = []



function load(){
    $.getJSON( '../static/metadata/page1.json', (labels) => {
        let correlation = 0.5//Math.floor(Math.random() * (80 - 20) + 20) / 100
        d3.json(`get-data?correlation=${correlation}&intercept=${alternate}`)
        .then(function(rows){
            main_data['r1c1'] = rows.map(d => { return { x: d[0], y: d[1] } })

            d3.json(`get-data?correlation=-${correlation}&intercept=${alternate}`)
            .then(function(rows2){
                main_data['r1c2'] = rows2.map(d => { return { x: d[0], y: d[1] } })
                
                d3.json(`get-data?correlation=${-0.9}&intercept=${alternate}`)
                .then(function(rows3){
                    main_data['r1c3'] = rows3.map(d => { return { x: d[0], y: d[1] } })
                    d3.json(`get-data?correlation=${0.1}&intercept=${alternate}`)
                    .then(function(rows4){
                        main_data['r1c4'] = rows4.map(d => { return { x: d[0], y: d[1] } })
                        d3.json(`get-data?correlation=${0.9}&intercept=${alternate}`)
                        .then(function(rows5){
                            main_data['r1c5'] = rows5.map(d => { return { x: d[0], y: d[1] } })
                            d3.json(`get-data?correlation=${-0.25}&intercept=${alternate}`)
                            .then(function(rows6){
                                main_data['r1c6'] = rows6.map(d => { return { x: d[0], y: d[1] } })
                                d3.json(`get-data?correlation=${0.25}&intercept=${alternate}`)
                                .then(function(rows7){
                                    main_data['r1c7'] = rows7.map(d => { return { x: d[0], y: d[1] } })
                                    time_start = Date.now()
                                    running_time = Date.now()
                                    create_consent_form(labels)
                                    //create_literacy_test(labels, 0)
                                    //create_demographics_questionnaire(labels)
                                    /*create_comparisons(labels, random_integer(0,6), [
                                        {filter: 'blur(1px)', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 1, title: 'Blur'},
                                        {filter: '', opacity: 0.5, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 1, title: 'Transparency'},
                                        {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: true, scale: 1, overlap: 1, title: 'Outline'},
                                        {filter: '', opacity: 1, grid_lines: true, num_lines: 20, outline: false, scale: 1, overlap: 1, title: 'Grid Lines'},
                                        {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 0.5, overlap: 1, title: 'Scale'},
                                        {filter: '', opacity: 1, grid_lines: false, num_lines: 10, outline: false, scale: 1, overlap: 20, title: 'Overlap'}
                                    ], 0)*/
                                    //create_demographics_questionnaire(labels)
                                    //create_comparisons(labels)
                                })
                            })
                        })
                    })
                })
                
            })
        })
    })
}

window.onload = function(){
    if (navigator.userAgent.indexOf("Chrome") == -1){
        $('#main_holder').append(
            generate_h4('Please do this survey in a Chrome browser.')
        )
    }
    else{
        responses['screen-height'] = window.screen.height
        responses['screen-width'] = window.screen.width
        load() 
    }

    
}

function changeTimer(){
    timed = !timed
    let curr = $('#timer').html()
    $('#timer').html(curr == 'Timed' ? 'Untimed' : 'Timed')
    $('#main_holder').empty()
    load()
}

function hms(time){
    seconds=Math.floor((time/1000)%60)
    minutes=Math.floor((time/(1000*60))%60)
    hours=Math.floor((time/(1000*60*60))%24)

    return `${hours}:${minutes}:${seconds}`
}