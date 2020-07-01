---
id: authinto
title: Authentication and authorization for Graphback
sidebar_label: Introduction
---

Graphback abstracts from the authentication mechanism.
By default Graphback templates come without authentication, but it is easy to retrofit any existing authentication mechanism 
on top of Graphback.

With the `GraphbackCRUDService` abstraction developers can add any rules and implement various different authorization policies.
Graphback developers recomend following libraries:

- [Passport.js](http://www.passportjs.org/) if you looking for in application authorization and authentication mechanisms.
- [Keycloak](https://www.keycloak.org/) SSO - Standalone SSO server offering integration with various social OAuth logins and federating users.

Graphback provides out of the box support for Keycloak SSO thanks to @graphback/keycloak-authz that utilizes
https://github.com/aerogear/keycloak-connect-graphql library
