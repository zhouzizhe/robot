var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var ok1=0,ok2=0,display=0;
var n = 0;
var m = 0;
var ID,node,I,O,NOW=[0,0];

var submit1=document.getElementById("submit1");
var submit2=document.getElementById("submit2");
var step=document.getElementById("step");
var stepl=document.getElementById("stepl");
var play=document.getElementById("play");
var ram=document.getElementById("ram");
var speed=document.getElementById("speed");
var RAM=[];
var nct=[];

function setSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    c.width = Math.max(pageWidth*0.8,m*80);
    c.height = Math.max(pageHeight*0.7,n*40);
    run1();
}
setSize();

function run1() {
    if(ok1==0 || ok2==0)
        return;
    var nc=nct.concat(),count=0,x=I[0],y=I[1];
    while(count<=500000){
        if(ID[x][y]==0){
            alert("Walk to an empty node.");
            step.max=count-1;
            stepl.innerHTML="Step:(max: "+step.max+" now: "+step.value+")";
            return;
        }
        if(count!=0 && node[ID[x][y]][0]==3){
            alert("Return to input node.");
            step.max=count-1;
            stepl.innerHTML="Step:(max: "+step.max+" now: "+step.value+")";
            return;
        }
        if(node[ID[x][y]][0]==3){
            var dx=node[ID[x][y]][1];
            var dy=node[ID[x][y]][2];
            x+=dx;
            y+=dy;
        }
        else if(node[ID[x][y]][0]==4){
            var ret="";
            for(var i=2,l=node[ID[x][y]].length;i<l;++i){
                ret+=String(nc[node[ID[x][y]][i]])+" ";
            }
            document.getElementById("output").value=ret;
            step.max=count;
            stepl.innerHTML="Step:(max: "+step.max+" now: "+step.value+")";
            return;
        }
        else if(node[ID[x][y]][0]==2){
            var dx,dy;
            if(nc[node[ID[x][y]][1]]>nc[node[ID[x][y]][2]]){
                dx=node[ID[x][y]][3];
                dy=node[ID[x][y]][4];
            }
            else{
                dx=node[ID[x][y]][5];
                dy=node[ID[x][y]][6];
            }
            x+=dx;
            y+=dy;
        }
        else{
            nc[node[ID[x][y]][1]]+=node[ID[x][y]][0];
            var dx=node[ID[x][y]][2];
            var dy=node[ID[x][y]][3];
            x+=dx;
            y+=dy;
        }
        count++;
    }
    step.max=count;
    stepl.innerHTML="Step:(max: "+step.max+" now: "+step.value+")";
    alert("Walk more than 5*10^5 steps.");
    return;
}


function run2() {
    NOW=[0,0];
    if(ok1==0 || ok2==0)
        return;
    var nc=nct.concat(),count=0,x=I[0],y=I[1],step=document.getElementById("step").value;
    NOW=[x,y];
    while(count<=500000 && count!=step){
        if(node[ID[x][y]][0]==3){
            var dx=node[ID[x][y]][1];
            var dy=node[ID[x][y]][2];
            x+=dx;
            y+=dy;
        }
        else if(node[ID[x][y]][0]==4){
            var ret="";
            for(var i=2,l=node[ID[x][y]].length;i<l;++i){
                ret+=String(nc[node[ID[x][y]][i]])+" ";
            }
            document.getElementById("output").value=ret;
            return;
        }
        else if(node[ID[x][y]][0]==2){
            var dx,dy;
            if(nc[node[ID[x][y]][1]]>nc[node[ID[x][y]][2]]){
                dx=node[ID[x][y]][3];
                dy=node[ID[x][y]][4];
            }
            else{
                dx=node[ID[x][y]][5];
                dy=node[ID[x][y]][6];
            }
            x+=dx;
            y+=dy;
        }
        else{
            nc[node[ID[x][y]][1]]+=node[ID[x][y]][0];
            var dx=node[ID[x][y]][2];
            var dy=node[ID[x][y]][3];
            x+=dx;
            y+=dy;
        }
        count++;
        NOW=[x,y];
    }
    for(var i=0;i<30;++i){
        RAM[i].innerHTML = String(nc[i+1]);
    }
}


