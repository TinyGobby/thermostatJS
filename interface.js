$(document).ready(function () {
  thermostat = new Thermostat();
    currentTemperature();
    powerSavingModeStatus();

    data = $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d80b54de4643e5dc91f4330fb9f0c670", function(json){
      data = JSON.stringify(json);
    });
    $("#weather").text(data[0].main.temp);


  $("#up").click(function() {
    thermostat.up();
    currentTemperature();
  });

  $("#down").click(function() {
    thermostat.down();
    currentTemperature();
  });

  $("#reset").click(function() {
    thermostat.reset();
    currentTemperature();
  });

  $("#powerSavingModeBtn").click(function() {
    thermostat.togglePowerSavingMode();
    powerSavingModeStatus();
  });
});

function currentTemperature(){
  $("#currentTemp").text(thermostat.temperature);
};

function powerSavingModeStatus(){
  result = thermostat.powerSavingMode ? 'on' : 'off';
  $("#powerSavingMode").text(result);
};