/**
 * Copyright 2013-present NightWorld.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var pg = require('pg'),
    model = module.exports,
    connString = "postgres://postgres:Password@localhost:5432/OAuth";
// connString = process.env.DATABASE_URL;
var pool = new pg.Pool();

/*
 * Required
 */

model.getAccessToken = function(bearerToken, callback) {
    callback(null, {
        accessToken: "token.access_token",
        clientId: 12345,
        expires: new Date(2018, 31, 8, 0, 0, 0, 0),
        userId: "RoyFolkker"
    });
};

model.getClient = function(clientId, clientSecret, callback) {
    callback(null, {
        clientId: 12345,
        clientSecret: "client.client_secret"
    });
};

model.getRefreshToken = function(bearerToken, callback) {
    callback(false, true);
};

// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types
var authorizedClientIds = ['abc1', 'def2'];
model.grantTypeAllowed = function(clientId, grantType, callback) {
    if (grantType === 'password') {
        return callback(false, authorizedClientIds.indexOf(clientId.toLowerCase()) >= 0);
    }

    callback(false, true);
};

model.saveAccessToken = function(accessToken, clientId, expires, userId, callback) {
    callback(false);
};

model.saveRefreshToken = function(refreshToken, clientId, userId, expires, callback) {
    callback(false);
};

/*
 * Required to support password grant type
 */
model.getUser = function(username, password, callback) {
    callback(false, true);
};