function paint() {
    ctx.clearRect(0, 0, c.width, c.height)
    if(ok1==1){
        document.getElementById("sample").style.backgroundColor="rgb(180,255,180)";
    }
    if(ok2==1){
        document.getElementById("input").style.backgroundColor="rgb(180,255,180)";
    }
    if(display==0){
        play.value="▶";
    }
    else{
        play.value="■";
    }
    if(ok1==0){
        return;
    }
    var d1=(c.width-30)/m;
    var d2=(c.height-30)/n;
    d1=Math.min(d1,d2*1.5);
    d2=Math.min(d2,d1);
    var Dw1=d1/3;
    var Dw2=Dw1*2;
    var Dh1=d2/3;
    var Dh2=Dh1*2;
    if(NOW!=[0,0]){
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgb(180,180,255)';
        ctx.font = d1/3+'px Arial';
        ctx.fillRect((Dw1+Dw2)*(NOW[1]-1)+15,(Dh1+Dh2)*(NOW[0]-1)+15,Dw2,Dh2);
    }
    for(var i=1;i<=n;++i){
        for(var j=1;j<=m;++j){
            var paint=[];
            if(ID[i][j]!=0){
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'black';
                ctx.font = d1/3+'px Arial';
                ctx.strokeRect((Dw1+Dw2)*(j-1)+15,(Dh1+Dh2)*(i-1)+15,Dw2,Dh2);
                if(Math.abs(node[ID[i][j]][0])==1){
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'black';
                    ctx.font = d1/4+'px Arial';
                    if(node[ID[i][j]][0]==1){
                        ctx.fillText("+", (Dw1+Dw2)*(j-1)+15+Dw2/10, (Dh1+Dh2)*(i-1)+15+Dh2*4/10, Dw2*4/10);
                    }
                    else{
                        ctx.fillText("-", (Dw1+Dw2)*(j-1)+15+Dw2/10, (Dh1+Dh2)*(i-1)+15+Dh2*4/10, Dw2*4/10);
                    }
                    ctx.fillText(String(node[ID[i][j]][1]).padStart(3,'0'), (Dw1+Dw2)*(j-1)+15+Dw2*3/10, (Dh1+Dh2)*(i-1)+15+Dh2*9/10, Dw2*6/10);
                    paint.push([node[ID[i][j]][2],node[ID[i][j]][3],"black"]);
                }
                else if(node[ID[i][j]][0]==2){
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'black';
                    ctx.fillStyle = 'black';
                    ctx.font = d1/5+'px Arial';
                    ctx.fillText(String(node[ID[i][j]][1]).padStart(3,'0'), (Dw1+Dw2)*(j-1)+15+Dw2*1/10, (Dh1+Dh2)*(i-1)+15+Dh2*4/10, Dw2*4/10);
                    ctx.fillText(">", (Dw1+Dw2)*(j-1)+15+Dw2*4/10, (Dh1+Dh2)*(i-1)+15+Dh2*7/10, Dw2*2/10);
                    ctx.fillText(String(node[ID[i][j]][2]).padStart(3,'0'), (Dw1+Dw2)*(j-1)+15+Dw2*5/10, (Dh1+Dh2)*(i-1)+15+Dh2*9/10, Dw2*4/10);
                    paint.push([node[ID[i][j]][3],node[ID[i][j]][4],"green"]);
                    paint.push([node[ID[i][j]][5],node[ID[i][j]][6],"red"]);
                }
                else if(node[ID[i][j]][0]==3){
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'black';
                    ctx.fillStyle = 'black';
                    ctx.font = d1/4+'px Arial';
                    ctx.fillText("Input", (Dw1+Dw2)*(j-1)+15+Dw2*1/10, (Dh1+Dh2)*(i-1)+15+Dh2*7/10, Dw2*8/10);
                    paint.push([node[ID[i][j]][1],node[ID[i][j]][2],"black"]);
                }
                else{
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'black';
                    ctx.fillStyle = 'black';
                    ctx.font = d1/4+'px Arial';
                    ctx.fillText("output", (Dw1+Dw2)*(j-1)+15+Dw2*1/10, (Dh1+Dh2)*(i-1)+15+Dh2*7/10, Dw2*8/10);
                }
            }
            for(var k=0,l=paint.length;k<l;++k){
                var pa=paint[k];
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = pa[2];
                ctx.fillStyle = 'black';
                ctx.font = d1/3+'px Arial';
                if(pa[0]==1){
                    ctx.moveTo((Dw1+Dw2)*(j-1)+15+Dw2/2+Dw2/5,(Dh1+Dh2)*(i-1)+15+Dh2);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2+Dw2/5,(Dh1+Dh2)*(i-1)+15+Dh2+Dh1);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2+Dw2/5-Dw1/10,(Dh1+Dh2)*(i-1)+15+Dh2+Dh1-Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2+Dw2/5,(Dh1+Dh2)*(i-1)+15+Dh2+Dh1);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2+Dw2/5+Dw1/10,(Dh1+Dh2)*(i-1)+15+Dh2+Dh1-Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2+Dw2/5,(Dh1+Dh2)*(i-1)+15+Dh2+Dh1);
                    ctx.stroke();
                }
                if(pa[0]==-1){
                    ctx.moveTo((Dw1+Dw2)*(j-1)+15+Dw2/2-Dw2/5,(Dh1+Dh2)*(i-1)+15);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2-Dw2/5,(Dh1+Dh2)*(i-1)+15-Dh1);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2-Dw2/5-Dw1/10,(Dh1+Dh2)*(i-1)+15-Dh1+Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2-Dw2/5,(Dh1+Dh2)*(i-1)+15-Dh1);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2-Dw2/5+Dw1/10,(Dh1+Dh2)*(i-1)+15-Dh1+Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2/2-Dw2/5,(Dh1+Dh2)*(i-1)+15-Dh1);
                    ctx.stroke();
                }
                if(pa[1]==1){
                    ctx.moveTo((Dw1+Dw2)*(j-1)+15+Dw2,(Dh1+Dh2)*(i-1)+15+Dh2/5+Dh2/2);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2+Dw1,(Dh1+Dh2)*(i-1)+15+Dh2/5+Dh2/2);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2+Dw1-Dw1/10,(Dh1+Dh2)*(i-1)+15+Dh2/5+Dh2/2-Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2+Dw1,(Dh1+Dh2)*(i-1)+15+Dh2/5+Dh2/2);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2+Dw1-Dw1/10,(Dh1+Dh2)*(i-1)+15+Dh2/5+Dh2/2+Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15+Dw2+Dw1,(Dh1+Dh2)*(i-1)+15+Dh2/5+Dh2/2);
                    ctx.stroke();
                }
                if(pa[1]==-1){
                    ctx.moveTo((Dw1+Dw2)*(j-1)+15,(Dh1+Dh2)*(i-1)+15-Dh2/5+Dh2/2);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15-Dw1,(Dh1+Dh2)*(i-1)+15-Dh2/5+Dh2/2);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15-Dw1+Dw1/10,(Dh1+Dh2)*(i-1)+15-Dh2/5+Dh2/2-Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15-Dw1,(Dh1+Dh2)*(i-1)+15-Dh2/5+Dh2/2);
                    ctx.stroke();
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15-Dw1+Dw1/10,(Dh1+Dh2)*(i-1)+15-Dh2/5+Dh2/2+Dh1/10);
                    ctx.lineTo((Dw1+Dw2)*(j-1)+15-Dw1,(Dh1+Dh2)*(i-1)+15-Dh2/5+Dh2/2);
                    ctx.stroke();
                }
            }
        }
    }
    run2();
}

