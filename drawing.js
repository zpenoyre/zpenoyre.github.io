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

function joinCircles(nDisplay=1000){
  var circles=svg.selectAll(".node")
    .data(ps)
    .join('circle')
    .attr('id',function(d) { return "particle" + d.id; })
    .attr('r',function(d,i) {
      if (i>nDisplay) {return 0} // displaying more than 1000 particles gets very slow
      return 0.5*d.smooth*width/boxSize; })
    .style("fill", 'black')
    .attr('cx', function(d) {return width*(d.x[0]+boxSize)/(2*boxSize);})
    .attr('cy', function(d) {return width*(d.x[1]+boxSize)/(2*boxSize);});
  return circles;
}
