let val=document.querySelector('.input')
let btn=document.querySelector('.btn')
let container=document.querySelector('.container')
let  n;
let src=null;
let visit={};
let parent={};
let nodes=[];
btn.addEventListener('click',()=>{
    container.innerHTML=``;
    src=null;
    visit={};
    parent={};
    nodes=[];
    n=parseInt(val.value);
    // n=;
    for(let i=0;i<n;i++){
      let outer= document.createElement('div');
      //   outer.style
      outer.classList.add("flex-outer")
      outer.id=`outer${i}`
      for(let j=0;j<50;j++){
          
          let inner= document.createElement('div');
          inner.classList.add("inner");
          outer.appendChild(inner);
          inner.id=`inner${i}-${j}`
          
        }
        container.appendChild(outer);
    }
})
 async function containerClick(){
    for(let  i=0;i<n;i++){
        for(let j=0;j<50;j++){
            let box=document.querySelector(`#inner${i}-${j}`)
            box.addEventListener('click',async()=>{
                if(!src){
                    src=box;
                    src.innerHTML=`<p>S</p>`
                }
                if(!nodes.includes(box.id))nodes.push(box.id);
                await sleep(4);
                box.style.background='#99efa0';
            })
        }
    }
}

container.addEventListener('click',containerClick);
let submit=document.querySelector('.btnSubmit')
submit.addEventListener('click',async ()=>{
    let q=[src.id,0];
    visit[src.id]=1;
    parent[src.id]=-1;
    let dir=[[-1,0],[1,0],[0,-1],[0,1]];
    let level=0;
    while(q.length){

        let top=q.shift();
        let curr=top;
        if(typeof top === "number"){
            level++;
            if(q.length)q.push(top+1);
           
        }
        else{
        
            let first='',second='';
            top=top.split('');
            // console.log(top,Number(top[0]),Number(top[0]));
            while (isNaN(Number(top[0]))) {
                top.shift();
            }
            while (!isNaN(Number(top[0]))) {
                first+=(top.shift());
            }
            top.shift();
            while (!isNaN(Number(top[0]))) {
                second+=(top.shift());
            }
            //  console.log(first,second);
                first=parseInt(first);
                second=parseInt(second);
                // console.log('ans',first,second);
                let box=document.querySelector(`#inner${first}-${second}`);
                 await sleep(4);

                box.innerHTML=`<p>${level}</p>`
             
            for(let i=0;i<4;i++){
                let x=dir[i][0]+first;
                let y=dir[i][1]+second;
                if(x>=0 && y>=0 && x<n && y<50 && !(Object.keys(visit).includes(`inner${x}-${y}`,0))){
                    q.push(`inner${x}-${y}`);
                    visit[`inner${x}-${y}`]=1;
                    parent[`inner${x}-${y}`]=curr;
                }
            }
        }
    }
    colourPath();
})
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
 async function colourPath(){
    console.log('coloring path');
    // we need the path and it can be found using parent array
    for(let i=0;i<nodes.length;i++){
        let curr=nodes[i];
        while(parent[curr]!=-1){
            let box=document.querySelector(`#${curr}`);
             await sleep(400);
                box.classList.add("parentColor");
                box.classList.add("shadow");
            curr=parent[curr];
        }
    }

// },1000);

    console.log(nodes);
    console.log(parent);
}
