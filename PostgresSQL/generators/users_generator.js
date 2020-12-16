const fs = require('fs');
const faker = require('faker');
const path = require('path');

const usersStream = fs.createWriteStream(path.join(__dirname, '../data/postgres_users_data.csv'));

usersStream.write('user_id,user_name\n');

function usersGenerator(numberOfUsers) {
  if (numberOfUsers === 0) {
    console.log('done')
    return usersStream.end();
  }
  const user_id = numberOfUsers;
  const user_name = faker.name.findName();
  const user_entry = `${user_id},${user_name}\n`;

  const streamOkay = usersStream.write(user_entry);
  if (!streamOkay) usersStream.once('drain', () => usersGenerator(numberOfUsers - 1));
  else usersGenerator(numberOfUsers - 1);

;
}

usersGenerator(1000000);