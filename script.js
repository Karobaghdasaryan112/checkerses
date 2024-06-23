let section = document.querySelector(`.section`);
let figur = [];
function igr(arr,argument,color,){arr[argument].style.background = color;}
let lastposition = new Array(2)
let turn = new Array(3);
turn[0] = true;turn[1] = false;
for(let i=0;i<8;i++){
    let y = [];
    for(let j=0;j<8;j++){
        y[j] = document.createElement(`div`);
        y[j].className = `figur`;
        section.appendChild(y[j])
        if(i%2 == 0){
           if(j%2 === 1){
            igr(y,j,`darkslategray`)
           }else{
            igr(y,j,`burlywood`)
           }
        }else{
            if(j%2 === 1){
                igr(y,j,`burlywood`)
            }else{
                igr(y,j,`darkslategray`)
            }
        }
    }
    figur.push(y);
}
function reset(red){
for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
        if(figur[i][j].style.background !== red){
        if(i%2 == 0){
            if(j%2 == 0){
                figur[i][j].style.background = `burlywood`;figur[i][j].id = `burlywood`;
            }else{
                figur[i][j].style.background = `darkslategray`;figur[i][j].id =  `darkslategray`;
            }
        }else{
            if(j%2 == 0){
                figur[i][j].style.background = `darkslategray`;figur[i][j].id = `darkslategray`;
            }else{
                figur[i][j].style.background = `burlywood`;figur[i][j].id = `burlywood`;
                    }
                }
            }
        }
    }
}
let selectredarray = []
let board = 
[  
    [`u`,`1`,`u`,`1`,`u`,`1`,`u`,`1`],
    [`1`,`u`,`1`,`u`,`1`,`u`,`1`,`u`],
    [`u`,`1`,`u`,`1`,`u`,`1`,`u`,`1`],
    [`u`,`u`,`u`,`u`,`u`,`u`,`u`,`u`],
    [`u`,`u`,`u`,`u`,`u`,`u`,`u`,`u`],
    [`0`,`u`,`0`,`u`,`0`,`u`,`0`,`u`],
    [`u`,`0`,`u`,`0`,`u`,`0`,`u`,`0`],
    [`0`,`u`,`0`,`u`,`0`,`u`,`0`,`u`],
]
reset()
function createfigur(i,j,color,png){
let img = document.createElement(`img`);
img.setAttribute(`src`,png);
img.className = color;
img.style.width = `120px`;img.style.height = `120px`;
figur[i][j].appendChild(img);
}
function createfigurqueen(i,j,color,png){
    let img = document.createElement(`img`);
    img.setAttribute(`src`,png);
    img.className = color + `queen`;
    img.style.width = `120px`;img.style.height = `120px`;
    figur[i][j].appendChild(img);
}
for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
        if(figur[i][j].style.background == `darkslategray`){
        if(i<3){createfigur(i,j,`black`,`png/qarsev.png`);}
        if(i>4){createfigur(i,j,`white`,`png/qarspitak.png`);}
        }
    }
}
function select(color,i,j,pomi,pomj1,pomj2,figcolor){
    if(figur[i][j].hasChildNodes() && figur[i][j].firstChild.className == figcolor){
        figur[i][j].style.background = color;
        lastposition[0] = i;lastposition[1] = j;
    if(j == 0 &&  !figur[i+pomi][j+1].hasChildNodes()){
        figur[i+pomi][j+1].style.background =color;
    }
    if(j == 7 && !figur[i+pomi][j-1].hasChildNodes()){
        figur[i+pomi][j-1].style.background = color;
    }
    if(j!==7 && j!== 0){
        if(!figur[i+pomi][j+pomj1].hasChildNodes()){
        figur[i+pomi][j+pomj1].style.background =color;
        }
        if(!figur[i+pomi][j+pomj2].hasChildNodes()){
        figur[i+pomi][j+pomj2].style.background = color;
            }
        }
    }
}
function resetselect(i,j,color){
    if(figur[i][j].style.background != color){reset()}
}
function move(color,i,j,png,turn,whiteturn,blackturn,num,pngqueen){
    if(!figur[i][j].hasChildNodes()){
        if(figur[i][j].style.background!=figur[i][j].id){
            figur[lastposition[0]][lastposition[1]].firstChild.remove();
            createfigur(i,j,color,png)
            board[i][j] = `${num}`;
            reset();
            board[lastposition[0]][lastposition[1]] = `u`
            turn[0] = whiteturn;turn[1] = blackturn;
        }
    }
}
function red(){
    if(turn[2]){
        let redN = 0
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(figur[i][j].style.background == `red`){
            redN ++ ;
                }
            }
        }
        if(redN == 0){
            if(turn[0]){
                turn[0] = false;
                turn[1] = true;
            }else if(turn[1]){
                turn[1] = false;
                turn[0] = true;
            }
            turn[2] = undefined;
            for(let i=0;i<8;i++){
                for(let j=0;j<8;j++){
                    function resetboard(text){
                        if(board[i][j] == text && !figur[i][j].hasChildNodes()){
                            board[i][j] = `u`
                        }
                        if(board[i][j] == text && figur[i][j].hasChildNodes()){
                            if(figur[i][j].firstChild.className == `white`){
                                board[i][j] = `0`
                            }else if(figur[i][j].firstChild.className == `black`){
                                board[i][j] = `1`
                            }
                        }
                    }
                    resetboard(`r`);resetboard(`t`);
                    resetboard(`f`);resetboard(`c`);
                }
            }
        }
    }
}
function cut(opx,opy,x,y,empx,empy,turn,i,j,color1,png,myturn,yourturn){
    if(figur[i][j] == figur[empx][empy]){
        if(board[empx][empy] == `r` && (board[x][y] == `c` || board[x][y] == `t`)){
            if(Math.abs(x-Math.abs(empx)) == 2 && Math.abs(y-Math.abs(empy)) == 2){
                if(Math.abs(x-Math.abs(opx)) == 1 && Math.abs(y-Math.abs(opy)) == 1){
                    createfigur(empx,empy,color1,png)
                    figur[x][y].firstChild.remove();
                    figur[opx][opy].firstChild.remove();
                    reset();
                    board[x][y] = `t`;
                }
            }
        }
    }
}
function selectred(x,y){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
                if(figur[i][j].style.background == `red`){
                    selectredarray.push(figur[i][j]);
                }
            }
        }
    }
    function redtrue(i,j){
        for(let x=0;x<selectredarray.length;x++){
            if(figur[i][j] == selectredarray[x]){
                return true;
            }
        }
    }
