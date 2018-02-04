const form = document.getElementById("vote-form");

//Form Submit Eent
form.addEventListener('submit', e => {
    const choice = document.querySelector("input[name='PL']:checked").value;
    console.log(choice);
    const data = {
        PL: choice
    };

    fetch('https://stark-savannah-55428.herokuapp.com/',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers ({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
  
    e.preventDefault();
});

//Getign data
fetch('https://stark-savannah-55428.herokuapp.com/')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const total = votes.length;
        // count the vote points for all -acc -cur
        const voteCount = votes.reduce((acc,vote) => ((acc[vote.PL] = (acc[vote.PL] || 0) + parseInt(vote.points)) , acc) , {});

        
        //Canvas JS
        let dataPoints = [
            {label: "Nodejs"   , y: voteCount.Nodejs},
            {label: "Python"   , y: voteCount.Python},
            {label: "Laravel"  , y: voteCount.Laravel},
            {label: "Ruby"     , y: voteCount.Ruby},
            {label: "ASP"      , y: voteCount.ASP},
            {label: "Other"    , y: voteCount.Other},    
        ];
        

        const chartContainer =  document.querySelector("#chartContainer");

        if(chartContainer)
        {
            const chart = new CanvasJS.Chart('chartContainer' , {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: `Total Votes ${total}`
                },
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();

            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;

            var pusher = new Pusher('31a1bb67eb9053c44774', {
            cluster: 'eu',
            encrypted: true
            });
        
            var channel = pusher.subscribe('pl-poll');
            channel.bind('pl-vote', function(data) {
            dataPoints = dataPoints.map(x => {
                if(x.label == data.PL){
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

