function makePlot(single_curve,div,height,width,domain_x,domain_y){
	var a = single_curve
	if(!div){div = "<body>"};
	if(!height){height = 1600};
	if(!width){width = 200};
	if(!domain_x){domain_x = [0,300]};
	if(!domain_y){domain_y =[0,single_curve.data.length]};
	var b2=g3.plot(div).height(height).width(width).xDomain(domain_x).yDomain(domain_y).draw();
	g3.log(b2,a.data).draw()
}

