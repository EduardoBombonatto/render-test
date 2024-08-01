const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://exercise312:${password}@exercise3-12.5icolsv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=exercise3-12`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