window.onresize = function () {
    setSize();
    paint();
}

var rem_clock;


function init() {
    document.getElementById("sample").value = "2 3\n4\n1 1 i R\n1 2 c 1 2 R D\n1 3 + 2 L\n2 2 o 1 2\n";
    document.getElementById("input").value = "2\n88 48\n";
    for(var i=1;i<=30;++i){
        nameDiv = document.createElement("div");
        nameDiv.innerHTML = String(i);
        ram.appendChild(nameDiv);
        boxDiv = document.createElement("div");
        boxDiv.className="box";
        RAM.push(boxDiv);
        ram.appendChild(boxDiv);
    }
    rem_clock=setInterval(function(){
        if(display==1){
            if(step.value==step.max){
                display=0;
            }
            step.value++;
            stepl.innerHTML="Step:(max: "+step.max+" now: "+step.value+")";
            run2();
            paint();
        }
        console.log(speed.value);
    },1000.0/speed.value);
}

init();



submit1.addEventListener("click", () => {
    var g=document.getElementById("sample").value;
    var list = g.match(/(\d+)+?|L|R|U|D|\+|\-|i|o|c/g);
    var id = 0;
    console.log(list);
    //-----------------------------n
    if(list.length == id){
        alert("The code is too short.");
        return;
    }
    var nn = Number(list[id]);
    id++;
    if(nn<1 || nn>100 || isNaN(nn)){
        alert("Invalid row number.");
        return;
    }

    //-----------------------------m
    if(list.length == id){
        alert("The code is too short.");
        return;
    }
    var nm = Number(list[id]);
    id++;
    if(nm<1 || nm>100 || isNaN(nm)){
        alert("Invalid column number.");
        return;
    }

    //-----------------------------k
    if(list.length == id){
        alert("The code is too short.");
        return;
    }
    var nk = Number(list[id]);
    id++;
    if(nk<2 || nk>nn*nm || isNaN(nk)){
        alert("Invalid grid number.");
        return;
    }
    var nid=[];
    var nnode=[];
    var nI=[0,0],nO=[0,0];
    for(var i=1;i<=nn+2;++i){
        var nr=[];
        for(var j=1;j<=nm+2;++j){
            nr.push(0);
        }
        nid.push(nr);
    }
    for(var i=1;i<=nk+1;++i){
        nnode.push([]);
    }
    for(var i=1;i<=nk;++i){
        //-----------------------------x
        if(list.length == id){
            alert("The code is too short.");
            return;
        }
        var nx = Number(list[id]);
        id++;
        if(nx<1 || nx>nn || isNaN(nx)){
            alert("Invalid position.");
            return;
        }

        //-----------------------------y
        if(list.length == id){
            alert("The code is too short.");
            return;
        }
        var ny = Number(list[id]);
        id++;
        if(ny<1 || ny>nm || isNaN(ny)){
            alert("Invalid position.");
            return;
        }

        if(nid[nx][ny]!=0){
            alert("Two nodes appear at the same position.");
            return;
        }
        nid[nx][ny]=i;

        //-----------------------------s
        if(list.length == id){
            alert("The code is too short.");
            return;
        }
        var ns = list[id];
        id++;
        if(ns=='+'){
            nnode[i].push(1);

            //-----------------------------index
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var nindex = Number(list[id]);
            id++;
            if(nindex<1 || nindex>300 || isNaN(nindex)){
                alert("Invalid index.");
                return;
            }
            nnode[i].push(nindex);
            
            //-----------------------------position
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var np = list[id];
            id++;
            var nxx,nyy;
            if(np=='L'){
                nxx=0;
                nyy=-1;
            }
            else if(np=='R'){
                nxx=0;
                nyy=1;
            }
            else if(np=='U'){
                nxx=-1;
                nyy=0;
            }
            else if(np=='D'){
                nxx=1;
                nyy=0;
            }
            else{
                alert("Invalid position.");
                return;
            }
            nnode[i].push(nxx);
            nnode[i].push(nyy);
        }
        else if(ns=='-'){
            nnode[i].push(-1);

            //-----------------------------index
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var nindex = Number(list[id]);
            id++;
            if(nindex<1 || nindex>300 || isNaN(nindex)){
                alert("Invalid index.");
                return;
            }
            nnode[i].push(nindex);
            
            //-----------------------------position
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var np = list[id];
            id++;
            var nxx,nyy;
            if(np=='L'){
                nxx=0;
                nyy=-1;
            }
            else if(np=='R'){
                nxx=0;
                nyy=1;
            }
            else if(np=='U'){
                nxx=-1;
                nyy=0;
            }
            else if(np=='D'){
                nxx=1;
                nyy=0;
            }
            else{
                alert("Invalid position.");
                return;
            }
            nnode[i].push(nxx);
            nnode[i].push(nyy);

        }
        else if(ns=='c'){

            nnode[i].push(2);

            //-----------------------------index
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var nindex = Number(list[id]);
            id++;
            if(nindex<1 || nindex>300 || isNaN(nindex)){
                alert("Invalid index.");
                return;
            }
            nnode[i].push(nindex);

            //-----------------------------index
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var nindex = Number(list[id]);
            id++;
            if(nindex<1 || nindex>300 || isNaN(nindex)){
                alert("Invalid index.");
                return;
            }
            nnode[i].push(nindex);
            
            //-----------------------------position
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var np = list[id];
            id++;
            var nxx,nyy;
            if(np=='L'){
                nxx=0;
                nyy=-1;
            }
            else if(np=='R'){
                nxx=0;
                nyy=1;
            }
            else if(np=='U'){
                nxx=-1;
                nyy=0;
            }
            else if(np=='D'){
                nxx=1;
                nyy=0;
            }
            else{
                alert("Invalid position.");
                return;
            }
            nnode[i].push(nxx);
            nnode[i].push(nyy);

            //-----------------------------position
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var np = list[id];
            id++;
            var nxx,nyy;
            if(np=='L'){
                nxx=0;
                nyy=-1;
            }
            else if(np=='R'){
                nxx=0;
                nyy=1;
            }
            else if(np=='U'){
                nxx=-1;
                nyy=0;
            }
            else if(np=='D'){
                nxx=1;
                nyy=0;
            }
            else{
                alert("Invalid position.");
                return;
            }
            nnode[i].push(nxx);
            nnode[i].push(nyy);
        }
        else if(ns=='i'){
            if(nI[0]!=0 || nI[1]!=0){
                alert("Two input nodes.");
                return;
            }
            nI=[nx,ny];
            nnode[i].push(3);
            //-----------------------------position
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var np = list[id];
            id++;
            var nxx,nyy;
            if(np=='L'){
                nxx=0;
                nyy=-1;
            }
            else if(np=='R'){
                nxx=0;
                nyy=1;
            }
            else if(np=='U'){
                nxx=-1;
                nyy=0;
            }
            else if(np=='D'){
                nxx=1;
                nyy=0;
            }
            else{
                alert("Invalid position.");
                return;
            }
            nnode[i].push(nxx);
            nnode[i].push(nyy);
        }
        else if(ns=='o'){
            if(nO[0]!=0 || nO[1]!=0){
                alert("Two output nodes.");
                return;
            }
            nO=[nx,ny];
            nnode[i].push(4);

            //-----------------------------p
            if(list.length == id){
                alert("The code is too short.");
                return;
            }
            var np = Number(list[id]);
            id++;
            if(np<1 || np>300 || isNaN(np)){
                alert("Invalid p.");
                return;
            }
            nnode[i].push(np);
            for(var j=1;j<=np;++j){
                //-----------------------------index
                if(list.length == id){
                    alert("The code is too short.");
                    return;
                }
                var nindex = Number(list[id]);
                id++;
                if(nindex<1 || nindex>300 || isNaN(nindex)){
                    alert("Invalid index.");
                    return;
                }
                nnode[i].push(nindex);
            }
        }
        else{
            alert("Invalid node type.");
            return;
        }
    }
    if(nI==[0,0]){
        alert("No input node.");
        return;
    }
    if(nO==[0,0]){
        alert("No output node.");
        return;
    }
    n=nn;
    m=nm;
    ID=nid;
    node=nnode;
    I=nI;
    O=nO;
    ok1=1;
    setSize();
    paint();
});

