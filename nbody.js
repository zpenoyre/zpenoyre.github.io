var G=6.67e-11; // in SI
var mSun=2e30;
var kpc=3e19;
var Gyr=3.15e16;
var Galt=G*(mSun*(Gyr**2))/(kpc**3);

var rHat=[0,0,0]
var a1=[0,0,0]
var a2=[0,0,0]

function gravParticle(){
  this.id=0
  this.m=1e6
  this.x=[0,0,0]
  this.v=[0,0,0]
  this.a=[0,0,0]
  this.Phi=0
  this.flag=0
  this.c='black'
  this.r=2
  this.smooth=0.1
}

function gravity(p1,p2){ // calculating and updating the acceleration of a pair of particles
  var r=Math.sqrt((p2.x[0]-p1.x[0])**2 + (p2.x[1]-p1.x[1])**2 + (p2.x[2]-p1.x[2])**2 + p1.smooth**2 + p2.smooth**2);

  rHat[0]=(p2.x[0]-p1.x[0])/r;
  rHat[1]=(p2.x[1]-p1.x[1])/r;
  rHat[2]=(p2.x[2]-p1.x[2])/r;

  a1[0]=rHat[0]*Galt*p2.m/(r**2);
  a1[1]=rHat[1]*Galt*p2.m/(r**2);
  a1[2]=rHat[2]*Galt*p2.m/(r**2);

  a2[0]=-rHat[0]*Galt*p1.m/(r**2);
  a2[1]=-rHat[1]*Galt*p1.m/(r**2);
  a2[2]=-rHat[2]*Galt*p1.m/(r**2);

  p1.a[0]=p1.a[0]+a1[0]
  p1.a[1]=p1.a[1]+a1[1]
  p1.a[2]=p1.a[2]+a1[2]

  p2.a[0]=p2.a[0]+a2[0]
  p2.a[1]=p2.a[1]+a2[1]
  p2.a[2]=p2.a[2]+a2[2]

  p1.Phi=p1.Phi-Galt*p1.m*p2.m/r;
  p2.Phi=p2.Phi-Galt*p1.m*p2.m/r;
}

function acceleration(ps){
  clearAcc(ps)
  for (var i=0; i<nParticles; i++){
    if (ps[i].flag == 1){
      var index=ps[i].id;
      for (var j=i+1; j<nParticles; j++){
        gravity(ps[i],ps[j]);
      }
    }
  }
}

function leapfrog(dt,fixed=0) {
  for (var i=0; i< nParticles; i++){
    ps[i].v[0]=ps[i].v[0]+ps[i].a[0]*dt/2;
    ps[i].v[1]=ps[i].v[1]+ps[i].a[1]*dt/2;
    ps[i].v[2]=ps[i].v[2]+ps[i].a[2]*dt/2;

    ps[i].x[0]=ps[i].x[0]+ps[i].v[0]*dt;
    ps[i].x[1]=ps[i].x[1]+ps[i].v[1]*dt;
    ps[i].x[2]=ps[i].x[2]+ps[i].v[2]*dt;
  }
  if (fixed==1){ //central particle does not move
      ps[0].x=[0,0,0]
  }
  acceleration(ps); // finds new acceleration
  for (var i=0; i < nParticles; i++){
    ps[i].v[0]=ps[i].v[0]+ps[i].a[0]*dt/2;
    ps[i].v[1]=ps[i].v[1]+ps[i].a[1]*dt/2;
    ps[i].v[2]=ps[i].v[2]+ps[i].a[2]*dt/2;
  }
}

function clearAcc(ps){ // clearing old accelerations at each step
  for (var i = 0; i < ps.length; i++) {
    ps[i].Phi=0;
    ps[i].a=[0,0,0];
  }
}
