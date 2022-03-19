function printBackground(id){
    let formatted_id, svg, 
        width, height, side
    
    if(!id.startsWith('#')) formatted_id = '#' + id
    else formatted_id = id

    svg = d3.select(formatted_id)

    width = parseFloat(svg.style('width'), 10); height = parseFloat(svg.style('height'), 10)
    side = Math.max(width)

    svg.append('rect')
        .attr('x', 0).attr('y', 0)
        .attr('width', side).attr('height', side)
        .attr('fill', 'white')

    return svg
}

function printTokens(id, labels){
    let svg = d3.select(id)
    let width = parseFloat(svg.style('width'), 10), height = 40
    
    let adjusted_width = width - 4,
        adjusted_height = height - 4
    
    let diameter = adjusted_width / 10
    let radius = diameter / 2

    let data = [...Array(10).keys()]
    data = data.map(d => {
        return {
            index: d,
            value: d*diameter + radius,
        }
    })

    responses['x-tokens'] = 5; responses['y-tokens'] = 5

    let id1 = labels.slider1, id2=labels.slider2
    let name1 = labels.r1, name2 = labels.r2

    function clickToken(i, event, id1, id2, name1, name2){
        if(event.path[2].id == 'y_tokens') i = 8 - i
        $(`#${id1}_updated`).html(`${labels['appended_text_1']}${i+1}${labels['appended_text_2']}${name1}`)
        $(`#${id2}_updated`).html(`${labels['appended_text_1']}${9-i}${labels['appended_text_2']}${name2}`)
        d3.selectAll('.circle').each(function(element, index){
            if(index <= i || (index < 19-i && index >= 10)) $(this).css('fill', token_color_1)
            else $(this).css('fill', token_color_2)
        })
        responses['x-tokens'] = i+1
        responses['y-tokens'] = 9-i
    }

    let group = svg.append('g')
        .attr('transform', `translate(2,2)`)
        .selectAll('dot')
        .data(data)
        .enter()
    
    group.append('circle')
        .attr('class', `circle`)
        .attr('r', 0.85*radius)
        .attr('cx', d => d.value)
        .attr('cy', adjusted_height / 2)
        .style('fill', d => (d.index < 5) ? token_color_1 : token_color_2)
        .attr('opacity', 1)
        .on('mouseover', function(d){
            d3.select(this).style('fill', d3.select(this).style('fill').replace('rgba', 'rgb').replace('rgb', 'rgba').replace(')', ', 0.5)'))
            d3.select(this).style("cursor", "pointer")
        })
        .on('mouseout', function(d){
            let p_array = d3.select(this).style('fill').replace('rgba', 'rgb').replace('rgb', 'rgba').split(',')
            p_array.pop()
            d3.select(this).style('fill', p_array.join(',') + ')')
            d3.select(this).style("cursor", "default")
        })
        .on('click', function(event, d){clickToken(d.index, event, id1, id2, name1, name2)})
    
    

    svg.attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${adjusted_width} ${adjusted_height}`)
        .classed("svg-content", true)
}

function printScatterPlot(mappings, svg, data, 
        params={filter: '', 
                opacity: 1, 
                grid_lines: false, 
                num_lines: 10,
                outline: false,
                scale: 1,
                overlap: 0}
        )
    {
    let width, height, side
    let adjusted_width, adjusted_height

    let padding = (1 - params.scale) / 2

    width = parseFloat(svg.style('width'), 10); height = parseFloat(svg.style('height'), 10)
    side = Math.max(width, height)
    adjusted_width = side - (margin.left + margin.right) - padding
    adjusted_width2 = side - (margin.left + margin.right)
    adjusted_height = side - (margin.top + margin.bottom) - padding
    adjusted_height2 = side - (margin.top + margin.bottom)

    let x_extent, y_extent

    if (params.scale > 0){
        let new_extent = (100/params.scale - 100)/2
        x_extent = [0,100/params.scale]
        y_extent = [0,100/params.scale]
    }
    else{
        x_extent = [0,100]
        y_extent = [0,100]
    }

    let x_range = [0, adjusted_width2],
        y_range = [adjusted_height2, 0]
    
    let x_range2 = [padding*adjusted_width, (1-padding)*adjusted_width],
        y_range2 = [(1-padding)*adjusted_height, padding*adjusted_height]

    let x_scale = d3.scaleLinear().domain(x_extent).range(x_range)
    let y_scale = d3.scaleLinear().domain(y_extent).range(y_range)

    let x_range_scale = d3.scaleLinear().domain(x_extent).range(x_range)
    let y_range_scale = d3.scaleLinear().domain(y_extent).range(y_range)

    svg.append('g')
        .attr('transform', `translate(${margin.left+padding},${margin.top+padding})`)
        .selectAll('dot')
        .data(data)
        .enter().append('circle')
            .attr('r', 1.5)
            .attr('cx', d => {
                let center = x_range_scale(50), value = x_range_scale(d[mappings.x])+1

                if (params.overlap == 0) return value

                if (value > center) return Math.min(Math.max(5, value - params.overlap), adjusted_width-5)
                else if (value < center) return Math.min(Math.max(5, value + params.overlap), adjusted_width-5)
                else return value
            })
            .attr('cy', d => {
                let center = y_range_scale(50), value = y_range_scale(d[mappings.y])

                if (params.overlap == 0) return value

                if (value > center) return Math.min(Math.max(5, value - params.overlap), adjusted_height-5)
                else if (value < center) return Math.min(Math.max(5, value + params.overlap), adjusted_height-5)
                else return value
            })
            .style('fill', 'black')
            .style('stroke', params.outline ? 'grey' : undefined)
            .style('stroke-width', 1)
            .attr('opacity', params.opacity)
            .attr('stroke-alignment', 'outer')
            .attr('filter', params.filter) 

    if(params.grid_lines){
        //x gridlines
        svg.append('g')
            .attr('class', params.grid_lines ? 'grid' : 'axis')
            .attr('transform', `translate(${margin.left},${side-margin.bottom-y_range[1]})`)
            //.attr('filter', is_blurry ? 'blur(1px)' : '')
            .call(d3.axisBottom(x_scale).ticks(params.num_lines).tickSize(-adjusted_height).tickFormat(''))

        //y axis
        svg.append('g')
            .attr('class', params.grid_lines ? 'grid' : 'axis')
            .attr('transform', `translate(${margin.left+x_range[0]},${margin.top})`)
            .call(d3.axisLeft(y_scale).ticks(params.num_lines).tickSize(-adjusted_width).tickFormat(''))
    }

    //x axis
    let x_axis = svg.append('g')
        .attr('class', params.grid_lines ? 'grid' : 'axis')
        .attr('transform', `translate(${margin.left},${side-margin.bottom-y_range[1]})`)
        //.attr('filter', is_blurry ? 'blur(1px)' : '')
        .call(d3.axisBottom(x_scale).tickSizeOuter(0).tickFormat(d => formatLargeNumbers(d, '$')))

    //y axis
    let y_axis = svg.append('g')
        .attr('class', params.grid_lines ? 'grid' : 'axis')
        .attr('transform', `translate(${margin.left+x_range[0]},${margin.top})`)
        .call(d3.axisLeft(y_scale).tickSizeOuter(0).tickFormat(d => `${d}`))
    
    x_axis.selectAll(`.${params.grid_lines ? 'grid' : 'axis'} text`).attr('font-size', `9px`)
    y_axis.selectAll(`.${params.grid_lines ? 'grid' : 'axis'} text`).attr('font-size', `9px`)

    //x axis label
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', adjusted_width/2 + margin.left)
        .attr('y', width - margin.bottom/4)
        .text(mappings.x_label)
        .attr('font-size', 10)

    //y axis label
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', -adjusted_width/2)
        .attr('y', -5 + x_range[0])
        .attr('dy', '2em')
        .attr('transform', 'rotate(-90)')
        .text(mappings.y_label)
        .attr('font-size', 10)

    svg.attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${side} ${side}`)
        .classed("svg-content", true)
}