function includeHTML(e, file){
    fetch(file)
    .then(response=>response.text())
    .then(html=>{
        document.getElementById(e).innerHTML=html
    })
}
includeHTML('header','./seesawSimulation/StatsTables/StatsTables.html')
includeHTML('mainjs','./seesawSimulation/SimulationPage/SimulationPage.html')
includeHTML('information','./seesawSimulation/Information/informationtable.html')

console.log("ıjoıokljmıolk");
