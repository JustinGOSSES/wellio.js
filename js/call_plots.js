function makePlot(single_curve,div,height,width,domain_x,domain_y,curve_name){
	var b2=g3.plot("#log_plot_div").height(height).width(width).xDomain(domain_x).yDomain([0,single_curve.length]).xTitle(curve_name).draw()
	g3.log(b2,single_curve).draw()

}

function draw_curve(curve,div){
	if(!div){div = "#log_plot_div"}
	var domain_x = [Math.min.apply(null, temp_json["CURVES"][curve]),Math.max.apply(null, temp_json["CURVES"][curve])]
    makePlot(temp_json["CURVES"][curve],".log_plot_div",600,250,domain_x,[0,temp_json["CURVES"][curve].length],curve)
}