const express = require('express');
const mongoose = require('mongoose');

const connection = async () => {
  try {
    const db_connect = await mongoose.connect(process.env.MONGO_URI)
    console.log('connect to mongodb')
  } catch (error) {
    console.error(error.message)
  }
}


module.exports = connection