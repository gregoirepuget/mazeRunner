class Maze{
  constructor(width, height)
  {
    this.width=width, //maze width
    this.height=height, //maze height
    this.container = document.querySelector('.maze'),
    this.wayDisplayContainer = document.querySelector('.way'),
    this.way=new Array(), // positions form the begining to the end
    this.currentPos= new Array()
    this.allPos= new Array() // All pos => not used
    this.posWidth=12 // width+border => to generate maze width css

    this.display()

    this.mazeConstruct()

  }

  // display maze with all cases
  display()
  {
    //maze properties
    this.container.style.width=this.posWidth*this.width+'px'

    //display cases
    for(let i=0; i< this.height; i++)
    {
      this.allPos[i]=new Array()
      for (let j=0; j< this.width; j++)
      {
        let pos = document.createElement('div')
        pos.classList.add('case', 'pos_'+j+'_'+i, 'top', 'left', 'right', 'bottom')
        this.container.appendChild(pos)
        this.allPos[i][j]=pos
      }
    }
  }

  // generate maze
  mazeConstruct()
  {
    //first position
    this.currentPos=[Math.floor(Math.random()*this.width), Math.floor(Math.random()*this.height)]
    this.way=[this.currentPos];
    this.displayWay()

    // run the break border generator.
    this.generateWay(this.currentPos)
  }

  // recursive function to break borders
  generateWay(currentPos){
      //console.log(this.way)
      //console.log(currentPos)
      let posX = currentPos[0]
      let posY = currentPos[1]
      //console.log(posX, posY)

      let differentWays= new Array()// all free ways

      let randomPos= new Array() // chosen way

      // test to check if around positions are free
      if(document.querySelector('.pos_'+(posX+1)+'_'+posY) != null && document.querySelector('.pos_'+(posX+1)+'_'+posY).classList.length<7)
      {
        differentWays.push([posX+1,posY])
      }

      if(document.querySelector('.pos_'+(posX-1)+'_'+posY)!= null && document.querySelector('.pos_'+(posX-1)+'_'+posY).classList.length<7)
      {
        differentWays.push([posX-1,posY])
      }

      if(document.querySelector('.pos_'+posX+'_'+(posY+1))!= null && document.querySelector('.pos_'+posX+'_'+(posY+1)).classList.length<7)
      {
        differentWays.push([posX,posY+1])
      }

      if(document.querySelector('.pos_'+posX+'_'+ (posY-1)) != null && document.querySelector('.pos_'+posX+'_'+ (posY-1)).classList.length<7)
      {
        differentWays.push([posX,posY-1])
      }

      //console.log(differentWays)

      //
      if(differentWays.length!=0)
      {
        randomPos = differentWays[Math.floor(Math.random()*differentWays.length)]
        //console.log(randomPos)
        this.breakBorder(currentPos,randomPos)

        // set position as not free
        document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.add('is-active')

        // add position to the way
        this.way.push(randomPos);
        this.displayWay()

        // call the same function with the new position.
        setTimeout(()=>this.generateWay(randomPos), 40);
      }
      else if(this.way.length>1){

        // if nothing free. Run the same function with the older position.
        this.way.pop()
        this.displayWay()

        setTimeout(()=>this.generateWay(this.way[this.way.length-1]), 40);
      }



  }

  //function to display way on page
  displayWay()
  {
    if(this.way.length>1)
    {
      this.wayDisplayContainer.innerHTML=this.way.join(' ')
    }
    else{
      this.wayDisplayContainer.innerHTML= 'This is the end baby!'
    }

  }

  //function to break border on page
  breakBorder(currentPos,randomPos){
    if(currentPos[0]>randomPos[0])
    {
      //break left
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.remove('left')
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.add('left-white')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.remove('right')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.add('right-white')
    }
    else if(currentPos[0]<randomPos[0])
    {
      //break left
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.remove('right')
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.add('right-white')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.remove('left')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.add('left-white')
    }
    else if(currentPos[1]>randomPos[1])
    {
      //break left
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.remove('top')
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.add('top-white')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.remove('bottom')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.add('bottom-white')
    }
    else if(currentPos[1]<randomPos[1])
    {
      //break left
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.remove('bottom')
      document.querySelector('.pos_'+currentPos[0]+'_'+ currentPos[1]).classList.add('bottom-white')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.remove('top')
      document.querySelector('.pos_'+randomPos[0]+'_'+ randomPos[1]).classList.add('top-white')
    }

  }

}

let maze = new Maze(20,20)
