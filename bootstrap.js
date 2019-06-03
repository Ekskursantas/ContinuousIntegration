(function () {
	function main(platform) {
		return {
			start: function (config, element, state) {
				return new Promise(async function (resolve, reject) {
					/*START*/
					await platform.insertScript("lib/phaser.min.js");
					await platform.insertScript("lib/SpineWebGLPlugin.js");
					await platform.insertScript("lib/all.js");
					await platform.insertScript("main.js");
					var main = await platform.loadScript("run.js");
					var newDiv = document.createElement("div"); 
					newDiv.id = "game_parent_div";
					var bod = document.getElementsByTagName("BODY")[0];
					bod.appendChild(newDiv);
					main(platform, element, resolve);
					/*END*/
				}).catch(reject);

			},
			stop: function () {
				return Promise.resolve();
			},
			suspend: function () { },
			removeAll: function () {

			}
		};
	};
	return main;
})();