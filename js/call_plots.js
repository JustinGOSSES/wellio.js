function makePlot(single_curve,div,height,width,domain_x,domain_y){
	// var a = single_curve
	// if(!div){div = "<body>"};
	// if(!height){height = 1600};
	// if(!width){width = 200};
	// if(!domain_x){domain_x = [0,300]};
	// if(!domain_y){domain_y =[0,single_curve.data.length]};
	// var b2=g3.plot(div).height(".log_plot_div").width(width).xDomain(domain_x).yDomain(domain_y).draw();
	// g3.log(b2,a.data).draw()
	// console.log('2 single_curve = ',single_curve)

	var b2=g3.plot("#log_plot_div").height(600).width(200).xDomain([0,300]).yDomain([0,single_curve.length]).draw();
	g3.log(b2,single_curve).draw()
}

