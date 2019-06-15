const mongose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
  },
  password: {
      type: String,
      required: true,
      // para que não seja mostrado na busca
      select: false,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
});

// faz algo antes de salvar no bd
// pq n pode ser uma arrow function?
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    // this se refere ao user
    this.password = hash;

    // para o seguir adiante
    next();
})

const User = mongose.model('User', UserSchema);

module.exports = User;