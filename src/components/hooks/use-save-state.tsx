import { useState } from "react";

export enum SaveState {
	NotSaved = "Not Saved",
	Saving = "Saving...",
	Saved = "Saved",
	Error = "Error",
}

export const useSaveState = () => {
	const [saveState, setSaveState] = useState<SaveState>(SaveState.NotSaved);

	const status =
		saveState !== SaveState.NotSaved ? (
			<p aria-live="polite" role="status">
				{saveState}
			</p>
		) : null;

	const reset = (time?: number) => {
		setTimeout(() => {
			setSaveState(SaveState.NotSaved);
		}, time);
	};

	return {
		saveState,
		setSaveState,
		status,
		reset,
	};
};
