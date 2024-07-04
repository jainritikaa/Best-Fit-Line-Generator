document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const dataInput = document.getElementById('dataPoints').value.trim();
    if (!dataInput) return;

    const dataPoints = dataInput.split('\n').map(point => point.split(',').map(Number));
    
    const xs = dataPoints.map(point => point[0]);
    const ys = dataPoints.map(point => point[1]);
    
    const { slope, intercept } = calculateBestFitLine(xs, ys);
    
    const regressionPoints = xs.map(x => ({ x, y: slope * x + intercept }));
    
    drawChart(dataPoints, regressionPoints);
});

function calculateBestFitLine(xs, ys) {
    const n = xs.length;
    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((sum, x, i) => sum + x * ys[i], 0);
    const sumX2 = xs.reduce((sum, x) => sum + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
}

function drawChart(dataPoints, regressionPoints) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data Points',
                    data: dataPoints.map(point => ({ x: point[0], y: point[1] })),
                    backgroundColor: 'blue',
                },
                {
                    label: 'Best Fit Line',
                    data: regressionPoints,
                    type: 'line',
                    borderColor: 'red',
                    fill: false,
                    showLine: true,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                },
            },
        },
    });
}
