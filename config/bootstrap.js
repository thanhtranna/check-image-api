"use strict";

const fse = require("fs-extra");
const path = require("path");
const mongoose = require("mongoose");

/** Global EventEmitter */
const events = require("events");
global.EventEmitter = new events.EventEmitter();

/**
 * Global asyncWrap function
 * Because express isn't promise-aware, you have
 * to use a wrapping function to catch any errors
 * @param fn - async function - e.g. async (req, res, next){ do await action }
 * @param errorCallback - callback to handle error
 */
global.asyncWrap = (fn, errorCallback) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
        if (errorCallback) {
            errorCallback(req, res, error);
        } else {
            if (sails.config.environment === "production") {
            sails.log.error(error);
            return res.badRequest();
            }
            res.serverError(error);
        }
        });
    };
};

module.exports.bootstrap = async function(cb) {

    try {
         /**
         * Connect MongoDb by Mongoose package
         */
        mongoose.Promise = global.Promise;
        mongoose.connect(sails.config.mongodbUri, {useMongoClient: true});
        mongoose.connection.on('error', () => {
            throw new Error('Mongodb Connection Error!');
        });

        /**
         * Global Moment and set timezone to Japan time
         */
        // const moment = require("moment-timezone");
        // moment.tz.setDefault('Asia/Tokyo');
        global.moment = require('moment');

        /** Binding errors to sails
         * call via sails.errors(errorCode, req)
         */
        sails.errors = require('./errors/index').errors;

         /**
         * Global Model, then you can use User, Product.. in your controllers, polices..
         */
        let modelDir = path.join(__dirname, '..', 'api/models');
        let allModelFiles = await fse.readdir(modelDir);
        for (let modelFile of allModelFiles) {
            let modelGlobalName = modelFile.replace('.js', '');
            global[modelGlobalName] = require(path.join(modelDir, modelFile));
        }

        /**
         * Global all Repositories in api/repositories
         */
        let repositoriesDir = path.join(__dirname, '..', 'api/repositories');
        let allRepositoryFiles = await fse.readdir(repositoriesDir);
        for (let repositoryFile of allRepositoryFiles) {
            let nameOfRepository = repositoryFile.replace('.js', '');
            global[nameOfRepository] = require(path.join(repositoriesDir, nameOfRepository));
        }

        /**
         * Implement Event/Listener
         */
        let eventHandlersDir = path.join(__dirname, '..', 'api/events');
        let allEventHandleFiles = await fse.readdir(eventHandlersDir);
        for (let eventHandleFile of allEventHandleFiles) {
            let eventHandle = require(path.join(eventHandlersDir, eventHandleFile));
            for (let listener of eventHandle) {
                EventEmitter.on(listener.eventName, (data) => {
                    sails.log.info(`${eventHandleFile.replace('.js', '')} - Executing event: ${listener.eventName}`);
                    listener.handler(data);
                })
            }
        }
        cb();
    } catch (error) {
      sails.log.error('Error when bootstrap application');
      sails.log.error(error);
      throw error;
    }
};
