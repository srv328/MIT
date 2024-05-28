document.getElementById('makegraph').addEventListener('click', function() {
    const ox = document.querySelector('input[name="ox"]:checked');
    const oy = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.id);
    if (!ox || oy.length === 0) {
        alert("Пожалуйста, выберите значение по оси OX и хотя бы один результат.");
        return;
    }
    drawGraph(ox.value, oy);
});

function drawGraph(ox, oy) {
    const svg = d3.select("#chart");
    svg.selectAll("*").remove();

    const margin = {top: 20, right: 50, bottom: 50, left: 50};
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(d => d[ox]));
    y.domain([0, d3.max(data, d => d3.max(oy.map(key => d[getOYKey(key)])))]);
    const xAxis = g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

    if (ox === "Год") {
        xAxis.selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-75)");
    }

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10));

    oy.forEach((key, index) => {
        g.selectAll(`.bar${index}`)
            .data(data)
            .enter().append("rect")
            .attr("class", `bar bar${index}`)
            .attr("x", d => x(d[ox]))
            .attr("y", d => y(d[getOYKey(key)]))
            .attr("width", x.bandwidth() / oy.length)
            .attr("height", d => height - y(d[getOYKey(key)]))
            .attr("transform", `translate(${index * x.bandwidth() / oy.length},0)`)
            .attr("fill", () => d3.schemeCategory10[index]);
    });
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + margin.right - 100},${margin.top})`);

    oy.forEach((key, index) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(-100, ${index * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", d3.schemeCategory10[index]);

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .text(getOYKey(key));
    });
}

function getOYKey(id) {
    switch(id) {
        case "dividends": return "Дивиденды на акцию (%)";
        case "people": return "Уровень занятости (человек)";
        case "actprice": return "Стоимость 1 акции (руб)";
        case "value": return "Объем добычи (тысяч тонн)";
        default: return "";
    }
}

document.getElementById('clear').addEventListener('click', function () {
    d3.select("#chart").selectAll('*').remove();
});