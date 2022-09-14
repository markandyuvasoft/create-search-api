import express from 'express'
import mongoose from "mongoose";
import db from '../db/conn.js';

const Schema= mongoose.Schema

const searchSchema= new mongoose.Schema({

name: {
    type: String,
  
      },

email: {

    type: String,
    require: true,
    unique: true,
    },

password:{

    type: String,
    required: true,
    unique: true
    },

phone:{

    type: Number,
    required: true,
    unique: true
    },
  
city:{

    type: String,
   
    },
})

const Search= new mongoose.model("Search",searchSchema)

export default Search
