import Vue from 'vue'
// @ts-ignore
import VueSails from 'vue-sails'
// @ts-ignore
import socketIOClient from 'socket.io-client'
// @ts-ignore
import sailsIOClient from 'sails.io.js'

const io = sailsIOClient(socketIOClient)
io.sails.url = (process.env.NODE_ENV === 'production')
  ? 'https://facuevent.herokuapp.com/'
  : 'http://localhost:1337'
io.sails.environment = process.env.NODE_ENV || 'development'
Vue.use(VueSails, io)
