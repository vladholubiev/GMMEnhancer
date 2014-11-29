/**
 * @date 29-11-14
 * @description This script allows user to draw building outlines and save them for further drawing
 */

var draw = SVG('main_map').attr('id', 'drawing-template'),
    points = [],
    polyline,
    offset = $('#main_map').offset(),
    disallowDrawing = {
        disallowDrawing: false
    };
chrome.storage.local.set(disallowDrawing);
console.log(window.disallowDrawing);
$(document).ready(function (e) {
    $('#drawing-template').css({
        position: 'absolute',
        top: 0
    });
    console.log(offset);
    $('#main_map').on('click', function (e) {
        if (window.disallowDraw) {
            disallowDrawing = {
                disallowDrawing: true
            };
            chrome.storage.local.set(disallowDrawing);
            return;
        } else {
            disallowDrawing = {
                disallowDrawing: false
            };
            chrome.storage.local.set(disallowDrawing);
        }
        var point = [e.pageX - offset.left, e.pageY - offset.top];
        points.push(point);
        if (points.length < 2) {
            polyline = draw.polyline(points).fill('#F44336').opacity(0.5).stroke({color: '#212121', width: 2});
        } else {
            polyline.plot(points);
        }
        var template = {
            template: {
                name: window.templateName,
                points: points
            }
        };
        console.log(window.templateName);
        chrome.storage.local.set(template);
        chrome.storage.local.get(null, function (points) {
            console.log(points);
        });
    });
    draw.rect(100, 100, 100, 100).fill('#fc0');
});