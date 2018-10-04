'use strict';

const MINIMUM_TEMP = 10; //TODO: Remove from global scope
const DEFAULT_TEMP = 20;
const POWERSAVING_ON_MAX_TEMP = 25;
const POWERSAVING_OFF_MAX_TEMP = 32;
const LOW_USAGE_TEMP = 17;
const MEDIUM_USAGE_TEMP = 24;


function Thermostat() {
  this.temperature = DEFAULT_TEMP;
  this.powerSavingMode = true;
};

Thermostat.prototype.up = function() {
  if (this._isTemperatureReached()) {
    throw new Error("Maximum temperature reached!");
  } else {
    this.temperature++;
  }
};

Thermostat.prototype.down = function() {
  if (this._isBelow(MINIMUM_TEMP)) {
    throw new Error("Minimum temperature reached!");
  }
    this.temperature--;
};

Thermostat.prototype.reset = function () {
  this.temperature = DEFAULT_TEMP;
};

Thermostat.prototype.togglePowerSavingMode = function () {
  this.powerSavingMode = this.powerSavingMode ? false : true;
};

Thermostat.prototype.energyUsage = function () {
  if (this._isBelow(LOW_USAGE_TEMP)) {
    return "low-usage";
  } else if (this._isBelow(MEDIUM_USAGE_TEMP)) {
    return "medium-usage";
  } else {
    return "high-usage";
  }
};

Thermostat.prototype._isTemperatureReached = function() {
  return (this._isPowerSavingOnReached() || this._isPowerSavingOffReached());
};

Thermostat.prototype._isPowerSavingOnReached = function() {
  return (this.powerSavingMode && this.temperature >= POWERSAVING_ON_MAX_TEMP);
};

Thermostat.prototype._isPowerSavingOffReached = function() {
  return (!this.powerSavingMode && this.temperature >= POWERSAVING_OFF_MAX_TEMP);
};

Thermostat.prototype._isBelow = function(temperature) {
  return this.temperature <= temperature;
};
