const express = require("express");
const prisma = require("../../prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const findUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).send({
      success: true,
      message: "Berhasil Mendapatkan User",
      data: user,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal server",
    });
  }
};

const createUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validasi gagal",
      errors: error.array(),
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    res.status(200).send({
      success: true,
      message: "Berhasil Membuat User",
      data: user,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal server",
    });
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).send({
      success: true,
      message: `Berhasil Mendapatkan ID = ${id}`,
      data: user,
    });
  } catch {
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validasi gagal",
      errors: error.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(200).send({
      success: true,
      message: "berhasil update user",
      data: user,
    });
  } catch {
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send({
      success: true,
      message: "Berhasil menghapus user",
    });
  } catch {
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = { findUser, createUser, findUserById, updateUser, deleteUser };
