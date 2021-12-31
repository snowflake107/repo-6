const core = require('@actions/core');
const action = require('./action');

const schema = core.getInput('schema');
const targets = core.getMultilineInput('target');
const strict = core.getBooleanInput('strict');

async function run() {
  try {
    const errors = await action(schema, targets, strict);
    if (errors) {
      core.setFailed(errors);
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
