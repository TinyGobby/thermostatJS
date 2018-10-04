describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('this.temperature', function() {
    it('should start at the default temp', function() {
      expect(thermostat.temperature).toEqual(DEFAULT_TEMP);
    });
  });

  describe('#up', function() {
    it('should increase the temperature by one degree', function() {
      thermostat.up();
      expect(thermostat.temperature).toEqual(DEFAULT_TEMP + 1);
    });
  });

  describe('#down', function() {
    it('should reduce temperature by one degree', function() {
      thermostat.down();
      expect(thermostat.temperature).toEqual(DEFAULT_TEMP - 1);
    });

    it('should throw an error when attempting to drop temp below minimum', function () {
      let minTemp = DEFAULT_TEMP - MINIMUM_TEMP

      for (let i = 0; i < minTemp; i++) {
        thermostat.down();
      };
      expect( function() { thermostat.down() } ).toThrowError('Minimum temperature reached!');
    });
  });
  
  describe('this.powerSavingMode', function() {
    it('is true by default', function () {
      expect(thermostat.powerSavingMode).toEqual(true);
    });

    it('when on it should limit max temperature', function() {
      let maxTemp = POWERSAVING_ON_MAX_TEMP - DEFAULT_TEMP;

      for (let i = 0; i < maxTemp; i++) {
        thermostat.up();
      }
      expect( function() { thermostat.up() } ).toThrowError('Maximum temperature reached!');
    }); 

    it('when off it should limit max temperature to a different max temp', function () {
      thermostat.powerSavingMode = false;
      let maxTemp = POWERSAVING_OFF_MAX_TEMP - DEFAULT_TEMP;

      for (let i = 0; i < maxTemp; i++) {
        thermostat.up();
      }
      expect(function() { thermostat.up() }).toThrowError('Maximum temperature reached!');
    }); 
  });

  describe('#reset', function() {
    it('resets the temperature to the default temp', function() {
      thermostat.up();
      thermostat.reset();
      expect(thermostat.temperature).toEqual(DEFAULT_TEMP);
    });
  });

  describe('#energyUsage', function() {
    it('confirms low energy usage below low-usage temperature', function () {
      let lowTemp = DEFAULT_TEMP - LOW_USAGE_TEMP;

      for (let i = 0; i < lowTemp; i++) {
        thermostat.down();
      };
      expect(thermostat.energyUsage()).toEqual('low-usage');
    });

    it('confirms medium usage between low and medium usage temps', function() {
      let medTemp = DEFAULT_TEMP - MEDIUM_USAGE_TEMP;

      for (let i = 0; i < medTemp; i++) {
        thermostat.down();
      };

      expect(thermostat.energyUsage()).toEqual('medium-usage');
    });

    it('confirms high usage above medium usage temp', function () {
      let maxTemp = POWERSAVING_ON_MAX_TEMP - DEFAULT_TEMP;

      for (let i = 0; i < maxTemp; i++) {
        thermostat.up();
      };

      expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });
});