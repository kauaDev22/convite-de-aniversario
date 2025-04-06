const express = require('express');
const router = express.Router();
const { enviarEmailConfirmacao } = require('../emailService');

let tarefas = [];
let idCounter = 1;

/**
 * @swagger
 * /api/convite:
 *   get:
 *     summary: Lista todos os convites
 *     responses:
 *       200:
 *         description: Lista de convites
 */
router.get('/', (req, res) => {
  res.json(tarefas);
});

/**
 * @swagger
 * /api/convite:
 *   post:
 *     summary: Cria um convite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Confirmação ou erro
 */
router.post('/', async (req, res) => {
  const { nome, email } = req.body;

  if (nome && email) {
    const novaTarefa = { id: idCounter++, nome, email };
    tarefas.push(novaTarefa);

    const emailEnviado = await enviarEmailConfirmacao(email, nome);

    if (emailEnviado) {
      res.json({ message: 'Confirmado!' });
    } else {
      res.status(500).json({ message: 'Convite registrado, mas o e-mail falhou.' });
    }
  } else {
    res.status(400).json({ message: 'Erro ao enviar, tente novamente.' });
  }
});

/**
 * @swagger
 * /api/convite/{id}:
 *   delete:
 *     summary: Deleta um convite
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Convite deletada
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(t => t.id != id);
  res.json({ message: 'Confirmado!' });
});

module.exports = router;
