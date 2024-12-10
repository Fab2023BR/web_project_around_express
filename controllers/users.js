import User from '../models/user.js';

export function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      if (!users) {
        const err = new Error('Erro ao buscar usuários');
        err.status = 500;
        throw err;
      }
      res.send({ data: users });
    })
    .catch((err) => {
      console.log('getUsers Error:', err);
      res.status(err.status).send({ error: err.message });
    });
}

export function getUserById(req, res) {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail(() => {
      const err = new Error('Usuário não encontrado');
      err.status = 404;
      throw err;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log('getUserById Error:', err);
      res.status(err.status).send({ error: err.message });
    });
}

export function createUser(req, res) {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return res.status(400).send({ error: 'Dados inválidos...' });
  }

  return User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      if (!user) {
        const err = new Error('Ocorreu um erro ao criar usuário');
        err.status = 500;
        throw err;
      }
      req.user._id = user._id;
      res.send({ data: user });
    })
    .catch((err) => {
      console.log('createUser Error:', err);
      res.status(err.status).send({ error: err.message });
    });
}

export function updateUserProfile(req, res) {
  const { name, about } = req.body;
  console.log(name, about)
  const userId = req.user._id;
  const userUpdated = {};

  if (name) {
    userUpdated.name = name;
  }
  if (about) {
    userUpdated.about = about;
  }

  if (!name && !about) {
    return res.status(400).send({ error: 'Dados inválidos...' });
  }

  return User.findByIdAndUpdate(userId, userUpdated, {
    new: true,
  })
    .orFail(() => {
      const err = new Error('Usuário não encontrado');
      err.status = 404;
      throw err;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log('updateUserProfile Error:', err);
      res.status(err.status).send({ error: err.message });
    });
}

export function updateUserAvatar(req, res) {
  const { avatar } = req.body;
  const userId = req.user._id;

  if (!avatar) {
    return res.status(400).send({ error: 'Dados inválidos...' });
  }

  return User.findByIdAndUpdate(
    userId,
    {
      $set: { avatar: avatar.avatar }, // Use $set para campos únicos
    },
    {
      new: true,
    },
  ).orFail(() => {
      const err = new Error('Usuário não encontrado');
      err.status = 404;
      throw err;
    })
    .then((user) => {
      console.log(user);
      return res.send({ data: user });
    })
    .catch((err) => {
      console.log('updateUserAvatar Error:', err);
      return res.status(err.status).send({ error: err.message });
    });
}
