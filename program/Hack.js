'use strict';

class Hack {

    draw() {
        let turn = screen%20;
        let pass = Math.floor(screen / 20);

        context.clearRect(0, 0, 1500, 1000);

        context.font = "24px sans-serif";

        context.fillText((turn+1)+" / 12組目 ", 0, imgsize*3+32);
        context.fillText((pass+1)+" / 10セット ", 0, imgsize*3+32*2);
        context.fillText("条件 : " +(all_data[pass][0]),0, imgsize*3+32*3);

        //画像描画
        let img = new Image();

        img.src = './new_images/'+(rand[pass])+"/auth_"+(turn)+".png";
        
        img.onload = function(){
            context.drawImage(img, 0, 0, imgsize*3, imgsize*3);}

        canvas.addEventListener('click', this.onClick, false);
    }

}