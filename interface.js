$(document).ready(function () {
  thermostat = new Thermostat();
    currentTemperature();
    powerSavingModeStatus();

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