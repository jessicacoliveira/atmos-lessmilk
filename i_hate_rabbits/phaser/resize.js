let resizeCanvas = () => {
	let canvas = document.querySelector("canvas");
	if (!canvas) { setTimeout(resizeCanvas, 100); return; }
	if (canvas.style.width === '') canvas.style.width = canvas.width + 'px';
	let gameSize = canvas.width;
	let displaySize = canvas.style.width.slice(0, -2);
	let screenSize = window.outerWidth;
	if (displaySize > screenSize) canvas.style.width = screenSize + 'px';
	else if (displaySize < screenSize && displaySize < gameSize)
		canvas.style.width = Math.min(screenSize, gameSize) + 'px';
	setTimeout(resizeCanvas, 1000);
};
resizeCanvas();
