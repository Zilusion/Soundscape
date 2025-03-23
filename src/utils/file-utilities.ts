// import ElementCreator from './element-creator';

// export function saveToFile(data: object, filename: string): void {
// 	const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
// 	const url = URL.createObjectURL(blob);
// 	const link = ElementCreator.create({
// 		tag: 'a',
// 		attributes: {
// 			href: url,
// 			download: filename,
// 		},
// 	});
// 	link.click();
// 	URL.revokeObjectURL(url);
// }

// export function loadFromFile(): Promise<string> {
// 	return new Promise((resolve) => {
// 		const input = ElementCreator.create({
// 			tag: 'input',
// 			attributes: {
// 				type: 'file',
// 				accept: '.json',
// 			},
// 			on: {
// 				change: (event) => {
// 					const inputTarget = event.target;
// 					const file =
// 						inputTarget instanceof HTMLInputElement &&
// 						inputTarget.files
// 							? inputTarget.files[0]
// 							: null;
// 					const reader = new FileReader();
// 					reader.addEventListener('load', () =>
// 						resolve(
// 							typeof reader.result === 'string'
// 								? reader.result
// 								: '',
// 						),
// 					);
// 					void file!
// 						.text()
// 						.then((text) => resolve(text))
// 						.catch(console.error);
// 				},
// 			},
// 		});
// 		input.click();
// 	});
// }

console.log('File Utilities');
