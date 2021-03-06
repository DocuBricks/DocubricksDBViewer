var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=0,c1=0,c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var parsedBricks = []

function parseBrick(xml, obj, par) {
    // Recurse dependent bricks
    if($.inArray(obj.attr("id"), parsedBricks) == -1) {
        parsedBricks.push(obj.attr("id"))
        var el = $("<li />")
        var sublist = $("<ul/>")

        // Do recursion
        var subbed = 0;
        obj.find("function").each(function() {
            if($(this).find("implementation").attr("type") == "brick") {
                subbed = 1;
                reffed = xml.find("brick#"+$(this).find("implementation").attr("id"))
                parseBrick(xml, reffed, sublist)
            }
        })

        // Create element
        if(subbed) {
            el.append($("<strong />").text(obj.find("name").text()))
            el.append(sublist)
        } else {
            el.append($("<a />").text(obj.find("name").text()))
        }
        par.append(el)
    }
}

function renderBrick(brick, par) {
    el = $("<div>")
    el.append($("<h2 class='brickheader'>").text(brick.find("name").text()))
    el.append($("<p class='brickabstract'>").text(brick.find("abstract").text()))
    el.append($("<p class='brickdesc'>").text(brick.find("long_description").text()))

    var steps = brick.find("step")
    if(steps.size() > 0) {
        var i = 1;
        steps.each(function(){
            el.append(renderMedia($(this).find("media"), $("<p>"))) // media
            el.append($("<div>").append($("<strong>").text("Step "+i)).append($("<p>").html($(this).find("description").text().replace(/\n/g, "<br />")))) // description
            i++;
        })
    }

    par.append(el)
}

function renderMedia(media, par) {
    // TODO
}

$(document).ready(function(){
    xml = $($.parseXML(Base64.decode(xmldata)))
    xml.find("brick").each(function(){
        parseBrick(xml, $(this), $("#bricklist"))
        renderBrick($(this), $("#bricks"))
    })
    document.title = xml.find("#"+parsedBricks[0]+" name").text()
})
