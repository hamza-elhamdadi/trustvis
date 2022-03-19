function random_helper(){
    let out
    d3.json('/get-conditions')
        .then(function(camouflages){
            let random_index = Math.floor(Math.random()*camouflages.conditions.length)

            console.log(camouflages['conditions'][random_index])
            
            out = camouflages['conditions'][random_index]
            camouflages['conditions'].splice(random_index, 1)
            
            console.log(out)

            var xhr = new XMLHttpRequest();
            var url = "set-conditions";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json);
                }
            };
            var data = JSON.stringify(camouflages);
            xhr.send(data);

            return out
        })
}

/******************************************************************************/
/*          USEFUL FUNCTION FOR RANDOMIZING WHICH DATASET IS SEEN             */
/******************************************************************************/
async function random_ordering(){
        return await random_helper()
}

const random_integer = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function addHexColor(c1, c2) {
    var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; }
    return hexStr;
  }

function subtractHexColor(c1, c2) {
    var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; }
    return hexStr;
  }