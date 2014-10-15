$(document).ready(function () {
    $(document).keydown("keydown", function (e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            console.log("enter pressed");
            $(".kd-button-submit:visible").last().click();
        }
    });
});