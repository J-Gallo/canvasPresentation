var c = document.getElementById("canvasPresentation");
var ctx = c.getContext("2d");
c.width=1000;
c.height=500;
var actualFrame;
var videoInterval;
var frames = {
    1: {
        text: {
            1: {
                title: 'Introducción a Canvas',
                x: c.width / 2,
                y: c.height / 2,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 40,
                style: 'bold',
                align: 'center'
            },
        }
    },
    2: {
        text: {
            1: {
                title: '<canvas id="X">',
                x: c.width / 2,
                y: c.height / 2 - 40,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 40,
                style: 'bold',
                align: 'center'
            },
            2: {
                title: '</canvas>',
                x: c.width / 2,
                y: c.height / 2,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 40,
                style: 'bold',
                align: 'center'
            },
        },
        img: {}
    },
    3: {
        text: {
            1: {
                title: 'Aplicacion',
                x: c.width / 2 - 160,
                y: c.height / 2 - 80,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 24,
                style: 'bold',
                align: 'left',
            },
            2: {
                title: '⋆  Desarrollo de juegos',
                x: c.width / 2 - 160,
                y: c.height / 2 - 40,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 24,
                style: 'bold',
                align: 'left'
            },
            3: {
                title: '⋆  Graficos | Charts',
                x: c.width / 2 - 160,
                y: c.height / 2,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 24,
                style: 'bold'
            },
            4: {
                title: '⋆  Publicidad',
                x: c.width / 2 - 160,
                y: c.height / 2 + 40,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 24,
                style: 'bold'
            },
        },
        img: {}
    },
    4: {
        text: {
            1: {
                title: 'Particulas',
            }
        },
    },
    5: {
        text: {
            1: {
                title: 'Video quake',
            }
        },
    },
    7: {
        text: {
            1: {
                title: 'var c = document.getElementById("X");',
                x: c.width / 2,
                y: c.height / 2 - 40,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 24,
                style: 'bold',
                align: 'center'
            },
            2: {
                title: 'var ctx = c.getContext("2d/webgl");',
                x: c.width / 2,
                y: c.height / 2,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 24,
                style: 'bold',
                align: 'center'
            },
        },
        img: {}
    },
    8: {
        text: {
            1: {
                title: 'ctx.clearRect(0,0,canvas.width,canvas.height);',
                x: c.width / 2,
                y: c.height / 2 - 40,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 24,
                style: 'bold',
                align: 'center'
            },
        },
        img: {}
    },
    9: {
        text: {
            1: {
                title: 'Muchas gracias !',
                x: c.width / 2,
                y: c.height / 2 - 40,
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
                font: 'Arial',
                fontSize: 40,
                style: 'bold',
                align: 'center'
            },
        },
        img: {}
    },
    6: {
        text: {},
        img: {
            1: {
                src: 'support',
                x: c.width / 2,
                y: c.height / 2,
                alpha: 1,
            }
        }
    },
};

$('document').ready(function(){
    actualFrame = 1;
    renderFrame(actualFrame);
});

c.onmousedown = function () {
    if (actualFrame == 4) {
        stopParticles();
        ctx.clearRect(0,0, c.width, c.height);
        renderFrame(actualFrame + 1);
    } else if (actualFrame == 5) {
        $('video').hide();
        clearInterval(videoInterval);
        c.style.webkitFilter = "blur(0px)";
        ctx.clearRect(0,0, c.width, c.height);
        renderFrame(actualFrame + 1);
    } else {
        fadeOut(actualFrame,actualFrame + 1);
    }
};

function renderFrame(id) {
    actualFrame = id;

    if (actualFrame == 4) {
        $('video').hide();
        drawParticles();
    } else if (actualFrame == 5) {
        drawVideo();
        $('video').show();
    } else {
        $('video').hide();
        $.each( frames[id].text, function( index, element ) {
            ctx.textAlign = element.align;
            ctx.fillStyle = 'rgba(' + element.r + ',' + element.g + ',' + element.b + ',' + element.alpha + ')';
            ctx.font = element.style + " " + element.fontSize + "px " + element.font;
            ctx.fillText(element.title, element.x, element.y);
        });

        $.each( frames[id].img, function( index, element) {
            if (typeof element.src != "undefined" ) {
                var img=document.getElementById(element.src);
                ctx.drawImage(img,element.x - 500, element.y - 200, 1000, 400);
            }
        });
    }

}

function fadeOut(actualFrame,nextFrame) {
        elementCount = Object.keys(frames[actualFrame].text).length;

        $.each( frames[actualFrame].text, function( index, element ) {
            var interval;
            interval = setInterval(function () {
                ctx.clearRect(element.x - (element.title.length * 28), element.y - 40, element.title.length * 41, c.height);
                ctx.textAlign = element.align;
                ctx.fillStyle = 'rgba(' + element.r + ',' + element.g + ',' + element.b + ',' + element.alpha + ')';
                ctx.font = element.style + " " + element.fontSize + "px " + element.font;
                ctx.fillText(element.title, element.x, element.y);
                element.alpha = element.alpha - 0.05;
                if (element.alpha < 0) {
                    clearInterval(interval);
                    stopParticles();
                    ctx.clearRect(element.x - (element.title.length * 28), element.y - 40, element.title.length * 41, c.height);
                    renderFrame(nextFrame);

                    element.alpha = 1;

                } else {
                    elementCount = elementCount - 1;
                }
            }, 50);
        });
        $.each( frames[actualFrame].img, function( index, element ) {
                interval = setInterval(function () {
                    ctx.clearRect(0, 0, c.width, c.height);
                    ctx.globalAlpha = element.alpha;
                    var img= document.getElementById('support');
                    ctx.drawImage(img,element.x - 500, element.y - 200, 1000, 400);
                    element.alpha = element.alpha - 0.1;
                    if (element.alpha < 0) {
                        ctx.clearRect(0,0, c.width, c.height);
                        clearInterval(interval);
                        element.alpha = 1;
                        ctx.globalAlpha = 1;
                        renderFrame(nextFrame);
                    }
                }, 60);
        });
};

$('body').keyup(function (e){
    if (e.keyCode == 37) {
        $('#v')[0].pause();
        stopParticles();
        clearInterval(videoInterval);
        c.style.webkitFilter = "blur(0px)";
        ctx.clearRect(0,0, c.width, c.height);
        renderFrame(actualFrame - 1);
    } else if (e.keyCode == 39) {
        $("#v")[0].pause();
        stopParticles();
        clearInterval(videoInterval);
        c.style.webkitFilter = "blur(0px)";
        ctx.clearRect(0,0, c.width, c.height);
        renderFrame(actualFrame + 1);
    }
})

function drawVideo(){
    var v = document.getElementById('v');
    draw(v,ctx, c.width, c.height);
    c.style.webkitFilter = "blur(13px)";

};

function draw(v,ctx,w,h) {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(v,0,0,w,h);

    videoInterval = setTimeout(draw,20,v,ctx,w,h);
}
