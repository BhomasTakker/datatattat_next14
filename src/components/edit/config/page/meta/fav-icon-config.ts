import { ArrayInputProps } from "@/types/edit/inputs/inputs";
import { EditInputs } from "../../../inputs/inputs";

enum typeOptions {
	PNG = "image/png",
	JPEG = "image/jpeg",
}

enum relOptions {
	ICON = "icon",
	APPLE = "apple-touch-icon-precomposed",
}

enum sizes {
	ANY = "any",
	_16x16 = "16x16",
	_32x32 = "32x32",
	_36x36 = "36x36",
	_48x48 = "48x48",
	_57x57 = "57x57",
	_60x60 = "60x60",
	_72x72 = "72x72",
	_76x76 = "76x76",
	_96x96 = "96x96",
	_114x114 = "114x114",
	_120x120 = "120x120",
	_128x128 = "128x128",
	_144x144 = "144x144",
	_152x152 = "152x152",
	_180x180 = "180x180",
	_192x192 = "192x192",
	_384x384 = "384x384",
	_512x512 = "512x512",
}

export const FAV_ICON: ArrayInputProps = {
	id: "favIcons",
	type: EditInputs.array,
	label: "FavIcons",
	title: "Add Fav Icon",
	input: {
		id: "favIcon",
		type: EditInputs.inputList,
		label: "Fav Icon",
		inputs: [
			{
				id: "rel",
				type: EditInputs.select,
				label: "Rel",
				defaultValue: relOptions.ICON,
				required: true,
				options: [relOptions.ICON, relOptions.APPLE],
			},
			{
				id: "type",
				type: EditInputs.select,
				label: "Source type",
				defaultValue: typeOptions.PNG,
				required: true,
				options: [typeOptions.PNG, typeOptions.JPEG],
			},
			{
				id: "href",
				type: EditInputs.text,
				label: "Source",
				required: true,
			},
			{
				id: "sizes",
				type: EditInputs.select,
				label: "Size",
				defaultValue: sizes.ANY,
				required: true,
				options: [
					sizes.ANY,
					sizes._16x16,
					sizes._32x32,
					sizes._36x36,
					sizes._48x48,
					sizes._57x57,
					sizes._60x60,
					sizes._72x72,
					sizes._76x76,
					sizes._96x96,
					sizes._114x114,
					sizes._120x120,
					sizes._128x128,
					sizes._144x144,
					sizes._152x152,
					sizes._180x180,
					sizes._192x192,
					sizes._384x384,
					sizes._512x512,
				],
			},
		],
	},
};