submit2.addEventListener("click", () => {
    var g=document.getElementById("input").value;
    var list = g.match(/(\d+)+?/g);
    var id = 0;
    console.log(list);
    //-----------------------------p
    if(list.length == id){
        alert("The code is too short.");
        return;
    }
    var np = Number(list[id]);
    id++;
    if(np<1 || np>300 || isNaN(np)){
        alert("Invalid input number.");
        return;
    }
    if(list.length<=np){
        alert("The code is too short.");
        return;
    }
    nct=[];
    for(var i=1;i<=305;++i)
        nct.push(0);
    for(var i=1;i<=np;++i)
        nct[i]=Number(list[i]);
    ok2=1;
    setSize();
    paint();
});

step.addEventListener("change", () => {
    stepl.innerHTML="Step:(max: "+step.max+" now: "+step.value+")";
    run2();
    paint();
});


speed.addEventListener("change", () => {
    clearInterval(rem_clock);
    rem_clock=setInterval(function(){
        if(display==1){
            if(step.value==step.max){
                display=0;
            }
            step.value++;
            stepl.innerHTML="Step:(max: "+step.max+" now: "+step.value+")";
            run2();
            paint();
        }
    },1000.0/speed.value);
});

play.addEventListener("click", () => {
    display=1-display;
    run2();
    paint();
});

window.onbeforeunload = function (e) {
    e = e || window.event
    if (e) {
        e.returnValue = '网站可能不会保存您的修改哦~'
    }
    return '网站可能不会保存您的修改哦~'
    }