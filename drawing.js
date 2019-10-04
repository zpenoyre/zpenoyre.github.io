function lineElement(){
  this.x1=0;
  this.x2=1;
  this.y1=0;
  this.y2=1;
}
function circleElement(){
  this.cx=0
  this.cy=0
  this.r=0
  this.colour='black'
}
function colourScheme(){
  this.name='scheme';
  this.cMap=d3.interpolateSpectral;
  this.range=[0,1];
  this.isLog=0;
  this.function=findVelocity;
}

function joinCircles(nDisplay=1000){
  var circles=svg.selectAll(".node")
    .data(ps)
    .join('circle')
    .attr('id',function(d) { return "particle" + d.id; })
    .attr('r',function(d,i) {
      if (i>nDisplay) {return 0} // displaying more than 1000 particles gets very slow
      return 0.5*d.smooth*size/boxSize; })
    .style("fill", 'black')
    .attr('cx', function(d) {return size*(d.x[0]+boxSize)/(2*boxSize);})
    .attr('cy', function(d) {return size*(d.x[1]+boxSize)/(2*boxSize);});
  return circles;
}

function findVelocity(p){
  return Math.sqrt(p.v[0]**2 + p.v[1]**2 + p.v[2]**2 )
}
function findEnergy(p){
  var v = Math.sqrt(p.v[0]**2 + p.v[1]**2 + p.v[2]**2 )
  return p.Phi + 0.5*p.m*(v**2)
}
function findVirial(p){
  var v = Math.sqrt(p.v[0]**2 + p.v[1]**2 + p.v[2]**2 )
  return Math.abs(p.Phi - 0.5*p.m*(v**2))
}

var cSchemes = []
var vScheme= new colourScheme();
vScheme.name='Velocity'
vScheme.range=[0,300]
var eScheme = new colourScheme();
eScheme.name='Energy';
eScheme.range=[1e10,1e13];
eScheme.isLog=1;
eScheme.cMap=d3.interpolateYlGnBu;
eScheme.function=findEnergy;
var virScheme = new colourScheme();
virScheme.name='Virial';
virScheme.range=[3e12,3e13];
virScheme.isLog=1;
virScheme.cMap=d3.interpolatePuRd;
virScheme.function=findVirial;
cSchemes.push(vScheme);
cSchemes.push(eScheme);
cSchemes.push(virScheme);
