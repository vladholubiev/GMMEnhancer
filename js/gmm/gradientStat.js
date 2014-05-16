if ($('.summary-counts:first:visible').length > 0) {
	var edits = $('.summary-counts:first').text().match(/\d+/g)[0],
		target,
		width = getWidth(edits);

	function getWidth(editsMade) {
		if (editsMade > 0 && editsMade < 501) {
			target = 500;
		} else if (editsMade > 500 && editsMade < 1001) {
			target = 1000;
		} else if (editsMade > 1000 && editsMade < 3001) {
			target = 3000;
		} else if (editsMade > 3000 && editsMade < 5001) {
			target = 5000;
		} else if (editsMade > 5000 && editsMade < 10001) {
			target = 10000;
		} else if (editsMade > 10000 && editsMade < 15001) {
			target = 15000;
		} else if (editsMade > 15000 && editsMade < 20001) {
			target = 20000;
		} else if (editsMade > 20000 && editsMade < 25001) {
			target = 25000;
		} else if (editsMade > 25000 && editsMade < 30001) {
			target = 30000;
		} else if (editsMade > 30000 && editsMade < 50001) {
			target = 50000;
		} else if (editsMade > 50000 && editsMade < 75001) {
			target = 75000;
		} else if (editsMade > 75001 && editsMade < 100001) {
			target = 100000;
		} else if (editsMade > 100000 && editsMade < 150001) {
			target = 150000;
		} else if (editsMade > 150000 && editsMade < 200001) {
			target = 200000;
		} else if (editsMade > 200000 && editsMade < 250001) {
			target = 250000;
		} else if (editsMade > 250000 && editsMade < 300001) {
			target = 300000;
		} else if (editsMade > 300000) {
			target = 500000;
		}
		return editsMade / target * 100;
	}

	function setBg() {
		//Генерує колір від зеленого до червоного
		setBg.getColor = function(percent, aplha) {
			percent = 100 - percent;
			r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
			g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
			return 'rgba(' + r + ',' + g + ', 0, ' + aplha + ')';
		}
		edits = parseInt(edits);
		width = getWidth(edits);
		$('.gw-mini-dashboard.gw-stream-one-box.rounded-corners.collapsed').attr('style', 'background: -webkit-linear-gradient(left,' + setBg.getColor(width, '.5') + ' 0, ' + setBg.getColor(width, '.3') + ' ' + width + '%, transparent ' + width + '%);');
	}
}