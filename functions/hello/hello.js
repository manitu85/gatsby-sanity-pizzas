// Example aws-lambada function
exports.handler = async (event, context) =>
  // console.log(event);
  ({
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World !!!' }),
  });
