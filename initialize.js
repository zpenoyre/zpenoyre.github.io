def initializeHalo(ps,nParticles,
  rMin=1,rMax=20,shape='sphere',
  active=0,smooth=0.1)
  {
  nPassive=10;
  for (var i=0;i<nParticles;i++){
    var pNew = new gravParticle();
    pNew.m=1e11/nPassive;
    pNew.id=i+2;
    pNew.flag=active; // active particles are fully gravitating, passive only interact with active particles
    if (shape=='disk'){ var theta=0.5*Math.PI;}
    if (shape=='sphere'){ var theta=Math.PI*Math.random();}
    var phi=2*Math.PI*Math.random();
    var r=rMin+Math.sqrt(Math.random()*(rMax**2 - rMin**2));
    //var r=rMin+Math.random()*(rMax - rMin);
    pNew.x=[r*Math.cos(phi)*Math.sin(theta),r*Math.sin(phi)*Math.sin(theta),r*Math.cos(theta)];
    var v=Math.sqrt(Galt*1e11/r);
    if (shape=='disk'){ var vTheta=0.5*Math.PI;}
    if (shape=='sphere'){ var vTheta=Math.PI*Math.random(); }
    //var vPhi=phi+Math.PI/2
    var vPhi=2*Math.PI*Math.random();
    pNew.v=[v*Math.sin(vTheta)*Math.cos(vPhi),v*Math.sin(vTheta)*Math.sin(vPhi),v*Math.cos(vTheta)]
    //pNew.v=[150*(-1+2*Math.random()),150*(-1+2*Math.random()),150*(-1+2*Math.random())];
    pNew.smooth=smooth
    pNew.r=0.2*width/(2*boxSize)
    ps.push(pNew);
  }
  return ps
}
