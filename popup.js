/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const browser = chrome;

// Open options page
//
function openOptions() {
	browser.runtime.openOptionsPage();
	window.close();
}

// Open lockdown page
//
function openLockdown() {
	openExtensionPage("lockdown.html");
}

// Open override page
//
function openOverride() {
	openExtensionPage("override.html");
}

// Open stats page
//
function openStats() {
	openExtensionPage("stats.html");
}

// Open extension page (either create new tab or activate existing tab)
//
function openExtensionPage(url) {
	let fullURL = browser.extension.getURL(url);

	browser.tabs.query({ url: fullURL }, onGot);

	function onGot(tabs) {
		if (tabs.length > 0) {
			browser.tabs.update(tabs[0].id, { active: true });
		} else {
			browser.tabs.create({ url: fullURL });
		}
		window.close();
	}
}

document.querySelector("#options").addEventListener("click", openOptions);
document.querySelector("#lockdown").addEventListener("click", openLockdown);
document.querySelector("#override").addEventListener("click", openOverride);
document.querySelector("#stats").addEventListener("click", openStats);
