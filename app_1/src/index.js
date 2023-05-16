const kafka = require('kafka-node');

// Declare the client
const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});

// Create a consumer
const consumer = new kafka.Consumer(client, [ {topic: 'test'} ]);

consumer.on('message', function (message)
{
    console.log("Message", message);
});


// Publish messages
const producer = new kafka.Producer(client);

producer.on('ready', function (message)
{
    setInterval(function()
    {
        producer.send([ {topic: "test", messages: `Automatic message every 5 seconds`} ], function(err, data)
        {
            console.log(`Message sent`, data);
        });
    }, 5000);
});