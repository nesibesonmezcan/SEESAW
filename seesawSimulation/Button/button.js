function includeHTML(e, file){
    fetch(file)
    .then(response=>response.text())
    .then(html=>{
        document.getElementById(e).innerHTML=html
    })
}
includeHTML('button','/Button/button.html')
includeHTML('buttonGroup','/seesawSimulation/ButtonGroup.html')