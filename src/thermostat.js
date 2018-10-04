const MINIMUM_TEMP = 10
const DEFAULT_TEMP = 20
const POWERSAVING_ON_MAX_TEMP = 25
const POWERSAVING_OFF_MAX_TEMP = 32;


function Thermostat() {
  this.temperature = DEFAULT_TEMP;
  this.powerSavingMode = true
};

Thermostat.prototype.up = function() {
  if (this._isTemperatureReached()) {
    throw new Error("Maximum temperature reached!");
  } else {
    this.temperature++;
  }
};

Thermostat.prototype.down = function() {
  if (this.temperature === MINIMUM_TEMP) {
    throw new Error("Minimum temperature reached!");
  }
    this.temperature--
};

Thermostat.prototype.reset = function () {
  this.temperature = DEFAULT_TEMP
}

Thermostat.prototype._isTemperatureReached = function() {
  return ((this.powerSavingMode && this.temperature >= POWERSAVING_ON_MAX_TEMP) || (!this.powerSavingMode && this.temperature >= POWERSAVING_OFF_MAX_TEMP))
};

