//creation of canvas//
(function(){
    var height = window.innerHeight,
        width = window.innerWidth,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        positions = {
          red :{
            x:150,
            y:140,
            color:'#e33d3d',
            shadowColor:'red',
            sAngle:-90*(Math.PI/180),
            eAngle:0*(Math.PI/180)
          },
          green:{
            x:140,
            y:140,
            color:'#52cd59',
            shadowColor:'green',
            sAngle:180*(Math.PI/180),
            eAngle:270*(Math.PI/180)
          },
          blue:{
            x:150,
            y:150,
            color:'#28c2f8',
            shadowColor:"#5ec5e4",
            sAngle:0*(Math.PI/180),
            eAngle:90*(Math.PI/180)
          },
          yellow:{
            x:140,
            y:150,
            color:'#f8d927',
            shadowColor:'yellow',
            sAngle:90*(Math.PI/180),
            eAngle:180*(Math.PI/180)
          }
          
        },
        sequence = [],
        turn=0,lost;
    //canvas creattion of game//
    canvas.style.position = 'absolute';
    canvas.style.top = '25%';
    canvas.style.left = '45%';
    document.body.appendChild(canvas);
    
    
    canvas.width= 300;
    canvas.height = 300;
    function paint(color,show){
      //true/false of color selection//
      if(show){
        ctx.clearRect(0,0,300,300);
        switch(color){
          case 'red':         
            paint('yellow',false);
            paint('green',false);
            paint('blue',false);         
            break;
          case 'blue':  
            paint('yellow',false);
            paint('green',false);
            paint('red',false);
            break;
          case 'green':
            paint('yellow',false);
            paint('red',false);
            paint('blue',false);
            break;
          case 'yellow':
            paint('red',false);
            paint('green',false);
            paint('blue',false); 
            break;
          default:break;
        }
        showScore();
      }
      
      var color = positions[color];
      ctx.beginPath();
      ctx.lineWidth = 48;
      ctx.strokeStyle = show?color.shadowColor:'#364a51';
      ctx.arc(color.x,color.y,100,color.sAngle,color.eAngle,false);
      
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor ='black';
      
      ctx.stroke();
      if(show){ 
        ctx.shadowBlur = (window.chrome)?35:18;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = color.shadowColor;
      } 
      
      ctx.beginPath();
      ctx.lineWidth = 40;
      ctx.strokeStyle = color.color;
      ctx.arc(color.x,color.y,100,color.sAngle+1*(Math.PI/180),color.eAngle-1*(Math.PI/180),false);
      ctx.stroke();
      
      
      
      
    }
    
    function draw(){
      
      ctx.clearRect(0,0,300,300);
      
      paint('red',false);
      paint('yellow',false);
      paint('blue',false);
      paint('green',false);
      if(sequence.length!=0){
        showScore();
      }
    }
    
    function guessAColor(){
      sequence.push(Math.ceil(Math.random()*4));
    }
    //Auto start of game//
    function start(){
      ctx.fillStyle = '#fff';
      ctx.font = '130px arial  sans-serif';
      ctx.textBaseline = 'bottom';
      
      ctx.fillText('3', 115, 220);
      setTimeout(function(){
        ctx.clearRect(100,90,100,110);
        ctx.fillText('2', 115, 220);
      },1000);
      
      setTimeout(function(){
        ctx.clearRect(100,90,100,110);
        ctx.fillText('1', 115, 220);
      },2000);
      
      setTimeout(function(){
        ctx.clearRect(100,90,100,110);
        gameOn();
      },3000);
    }
    
    
    function gameOn(){
      
      guessAColor();
      //setting of time out of game//
      var length = sequence.length;
      
      for (var i = 0; i < length; i++ ){
        setTimeout(function(button){
          if(button == 1){paint('red',true);}
          else if(button == 2){paint('blue',true);}
          else if(button == 3){paint('yellow',true);}
          else{paint('green',true);}
          setTimeout(draw,300);
        },(i+1)*200,sequence[i]);
      } 
    }
    
    function youLose(){
      ctx.clearRect(0,0,300,300);
      ctx.fillStyle = '#fff';
      ctx.font = '20px arial  sans-serif';
      ctx.textBaseline = 'bottom';
      ctx.fillText('You lost click to try again', 40, 150);
    }
    //score creation//
    function showScore(){
      
      ctx.save();
      ctx.font = '100px arial  sans-serif';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.fillText(sequence.length-1, 145, 220);
      ctx.font = '20px arial  sans-serif';
      ctx.textBaseline = 'bottom';
      ctx.fillText('Your Score', 140, 115);
      ctx.restore();
      
    }
    
    canvas.addEventListener('click',function(e){
      var x = (e.pageX)?e.pageX:e.clientX;
      var y = (e.pageY)?e.pageY:e.clientY;
      if(lost ==true){
        turn = 0;
        sequence.length = 0;
        draw();
        start();
        lost =false;
        return;
      }
      
      if(y - canvas.offsetTop < 150){
        if(x - canvas.offsetLeft < 150){
          if(sequence[turn] != 4 ){
            youLose();
            lost =true;
            return;
          }
          paint('green',true);
          setTimeout(draw,100);
        }
        else{
          if(sequence[turn] != 1 ){
            youLose();
            lost =true;
            return;
          }
          paint('red',true);
          setTimeout(draw,100);
        }
        
      }
      if(y - canvas.offsetTop > 150){
        if(x - canvas.offsetLeft < 150){
          if(sequence[turn] != 3 ){
            youLose();
            lost =true;
            return;
          }
          paint('yellow',true);
          setTimeout(draw,100);
        }
        else{
          if(sequence[turn] != 2 ){
            youLose();
            lost =true;
            return;
          }
          paint('blue',true);
          setTimeout(draw,100);
        }
      } 
      
      if(turn == sequence.length-1){
        turn = 0;  
        gameOn();
        return;
      }
      
      turn++; 
    });
    
    draw();
    start();
    
  })();
  