const container=document.createElement("div");
const t=document.createElement("h1");
const logo=document.createElement("div");
const logoimg=document.createElement("img");
const logoa=document.createElement("a");
logoimg.setAttribute("src","Images/logo.png");
logoimg.style.width="25px";
logoa.setAttribute("href","https://oufaddoul.com/");
logoa.setAttribute("title","Ayoub Oufaddoul");
logo.textContent="Made in Morocco by";
logoa.appendChild(logoimg);
logo.appendChild(logoa);
logo.style=`
    position:absolute;
    font-weight:800;
    right:0;
    bottom:0;
    padding:10px;
    color:#2f3957;
    background-color:white;
    border-top-left-radius: 10px;
    display:flex;
    align-items:center;
    justify-content: space-between;
    gap: 5px;
`;
t.textContent="Sliding Puzzle Game";
let sw=(window.innerWidth*0.96).toFixed();
if(window.innerHeight < window.innerWidth){
    sw=600;
}
document.body.style=`
    font-family:tahoma;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    background-color:#2f3957;
    margin:0;
`;
container.style=`
    width:${sw}px;
    height:${sw}px;
    box-sizing:border-box;
    background-color:black;
    display:flex;
    flex-wrap:wrap;
    outline:2px solid white;
`;
t.style=`
    margin:0;
    margin-bottom:10px;
    color:white;
`;
const yw=document.createElement("div");
yw.style=`
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.3);
    display:none;
    color:#fbeb01;
    justify-content:center;
    align-items:center;
    user-select:none;
    font-size:4em; 
`;
yw.textContent="You won 🎉";
yw.addEventListener("click",()=>{yw.style.display="none"});
document.getElementsByTagName("html")[0].style.height="100%";
document.body.appendChild(t);
document.body.appendChild(container);
document.body.appendChild(logo);
document.body.appendChild(yw);

const M=[],P=[],W={i:0,j:0},PR=[];
let isC=false;
const wah=(sw/3).toFixed();

for(let i=0;i<3;i++){
    M.push([]);
    P.push([]);
    for(let j=0;j<3;j++){
        M[i].push(document.createElement("div"));
        M[i][j].style=`
            box-sizing:border-box;
            width:${wah}px; 
            height:${wah}px;
            background-color:white;
            border:1px solid White;
            background-image:url('Images/m.png');
            background-size:${sw}px;
            background-position:${(j*-wah)}px ${(i*-wah)}px;
        `;
        M[i][j].addEventListener("click",()=>{
            if(M[i][j].style.backgroundImage !== "none"){
                if(isC)
                    M[W.i][W.j].style.border=`1px solid white`;
                W.i=i;
                W.j=j;
                M[i][j].style.border=`2px solid white`;
                isC=true;
            }
            else if((Math.abs(j-W.j) <= 1 && i===W.i) || (Math.abs(i-W.i)<=1 && j===W.j)){
                [M[i][j].style.backgroundImage,M[W.i][W.j].style.backgroundImage]=[M[W.i][W.j].style.backgroundImage,M[i][j].style.backgroundImage];
                [M[i][j].style.backgroundPosition,M[W.i][W.j].style.backgroundPosition]=[M[W.i][W.j].style.backgroundPosition,M[i][j].style.backgroundPosition];
            }

            let youWin=true;
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(M[i][j].style.backgroundPosition!==`${P[i][j][0]}px ${P[i][j][1]}px`)
                        youWin=false;
                }
            }
            if(youWin){
                yw.style.display="flex";
            }
        });
        P[i].push([(j*-wah),(i*-wah)]);
        container.appendChild(M[i][j]);
    }
}
M[2][2].style.backgroundImage="none";
let s="&2,2;";
for(let i=0;i<3;i++){
    PR.push([]);
    for(let j=0;j<3;j++){
        if(j===2 && i===2)
            break;
        let ir=Math.floor(Math.random()*3),jr=Math.floor(Math.random()*3);
        while(s.includes(`&${ir},${jr};`)){
            ir=Math.floor(Math.random()*3);
            jr=Math.floor(Math.random()*3);
        }
        s+=`&${ir},${jr};`;
        PR[i].push(P[ir][jr]);
    }
}
for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
        if(j===2 && i===2)
            break;
        M[i][j].style.backgroundPosition=`${PR[i][j][0]}px ${PR[i][j][1]}px`;
    }

}

