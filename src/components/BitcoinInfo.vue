<template>
    <div class="container-fluid">
        <div class="row">
            <div class="content col-md-6 mx-auto">
                <div class="title">
                    <h3>
                        {{Information.name}}({{Information.symbol}})
                    </h3>
                    <div id="socket">
                        <h3></h3>
                    </div>
                </div>
                <table class="table">
                    <tbody>
                    <tr>
                        <td>rank</td>
                        <td>{{Information.rank}}</td>
                    </tr>
                    <tr>
                        <td>supply</td>
                        <td>{{Information.supply}}</td>
                    </tr>
                    <tr>
                        <td>maxSupply</td>
                        <td>{{Information.maxSupply}}</td>
                    </tr>
                    <tr>
                        <td>marketCapUsd</td>
                        <td>{{Information.marketCapUsd}}</td>
                    </tr>
                    <tr>
                        <td>volumeUsd24Hr</td>
                        <td>{{Information.volumeUsd24Hr}}</td>
                    </tr>
                    <tr>
                        <td>priceUsd</td>
                        <td>{{Information.priceUsd}}</td>
                    </tr>
                    <tr>
                        <td>changePercent24Hr</td>
                        <td>{{Information.changePercent24Hr}}</td>
                    </tr>
                    <tr>
                        <td>vwap24Hr</td>
                        <td>{{Information.vwap24Hr}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-md-12 content">
                <canvas ref="priceUsd"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    export default {
        name: 'BitcoinInfo',
        data() {
            return {
                Information: '',
                ChartInfo:'',
                Time:[],
                priceUsd:[],
                circulatingSupply:[],
            }
        },
        methods: {
            GetBicoinInfo() {
                const axios = require('axios');
                axios.get('https://api.coincap.io/v2/assets/bitcoin')
                    .then((response) => {this.Information = response.data.data})
                    .catch(err => console.log(err))
            },
            async GetChart(){
                const axios = require('axios');
                await axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=m5&start=1587920154000&end=1588006554000')
                    .then((response) => {this.ChartInfo = response.data.data;
                    })
                    .catch(err => console.log(err));
                for (let item of this.ChartInfo) {
                    this.Time.push(item.time);
                }
                for (let item of this.ChartInfo) {
                    this.priceUsd.push(item.priceUsd);
                }
                for (let item of this.ChartInfo) {
                    this.circulatingSupply.push(item.circulatingSupply);
                }

            },
            DisplayChart(){
                var ctx = this.$refs.priceUsd.getContext('2d');
                var x = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.Time,
                        datasets: [{
                            label: 'priceUsd',
                            data: this.priceUsd,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: false
                                }
                            }]
                        }
                    }
                });
                console.log(x)
            },


             GetWebSocket(){
                let exampleSocket = new WebSocket('wss://relay.arzypto.com/ws');
                exampleSocket.onopen = function(){
                    exampleSocket.send(JSON.stringify(["bitcoin"]))
                };
                 exampleSocket.onmessage = function(event){
                     let msg = JSON.parse(event.data);
                     var $ = window.jQuery = require('jquery');
                     $("#socket h3").html(msg.bitcoin);
                };
             }

        },
        async created() {
            this.GetBicoinInfo();
            await this.GetChart();
            this.DisplayChart();
            this.GetWebSocket();
        },

    }
</script>
<style>

    .content{
             padding-top: 50px;
         }
    .title{

        font-weight: bold;
    }
    .table tr td:nth-child(even){
        font-weight: bold;
        text-align: right;
    }
    .table tr:nth-child(even){
        background: #fef1f5;
    }
    .chartjs-render-monitor{
        width: 1119px;
        height: 480px;
        margin: auto;
    }

</style>
