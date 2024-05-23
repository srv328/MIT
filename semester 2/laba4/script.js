let animationRunning = false;
const width = 1000;
const height = 1000;
const svg = d3.select("svg").attr("width", width).attr("height", height);

function drawSmile() {
	let smile = svg.append("g")
	.style("stroke", "brown")
	.style("stroke-width", 2)
	.style("fill", "brown");

	smile.append("circle")
	.attr("cx", 0)
	.attr("cy", 0)
	.attr("r", 100)
	.style("fill", "yellow");

	smile.append("circle")
	.attr("cx", -60)
	.attr("cy", -50)
	.attr("r", 10);

	smile.append("circle")
	.attr("cx", 60)
	.attr("cy", -50)
	.attr("r", 10);

	let arc = d3.arc()
	.innerRadius(50)
	.outerRadius(10);

	let awc = d3.arc()
	.innerRadius(70)
	.outerRadius(75);

	let nose = d3.arc()
	.innerRadius(10)
	.outerRadius(35);
	smile.append("path")

	.attr("d", arc({startAngle: Math.PI /3 * 4,
		endAngle: Math.PI/3 * 2}))
	.style("stroke", "brown")
	smile.append("path")

	.attr("d", awc({startAngle: Math.PI /3 * 4.5,
		endAngle: Math.PI/3 * 1.5}))
	.style("stroke", "brown")
	smile.append("path")

	.attr("d", nose({startAngle: Math.PI/3,
		endAngle: Math.PI/-3}))
	.style("stroke", "brown")
	smile.append("circle")

	.attr("cx", 0)
	.attr("cy", -5)
	.attr("r", 15)
	.attr("fill", "red");
	return smile

}

function drawPath() {
	const controlPoints = [
		{ x: 900, y: 100 },
		{ x: 100, y: 100 },
		{ x: 100, y: 500 },
		{ x: 900, y: 500 },
		{ x: 900, y: 900 },
		{ x: 100, y: 900 }
		];

	const data = [];
	const steps = 50;

	for (let i = 0; i < controlPoints.length - 1; i++) {
		const p1 = controlPoints[i];
		const p2 = controlPoints[i + 1];

		for (let step = 0; step <= steps; step++) {
			const t = step / steps;
			const x = p1.x + (p2.x - p1.x) * t;
			const y = p1.y + (p2.y - p1.y) * t;
			data.push({ x, y });
		}
	}

	const lineGenerator = d3.line()
	.x(d => d.x)
	.y(d => d.y);

	return svg.append("path")
	.attr("d", lineGenerator(data))
	.attr("stroke", "none")
	.attr("fill", "none");
}

function translateAlong(path) {
	const length = path.getTotalLength();
	return function() {
		return function(t) {
			const {x, y} = path.getPointAtLength(t * length);
			return `translate(${x},${y})`;
		}
	}
}

let pict = drawSmile();
pict.attr("transform", `translate(900, 100)`)

function animate() {
	if (!animationRunning) {
		animationRunning = true;
		const path = drawPath();
		const durationInput = d3.select("#duration").node();
		const duration = durationInput.value * 1000;
		const decScaleInput = d3.select("#decScale").node();
		const decScale = 1 - decScaleInput.value / 100;
		const rotateCheckbox = d3.select("#rotateCheckbox").node();

		pict.transition()
		.duration(duration)
		.ease(d3.easeLinear)
		.attrTween("transform", () => {
			return t => {
				const translate = translateAlong(path.node())()(t);
				const rotate = rotateCheckbox.checked ? `rotate(${- t * 360 * 3})` : "";
				return `${translate} ${rotate}`;
			};
		})
		.on("end", () => {
			animationRunning = false;
		});

		pict.selectAll("circle, path")
		.transition()
		.duration(duration)
		.ease(d3.easeLinear)
		.attrTween("transform", () => { 
			return t => `scale(${decScale * t + (1 - t)})`; 
		});
	}
}

function stop() {
	svg.selectAll("*").remove();
}

d3.select("#start").on("click", animate);
d3.select("#clear").on("click", stop);
