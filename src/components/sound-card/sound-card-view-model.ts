import type { SoundCardModel } from './sound-card-model';
import type { SoundCardView } from './sound-card-view';

export class SoundCardViewModel {
	private model: SoundCardModel;
	private view: SoundCardView;

	constructor(model: SoundCardModel, view: SoundCardView) {
		this.model = model;
		this.view = view;

		this.view.setIconUrl(this.model.iconUrl, this.model.label);
		this.view.setLabel(this.model.label);
		this.view.setVolume(this.model.volume);

		this.view.onVolumeChange((newVolume: number) => {
			this.model.volume = newVolume;
			this.view.setVolume(newVolume);
		});
	}
}
