$(document).keypress(keypress);

function keypress(e) {
    if (e.charCode == 32) {
        var type = document.activeElement.nodeName;
        if (type == "BODY") {
            if ($("#maptypenormal:visible").length == 1) {
                $("#maptypenormal").click();
            } else if ($("#maptypehybrid:visible").length == 1) {
                $("#maptypehybrid").click();
            }
        }
    }
}