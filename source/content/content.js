import optionsStorage from '../options/options-storage.js';

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);

function get_blur_circles_px(
	resx /*real monitor res*/,
	resy,
	realWidthMm /*half screen stuff no matter*/,
	RealHeightMm,
	p_screenDistanceMm,
	p_pupilSizeUm,
) {
	let blur_b;
	let blur_g;

	let pix = realWidthMm / resx; //mm

	const lca_nat_r = -0.23; //D
	const lca_nat_g = 0.24;
	const lca_nat_b = 1.1;

	const sh = -lca_nat_r;

	const lca_rif_r = lca_nat_r + sh; //D
	const lca_rif_g = lca_nat_g + sh;
	const lca_rif_b = lca_nat_b + sh;

	const pupil = p_pupilSizeUm / 1000.0; //6.5 //mm
	const screen = p_screenDistanceMm; //2000 //mm

	{
		const lca = lca_rif_b;

		const G = 1000 / (1000 / screen + lca);
		const circ = pupil * ((screen - G) / G);

		blur_b = circ / pix;
	}

	{
		const lca = lca_rif_g;

		const G = 1000 / (1000 / screen + lca);
		const circ = pupil * ((screen - G) / G);

		blur_g = circ / pix;
	}

	return [blur_b, blur_g];
}

async function init() {
	const options = await optionsStorage.getAll();
	const color = `rgb(${options.colorRed}, ${options.colorGreen},${options.colorBlue})`;
	const text = options.text;
	const notice = document.createElement('div');
	notice.innerHTML = text;
	notice.id = 'text-notice';
	notice.style.border = '2px solid ' + color;
	notice.style.color = color;

	const screen_resolution_x = options.resX;
	const screen_resolution_y = options.resY;

	const diag_px = Math.sqrt(
		screen_resolution_x * screen_resolution_x +
			screen_resolution_y * screen_resolution_y,
	);
	const diag_mm = options.diagInch * 25.4;
	const mm_per_px = diag_mm / diag_px;

	const real_width_mm = screen_resolution_x * mm_per_px;
	const real_height_mm = screen_resolution_y * mm_per_px;

	const screen_distance_mm = options.sync_screenDistanceCM * 10;
	const pupil_size_um = 6500;

	let [blur_b_got, blur_g_got] = get_blur_circles_px(
		screen_resolution_x,
		screen_resolution_y,
		real_width_mm,
		real_height_mm,
		screen_distance_mm,
		pupil_size_um,
	);

	const blur_b = blur_b_got * 0.32;
	const blur_g = blur_g_got * 0.32;

	const effect_strength = options.sync_effectStrengthPercent * 0.01;

	const blur_layer = document.createElement('div');
	blur_layer.id = 'blurLayer';
	blur_layer.class = 'blur-layer';

	blur_layer.style =
		'position: fixed;\
					  top: 0;\
					  right: 0;\
					  bottom: 0;\
					  left: 0;\
					  z-index: 9999;\
					  backdrop-filter: url("#RefractifyBlending1");\
					  pointer-events: none;\
					  display: block;';

	var svgMarkup =
		`
	<svg xmlns="http://www.w3.org/2000/svg">
	<defs>
		<filter id="RefractifyBlending1" x="0" y="0" width="100%" height="100%">
			<feColorMatrix
				result="red_ch"
				in="SourceGraphic"
				type="matrix"
				values="1 0 0 0 0
						0 0 0 0 0
						0 0 0 0 0
						0 0 0 1 0" />

			<feColorMatrix
				result="green_ch"
				in="SourceGraphic"
				type="matrix"
				values="0 0 0 0 0
						0 1 0 0 0
						0 0 0 0 0
						0 0 0 1 0" />
			<feColorMatrix
				result="blue_ch"
				in="SourceGraphic"
				type="matrix"
				values="0 0 0 0 0
						0 0 0 0 0
						0 0 1 0 0
						0 0 0 1 0" />


			<feGaussianBlur color-interpolation-filters="sRGB" id="blue_blur_px" result="blue_ch_blur"  in="blue_ch" stdDeviation="` +
		blur_b +
		`" />
			<feGaussianBlur color-interpolation-filters="sRGB" id="green_blur_px" result="green_ch_blur"  in="green_ch" stdDeviation="` +
		blur_g +
		`" />

			<feComposite color-interpolation-filters="sRGB" result="rg_ch" operator="arithmetic" in="red_ch" in2="green_ch_blur" k1="0.0" k2="1" k3="1" k4="0.0"/>
			<feComposite color-interpolation-filters="sRGB" result="rgb_ch" operator="arithmetic" in="rg_ch" in2="blue_ch_blur" k1="0.0" k2="1" k3="1" k4="0.0"/>
			<feComposite color-interpolation-filters="sRGB" result="scr_ch" operator="arithmetic" in="SourceGraphic" in2="rgb_ch" k1="0.0" k2="` +
		(1.0 - effect_strength) +
		`" k3="` +
		effect_strength +
		`" k4="0.0"/>

		</filter>
	</defs>
	</svg>
	`;

	var container = document.createElement('div');

	container.innerHTML = svgMarkup;
	container.style.display = 'none';

	document.body.appendChild(container);

	document.body.appendChild(blur_layer);
}

init();
