
//初期処理
window.addEventListener('DOMContentLoaded', () => {
        newChart('chartProc', dataProc);
        document.getElementById('sumProc').textContent = getSumLabel(sumValues(dataProc));
    });

//値合計
function sumValues(jsondata){
    return Object.values(jsondata).reduce((accumulator, currentValue) => accumulator + currentValue, 0);//0:initialValue
}
//値合計ラベル
function getSumLabel(sum){
    const years = Math.floor(sum/12);
    const months = sum % 12;
    return '合計 ' + sum + 'ヶ月（'+ years +'年'+ months +'ヶ月）';
}

//チャート描画
function newChart(ctxId, jsondata){
    const ctx = document.getElementById(ctxId).getContext('2d');
    new Chart(ctx, {
        type: 'bar', // 棒グラフを指定
        data: {
            labels: Object.keys(jsondata),
            datasets: [{
                data: Object.values(jsondata)
                ,backgroundColor: 'rgba(0, 44, 126, 0.5)'
            }]
        },
        options: {
            indexAxis: 'y' // 横向きを指定
            ,maintainAspectRatio: false // これをfalseにしないと高さ指定が無視される
            ,scales: {
                x: {
                    beginAtZero: true // 数値軸の開始点を0に固定
                }
            }
            ,ticks: {
                stepSize: 6 // 6ヶ月ごとに目盛りと線を引く
            }
            ,plugins: {
                legend: {
                    display: false // 凡例を非表示
                }
            }
        }
    });
}