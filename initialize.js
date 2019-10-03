function initializeHalo(ps,nParticles,options){
  var rMin = options.rMin || 1;
  var rMax = options.rMax || 20;
  var shape = options.shape || 'sphere';
  var active = options.active || 0;
  var smooth = options.smooth || 0.1;
  var mTotal = options.mTotal || 1e11;

  var nExist=ps.length;
  var theta, vTheta, phi, vPhi;
  var r,v;

  for (var i=0;i<nParticles;i++){
    var pNew = new gravParticle();
    pNew.m=mTotal/nParticles;
    pNew.id=i+nExist;
    pNew.flag=active; // active particles are fully gravitating, passive only interact with active particles
    if (shape=='disk'){ theta=0.5*Math.PI;}
    if (shape=='sphere'){ theta=Math.PI*Math.random();}

    phi=2*Math.PI*Math.random();
    r=rMin+Math.sqrt(Math.random()*(rMax**2 - rMin**2));
    //var r=rMin+Math.random()*(rMax - rMin);
    pNew.x=[r*Math.cos(phi)*Math.sin(theta),r*Math.sin(phi)*Math.sin(theta),r*Math.cos(theta)];

    v=Math.sqrt(Galt*1e11/r);
    if (shape=='disk'){ vTheta=0.5*Math.PI;}
    if (shape=='sphere'){ vTheta=Math.PI*Math.random(); }
    //var vPhi=phi+Math.PI/2
    vPhi=2*Math.PI*Math.random();
    pNew.v=[v*Math.sin(vTheta)*Math.cos(vPhi),v*Math.sin(vTheta)*Math.sin(vPhi),v*Math.cos(vTheta)]
    //pNew.v=[150*(-1+2*Math.random()),150*(-1+2*Math.random()),150*(-1+2*Math.random())];
    pNew.smooth=smooth
    ps.push(pNew);
  }
  return ps
}

function initializeParticle(ps,options){
  var pNew = new gravParticle();
  var nExist=ps.length;
  var x,v;
  pNew.m = options.m || 1e10;
  x = options.x || [0,0,0];
  v = options.v || [0,0,0];
  pNew.x=x.slice(); //trying to avoid deep-copying the array
  pNew.v=v.slice();
  pNew.flag = options.active || 1;
  pNew.smooth = options.smooth || 1;

  pNew.id=ps.length;
  ps.push(pNew)

  return ps
}

function centreFrame(ps){
  var xCom=[0,0,0]
  var vCom=[0,0,0]
  var mCom=0
  var nParticles=ps.length;
  for (var i=0; i<nParticles; i++){
    mCom+=ps[i].m
    xCom[0]+=ps[i].m*ps[i].x[0]
    xCom[1]+=ps[i].m*ps[i].x[1]
    xCom[2]+=ps[i].m*ps[i].x[2]
    vCom[0]+=ps[i].m*ps[i].v[0]
    vCom[1]+=ps[i].m*ps[i].v[1]
    vCom[2]+=ps[i].m*ps[i].v[2]
  }
  for (var i=0; i<nParticles; i++){
    ps[i].x[0]-=xCom[0]/mCom
    ps[i].x[1]-=xCom[1]/mCom
    ps[i].x[2]-=xCom[2]/mCom
    ps[i].v[0]-=vCom[0]/mCom
    ps[i].v[1]-=vCom[1]/mCom
    ps[i].v[2]-=vCom[2]/mCom
  }
}
