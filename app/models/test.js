
const user = require('./user');

async function t() {
  await user.insert({
    name:'客服1',
    industry_id: 3,
    token: 'alJO2V99Bw',
  });

  return await user.find( { token: 'alJO2V99Bw' });
}

t().then(function(a) {
  console.log(a);
}).catch((e) => {
  console.log(e);
});