function selectforcat(i,j){
    for(let x=0;x<8;x++){
        for(let y=0;y<8;y++){
            function underfunc(opx,opy,empx,empy,x,y,figcolor,turn,myturn,color1,color2,i,j,png,numturn){
                if(figur[x][y].hasChildNodes()){
                    if(figur[x][y].firstChild.className == color1 && board[x][y]!=`f`){
                        if(0<=empx && empx<8 && 0<=empy && empy<8){
                        if(figur[opx][opy].hasChildNodes()){
                            if(figur[opx][opy].firstChild.className == color2){
                                if(!figur[empx][empy].hasChildNodes()){
                                    if(turn[myturn]){
                                        turn[2] = true;
                                        board[x][y] = `c`;
                                        board[empx][empy] = `r`;
                                        figur[empx][empy].style.background = `red`;
                                        selectred()
                                        if(figur[i][j] == figur[x][y]){
                                            reset(`red`)
                                            figur[x][y].style.background = figcolor;
                                        }else if(!redtrue(i,j)){
                                            figur[x][y].style.background = figur[x][y].id;
                                        }
                                        if(figur[x][y].style.background == figcolor && figur[i][j] == figur[empx][empy]){
                                            cut(opx,opy,x,y,empx,empy,turn,i,j,color1,png,myturn);
                                            if(board[x][y]  == `t`){
                                                for(let i=0;i<8;i++){
                                                    for(let j=0;j<8;j++){
                                                        if(board[i][j] == `c` || board[i][j] == `1` || board[i][j] == `0`){
                                                            board[i][j] = `f`;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(turn[0]){
            underfunc(x-1,y+1,x-2,y+2,x,y,`yellow`,turn,0,`white`,`black`,i,j,`png/qarspitak.png`,0);underfunc(x+1,y-1,x+2,y-2,x,y,`yellow`,turn,0,`white`,`black`,i,j,`png/qarspitak.png`,0)
            underfunc(x+1,y+1,x+2,y+2,x,y,`yellow`,turn,0,`white`,`black`,i,j,`png/qarspitak.png`,0);underfunc(x-1,y-1,x-2,y-2,x,y,`yellow`,turn,0,`white`,`black`,i,j,`png/qarspitak.png`,0)
            }
            if(turn[1]){
            underfunc(x+1,y-1,x+2,y-2,x,y,`green`,turn,1,`black`,`white`,i,j,`png/qarsev.png`,1);underfunc(x+1,y+1,x+2,y+2,x,y,`green`,turn,1,`black`,`white`,i,j,`png/qarsev.png`,1)
            underfunc(x-1,y+1,x-2,y+2,x,y,`green`,turn,1,`black`,`white`,i,j,`png/qarsev.png`,1);underfunc(x-1,y-1,x-2,y-2,x,y,`green`,turn,1,`black`,`white`,i,j,`png/qarsev.png`,1)
            }
        }
    }
}
for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
        figur[i][j].onclick = function(){
            if(turn[0] && !turn[2]){
            resetselect(i,j,`yellow`);
            select(`yellow`,i,j,-1,-1,+1,`white`);
            move(`white`,i,j,`png/qarspitak.png`,turn,false,true,0,`png/spitakdama.png`);
            }
            if(turn[1] && !turn[2]){
            resetselect(i,j,`green`);
            select(`green`,i,j,+1,-1,+1,`black`);
            move(`black`,i,j,`png/qarsev.png`,turn,true,false,1,`png/sevdama.png`);
            }
            selectforcat(i,j);selectforcat(i,j);
            red();
        }
    }
}