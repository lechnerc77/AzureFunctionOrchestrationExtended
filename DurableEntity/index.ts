const df = require("durable-functions");

module.exports = df.entity(function(context) {
    const currentValue = context.df.getState(() => 0);
    switch (context.df.operationName) {
        case "add":
            const increment = context.df.getInput();
            context.df.setState(currentValue + increment);
            break;
        case "reset":
            context.df.setState(0);
            break;
        case "get":
            context.df.return("Execution Count: " + currentValue);
            break;
    }
});