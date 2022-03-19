function formatLargeNumbers(num, prepend){
    let append, center

    if (num / Math.pow(10,12) >= 1) {
        center = num / Math.pow(10,12)
        append = 'T'
    }
    else if(num / Math.pow(10,9) >= 1){
        center = num / Math.pow(10,9)
        append = 'B'
    }
    else if(num / Math.pow(10,6) >= 1){
        center = num / Math.pow(10,6)
        append = 'M'
    }
    else if(num / Math.pow(10,3) >= 1){
        center = num / Math.pow(10,3)
        append = 'K'
    }
    else{
        center = num
        append = ''
    }

    return prepend + center + append
}