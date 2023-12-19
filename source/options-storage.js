import OptionsSync from 'webext-options-sync';

const optionsStorage = new OptionsSync({
	defaults: {
		widthCM: 31,
		heightCM: 17,

		resX: 2560,
		resY: 1440,

		sync_screenDistanceCM: 65,
		sync_effectStrengthPercent: 10,
		text: 'Set a text!',
	},
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
});

export default optionsStorage;
