const form = document.getElementById('vote-form');

form.addEventListener('submit',e=>{
const choice = document.querySelector('input[name=mer]:checked').value;
const data = {mer:choice};

fetch('http://localhost:3000/poll',{
    method:'post',
    body: JSON.stringify(data),
    headers:new Headers({
        'Content-Type': 'application/json'
    })
})
   .then(res=>res.json())
   .then(data=> console.log(data))
   .catch(err=> console.log(err));

e.preventDefault();

});

fetch('http://localhost:3000/poll')
.then(res=>res.json())
.then(data=>{
const votes = data.votes;
const totalVotes = votes.length;
//Count vote points
const voteCounts = votes.reduce(
    (acc,vote)=>(
        (acc[vote.mer]=(acc[vote.mer]||0) + parseInt(vote.points)),acc),{});


    let dataPoints = [
        {label: 'skill', y:voteCounts.skill},
        {label: 'smile', y:voteCounts.smile},
        {label: 'heart', y:voteCounts.heart},
        {label: 'physiques', y:voteCounts.physiques},
    ];
    
    const chartContainer = document.querySelector('#chartContainer');
    
    if(chartContainer){
        const chart = new CanvasJS.Chart('chartContainer',{
            animationEnabled: true,
            theme:'theme1',
            title: {
                text: 'Total Votes'+totalVotes
            },
            data:[
                {
                    type:'column',
                    dataPoints: dataPoints
                }
            ]
        });
        chart.render();
    
        
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('91e6ed966b324d2f6241', {
          cluster: 'ap1'
        });
    
        var channel = pusher.subscribe('my-poll');
        channel.bind('my-vote', function(data) {
          dataPoints = dataPoints.map(x=>{
              if(x.label== data.mer){
                  x.y += data.points;
                  return x;
              }
              else{
                  return x;
              }
          });
          chart.render();
        });
    }
});





